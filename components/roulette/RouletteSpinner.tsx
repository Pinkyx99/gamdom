
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { RouletteGameState, RouletteHistoryItem } from '../../types';

interface RouletteSpinnerProps {
    gameState: RouletteGameState;
    winningNumber: number | null;
    history: RouletteHistoryItem[];
    countdown: number;
}

const ROULETTE_NUMBERS = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
const TILE_WIDTH = 80; // Corresponds to w-20 in Tailwind
const TILE_GAP = 8; // Corresponds to gap-2 in Tailwind

const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-green-500';
    if (num >= 1 && num <= 7) return 'bg-red-500';
    return 'bg-gray-800'; // 8-14
};

const NumberTile: React.FC<{ num: number }> = React.memo(({ num }) => (
    <div className={`w-20 h-20 flex-shrink-0 rounded-md flex items-center justify-center text-2xl font-bold text-white ${getNumberColor(num)}`}>
        {num}
    </div>
));

export const RouletteSpinner: React.FC<RouletteSpinnerProps> = ({ gameState, winningNumber, history, countdown }) => {
    const [reel, setReel] = useState<number[]>([]);
    const [translate, setTranslate] = useState(0);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [viewportWidth, setViewportWidth] = useState(0);

    const spinnerStateText = useMemo(() => {
        switch (gameState) {
            case 'waiting':
                return `Spinning in ${countdown.toFixed(1)}s`;
            case 'spinning':
                return 'Spinning';
            case 'finished':
                return `Finished! Winning number is ${winningNumber}`;
            default:
                return 'Connecting...';
        }
    }, [gameState, countdown, winningNumber]);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                setViewportWidth(entries[0].contentRect.width);
            }
        });
        if (viewportRef.current) {
            observer.observe(viewportRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (gameState === 'spinning' && winningNumber !== null && viewportWidth > 0) {
            const reelLength = 100;
            const newReel: number[] = Array.from({ length: reelLength -1 }, () => ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)]);
            newReel.push(winningNumber);
            setReel(newReel);

            // Calculate the final translation to center the winning tile
            const centerOffset = viewportWidth / 2 - TILE_WIDTH / 2;
            const wobble = (Math.random() - 0.5) * (TILE_WIDTH * 0.4);
            const finalPosition = (reelLength - 1) * (TILE_WIDTH + TILE_GAP);
            
            setTranslate(centerOffset - finalPosition - wobble);

        } else if (gameState === 'waiting') {
            const initialReel = ROULETTE_NUMBERS.concat(ROULETTE_NUMBERS).concat(ROULETTE_NUMBERS);
            setReel(initialReel);
            setTranslate(0);
        }
    }, [gameState, winningNumber, viewportWidth]);

    return (
        <div className="bg-card-bg p-4 rounded-xl border border-outline relative">
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-white">{spinnerStateText}</p>
                <div className="flex items-center space-x-1">
                    {history.map((item, index) => (
                        <div key={index} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getNumberColor(item.winning_number)}`}>
                            {item.winning_number}
                        </div>
                    ))}
                    <button className="h-6 w-6 rounded-full bg-background flex items-center justify-center text-text-muted hover:bg-white/10" aria-label="View history">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </div>
            </div>

            <div className="h-20 w-full relative">
                {/* Marker Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L0 0L20 0L10 12Z"/>
                    </svg>
                </div>

                {/* Reel Viewport */}
                <div ref={viewportRef} className="h-full w-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 flex items-center gap-2"
                        style={{
                            transform: `translateX(${translate}px)`,
                            transition: gameState === 'spinning' ? 'transform 10s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
                        }}
                    >
                        {reel.map((num, index) => <NumberTile key={index} num={num} />)}
                    </div>
                </div>

                {/* Fade overlays */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card-bg to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card-bg to-transparent pointer-events-none z-10" />
            </div>
        </div>
    );
};
