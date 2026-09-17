import React from 'react';
import { Ticket } from 'lucide-react';

interface NavbarProps {
  passesCount?: number;
  onViewPasses?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  passesCount,
  onViewPasses,
}) => {
  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 card-aesthetic"
      style={{ 
        backgroundColor: 'var(--theme-card)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="max-w-md md:max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 select-none shrink-0">
          <div 
            className="h-10 px-2 rounded-xl flex items-center justify-center gap-0.5 shadow-[0_0_20px_var(--theme-accent-glow)] transition-all duration-300"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            <span className="text-black font-black italic lowercase text-base leading-none tracking-tight font-display select-none -mr-0.5">
              e
            </span>
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-black shrink-0"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-label="Football Logo"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="12,7.5 15.8,10.2 14.4,14.8 9.6,14.8 8.2,10.2" strokeWidth="1.8" />
              <line x1="12" y1="7.5" x2="12" y2="2" strokeWidth="1.8" />
              <line x1="15.8" y1="10.2" x2="21.5" y2="8.8" strokeWidth="1.8" />
              <line x1="14.4" y1="14.8" x2="18.2" y2="19.8" strokeWidth="1.8" />
              <line x1="9.6" y1="14.8" x2="5.8" y2="19.8" strokeWidth="1.8" />
              <line x1="8.2" y1="10.2" x2="2.5" y2="8.8" strokeWidth="1.8" />
              <path d="M 8.2 3.2 L 12 2 L 15.8 3.2" strokeWidth="1.8" />
              <path d="M 21.5 8.8 L 21.8 14.2" strokeWidth="1.8" />
              <path d="M 18.2 19.8 L 12 22 L 5.8 19.8" strokeWidth="1.8" />
              <path d="M 2.5 8.8 L 2.2 14.2" strokeWidth="1.8" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black italic text-base tracking-tight text-white font-display uppercase">
                PES <span style={{ color: 'var(--theme-accent)' }}>MASTER</span>
              </span>
              <span 
                className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--theme-badge-bg)', 
                  color: 'var(--theme-accent)',
                  borderColor: 'var(--theme-badge-border)'
                }}
              >
                Mobile
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold leading-none mt-0.5">
              Tournament Hub
            </p>
          </div>
        </div>

        {/* Right side controls: Passes */}
        <div className="flex items-center gap-2">
          {/* Passes quick button */}
          {Boolean(passesCount && passesCount > 0 && onViewPasses) && (
            <button
              type="button"
              id="btn-nav-passes"
              onClick={onViewPasses}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer hover:border-[var(--theme-accent)] active:scale-95"
              style={{
                backgroundColor: 'var(--theme-badge-bg)',
                borderColor: 'var(--theme-badge-border)',
                color: 'var(--theme-accent)',
              }}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black uppercase tracking-wider">
                Passes ({passesCount})
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
