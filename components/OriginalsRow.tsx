import React from 'react';
import { ORIGINAL_GAMES } from '../constants';
import { OriginalGame } from '../types';

interface OriginalsRowProps {
  onGameSelect: (gameName: string) => void;
}

export const OriginalsRow: React.FC<OriginalsRowProps> = ({ onGameSelect }) => {
  return (
    <div className="my-8 md:my-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold font-display flex items-center">
            <span className="w-3 h-3 bg-accent-green rounded-full mr-3"></span>
            Originals
        </h3>
        <div className="flex items-center space-x-2">
            <a href="#" className="text-sm text-text-muted hover:text-white transition">View all</a>
            <button className="h-8 w-8 rounded-full bg-card-bg/80 flex items-center justify-center text-text-muted hover:bg-white/10 hover:text-white transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
            <button className="h-8 w-8 rounded-full bg-card-bg/80 flex items-center justify-center text-text-muted hover:bg-white/10 hover:text-white transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
        </div>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
        {ORIGINAL_GAMES.map((game: OriginalGame) => (
          <button
            key={game.name}
            onClick={() => onGameSelect(game.name)}
            className={`relative group flex-shrink-0 w-36 h-24 rounded-xl flex flex-col justify-end p-3 transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-soft text-left ${game.color} overflow-hidden`}
          >
            {/* Dark gradient overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="absolute top-2 right-2 bg-black/30 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{game.rtp}</div>
              <div className="flex items-center space-x-2 text-white">
                  <span className="w-6 h-6">{game.icon}</span>
                  <span className="font-semibold">{game.name}</span>
              </div>
            </div>
            
            {/* Play Icon on hover */}
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};