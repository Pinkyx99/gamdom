
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group relative bg-card-bg rounded-xl overflow-hidden border border-outline transition-all duration-250 ease-out hover:-translate-y-1.5 hover:shadow-soft hover:border-white/10">
      <div className="aspect-[3/4]">
        <img src={game.thumbnailSrc} alt={game.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <h4 className="text-white font-semibold truncate text-sm">{game.title}</h4>
        <p className="text-text-muted text-xs truncate">{game.provider}</p>
        <div className="flex justify-between items-center mt-2 text-xs">
            <span className="text-text-muted">RTP: <span className="text-accent-green font-medium">{game.rtp}%</span></span>
            <span className={`px-1.5 py-0.5 rounded text-white ${game.volatility === 'High' ? 'bg-red-500/50' : game.volatility === 'Medium' ? 'bg-yellow-500/50' : 'bg-green-500/50'}`}>
                {game.volatility}
            </span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250">
          <button aria-label={`Play ${game.title}`} className="bg-accent-green text-white font-bold py-3 px-6 rounded-lg mb-4 transform group-hover:scale-100 scale-90 transition-transform">
              Play
          </button>
          <a href="#" className="text-sm text-white hover:underline">Quick Preview</a>
      </div>
    </div>
  );
};
