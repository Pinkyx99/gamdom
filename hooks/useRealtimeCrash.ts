

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
// FIX: Import the centralized GameState type to ensure consistency.
import { CrashRound, CrashBet, CrashHistoryItem, GameState } from '../types';
import { Session } from '@supabase/supabase-js';

// FIX: Remove local GameState definition in favor of the centralized one.
// type GameState = 'connecting' | 'waiting' | 'running' | 'crashed' | 'resetting';
const GROWTH_CONSTANT_K = 0.07;
const WAITING_TIME_MS = 7000;
const CRASHED_DELAY_MS = 4000; // Time to wait after a crash before starting a new round

export const useRealtimeCrash = (session: Session | null, onProfileUpdate: () => void, onBalanceChange: (amount: number) => void) => {
    const [currentRound, setCurrentRound] = useState<CrashRound | null>(null);
    const [allBets, setAllBets] = useState<CrashBet[]>([]);
    const [myBets, setMyBets] = useState<CrashBet[]>([]);
    const [history, setHistory] = useState<CrashHistoryItem[]>([]);
    const [gameState, setGameState] = useState<GameState>('connecting');
    const [multiplier, setMultiplier] = useState(1.00);
    const [countdown, setCountdown] = useState(WAITING_TIME_MS / 1000);
    
    const animationFrameId = useRef<number | null>(null);

    // Fetch initial history
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from('crash_rounds')
                .select('crash_point')
                .not('crash_point', 'is', null)
                .order('created_at', { ascending: false })
                .limit(20);
            
            if (error) console.error("Error fetching history:", error);
            else {
                setHistory(data.map(d => ({ multiplier: d.crash_point! })));
            }
        };
        fetchHistory();
    }, []);

    // Main real-time subscription effect for rounds
    useEffect(() => {
        const handleRoundUpdate = (payload: any) => {
            const newRound = payload.new as CrashRound;
            
            // Use functional update to avoid stale closure on `currentRound`
            setCurrentRound(prevRound => {
                // BUG FIX: The primary cause of the UI freezing was state from previous rounds
                // not being cleared correctly. This logic ensures that whenever a new round
                // starts (indicated by a 'waiting' status and a new round ID), all relevant
                // states are forcefully reset.
                if (newRound.status === 'waiting' && (!prevRound || newRound.id !== prevRound.id)) {
                    setAllBets([]);
                    setMyBets([]);
                    setMultiplier(1.00);
                    setCountdown(WAITING_TIME_MS / 1000);
                }

                // Add to history only when the round officially crashes.
                if (newRound.status === 'crashed' && newRound.crash_point && prevRound?.status !== 'crashed') {
                    setHistory(prevHist => {
                        if (prevHist.length > 0 && prevHist[0].multiplier === newRound.crash_point) {
                            return prevHist;
                        }
                        return [{ multiplier: newRound.crash_point! }, ...prevHist].slice(0, 20);
                    });
                }
                
                return newRound;
            });
        };

        const roundChannel = supabase
            .channel('crash-rounds')
            .on<CrashRound>('postgres_changes', { event: '*', schema: 'public', table: 'crash_rounds' }, handleRoundUpdate)
            .subscribe();

        const fetchInitialRound = async () => {
             const { data, error } = await supabase
                .from('crash_rounds')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
            if (error && error.code !== 'PGRST116') {
                console.error("Error fetching initial round:", error);
            } else if (data) {
                setCurrentRound(data as CrashRound);
            }
        };
        fetchInitialRound();

        return () => {
            supabase.removeChannel(roundChannel);
        };
    }, []);

    // Subscription for bets on the current round
    useEffect(() => {
        if (!currentRound) return;

        const fetchBets = async () => {
             const { data, error } = await supabase
                .from('crash_bets')
                .select(`*, profiles(username, avatar_url)`)
                .eq('round_id', currentRound.id);
            if (error) console.error("Error fetching bets", error);
            else {
                setAllBets(data as any[] as CrashBet[]);
            }
        };
        
        // Only fetch bets if it's a new waiting round to avoid race conditions.
        if (currentRound.status === 'waiting') {
            fetchBets();
        }

        const betsChannel = supabase
            .channel(`crash-bets-${currentRound.id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'crash_bets', filter: `round_id=eq.${currentRound.id}` },
                async (payload) => {
                    const newBet = payload.new as CrashBet;
                     const { data, error } = await supabase
                        .from('profiles')
                        .select('username, avatar_url')
                        .eq('id', newBet.user_id)
                        .single();
                    
                    if (error) return;

                    const newBetWithProfile = { ...newBet, profiles: data };

                    setAllBets(prev => {
                        const existingIndex = prev.findIndex(b => b.id === newBetWithProfile.id);
                        if (existingIndex > -1) {
                            const newBets = [...prev];
                            newBets[existingIndex] = newBetWithProfile;
                            return newBets;
                        }
                        return [...prev, newBetWithProfile];
                    });
                }
            )
            .subscribe();
        
        return () => {
            supabase.removeChannel(betsChannel);
        };

    }, [currentRound?.id]);

    // Filter my bets from all bets
    useEffect(() => {
        if (session?.user) {
            setMyBets(allBets.filter(b => b.user_id === session.user.id));
        } else {
            setMyBets([]);
        }
    }, [allBets, session]);

    // Game state loop for ANIMATIONS/TIMERS
    const gameLoop = useCallback(() => {
        if (!currentRound) {
            animationFrameId.current = requestAnimationFrame(gameLoop);
            return;
        }

        // Set the game state directly from the authoritative source (Supabase).
        // The client no longer predicts the state.
        setGameState(currentRound.status);

        switch(currentRound.status) {
            case 'waiting':
                const elapsed = Date.now() - new Date(currentRound.created_at).getTime();
                setCountdown(Math.max(0, (WAITING_TIME_MS - elapsed) / 1000));
                setMultiplier(1.00);
                break;
            case 'running':
                if (currentRound.started_at) {
                    const elapsedMs = Date.now() - new Date(currentRound.started_at).getTime();
                    const liveMultiplier = Math.exp(GROWTH_CONSTANT_K * (elapsedMs / 1000));
                    // The client's only job is to render the multiplier. It does not decide when
                    // the round is over. The 'crashed' case will handle the final value
                    // once the server updates the round status.
                    setMultiplier(liveMultiplier);
                }
                break;
            case 'crashed':
                // The server has confirmed the crash. Lock the multiplier to the final value.
                setMultiplier(currentRound.crash_point ?? 1.00);
                break;
        }
        
        animationFrameId.current = requestAnimationFrame(gameLoop);
    }, [currentRound]);

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        }
    }, [gameLoop]);

    const placeBet = async (betAmountStr: string, autoCashoutStr: string) => {
        if (!session || !currentRound || currentRound.status !== 'waiting') {
            return { success: false, message: 'Betting is currently closed.'};
        }
        const bet_amount = parseFloat(betAmountStr);
        const auto_cashout_at = parseFloat(autoCashoutStr) || null;

        if (isNaN(bet_amount) || bet_amount <= 0) {
            return { success: false, message: 'Invalid bet amount.' };
        }
        
        const { data, error } = await supabase.rpc('place_crash_bet', {
            round_id_in: currentRound.id,
            bet_amount_in: bet_amount,
            auto_cashout_at_in: auto_cashout_at
        });

        if (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
        if (data.success === false) {
             return { success: false, message: data.message };
        }
        
        onBalanceChange(-bet_amount);
        onProfileUpdate();
        return { success: true };
    };
    
    const cashout = async (betId: string, cashoutMultiplier: number) => {
        if (!session) return { success: false, message: 'Not logged in' };
        
        const bet = allBets.find(b => b.id === betId);
        if (!bet) {
            return { success: false, message: "Could not find your bet to cashout." };
        }

        const { data, error } = await supabase.rpc('cashout_crash_bet', {
            bet_id_in: betId,
            cashout_multiplier_in: cashoutMultiplier
        });
        
        if (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
        if (data.success === false) {
             return { success: false, message: data.message };
        }
        
        const winnings = bet.bet_amount * cashoutMultiplier;
        onBalanceChange(winnings);
        onProfileUpdate();
        return { success: true };
    };

    return { gameState, multiplier, countdown, currentRound, allBets, myBets, history, placeBet, cashout };
};