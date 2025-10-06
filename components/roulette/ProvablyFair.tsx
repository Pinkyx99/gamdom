import React, { useState } from 'react';
import { getWinningNumber } from '../../lib/rouletteUtils';

interface ProvablyFairProps {
    clientSeed: string;
    setClientSeed: (seed: string) => void;
    serverSeed: string | null;
    nonce: number;
    lastWinningNumber: number | null;
}

export const ProvablyFair: React.FC<ProvablyFairProps> = ({ clientSeed, setClientSeed, serverSeed, nonce, lastWinningNumber }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [verificationResult, setVerificationResult] = useState<string | null>(null);

    const handleVerify = async () => {
        if (!serverSeed || lastWinningNumber === null) {
            setVerificationResult("No previous round to verify.");
            return;
        }
        // We verify the previous round, so we use nonce - 1
        const calculatedNumber = await getWinningNumber(serverSeed, clientSeed, nonce - 1);
        if (calculatedNumber === lastWinningNumber) {
            setVerificationResult(`Success! Calculated number ${calculatedNumber} matches last winning number ${lastWinningNumber}.`);
        } else {
            setVerificationResult(`Verification failed. Calculated: ${calculatedNumber}, Actual: ${lastWinningNumber}.`);
        }
    };

    return (
        <div className="bg-[#1A222D] rounded-xl border border-outline p-3 my-4 text-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center">
                <span className="font-semibold text-white">Provably Fair</span>
                <svg className={`w-5 h-5 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
                <div className="mt-4 space-y-3">
                    <div>
                        <label className="text-xs font-semibold text-text-muted block mb-1">Client Seed</label>
                        <input
                            type="text"
                            value={clientSeed}
                            onChange={(e) => setClientSeed(e.target.value)}
                            className="w-full bg-[#0D1316] border border-outline rounded-md p-2 text-white text-xs"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-text-muted block mb-1">Server Seed (Revealed after spin)</label>
                        <input
                            type="text"
                            readOnly
                            value={serverSeed || "Hidden until round ends"}
                            className="w-full bg-[#0D1316] border border-outline rounded-md p-2 text-text-muted text-xs"
                        />
                    </div>
                     <div>
                        <label className="text-xs font-semibold text-text-muted block mb-1">Nonce</label>
                        <input
                            type="number"
                            readOnly
                            value={nonce}
                            className="w-full bg-[#0D1316] border border-outline rounded-md p-2 text-text-muted text-xs"
                        />
                    </div>
                    <button onClick={handleVerify} disabled={!serverSeed} className="w-full bg-accent-green/20 text-accent-green font-bold py-2 rounded-md text-xs hover:bg-accent-green/40 disabled:opacity-50">
                        Verify Last Spin
                    </button>
                    {verificationResult && <p className="text-xs text-center text-yellow-400 mt-2">{verificationResult}</p>}
                </div>
            )}
        </div>
    );
};
