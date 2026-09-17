export type TournamentCategory = '1vs1' | 'mega';

export type ThemeId = 'neon-pitch' | 'champions-gold' | 'cyber-cyan' | 'crimson-strike' | 'tokyo-violet';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  accentHex: string;
  bgHex: string;
}

export const THEME_CONFIGS: ThemeConfig[] = [
  { id: 'neon-pitch', name: 'Pitch Volt', subtitle: 'Neon Stadium Turf', accentHex: '#00FF87', bgHex: '#050806' },
  { id: 'champions-gold', name: 'UCL Gold', subtitle: 'Champions Prestige', accentHex: '#FFC42C', bgHex: '#070604' },
  { id: 'cyber-cyan', name: 'Cyber Azure', subtitle: 'Laser Precision', accentHex: '#00E5FF', bgHex: '#04070D' },
  { id: 'crimson-strike', name: 'Crimson Fury', subtitle: 'High-Stakes Red', accentHex: '#FF2453', bgHex: '#080305' },
  { id: 'tokyo-violet', name: 'Tokyo Amethyst', subtitle: 'Cyber Ultraviolet', accentHex: '#BA5CFF', bgHex: '#06040B' },
];

export interface Tournament {
  id: string;
  title: string;
  type: '1vs1' | 'mega';
  typeLabel: string;
  badge: string;
  tagline: string;
  prizePool: string;
  entryFee: string;
  entryFeeAmount?: number;
  winningAmount?: number;
  winnerPrize?: number;
  runnerUpPrize?: number;
  totalSlots: number;
  filledSlots: number;
  startDate: string;
  scheduleTime: string;
  matchDuration: string;
  format: string;
  condition: string;
  platform: string;
  serverRegion: string;
  rules: string[];
}

export interface RegistrationFormData {
  name: string;
  teamName: string;
  gameId: string;
  whatsapp: string;
  gmail: string;
  entryFee?: string;
  deviceModel?: string;
  preferredRegion?: string;
}

export interface FormErrors {
  name?: string;
  teamName?: string;
  gameId?: string;
  whatsapp?: string;
  gmail?: string;
}

export const PASS_EXPIRATION_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

export interface RegistrationRecord {
  id: string;
  tournamentId: string;
  tournamentTitle: string;
  tournamentType: '1vs1' | 'mega';
  entryFee?: string;
  formData: RegistrationFormData;
  slotNumber: number;
  registeredAt: string;
  createdAtTimestamp?: number;
  expiresAtTimestamp?: number;
  status: 'Confirmed' | 'Verified' | 'Expired';
}
