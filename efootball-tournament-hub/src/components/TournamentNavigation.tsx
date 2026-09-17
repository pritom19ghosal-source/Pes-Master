import React from 'react';
import { User, Users, ChevronRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { Tournament, TournamentCategory } from '../types';

export interface TierOption {
  fee: number;
  win: number;
  label: string;
}

export const ONE_VS_ONE_TIERS: TierOption[] = [
  { fee: 20, win: 36, label: 'Entry ₹20 • Win ₹36' },
  { fee: 30, win: 55, label: 'Entry ₹30 • Win ₹55' },
  { fee: 50, win: 90, label: 'Entry ₹50 • Win ₹90' },
  { fee: 100, win: 185, label: 'Entry ₹100 • Win ₹185' },
  { fee: 200, win: 380, label: 'Entry ₹200 • Win ₹380' },
  { fee: 500, win: 900, label: 'Entry ₹500 • Win ₹900' },
  { fee: 1000, win: 1800, label: 'Entry ₹1000 • Win ₹1800' },
];

interface TournamentNavigationProps {
  selectedCategory: TournamentCategory;
  onSelectCategory: (category: TournamentCategory) => void;
  tournaments: Tournament[];
  onSelectTournament: (tournament: Tournament) => void;
  registeredTournamentIds: string[];
}

export const TournamentNavigation: React.FC<TournamentNavigationProps> = ({
  selectedCategory,
  onSelectCategory,
  tournaments,
  onSelectTournament,
  registeredTournamentIds,
}) => {
  const oneVsOneTournaments = tournaments.filter((t) => t.type === '1vs1');

  return (
    <div className="w-full space-y-4">
      {/* Tournament Type Selector: ONLY 1 Vs 1 and Mega Tournament */}
      <div className="grid grid-cols-2 gap-3">
        {/* Option 1: 1 VS 1 */}
        <button
          type="button"
          id="select-type-1vs1"
          onClick={() => onSelectCategory('1vs1')}
          style={{
            backgroundColor: selectedCategory === '1vs1' ? 'var(--theme-accent)' : 'var(--theme-card)',
            borderColor: selectedCategory === '1vs1' ? 'transparent' : 'var(--theme-border)',
            color: selectedCategory === '1vs1' ? '#000000' : '#E5E7EB',
            boxShadow: selectedCategory === '1vs1' ? '0 0 24px var(--theme-accent-glow)' : 'none',
          }}
          className="p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between text-left min-h-[96px] cursor-pointer hover:border-[var(--theme-accent)] card-aesthetic active:scale-[0.98]"
        >
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-[10px] uppercase tracking-wider font-black ${
                selectedCategory === '1vs1' ? 'text-black/80' : 'text-gray-400'
              }`}
            >
              Head-to-Head
            </span>
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
              style={{
                backgroundColor: selectedCategory === '1vs1' ? 'rgba(0,0,0,0.15)' : 'var(--theme-bg)',
                color: selectedCategory === '1vs1' ? '#000000' : 'var(--theme-accent)',
              }}
            >
              <User className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div
              className={`text-base sm:text-lg font-black italic uppercase tracking-tight leading-tight ${
                selectedCategory === '1vs1' ? 'text-black' : 'text-white'
              }`}
            >
              1 VS 1
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
              style={{
                color: selectedCategory === '1vs1' ? 'rgba(0,0,0,0.8)' : 'var(--theme-accent)',
              }}
            >
              7 Tiers (₹20 – ₹1000)
            </div>
          </div>
        </button>

        {/* Option 2: Mega Tourny */}
        <button
          type="button"
          id="select-type-mega"
          onClick={() => onSelectCategory('mega')}
          style={{
            backgroundColor: selectedCategory === 'mega' ? 'var(--theme-accent)' : 'var(--theme-card)',
            borderColor: selectedCategory === 'mega' ? 'transparent' : 'var(--theme-border)',
            color: selectedCategory === 'mega' ? '#000000' : '#E5E7EB',
            boxShadow: selectedCategory === 'mega' ? '0 0 24px var(--theme-accent-glow)' : 'none',
          }}
          className="p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between text-left min-h-[96px] cursor-pointer hover:border-[var(--theme-accent)] card-aesthetic active:scale-[0.98]"
        >
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-[10px] uppercase tracking-wider font-black ${
                selectedCategory === 'mega' ? 'text-black/80' : 'text-gray-400'
              }`}
            >
              Coming Soon
            </span>
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
              style={{
                backgroundColor: selectedCategory === 'mega' ? 'rgba(0,0,0,0.15)' : 'var(--theme-bg)',
                color: selectedCategory === 'mega' ? '#000000' : 'var(--theme-accent)',
              }}
            >
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div
              className={`text-base sm:text-lg font-black italic uppercase tracking-tight leading-tight ${
                selectedCategory === 'mega' ? 'text-black' : 'text-white'
              }`}
            >
              Mega Tourny
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
              style={{
                color: selectedCategory === 'mega' ? 'rgba(0,0,0,0.8)' : 'var(--theme-accent)',
              }}
            >
              Coming Soon
            </div>
          </div>
        </button>
      </div>

      {/* When 1 VS 1 is active: Display the 7 Tiers */}
      {selectedCategory === '1vs1' && (
        <div 
          className="border rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in duration-150 card-aesthetic"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
              <span className="text-xs font-black uppercase tracking-wider text-white">
                1 VS 1 Match Tiers
              </span>
            </div>
            <span 
              className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--theme-badge-bg)',
                color: 'var(--theme-accent)',
                borderColor: 'var(--theme-badge-border)',
              }}
            >
              Select to register
            </span>
          </div>

          {/* 1 VS 1 Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ONE_VS_ONE_TIERS.map((tier) => {
              const matchingTournament = oneVsOneTournaments.find((t) => t.entryFeeAmount === tier.fee);
              const isRegistered = matchingTournament 
                ? registeredTournamentIds.includes(matchingTournament.id)
                : false;

              return (
                <button
                  key={tier.fee}
                  type="button"
                  id={`btn-tier-${tier.fee}`}
                  onClick={() => {
                    if (matchingTournament) {
                      onSelectTournament(matchingTournament);
                    }
                  }}
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: isRegistered ? 'var(--theme-accent)' : 'var(--theme-border)',
                  }}
                  className="group relative p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between min-h-[92px] cursor-pointer active:scale-[0.99] hover:border-[var(--theme-accent)] card-aesthetic"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Entry Fee
                    </span>
                    <span 
                      className="text-xs font-black px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: 'var(--theme-bg)',
                        color: 'var(--theme-accent)',
                        borderColor: 'var(--theme-border)',
                      }}
                    >
                      ₹{tier.fee}
                    </span>
                  </div>

                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">
                        Winning Amount
                      </span>
                      <span 
                        className="text-base sm:text-lg font-black tracking-tight font-display text-white transition-colors"
                      >
                        ₹{tier.win}
                      </span>
                    </div>

                    <div 
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-black text-[10px] font-black uppercase tracking-wider group-hover:brightness-110"
                      style={{
                        backgroundColor: 'var(--theme-accent)',
                        boxShadow: '0 0 12px var(--theme-accent-glow)',
                      }}
                    >
                      <span>Register</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* When Mega Tourny is active: Display Coming Soon */}
      {selectedCategory === 'mega' && (
        <div 
          className="border rounded-2xl p-8 sm:p-12 text-center space-y-4 animate-in fade-in duration-150"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div 
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border shadow-lg"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-accent)',
              color: 'var(--theme-accent)',
              boxShadow: '0 0 20px var(--theme-accent-glow)',
            }}
          >
            <Clock className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div className="space-y-1.5 max-w-sm mx-auto">
            <span 
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: 'var(--theme-badge-bg)',
                color: 'var(--theme-accent)',
                borderColor: 'var(--theme-badge-border)',
              }}
            >
              Coming Soon
            </span>
            <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white font-display tracking-tight pt-1">
              Coming Soon
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Mega Tournaments are coming soon. Stay tuned!
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              id="btn-switch-to-1v1"
              onClick={() => onSelectCategory('1vs1')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-black transition-all cursor-pointer hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: 'var(--theme-accent)',
                boxShadow: '0 0 12px var(--theme-accent-glow)',
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Play 1 VS 1 Matches</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

