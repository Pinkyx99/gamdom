import { NavItem, HeroSlide, Category, OriginalGame, Game, DropdownLink, Currency, BetCurrency, PaymentCategory, ProfileLink, CrashHistoryItem, RewardCard, RoyaltyRank, RoyaltyTier } from './types';
import { 
    DiceIcon, HiloIcon, MinesIcon, CrashIcon, PlinkoIcon, RouletteIcon, KenoIcon,
    UsdIcon, BtcIcon, EthIcon, LtcIcon, TrxIcon, XrpIcon, DogeIcon, SolIcon,
    TetherIcon, UsdcIcon, BinanceIcon, CoinbaseIcon, OtherIcon, SwappedIcon, BankTransferIcon,
    SkinpayIcon, PaypalIcon, MastercardIcon, VisaIcon, ProfileIcon, BellIcon, ChartBarIcon,
    UsersIcon, ShieldCheckIcon, BadgeCheckIcon, CogIcon, SwitchHorizontalIcon, LinkIcon, LogoutIcon
} from './components/icons';
import React from 'react';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Originals', href: '#', active: true },
  { name: 'Casino', href: '#', active: false },
  { name: 'Sports', href: '#', active: false },
  { name: 'Support', href: '#', active: false },
  { name: 'Rewards', href: '#', active: false },
];

export const TOP_NAV_LINKS = ['Affiliates', 'Provably Fair', 'Blog', 'Promotions'];

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: '$1M\nat Bank!',
    subtitle: 'Receive additional rewards for your bets and be the New King Of The Hill',
    imageUrl: 'https://gamdom.com/build/koth.0d14afe454.700.webp',
    textColor: 'text-white'
  },
  {
    preTitle: 'Record RTP',
    title: 'Originals',
    subtitle: 'Higher RTP. Weekly reloads. Maximum returns.',
    imageUrl: 'https://gamdom.com/build/rtp-originals.ac29af6e89.700.webp',
    textColor: 'text-white'
  },
  {
    preTitle: '$100K Daily',
    title: 'King of the Hill',
    subtitle: '200 winners.\nFresh race every night.',
    imageUrl: 'https://gamdom.com/build/kothDaily.53d4400b2d.700.webp',
    textColor: 'text-white'
  }
];

export const CATEGORIES: Category[] = [
  {
    title: 'Casino',
    cta: 'Visit Casino',
    imageUrl: 'https://gamdom.com/build/Casino.02822880da.682.webp',
    color: 'magenta',
  },
  {
    title: 'Sport Betting',
    cta: 'Visit Sportbetting',
    imageUrl: 'https://gamdom.com/build/Sports.350c78e98f.682.webp',
    color: 'green'
  }
];

export const ORIGINAL_GAMES: OriginalGame[] = [
  { name: 'Keno', icon: React.createElement(KenoIcon), rtp: '99.90%', color: 'bg-cyan-500', description: 'Select your lucky numbers and win big.' },
  { name: 'Mines', icon: React.createElement(MinesIcon), rtp: '99.90%', color: 'bg-pink-500', previewImageUrl: 'https://i.imgur.com/pZYVTLE.png', description: 'Uncover gems, avoid the mines. Higher risk, higher reward.' },
  { name: 'Plinko', icon: React.createElement(PlinkoIcon), rtp: '99.90%', color: 'bg-green-500', previewImageUrl: 'https://i.imgur.com/24Ntr33.png', description: 'Drop the ball and watch it bounce to a multiplier.' },
  { name: 'Crash', icon: React.createElement(CrashIcon), rtp: '99.6%', color: 'bg-emerald-500', previewImageUrl: 'https://i.imgur.com/qcWBKLx.png', description: 'Cash out before the rocket crashes. How high can you go?' },
  { name: 'Roulette', icon: React.createElement(RouletteIcon), rtp: '99.3%', color: 'bg-red-500', previewImageUrl: 'https://i.imgur.com/4s2HSVI.png', description: 'Bet on your lucky color or number in this classic casino game.' },
  { name: 'Dice', icon: React.createElement(DiceIcon), rtp: '99.90%', color: 'bg-blue-500', previewImageUrl: 'https://i.imgur.com/cj3wahd.png', description: 'Predict if the roll will be over or under your chosen number.' },
  { name: 'Hilo', icon: React.createElement(HiloIcon), rtp: '99.6%', color: 'bg-amber-600', previewImageUrl: 'https://i.imgur.com/HuFmj3B.png', description: 'Guess if the next card will be higher or lower.' },
];

export const GAMES: Game[] = [
  { id: 1, title: 'Gates of Olympus', provider: 'Pragmatic Play', thumbnailSrc: 'https://picsum.photos/seed/game1/300/400', rtp: 96.5, volatility: 'High' },
  { id: 2, title: 'Sweet Bonanza', provider: 'Pragmatic Play', thumbnailSrc: 'https://picsum.photos/seed/game2/300/400', rtp: 96.48, volatility: 'Medium' },
  { id: 3, title: 'The Dog House', provider: 'Pragmatic Play', thumbnailSrc: 'https://picsum.photos/seed/game3/300/400', rtp: 96.51, volatility: 'High' },
  { id: 4, title: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', thumbnailSrc: 'https://picsum.photos/seed/game4/300/400', rtp: 96.38, volatility: 'High' },
  { id: 5, title: 'Book of Dead', provider: 'Play\'n GO', thumbnailSrc: 'https://picsum.photos/seed/game5/300/400', rtp: 96.21, volatility: 'High' },
  { id: 6, title: 'Reactoonz', provider: 'Play\'n GO', thumbnailSrc: 'https://picsum.photos/seed/game6/300/400', rtp: 96.51, volatility: 'High' },
  { id: 7, title: 'Money Train 2', provider: 'Relax Gaming', thumbnailSrc: 'https://picsum.photos/seed/game7/300/400', rtp: 96.4, volatility: 'High' },
  { id: 8, title: 'Jammin\' Jars 2', provider: 'Push Gaming', thumbnailSrc: 'https://picsum.photos/seed/game8/300/400', rtp: 96.4, volatility: 'High' },
];

export const CURRENCIES: Currency[] = [
    { name: 'US Dollar', code: 'USD', icon: React.createElement(UsdIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'Bitcoin', code: 'BTC', icon: React.createElement(BtcIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'Ethereum', code: 'ETH', icon: React.createElement(EthIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'Litecoin', code: 'LTC', icon: React.createElement(LtcIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'TRON', code: 'TRX', icon: React.createElement(TrxIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'Ripple', code: 'XRP', icon: React.createElement(XrpIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'Dogecoin', code: 'DOGE', icon: React.createElement(DogeIcon, {className: "w-5 h-5"}), balance: '0.00'},
    { name: 'Solana', code: 'SOL', icon: React.createElement(SolIcon, {className: "w-5 h-5"}), balance: '0.00'},
];

export const BET_CURRENCIES: BetCurrency[] = [
    { code: 'USD' }, { code: 'EUR' }, { code: 'RUB' },
    { code: 'JPY' }, { code: 'CAD' }, { code: 'KRW' },
    { code: 'TRY' }, { code: 'NGN' }, { code: 'NZD' },
    { code: 'PLN' }, { code: 'CZK' }, { code: 'INR' },
];

export const PAYMENT_CATEGORIES: PaymentCategory[] = [
    {
        title: 'Crypto',
        methods: [
            { name: 'Bitcoin', icon: React.createElement(BtcIcon, {className: "w-8 h-8"})},
            { name: 'Ethereum', icon: React.createElement(EthIcon, {className: "w-8 h-8"})},
            { name: 'Tether', icon: React.createElement(TetherIcon, {className: "w-8 h-8"})},
            { name: 'USDC', icon: React.createElement(UsdcIcon, {className: "w-8 h-8"})},
            { name: 'Litecoin', icon: React.createElement(LtcIcon, {className: "w-8 h-8"})},
            { name: 'TRON', icon: React.createElement(TrxIcon, {className: "w-8 h-8"})},
            { name: 'Ripple', icon: React.createElement(XrpIcon, {className: "w-8 h-8"})},
            { name: 'Doge', icon: React.createElement(DogeIcon, {className: "w-8 h-8"})},
            { name: 'Solana', icon: React.createElement(SolIcon, {className: "w-8 h-8"})},
        ]
    },
    {
        title: 'Exchanges & Wallets',
        methods: [
            { name: 'Binance', icon: React.createElement(BinanceIcon, {className: "w-8 h-8 rounded-md"}), tag: 'New', tagColor: 'text-green-400' },
            { name: 'Coinbase', icon: React.createElement(CoinbaseIcon, {className: "w-8 h-8 rounded-md"}), tag: 'New', tagColor: 'text-green-400' },
            { name: 'Other', icon: React.createElement(OtherIcon, {className: "w-8 h-8 rounded-md"}) },
        ]
    },
    {
        title: 'Bank Deposit',
        methods: [
            { name: 'Swapped', icon: React.createElement(SwappedIcon, {className: "w-8 h-8 rounded-md"}) },
            { name: 'Bank Transfer', icon: React.createElement(BankTransferIcon, {className: "w-8 h-8 rounded-md"}), tag: '0% Fee', tagColor: 'text-green-400' },
            { name: 'Skinpay', icon: React.createElement(SkinpayIcon, {className: "w-8 h-8 rounded-md"}) },
        ]
    },
    {
        title: 'Gift Cards',
        methods: [
            { name: 'Paypal', icon: React.createElement(PaypalIcon, {className: "w-8 h-8 rounded-md"}), tag: 'Low Fees', tagColor: 'text-yellow-400' },
            { name: 'MasterCard', icon: React.createElement(MastercardIcon, {className: "w-8 h-8 rounded-md"}) },
            { name: 'Visa', icon: React.createElement(VisaIcon, {className: "w-8 h-8 rounded-md"}) },
        ]
    }
]


// Data for Header Dropdowns
export const CASINO_LINKS: { categories: DropdownLink[]; providers: DropdownLink[] } = {
  categories: [
    { name: 'Slots' },
    { name: 'Live Games' },
    { name: 'Table Games' },
  ],
  providers: [
    { name: 'Gamdom Originals' },
    { name: 'Hacksaw Gaming' },
    { name: 'Pragmatic Play' },
    { name: 'Nolimit City' },
  ],
};

export const SPORTS_LINKS: DropdownLink[] = [
  { name: 'Sport Betting' },
  { name: 'eSports' },
  { name: 'Horse Racing' },
];

export const SUPPORT_LINKS: DropdownLink[] = [
  { name: 'Provably Fair' },
  { name: 'Contact Us' },
  { name: 'FAQ' },
  { name: 'Live Support' },
  { name: 'Responsible Gambling' },
];

export const REWARDS_LINKS: DropdownLink[] = [
  { name: 'Rewards' },
  { name: 'Promotions' },
];

// FIX: Replace JSX syntax with React.createElement in a .ts file to resolve parsing errors.
export const PROFILE_LINKS: ProfileLink[] = [
    { name: 'Profile', icon: React.createElement(ProfileIcon, { className: "w-5 h-5" }) },
    { name: 'Notifications', icon: React.createElement(BellIcon, { className: "w-5 h-5" }) },
    { name: 'Statistics', icon: React.createElement(ChartBarIcon, { className: "w-5 h-5" }) },
    { name: 'Affiliates', icon: React.createElement(UsersIcon, { className: "w-5 h-5" }) },
    { name: 'Privacy', icon: React.createElement(ShieldCheckIcon, { className: "w-5 h-5" }) },
    { name: 'Verification', icon: React.createElement(BadgeCheckIcon, { className: "w-5 h-5" }) },
    { name: 'Settings', icon: React.createElement(CogIcon, { className: "w-5 h-5" }) },
    { name: 'Transactions', icon: React.createElement(SwitchHorizontalIcon, { className: "w-5 h-5" }) },
    { name: 'Connections', icon: React.createElement(LinkIcon, { className: "w-5 h-5" }) },
    { name: 'Log out', icon: React.createElement(LogoutIcon, { className: "w-5 h-5" }) },
];

// Mock data for Crash Game History
export const CRASH_HISTORY: CrashHistoryItem[] = [
    { multiplier: 1.22 }, { multiplier: 3.50 }, { multiplier: 1.88 }, { multiplier: 1.35 }, { multiplier: 1.00 },
    { multiplier: 1.28 }, { multiplier: 1.62 }, { multiplier: 1.02 }, { multiplier: 1.79 }, { multiplier: 2.30 },
    { multiplier: 1.00 }, { multiplier: 1.75 }, { multiplier: 4.50 }, { multiplier: 1.15 }, { multiplier: 2.80 },
];

// Data for Rewards Page
export const REWARDS_HERO_SLIDES: HeroSlide[] = [
    { ...HERO_SLIDES[0] },
    { ...HERO_SLIDES[1] },
    { ...HERO_SLIDES[2] },
];

export const CLAIMABLE_REWARDS: RewardCard[] = [
    { title: 'Instant', reward: '$0.08', claimable: true, imageUrl: 'https://gamdom.com/build/instant.0c7f5c268a.304.png' },
    { title: 'Weekly', timeLeft: '6 Days Left', claimable: false, imageUrl: 'https://gamdom.com/build/weekly.68aa609174.304.png' },
    { title: 'Monthly', timeLeft: '25 Days Left', claimable: false, imageUrl: 'https://gamdom.com/build/monthly.79f7d25848.304.png' },
];

const TIERS: RoyaltyTier[] = ['Bronze', 'Silver', 'Gold', 'Emerald', 'Sapphire', 'Ruby', 'Diamond', 'Opal'];

export const ROYALTY_RANKS: RoyaltyRank[] = TIERS.flatMap((tier, tierIndex) => 
    [1, 2, 3].map((level, levelIndex) => {
        const rank: RoyaltyRank = {
            name: `${tier} ${level}`,
            tier,
            level,
            status: 'locked' // Default to locked
        };
        // Mock data logic: Set some ranks to claimed and one to unlocked
        if (tierIndex < 2) { // Bronze and Silver
            rank.status = 'claimed';
        } else if (tierIndex === 2 && levelIndex === 0) { // Gold 1
            rank.status = 'unlocked';
        }
        return rank;
    })
);