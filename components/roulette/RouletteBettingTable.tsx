
import React from 'react';
import { RouletteBet } from '../../types';

interface RouletteBettingTableProps {
    color: 'red' | 'green' | 'black';
    title: string;
    bets: RouletteBet[];
    totalAmount: number;
}

const UserIcon: React.FC = () => (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
);

export const RouletteBettingTable: React.FC<RouletteBettingTableProps> = ({ color, title, bets, totalAmount }) => {
    
    const sortedBets = [...bets].sort((a,b) => b.bet_amount - a.bet_amount);

    return (
        <div className="bg-card-bg rounded-xl border border-outline flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between p-3 border-b border-outline">
                <div className="flex items-center space-x-2">
                    <UserIcon />
                    <span className="font-semibold text-sm">{bets.length}</span>
                </div>
                <div className="font-semibold text-sm">${totalAmount.toFixed(2)}</div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                {sortedBets.map(bet => (
                    <div key={bet.id} className="flex items-center justify-between p-1.5 rounded-md hover:bg-white/5">
                        <div className="flex items-center space-x-2">
                            <img src={bet.profiles.avatar_url} alt={bet.profiles.username} className="w-6 h-6 rounded-full" />
                            <span className="text-xs text-text-muted">{bet.profiles.username}</span>
                        </div>
                        <span className="text-sm font-semibold">${bet.bet_amount.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
