import { ThemeConfig, ThemeId } from '../types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'cyber-cyan',
    name: 'Cyber Cyan',
    subtitle: 'eFootball 2026 Official Esports',
    accentHex: '#00E5FF',
    bgHex: '#06090F',
  },
  {
    id: 'champions-gold',
    name: 'Champions Gold',
    subtitle: 'Grand Finals & Trophy Edition',
    accentHex: '#FFB800',
    bgHex: '#090806',
  },
  {
    id: 'crimson-strike',
    name: 'Crimson Strike',
    subtitle: 'High-Stakes Knockout Red',
    accentHex: '#FF2453',
    bgHex: '#0A0507',
  },
  {
    id: 'neon-pitch',
    name: 'Neon Pitch',
    subtitle: 'Classic Stadium Floodlight',
    accentHex: '#00FF85',
    bgHex: '#08090B',
  },
];

export const DEFAULT_THEME: ThemeId = 'cyber-cyan';
