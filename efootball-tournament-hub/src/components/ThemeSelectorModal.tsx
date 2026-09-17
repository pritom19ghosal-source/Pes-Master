import React from 'react';
import { Palette, Check, X, Sparkles } from 'lucide-react';
import { THEMES } from '../data/themes';
import { ThemeId } from '../types';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-black max-h-[90vh] flex flex-col overflow-hidden border border-[var(--theme-border)]"
        style={{ backgroundColor: 'var(--theme-card)' }}
      >
        {/* Header */}
        <div 
          className="p-4 border-b border-[var(--theme-border)] flex items-center justify-between"
          style={{ backgroundColor: 'var(--theme-card-subtle)' }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-black"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase text-white font-display tracking-tight">
                Select Visual Theme
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Personalize your Tournament Interface
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/40 border border-[var(--theme-border)] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close theme selector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme List */}
        <div className="p-4 space-y-2.5 overflow-y-auto max-h-[60vh]">
          {THEMES.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onSelectTheme(t.id);
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[var(--theme-accent)] bg-black/40 shadow-[0_0_15px_var(--theme-accent-glow)]'
                    : 'border-[var(--theme-border)] bg-black/20 hover:border-gray-500 hover:bg-black/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Color preview circle */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/20"
                    style={{ backgroundColor: t.accentHex }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: t.bgHex }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black italic uppercase text-white font-display">
                        {t.name}
                      </span>
                      {isSelected && (
                        <span 
                          className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded text-black"
                          style={{ backgroundColor: t.accentHex }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      {t.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSelected ? (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-black"
                      style={{ backgroundColor: t.accentHex }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-gray-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div 
          className="p-3 border-t border-[var(--theme-border)] flex items-center justify-between text-[11px] text-gray-400"
          style={{ backgroundColor: 'var(--theme-card-subtle)' }}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            Applied across mobile app
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg text-black font-black uppercase text-[10px] tracking-wider cursor-pointer"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
