
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RouletteRound, RouletteBet, RouletteColor, RouletteGameState, RouletteHistoryItem } from '../types';
import { Session } from '@supabase/supabase-js';

const WAITING_TIME_MS = 15000;
const FINISHED_TIME_MS = 5000;

export const useRealtimeRoulette = (session: Session | null, onBalanceChange: (amount: number) => void) => {
    const [currentRound, setCurrentRound] = useState<RouletteRound | null>(null);
    const [allBets, setAllBets] = useState<RouletteBet[]>([]);
    const [history, setHistory] = useState<RouletteHistoryItem[]>([]);
    const [gameState, setGameState] = useState<RouletteGameState>('waiting');
    const [countdown, setCountdown] = useState(WAITING_TIME_MS / 1000);
    const [winningNumber, setWinningNumber] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Use a ref to hold the latest round state for access inside the subscription callback, preventing stale closures.
    const currentRoundRef = useRef<RouletteRound | null>(currentRound);
    useEffect(() => {
        currentRoundRef.current = currentRound;
    }, [currentRound]);

    // Fetch initial history
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from('roulette_rounds')
                .select('winning_number')
                .not('winning_number', 'is', null)
                .order('created_at', { ascending: false })
                .limit(10);
            
            if (error) console.error("Error fetching roulette history:", error);
            else setHistory(data.map(d => ({ winning_number: d.winning_number! })));
        };
        fetchHistory();
    }, []);

    // Timer and game state management effect
    useEffect(() => {
        if (!currentRound) return;

        setGameState(currentRound.status);
        setWinningNumber(currentRound.winning_number);
        
        const timer = setInterval(() => {
            if (currentRound.status === 'waiting') {
                const elapsed = Date.now() - new Date(currentRound.created_at).getTime();
                setCountdown(Math.max(0, (WAITING_TIME_MS - elapsed) / 1000));
            } else if (currentRound.status === 'finished' && currentRound.ended_at) {
                 const elapsed = Date.now() - new Date(currentRound.ended_at).getTime();
                 setCountdown(Math.max(0, (FINISHED_TIME_MS - elapsed) / 1000));
            } else {
                setCountdown(0);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [currentRound]);

    // Main real-time subscription for rounds
    useEffect(() => {
        const handleRoundUpdate = (payload: any) => {
            const newRound = payload.new as RouletteRound;
            const oldRound = currentRoundRef.current; // Access the latest round via the ref

            // A brand new round instance has started. Reset the board state.
            if (newRound.status === 'waiting' && (!oldRound || oldRound.id !== newRound.id)) {
                setAllBets([]);
                setWinningNumber(null);
            }
            
            // A round's status just changed to 'finished'. Add its result to history.
            if (newRound.status === 'finished' && oldRound?.status !== 'finished' && newRound.winning_number !== null) {
                setHistory(prevHist =>
                    // Prevent adding a duplicate history item if we receive multiple events
                    prevHist[0]?.winning_number === newRound.winning_number ? prevHist :
                    [{ winning_number: newRound.winning_number! }, ...prevHist].slice(0, 10)
                );
            }

            setCurrentRound(newRound);
        };

        const roundChannel = supabase
            .channel('roulette-rounds')
            .on<RouletteRound>('postgres_changes', { event: '*', schema: 'public', table: 'roulette_rounds' }, handleRoundUpdate)
            .subscribe();

        const fetchInitialRound = async () => {
             const { data, error } = await supabase
                .from('roulette_rounds')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
            if (error && error.code !== 'PGRST116') console.error("Error fetching initial roulette round:", error);
            else if (data) setCurrentRound(data as RouletteRound);
        };
        fetchInitialRound();

        return () => { supabase.removeChannel(roundChannel); };
    }, []);

    // Subscription for bets on the current round
    useEffect(() => {
        if (!currentRound || currentRound.status !== 'waiting') return;

        const handleNewBet = async (payload: any) => {
            const newBet = payload.new as RouletteBet;
             const { data, error } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', newBet.user_id)
                .single();
            if (error) return;
            const betWithProfile = { ...newBet, profiles: data };
            setAllBets(prev => [...prev.filter(b => b.id !== betWithProfile.id), betWithProfile]);
        };

        const betsChannel = supabase
            .channel(`roulette-bets-${currentRound.id}`)
            .on<RouletteBet>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'roulette_bets', filter: `round_id=eq.${currentRound.id}` }, handleNewBet)
            .subscribe();
        
        return () => { supabase.removeChannel(betsChannel); };
    }, [currentRound?.id, currentRound?.status]);

     useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const placeBet = useCallback(async (betAmount: number, betColor: RouletteColor) => {
        if (!session) {
            setError('Please sign in to place a bet.');
            return;
        }
        if (!currentRound || gameState !== 'waiting') {
            setError('Betting is closed for this round.');
            return;
        }
        if (betAmount <= 0) {
            setError('Invalid bet amount.');
            return;
        }

        // Optimistic update client balance
        onBalanceChange(-betAmount);

        const { data: rpcData, error: rpcError } = await supabase.rpc('place_roulette_bet', {
            round_id_in: currentRound.id,
            bet_amount_in: betAmount,
            bet_color_in: betColor,
        });

        const result = rpcData as { success: boolean, message?: string };

        if (rpcError || (result && !result.success)) {
            const message = rpcError?.message || result?.message || 'Failed to place bet.';
            console.error('Error placing bet:', message);
            setError(message);
            onBalanceChange(betAmount); // Revert optimistic update if bet fails
        }

    }, [session, currentRound, gameState, onBalanceChange]);


    return { gameState, countdown, winningNumber, allBets, history, placeBet, error };
};
