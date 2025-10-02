// FIX: Import React to resolve 'Cannot find namespace 'React'' error.
import React from 'react';

export interface NavItem {
  name: string;
  href: string;
  active: boolean;
}

export interface HeroSlide {
  preTitle?: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  textColor: string;
}

export interface Category {
  title: string;
  cta: string;
  imageUrl: string;
  color: 'magenta' | 'green';
}

export interface OriginalGame {
  name:string;
  icon: React.ReactNode;
  rtp: string;
  color: string;
  previewImageUrl?: string;
  description?: string;
}

export interface Game {
  id: number;
  title: string;
  provider: string;
  thumbnailSrc: string;
  rtp: number;
  volatility: 'Low' | 'Medium' | 'High';
}

export interface ChatMessage {
  id: number;
  message: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
  }
}

export interface DropdownLink {
  name: string;
  icon?: React.ReactNode;
}

export interface Currency {
  name: string;
  code: string;
  icon: React.ReactNode;
  balance: string;
}

export interface BetCurrency {
    code: string;
}

export interface PaymentMethod {
  name: string;
  icon: React.ReactNode;
  tag?: 'New' | 'Low Fees' | '0% Fee';
  tagColor?: string;
}

export interface PaymentCategory {
  title: string;
  methods: PaymentMethod[];
}

export interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  balance: number;
  email: string;
}

export interface ProfileLink {
  name: 'Profile' | 'Notifications' | 'Statistics' | 'Affiliates' | 'Privacy' | 'Verification' | 'Settings' | 'Transactions' | 'Connections' | 'Log out';
  icon: React.ReactNode;
}

// Types for the Crash Game
// FIX: Centralize the GameState type for the Crash game to ensure consistency across components.
export type GameState = 'connecting' | 'waiting' | 'running' | 'crashed' | 'resetting';

export interface CrashRound {
    id: string;
    status: 'waiting' | 'running' | 'crashed';
    crash_point: number | null;
    created_at: string;
    started_at: string | null;
    ended_at: string | null;
    server_seed?: string;
    public_seed?: string;
}

export interface CrashBet {
  id: string;
  user_id: string;
  round_id: string;
  bet_amount: number;
  cashout_multiplier: number | null;
  auto_cashout_at?: number;
  profit?: number;
  profiles: {
    username: string;
    avatar_url: string;
  }
}

export interface CrashHistoryItem {
    multiplier: number;
}

export interface CashoutEvent {
    id: string;
    userId: string;
    betAmount: number;
    cashoutMultiplier: number;
    profit: number;
    username: string;
    avatarUrl: string;
}

// Types for Roulette Game
export type RouletteColor = 'red' | 'green' | 'black';
export type RouletteGameState = 'waiting' | 'spinning' | 'finished';

export interface RouletteRound {
    id: string;
    status: RouletteGameState;
    winning_number: number | null;
    created_at: string;
    spun_at: string | null;
    ended_at: string | null;
}

export interface RouletteBet {
    id: string;
    user_id: string;
    round_id: string;
    bet_amount: number;
    bet_color: RouletteColor;
    profit: number | null;
    profiles: {
        username: string;
        avatar_url: string;
    };
}

export interface RouletteHistoryItem {
    winning_number: number;
}