
import React, { useState, useEffect } from 'react';
import { Profile, RouletteColor, RouletteGameState } from '../../types';
import { Session } from '@supabase/supabase-js';

interface RouletteControlsProps {
    onPlaceBet: (betAmount: number, betColor: RouletteColor) => void;
    gameState: RouletteGameState;
    profile: Profile | null;
    session: Session | null;
    error: string | null;
}

const BetButton: React.FC<{
    color: 'red' | 'green' | 'black';
    title: string;
    profit: string;
    onClick: () => void;
    disabled: boolean;
}> = ({ color, title, profit, onClick, disabled }) => {
    const colorClasses = {
        red: 'bg-red-500 hover:bg-red-600',
        green: 'bg-green-500 hover:bg-green-600',
        black: 'bg-gray-800 hover:bg-gray-900',
    };
    return (
        <div className="flex flex-col items-center">
            <span className="text-xs text-text-muted mb-1">Potential Profit: ${profit}</span>
            <button 
                onClick={onClick}
                disabled={disabled}
                className={`w-full py-4 rounded-md text-white font-bold text-lg transition-colors ${colorClasses[color]} disabled:bg-gray-600 disabled:cursor-not-allowed`}
            >
                {title}
            </button>
        </div>
    );
};


export const RouletteControls: React.FC<RouletteControlsProps> = ({ onPlaceBet, gameState, profile, session, error }) => {
    const [betAmount, setBetAmount] = useState(0.23);

    const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setBetAmount(isNaN(val) ? 0 : val);
    };

    const handleModifier = (action: 'clear' | '+10' | '+50' | '+100' | '1/2' | 'x2' | 'max') => {
        switch(action) {
            case 'clear': setBetAmount(0); break;
            case '+10': setBetAmount(prev => prev + 10); break;
            case '+50': setBetAmount(prev => prev + 50); break;
            case '+100': setBetAmount(prev => prev + 100); break;
            case '1/2': setBetAmount(prev => parseFloat((prev/2).toFixed(2))); break;
            case 'x2': setBetAmount(prev => parseFloat((prev*2).toFixed(2))); break;
            case 'max': setBetAmount(profile?.balance || 0); break;
        }
    }
    
    const isBettingDisabled = gameState !== 'waiting' || !session;
    const insufficientFunds = profile && betAmount > profile.balance;
    const effectiveDisabled = isBettingDisabled || insufficientFunds;

    return (
        <div className="bg-card-bg p-4 rounded-xl border border-outline relative">
            {error && <p className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded ">{error}</p>}
             <p className="text-sm font-semibold mb-2 text-text-muted">Your bet</p>
             <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 font-bold">$</span>
                     <input
                        type="number"
                        value={betAmount.toFixed(2)}
                        onChange={handleBetChange}
                        disabled={isBettingDisabled}
                        className="w-full bg-background border border-outline rounded-md p-3 pl-8 text-white font-semibold focus:ring-1 focus:ring-accent-green focus:outline-none"
                    />
                </div>
                 <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    <button onClick={() => handleModifier('clear')} className="bg-background border border-outline rounded-md p-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors">Clear</button>
                    {['+10', '+50', '+100', '1/2', 'x2', 'max'].map(mod => (
                        <button key={mod} onClick={() => handleModifier(mod as any)} className="bg-background border border-outline rounded-md p-3 text-sm font-semibold text-accent-green hover:bg-white/5 transition-colors">
                            {mod.toUpperCase()}
                        </button>
                    ))}
                 </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                 <BetButton color="red" title="1 to 7" profit={(betAmount * 2).toFixed(2)} onClick={() => onPlaceBet(betAmount, 'red')} disabled={effectiveDisabled}/>
                 <BetButton color="green" title="0" profit={(betAmount * 14).toFixed(2)} onClick={() => onPlaceBet(betAmount, 'green')} disabled={effectiveDisabled}/>
                 <BetButton color="black" title="8 to 14" profit={(betAmount * 2).toFixed(2)} onClick={() => onPlaceBet(betAmount, 'black')} disabled={effectiveDisabled}/>
             </div>
        </div>
    );
};
