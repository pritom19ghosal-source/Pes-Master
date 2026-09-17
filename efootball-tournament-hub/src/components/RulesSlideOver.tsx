import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Wifi, 
  Camera, 
  Check, 
  AlertTriangle, 
  Trophy, 
  ChevronRight,
  Search
} from 'lucide-react';

interface RulesSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesSlideOver: React.FC<RulesSlideOverProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('all');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const rulesList = [
    {
      id: 'settings',
      category: 'settings',
      title: '1. Standard Match Room Settings',
      badge: 'Game Mode',
      icon: <Check className="w-4 h-4 text-emerald-400" />,
      highlight: '6 Mins • Penalty ON • No Extra Time',
      points: [
        'Match Timing: 6 Minutes with Penalty Shootout (PK). Extra Time: OFF (No extra time).',
        'Player Condition: Normal (Balanced form rating). Player Injuries: OFF.',
        'Platform: eFootball 2026 Mobile for Android Touch controls.',
      ],
    },
    {
      id: 'connection',
      category: 'fairplay',
      title: '2. Latency & Connection Protocol',
      badge: 'Connectivity',
      icon: <Wifi className="w-4 h-4 text-cyan-400" />,
      highlight: 'Stable 4G/5G or Wi-Fi Required',
      points: [
        'Both participants must play over high-speed Wi-Fi or low-latency 4G/5G mobile connection.',
        'Please close heavy background applications (YouTube, downloads, VPNs) prior to entering match room.',
        'If significant lag (ping > 150ms) occurs in the opening 2 minutes (0-0 score), players may agree to re-host.',
      ],
    },
    {
      id: 'screenshots',
      category: 'screenshot',
      title: '3. Screenshot Verification on WhatsApp',
      badge: 'Proof of Win',
      icon: <Camera className="w-4 h-4 text-amber-400" />,
      highlight: 'Submit within 10 minutes of match end',
      points: [
        'Immediately after the referee final whistle, capture full-screen screenshots of the Final Score screen.',
        'Only the winner must send the screenshot to the official Tournament WhatsApp coordinator.',
        'Keep match summary stats (possession, total shots) captured in case of any dispute or score ambiguity.',
        'Unverified claims without valid screenshot evidence cannot be awarded points or winnings.',
      ],
    },
    {
      id: 'disconnections',
      category: 'fairplay',
      title: '4. Disconnections & Forfeit Penalties',
      badge: 'Strict Enforcement',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      highlight: 'Rage quitting = Automatic 3-0 DQ',
      points: [
        'Deliberate force-closing of the app or rage-quitting results in an immediate 3-0 forfeit loss.',
        'Accidental phone restart or network drop during the 1st half: Match is re-played with remaining time & current score.',
        'Disconnection after the 75th minute: Current match score stands as final unless coordinator grants replay.',
        'Toxic conduct, abusive messages, or insulting opponents in chat leads to permanent player ban.',
      ],
    },
    {
      id: 'prizes',
      category: 'prizes',
      title: '5. Cash Prizes & Instant Distribution',
      badge: 'Payouts',
      icon: <Trophy className="w-4 h-4 text-yellow-400" />,
      highlight: 'UPI & Instant Pay out',
      points: [
        '1 VS 1 Matches: Winner receives cash payout directly after match screenshot confirmation (e.g. ₹36, ₹55, ₹90, ₹185, ₹380, ₹900, ₹1,800).',
        'Mega Tournaments (32 & 64 Slots): Winner gets 1st prize (e.g. ₹1,000 / ₹2,000) and Runner-up gets 2nd prize (₹500 / ₹1,000).',
        'Payouts are distributed via UPI / GPay / PhonePe / Paytm directly to player contact provided at registration.',
        'Prize disbursement typically occurs within 15–30 minutes of official bracket completion.',
      ],
    },
    {
      id: 'refunds',
      category: 'prizes',
      title: '6. Opponent Readiness & Refund Policy',
      badge: '12h Refund',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      highlight: 'Guaranteed refund within 12 hours',
      points: [
        'If one opponent is ready but another opponent is not, then the registration money is refunded within 12 hrs.',
      ],
    },
  ];

  // Filter rules by search
  const filteredRules = rulesList.filter((rule) => {
    return (
      searchQuery.trim() === '' ||
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rule.badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside 
        id="drawer-tournament-rules"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md md:max-w-lg shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--theme-card)',
          borderLeft: '1px solid var(--theme-border)',
        }}
        role="dialog"
        aria-label="Official Tournament Rules Drawer"
      >
        {/* Header */}
        <div 
          className="p-4 sm:p-5 border-b flex items-center justify-between shrink-0"
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-black"
              style={{
                backgroundColor: 'var(--theme-accent)',
                boxShadow: '0 0 12px var(--theme-accent-glow)',
              }}
            >
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase text-white font-display tracking-tight flex items-center gap-1.5">
                Official Rules & Regulations
              </h2>
              <p className="text-[11px] text-gray-400">
                eFootball Mobile Competitive Play
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-rules-drawer"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
            style={{
              backgroundColor: 'var(--theme-card-subtle)',
              borderColor: 'var(--theme-border)',
            }}
            aria-label="Close rules panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search */}
        <div 
          className="px-4 py-2 border-b shrink-0 flex items-center gap-2"
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <input 
            type="text"
            placeholder="Filter rules (e.g. Penalty, 6 Mins, Disconnect, UPI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              className="text-[10px] text-gray-400 hover:text-white uppercase font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Scrollable Rules Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 text-xs">
          {filteredRules.length === 0 ? (
            <div className="py-12 text-center text-gray-400 space-y-2">
              <AlertTriangle className="w-8 h-8 mx-auto text-gray-500" />
              <p className="text-xs font-bold">No rules matched &quot;{searchQuery}&quot;</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold underline"
                style={{ color: 'var(--theme-accent)' }}
              >
                Reset filter
              </button>
            </div>
          ) : (
            filteredRules.map((rule) => {
              const isExpanded = expandedSection === 'all' || expandedSection === rule.id;

              return (
                <div 
                  key={rule.id}
                  className="rounded-xl border transition-all duration-200 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                  }}
                >
                  {/* Rule Header Bar */}
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedSection(prev => prev === rule.id ? null : rule.id);
                    }}
                    className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--theme-bg)',
                          borderColor: 'var(--theme-border)',
                        }}
                      >
                        {rule.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs text-white uppercase tracking-tight font-display">
                            {rule.title}
                          </span>
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border hidden xs:inline"
                            style={{
                              backgroundColor: 'var(--theme-bg)',
                              color: 'var(--theme-accent)',
                              borderColor: 'var(--theme-border)',
                            }}
                          >
                            {rule.badge}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-0.5 font-medium">
                          {rule.highlight}
                        </span>
                      </div>
                    </div>

                    <ChevronRight 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                        isExpanded ? 'rotate-90 text-white' : ''
                      }`} 
                    />
                  </button>

                  {/* Rule Bullet Points */}
                  {isExpanded && (
                    <div 
                      className="px-3.5 pb-3.5 pt-1 border-t space-y-1.5 text-[11px] animate-in fade-in duration-150"
                      style={{ borderColor: 'var(--theme-border)' }}
                    >
                      <ul className="space-y-1.5 text-gray-300">
                        {rule.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                            <span 
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" 
                              style={{ backgroundColor: 'var(--theme-accent)' }}
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Bar */}
        <div 
          className="p-4 border-t flex items-center justify-between gap-3 shrink-0"
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="text-[10px] text-gray-400 leading-tight">
            <span>Questions? Ask coordinator on WhatsApp</span>
          </div>

          <button
            type="button"
            id="btn-confirm-rules-drawer"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl text-black font-black text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: 'var(--theme-accent)',
              boxShadow: '0 0 14px var(--theme-accent-glow)',
            }}
          >
            Understood
          </button>
        </div>
      </aside>
    </>
  );
};
