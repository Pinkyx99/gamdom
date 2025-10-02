
import React from 'react';
import { Profile } from '../types';
import { Session } from '@supabase/supabase-js';
import { useRealtimeRoulette } from '../hooks/useRealtimeRoulette';
import { RouletteSpinner } from '../components/roulette/RouletteSpinner';
import { RouletteControls } from '../components/roulette/RouletteControls';
import { RouletteBettingTable } from '../components/roulette/RouletteBettingTable';

interface RouletteGamePageProps {
    profile: Profile | null;
    session: Session | null;
    onBalanceChange: (amount: number) => void;
}

const RouletteGamePage: React.FC<RouletteGamePageProps> = ({ profile, session, onBalanceChange }) => {
    const {
        gameState,
        countdown,
        winningNumber,
        allBets,
        history,
        placeBet,
        error
    } = useRealtimeRoulette(session, onBalanceChange);
    
    const redBets = allBets.filter(b => b.bet_color === 'red');
    const greenBets = allBets.filter(b => b.bet_color === 'green');
    const blackBets = allBets.filter(b => b.bet_color === 'black');

    const totalRed = redBets.reduce((sum, b) => sum + b.bet_amount, 0);
    const totalGreen = greenBets.reduce((sum, b) => sum + b.bet_amount, 0);
    const totalBlack = blackBets.reduce((sum, b) => sum + b.bet_amount, 0);

    return (
        <div className="flex flex-col flex-1 w-full max-w-[1400px] mx-auto px-4 py-6">
            <RouletteSpinner
                gameState={gameState}
                winningNumber={winningNumber}
                history={history}
                countdown={countdown}
            />

            <div className="my-6">
                <RouletteControls 
                    onPlaceBet={placeBet}
                    gameState={gameState}
                    profile={profile}
                    session={session}
                    error={error}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RouletteBettingTable 
                    color="red"
                    title="1 to 7"
                    bets={redBets}
                    totalAmount={totalRed}
                />
                <RouletteBettingTable 
                    color="green"
                    title="0"
                    bets={greenBets}
                    totalAmount={totalGreen}
                />
                <RouletteBettingTable 
                    color="black"
                    title="8 to 14"
                    bets={blackBets}
                    totalAmount={totalBlack}
                />
            </div>
        </div>
    );
};

export default RouletteGamePage;
