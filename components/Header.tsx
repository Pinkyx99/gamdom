



import React, { useState } from 'react';
import { NAV_ITEMS, TOP_NAV_LINKS } from '../constants';
import { LogoIcon } from './icons';
import { NavItem, Profile, ProfileLink } from '../types';
import { NavDropdown } from './NavDropdown';
import { Wallet } from './Wallet';
import { Session } from '@supabase/supabase-js';
import { ProfileDropdown } from './ProfileDropdown';
import { supabase } from '../lib/supabaseClient';

// FIX: Add 'roulette-info' to View type to match App.tsx and fix navigation type errors.
type View = 'home' | 'crash' | 'mines' | 'roulette' | 'roulette-info' | 'rewards' | ProfileLink['name'];

interface HeaderProps {
  session: Session | null;
  profile: Profile | null;
  onWalletButtonClick: () => void;
  onMenuClick: () => void;
  onSignInClick: () => void;
  onCreateAccountClick: () => void;
  onNavigate: (view: View) => void;
  onGameSelect: (gameName: string) => void;
  currentView: View;
}

export const Header: React.FC<HeaderProps> = ({ session, profile, onWalletButtonClick, onMenuClick, onSignInClick, onCreateAccountClick, onNavigate, onGameSelect, currentView }) => {
  const [navItems, setNavItems] = useState<NavItem[]>(NAV_ITEMS);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isGamePage = ['crash', 'mines', 'roulette'].includes(currentView);
  const isProfilePage = !['home', 'crash', 'mines', 'roulette', 'roulette-info', 'rewards'].includes(currentView);


  const handleNavClick = (clickedItem: NavItem) => {
    if (clickedItem.name === 'Originals') {
        onNavigate('home');
    } else if (clickedItem.name === 'Rewards') {
        onNavigate('rewards');
    }
    // Add navigation for other main tabs if needed
    setNavItems(navItems.map(item => ({ ...item, active: item.name === clickedItem.name })));
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigate('home');
  };

  return (
    <div className="bg-card-bg/80 backdrop-blur-sm sticky top-0 z-30">
        {/* Top Bar */}
        <div className="border-b border-outline">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
                 <div className="flex items-center space-x-4">
                    {TOP_NAV_LINKS.map(link => (
                        <a key={link} href="#" className="text-xs text-text-muted hover:text-white transition-colors">{link}</a>
                    ))}
                 </div>
                 {/* Placeholder for other top bar items like language selector */}
            </div>
        </div>
      <header
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="border-b border-outline">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left Side */}
              <div className="flex items-center space-x-8">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center space-x-2 flex-shrink-0" aria-label="Gamdom Home">
                  <img src="https://i.imgur.com/h7dzwkI.png" alt="Gamdom Logo" className="h-8 w-8" />
                  <span className="font-sans font-extrabold text-2xl text-white tracking-tighter">Gamdom</span>
                </a>
                <nav className="hidden md:flex space-x-1">
                  {navItems.map((item) => {
                    const isActive = (item.name === 'Originals' && (isGamePage || currentView === 'home')) || (item.name === 'Rewards' && currentView === 'rewards') || (item.active && !isProfilePage && !isGamePage && currentView !== 'rewards');
                    return (
                        <div
                        key={item.name}
                        onMouseEnter={() => {
                            if (!isProfilePage) {
                            setActiveMenu(item.name);
                            }
                        }}
                        className="relative"
                        >
                        <a
                            href={item.href}
                            onClick={(e) => { e.preventDefault(); handleNavClick(item) }}
                            className={`flex items-center h-16 text-sm font-medium transition-colors px-3 ${
                            isActive ? 'text-white' : 'text-text-muted hover:text-white'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                        {isActive && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-accent-green rounded-full"></span>
                        )}
                        </div>
                    );
                   })}
                </nav>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center justify-center w-40 h-10 bg-center bg-no-repeat bg-contain" style={{backgroundImage: "url('https://gamdom.com/build/king-of-the-hill-logo.93e35189e4.svg')"}}>
                    {/* King of the Hill */}
                </div>
                
                {session ? (
                  <>
                    <Wallet onWalletButtonClick={onWalletButtonClick} balance={profile?.balance ?? 0} />
                    <button className="p-1.5 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition" aria-label="Notifications" onClick={() => onNavigate('Notifications')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </button>
                    <ProfileDropdown
                      profile={profile}
                      onNavigate={(page) => onNavigate(page)}
                      onLogout={handleLogout}
                    />
                  </>
                ) : (
                   <div className="flex items-center space-x-2">
                        <button onClick={onSignInClick} className="px-5 py-2 rounded-md text-white font-semibold text-sm transition bg-white/10 hover:bg-white/20">
                            Sign In
                        </button>
                        <button onClick={onCreateAccountClick} className="bg-accent-green text-white font-semibold px-5 py-2 rounded-md text-sm transition-transform duration-200 hover:scale-105">
                            Create Account
                        </button>
                   </div>
                )}
                
                {/* Mobile Menu / Chat Toggle */}
                <button onClick={onMenuClick} className="p-2 rounded-md text-text-muted hover:text-white hover:bg-white/10 transition xl:hidden" aria-label="Open chat">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <NavDropdown activeMenu={activeMenu} onGameSelect={onGameSelect} />
      </header>
    </div>
  );
};