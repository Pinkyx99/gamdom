
import React from 'react';
import { CATEGORIES } from '../constants';

export const CategoryCards: React.FC = () => {
  const colorClasses = {
    magenta: {
      shadow: 'shadow-glow-magenta',
      hoverBorder: 'hover:border-accent-magenta/50',
      overlayBg: 'bg-accent-magenta/30'
    },
    green: {
      shadow: 'shadow-glow-green',
      hoverBorder: 'hover:border-accent-green/50',
      overlayBg: 'bg-accent-green/30'
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 md:my-12">
      {CATEGORIES.map((category) => (
        <div
          key={category.title}
          className={`relative group overflow-hidden rounded-2xl flex flex-col justify-end min-h-[220px] border border-outline transition-all duration-300 ${colorClasses[category.color].shadow} ${colorClasses[category.color].hoverBorder}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${category.imageUrl})` }} 
          />
          <div className={`absolute inset-0 ${colorClasses[category.color].overlayBg}`} />
          
          {/* This container now holds the gradient, blur, padding, and content */}
          <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-md">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-3xl text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">{category.title}</h3>
              <button className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                {category.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
