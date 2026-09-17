import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Shield, 
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { TOURNAMENTS } from './data/tournaments';
import { Tournament, TournamentCategory, RegistrationFormData, RegistrationRecord, PASS_EXPIRATION_MS } from './types';
import { filterActivePasses, ensurePassTimestamps } from './utils/passExpiration';
import { Navbar } from './components/Navbar';
import { TournamentNavigation } from './components/TournamentNavigation';
import { RegistrationFormModal } from './components/RegistrationFormModal';
import { RegistrationTicket } from './components/RegistrationTicket';
import { RulesSlideOver } from './components/RulesSlideOver';

const STORAGE_KEY = 'efootball_tournament_registrations_v2';

export default function App() {
  const [tournaments, setTournaments] = useState<Tournament[]>(TOURNAMENTS);
  const [selectedCategory, setSelectedCategory] = useState<TournamentCategory>('1vs1');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  
  // Set default stadium neon-pitch theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'neon-pitch');
  }, []);

  // Registration flow state
  const [activeTournamentForRegistration, setActiveTournamentForRegistration] = useState<Tournament | null>(null);
  const [isPassesModalOpen, setIsPassesModalOpen] = useState(false);
  const [latestRegisteredId, setLatestRegisteredId] = useState<string | null>(null);
  const [registeredRecords, setRegisteredRecords] = useState<RegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed: RegistrationRecord[] = JSON.parse(saved);
      const withTimestamps = parsed.map(ensurePassTimestamps);
      return filterActivePasses(withTimestamps);
    } catch {
      return [];
    }
  });

  // Automatically check and expire passes exceeding 12 hours
  useEffect(() => {
    const purgeExpiredPasses = () => {
      setRegisteredRecords((prev) => {
        const active = filterActivePasses(prev);
        if (active.length !== prev.length) {
          return active;
        }
        return prev;
      });
    };

    purgeExpiredPasses();
    const interval = setInterval(purgeExpiredPasses, 30000);
    return () => clearInterval(interval);
  }, []);

  // Save registrations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredRecords));
    } catch (e) {
      console.error('Failed to save registrations', e);
    }
  }, [registeredRecords]);

  // Sync filled slots in tournament state
  useEffect(() => {
    setTournaments((prevTournaments) => {
      return prevTournaments.map((t) => {
        const matchingRegistrations = registeredRecords.filter((r) => r.tournamentId === t.id);
        const baseFilled = TOURNAMENTS.find((orig) => orig.id === t.id)?.filledSlots || 0;
        return {
          ...t,
          filledSlots: Math.min(t.totalSlots, baseFilled + matchingRegistrations.length),
        };
      });
    });
  }, [registeredRecords]);

  // Handle clicking a tournament to open the registration form (always opens fresh registration)
  const handleSelectTournament = (tournament: Tournament) => {
    setActiveTournamentForRegistration(tournament);
  };

  // Handle cancelling a pass
  const handleCancelRegistration = (id: string) => {
    const rec = registeredRecords.find((r) => r.id === id);
    if (rec) {
      setTournaments((prev) =>
        prev.map((t) =>
          t.id === rec.tournamentId
            ? { ...t, filledSlots: Math.max(0, t.filledSlots - 1) }
            : t
        )
      );
    }
    const updated = registeredRecords.filter((r) => r.id !== id);
    setRegisteredRecords(updated);
    if (updated.length === 0) {
      setIsPassesModalOpen(false);
    }
  };

  // Handle submission of the registration form
  const handleFormSubmit = (formData: RegistrationFormData) => {
    if (!activeTournamentForRegistration) return;

    const t = activeTournamentForRegistration;
    const registrationId = `PES-${t.type === '1vs1' ? '1V1' : 'MEGA'}-${Math.floor(10000 + Math.random() * 90000)}`;

    const now = Date.now();
    const newRecord: RegistrationRecord = {
      id: registrationId,
      tournamentId: t.id,
      tournamentTitle: t.title,
      tournamentType: t.type,
      entryFee: t.entryFee,
      formData: {
        ...formData,
        entryFee: t.entryFee,
      },
      slotNumber: t.filledSlots + 1,
      registeredAt: new Date(now).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      createdAtTimestamp: now,
      expiresAtTimestamp: now + PASS_EXPIRATION_MS,
      status: 'Confirmed',
    };

    setRegisteredRecords((prev) => [newRecord, ...prev]);
    setLatestRegisteredId(newRecord.id);
    setActiveTournamentForRegistration(null);
    setIsPassesModalOpen(true);
  };

  return (
    <div 
      className="min-h-screen text-gray-200 flex flex-col transition-colors duration-300 stadium-canvas"
    >
      {/* Top Mobile Navbar with brand and Passes button */}
      <Navbar 
        passesCount={registeredRecords.length}
        onViewPasses={() => {
          if (registeredRecords.length > 0) {
            setIsPassesModalOpen(true);
          }
        }}
      />

      {/* Main Container - Optimized for Android Mobile Viewport */}
      <main className="flex-1 w-full max-w-md md:max-w-4xl mx-auto px-4 py-4 md:py-6 space-y-4">
        {/* Minimalist Android Bento Hero Panel with aesthetic stadium styling */}
        <section 
          className="border rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-300 card-aesthetic"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Subtle tactical ambient glow behind title */}
          <div 
            className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />

          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-1.5 h-4 rounded-full shadow-[0_0_8px_var(--theme-accent)] transition-colors duration-300"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                />
                <span 
                  className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 transition-colors duration-300"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  <Smartphone className="w-3 h-3" />
                  eFootball Mobile Series 2026
                </span>
              </div>

              {/* Official Rules quick trigger button */}
              <button
                type="button"
                id="btn-hero-rules"
                onClick={() => setIsRulesModalOpen(true)}
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 cursor-pointer hover:border-[var(--theme-accent)] transition-all active:scale-95"
                style={{
                  backgroundColor: 'var(--theme-card-subtle)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-accent)',
                }}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Official Rules</span>
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-black italic text-white tracking-tight font-display uppercase">
              PES MASTER Tournament Hub
            </h1>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              Official competitive registration for <strong className="text-white">1 VS 1</strong> Duels and <strong className="text-white">Mega Tournaments</strong>. Real-time slot allocation & verified UPI payouts.
            </p>

            {/* Quick Bento chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-gray-300 font-bold uppercase tracking-wider">
              <span 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border card-aesthetic"
                style={{
                  backgroundColor: 'var(--theme-card-subtle)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <Shield className="w-3 h-3" style={{ color: 'var(--theme-accent)' }} />
                Anti-Cheat & Fair Play
              </span>
              <span 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border card-aesthetic"
                style={{
                  backgroundColor: 'var(--theme-card-subtle)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <Trophy className="w-3 h-3" style={{ color: 'var(--theme-accent)' }} />
                Instant Room ID & Verification
              </span>
            </div>

            {registeredRecords.length > 0 && (
              <div 
                className="pt-2.5 mt-2 flex items-center justify-between border-t border-dashed"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <span className="text-[11px] text-gray-300 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--theme-accent)' }} />
                  {registeredRecords.length} Confirmed Pass{registeredRecords.length > 1 ? 'es' : ''}
                </span>
                <button
                  type="button"
                  id="btn-view-all-passes"
                  onClick={() => setIsPassesModalOpen(true)}
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-accent)',
                  }}
                  className="px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider hover:border-[var(--theme-accent)] transition-colors cursor-pointer"
                >
                  View Passes ({registeredRecords.length})
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Direct Tournament Selection */}
        <div className="space-y-4" id="tournaments-navigation">
          <TournamentNavigation
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            tournaments={tournaments}
            onSelectTournament={handleSelectTournament}
            registeredTournamentIds={registeredRecords.map((r) => r.tournamentId)}
          />
        </div>

        {/* 100% Genuine and Trusted Trust Banner at the end of front page */}
        <div 
          className="mt-6 p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-colors duration-200"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                color: '#10B981',
              }}
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-xs text-white">
                <span>100% Genuine and Trusted</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Official PES Master match rooms, fair play verified & transparent prize distribution
              </p>
            </div>
          </div>
          <span 
            className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shrink-0 text-emerald-400"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderColor: 'rgba(16, 185, 129, 0.25)',
            }}
          >
            Verified Hub
          </span>
        </div>
      </main>

      {/* Slide-over Rules Drawer */}
      <RulesSlideOver
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />

      {/* Registration Form Modal (appears immediately when any option is clicked) */}
      {activeTournamentForRegistration && (
        <RegistrationFormModal
          tournament={activeTournamentForRegistration}
          isOpen={!!activeTournamentForRegistration}
          onClose={() => setActiveTournamentForRegistration(null)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Passes Modal (all passes shown in 3 lines, not big voucher type) */}
      {isPassesModalOpen && (
        <RegistrationTicket
          records={registeredRecords}
          latestRecordId={latestRegisteredId}
          onClose={() => setIsPassesModalOpen(false)}
          onCancelRegistration={handleCancelRegistration}
          onRegisterAgain={() => {
            setIsPassesModalOpen(false);
            const el = document.getElementById('tournaments-navigation');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Minimalist Bento Mobile Footer */}
      <footer 
        className="mt-auto border-t py-4 px-4 text-[11px] text-gray-500 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--theme-bg)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="max-w-md md:max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>100% Genuine and Trusted</span>
          </div>
          <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
            PES MASTER Tournament Hub
          </span>
        </div>
      </footer>
    </div>
  );
}
