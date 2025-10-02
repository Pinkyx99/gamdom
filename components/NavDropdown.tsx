import React, { useState } from 'react';
import { CASINO_LINKS, SPORTS_LINKS, SUPPORT_LINKS, REWARDS_LINKS, ORIGINAL_GAMES } from '../constants';
import { DropdownLink, OriginalGame } from '../types';

// Helper component for styled links in dropdowns
const DropdownCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-background rounded-lg p-3 text-sm text-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center space-x-3">
    {children}
  </div>
);

// Specific content for 'Originals' dropdown
const OriginalsContent: React.FC<{ onGameSelect: (gameName: string) => void }> = ({ onGameSelect }) => {
    const [hoveredGame, setHoveredGame] = useState<OriginalGame | null>(ORIGINAL_GAMES[3]); // Default to Crash

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Gamdom Originals</h3>
                <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
                    {ORIGINAL_GAMES.map(game => (
                        <button
                            key={game.name}
                            onClick={() => onGameSelect(game.name)}
                            onMouseEnter={() => setHoveredGame(game)}
                            className="group relative rounded-lg overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-1 cursor-pointer block aspect-square"
                        >
                            <div className={`w-full h-full ${game.color} flex items-center justify-center`}>
                                <span className="w-10 h-10 text-white">{game.icon}</span>
                            </div>
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-bold text-sm">{game.name}</span>
                                <span className="text-accent-green text-xs font-semibold">{game.rtp}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="col-span-4">
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Preview</h3>
                {hoveredGame && (
                    <div className="relative rounded-lg overflow-hidden group aspect-video bg-card-bg">
                        {hoveredGame.previewImageUrl ? (
                            <img src={hoveredGame.previewImageUrl} alt={`${hoveredGame.name} preview`} className="w-full h-full object-cover"/>
                        ) : (
                            <div className="w-full h-full bg-background flex items-center justify-center">
                                <p className="text-text-muted text-sm">No Preview Available</p>
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <h4 className="text-lg font-bold text-white">{hoveredGame.name}</h4>
                            <p className="text-xs text-text-muted">{hoveredGame.description}</p>
                        </div>
                        <button onClick={() => onGameSelect(hoveredGame.name)} className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// Specific content for 'Casino' dropdown
const CasinoContent = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Casino Games</h3>
                <div className="space-y-2">
                    {CASINO_LINKS.categories.map(link => (
                        <DropdownCard key={link.name}>
                            {/* Icons can be added here */}
                            <span>{link.name}</span>
                        </DropdownCard>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Providers</h3>
                <div className="grid grid-cols-2 gap-2">
                    {CASINO_LINKS.providers.map(link => (
                        <DropdownCard key={link.name}>
                             <span>{link.name}</span>
                        </DropdownCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Generic content for simple link lists
const LinkListContent: React.FC<{ title: string; links: DropdownLink[]; columns?: number }> = ({ title, links, columns = 1 }) => (
    <div>
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">{title}</h3>
        <div className={`grid gap-2 grid-cols-${columns}`}>
            {links.map(link => (
                <DropdownCard key={link.name}>
                    {link.icon && <span>{link.icon}</span>}
                    <span>{link.name}</span>
                </DropdownCard>
            ))}
        </div>
    </div>
);


export const NavDropdown: React.FC<{ activeMenu: string | null; onGameSelect: (gameName: string) => void; }> = ({ activeMenu, onGameSelect }) => {
    
    const renderContent = () => {
        switch (activeMenu) {
            case 'Originals': return <OriginalsContent onGameSelect={onGameSelect} />;
            case 'Casino': return <CasinoContent />;
            case 'Sports': return <LinkListContent title="Sports" links={SPORTS_LINKS} />;
            case 'Support': return <LinkListContent title="Support" links={SUPPORT_LINKS} columns={2}/>;
            case 'Rewards': return <LinkListContent title="Rewards" links={REWARDS_LINKS} />;
            default: return null;
        }
    };

    const content = renderContent();

    return (
        <div className={`absolute top-full left-0 right-0 z-[-1] transition-all duration-300 ease-in-out ${activeMenu && content ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
            <div className="bg-card-bg border-b border-outline shadow-2xl">
                <div className="max-w-[1600px] mx-auto px-8 py-8">
                    {content}
                </div>
            </div>
        </div>
    );
};