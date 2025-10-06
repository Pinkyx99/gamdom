import React from 'react';

interface KenoPayoutBarProps {
    multipliers: number[];
}

export const KenoPayoutBar: React.FC<KenoPayoutBarProps> = ({ multipliers }) => {
    return (
        <div className="mt-4 bg-[#1a2127]/80 backdrop-blur-sm p-2 rounded-lg w-full">
            <div className="grid grid-cols-11 gap-1 text-center text-xs font-semibold">
                {/* Multiplier Values */}
                {multipliers.map((payout, index) => (
                    <div key={`payout-${index}`} className="text-gray-400 py-1">
                        {payout.toFixed(2)}x
                    </div>
                ))}

                {/* Hit Counts */}
                {multipliers.map((_, index) => (
                    <div key={`hits-${index}`} className="bg-[#0f1519]/50 rounded py-1.5 flex items-center justify-center border border-gray-700/50">
                        <span className="text-white">{index}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
