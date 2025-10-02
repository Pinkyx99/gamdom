import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 25 28"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M18.89 19.34C18.89 19.34 18.89 19.34 18.89 19.34C18.89 16.5 19.68 14.54 22.37 13.52V10.16C22.37 10.16 22.37 10.16 22.37 10.16C18.9 11.45 17.39 14.34 17.39 17.57C17.39 20.8 18.9 23.69 22.37 24.98V21.62C19.68 20.6 18.89 18.64 18.89 15.8V19.34Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.39 24.98V21.62C9.7 20.6 8.91 18.64 8.91 15.8V19.34C8.91 19.34 8.91 19.34 8.91 19.34C8.91 16.5 9.7 14.54 12.39 13.52V10.16C12.39 10.16 12.39 10.16 12.39 10.16C8.92 11.45 7.41 14.34 7.41 17.57C7.41 20.8 8.92 23.69 12.39 24.98Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M6.35 19.34H2.41V15.79H6.35V19.34Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M6.35 12.34H2.41V8.79H6.35V12.34Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.39 12.34H8.45V8.79H12.39V12.34Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M18.43 12.34H14.49V8.79H18.43V12.34Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.39 5.4H8.45V1.85H12.39V5.4Z" />
    </svg>
);


export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75 15H25C22.2386 15 20 17.2386 20 20V40C20 56.5685 33.4315 70 50 70C66.5685 70 80 56.5685 80 40V20C80 17.2386 77.7614 15 75 15Z" fill="url(#trophy-gold)"/>
        <path d="M50 70V85" stroke="#FFAA5B" strokeWidth="6" strokeLinecap="round"/>
        <path d="M35 90H65" stroke="#FFAA5B" strokeWidth="6" strokeLinecap="round"/>
        <path d="M20 35H15C12.2386 35 10 32.7614 10 30V25" stroke="#FFAA5B" strokeWidth="6" strokeLinecap="round"/>
        <path d="M80 35H85C87.7614 35 90 32.7614 90 30V25" stroke="#FFAA5B" strokeWidth="6" strokeLinecap="round"/>
        <defs>
            <linearGradient id="trophy-gold" x1="50" y1="15" x2="50" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD700"/>
            <stop offset="1" stopColor="#FFAA5B"/>
            </linearGradient>
        </defs>
    </svg>
);

export const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 80H85" stroke="url(#crown-base)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M20 80L35 30L50 50L65 30L80 80" fill="url(#crown-gold)"/>
        <circle cx="35" cy="30" r="5" fill="#E03DAE"/>
        <circle cx="50" cy="50" r="5" fill="#00C17B"/>
        <circle cx="65" cy="30" r="5" fill="#FFAA5B"/>
        <defs>
            <linearGradient id="crown-gold" x1="50" y1="30" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD700"/>
            <stop offset="1" stopColor="#FFAA5B"/>
            </linearGradient>
            <linearGradient id="crown-base" x1="15" y1="80" x2="85" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD700"/>
            <stop offset="1" stopColor="#FFAA5B"/>
            </linearGradient>
        </defs>
    </svg>
);

// Currency Icons
export const UsdIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>$</div>);
export const BtcIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>B</div>);
export const EthIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xs`}>E</div>);
export const LtcIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs`}>L</div>);
export const TrxIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs`}>T</div>);
export const XrpIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs`}>X</div>);
export const DogeIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>D</div>);
export const SolIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>S</div>);
export const TetherIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-xs`}>T</div>);
export const UsdcIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>U</div>);

// Payment Method Icons
export const BinanceIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-yellow-400`}></div>);
export const CoinbaseIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-blue-600`}></div>);
export const OtherIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-gray-500`}></div>);
export const SwappedIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-indigo-500`}></div>);
export const BankTransferIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-green-600`}></div>);
export const SkinpayIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-yellow-600`}></div>);
export const PaypalIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-blue-500`}></div>);
export const MastercardIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-red-500`}></div>);
export const VisaIcon: React.FC<{ className?: string }> = ({ className }) => (<div className={`${className} bg-indigo-700`}></div>);


// Social Icons
export const SteamIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.003 2.003c-5.52 0-9.996 4.476-9.996 9.996 0 5.52 4.476 9.996 9.996 9.996s9.996-4.476 9.996-9.996c0-5.52-4.476-9.996-9.996-9.996zm0 1.56c4.668 0 8.436 3.768 8.436 8.436 0 4.668-3.768 8.436-8.436 8.436-4.668 0-8.436-3.768-8.436-8.436 0-4.668 3.768-8.436 8.436-8.436zm4.704 4.152l-6.06 2.94-.012 3.864 1.86 1.092.012-2.916 3.408-1.632zm-3.12 3.6l-3.324 1.584.012 2.82 1.404.756.012-2.316 1.896-.9zm-1.836 2.052c-.492 0-.888.396-.888.888s.396.888.888.888.888-.396.888-.888-.396-.888-.888-.888zm-.012-1.704l-1.404-.684-2.22 1.08-1.128 2.292 2.376 1.152.012.012 1.344-.66.012-.012 2.22-1.08.012-.012 1.152-2.292-2.364-1.152z" />
    </svg>
);
export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);
export const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.09.034.22.033.288.005.14-.058.28-.094.416-.23.93-.99 3.73-1.256 4.96-.138.63-.39.86-.73.88-.63.02-1.12-.4-1.74-.82-.95-.64-1.49-1.04-2.4-1.68-.5-.34-.88-.52-1.1-.2-.23.32-.4.5-.56.65-.17.17-.32.2-.47.14-.23-.05-.4-.14-.54-.23-.2-.12-.4-.26-.54-.4-.18-.17-.35-.36-.45-.58-.1-.2-.04-.4.12-.58.12-.13.3-.28.3-.28s2.4-2.16 2.5-2.36c.1-.2.03-.4-.06-.5-.1-.1-.23-.15-.38-.15-.17 0-.42.06-.7.2l-2.9 1.83c-.23.16-.4.2-.6.1-.27-.1-.4-.23-.4-.4 0-.1.1-.27.28-.4s.4-.3.4-.3L8.5 7.8c.4-.14.7-.2 1.1-.2h.1c.1 0 .26.02.4.1l.4.15.2.1.2.14z" />
    </svg>
);


export const DiceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor"/>
    <circle cx="8" cy="8" r="1.5" fill="white"/>
    <circle cx="16" cy="16" r="1.5" fill="white"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
  </svg>
);

export const HiloIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12L12 20L20 12L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MinesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="currentColor"/>
    <path d="M12 2V5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9.17 6.00001L10.6 7.99001" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 9.17001L8 10.6000" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 12H2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16.2426 7.75735L14.1213 9.87867" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18L10 12L14 16L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 10H20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PlinkoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 20H20L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="15" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="15" r="1.5" fill="currentColor"/>
  </svg>
);

export const RouletteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M12 2V6" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 22V18" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 12H18" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const KenoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

// Profile Icons
export const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
export const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197" /></svg>
);
export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.611m8.618-3.04A12.02 12.02 0 0121 20.944a11.955 11.955 0 01-9-17.611" /></svg>
);
export const BadgeCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
);
export const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
export const SwitchHorizontalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
);
export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);
export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);
export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);