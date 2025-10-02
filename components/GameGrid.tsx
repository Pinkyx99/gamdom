
import React from 'react';
import { GameCard } from './GameCard';
import { Game } from '../types';

interface GameGridProps {
  games: Game[];
}

export const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="my-8 md:my-12">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold font-display">Live Games</h3>
            <a href="#" className="text-sm text-text-muted hover:text-white transition">View all</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    </div>
  );
};
