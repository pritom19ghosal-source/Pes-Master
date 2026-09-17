import React from 'react';
import { 
  Trophy, 
  Users, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Sparkles,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { Tournament } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
  onSelect: (tournament: Tournament) => void;
  isRegistered?: boolean;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onSelect,
  isRegistered = false,
}) => {
  const is1v1 = tournament.type === '1vs1';
  const percentageFilled = Math.round((tournament.filledSlots / tournament.totalSlots) * 100);
  const remainingSlots = tournament.totalSlots - tournament.filledSlots;

  return (
    <div
      id={`tournament-card-${tournament.id}`}
      onClick={() => onSelect(tournament)}
      className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-4 md:p-5 flex flex-col justify-between ${
        isRegistered
          ? 'bg-[#1A1D23] border-[#00FF85] shadow-[0_0_20px_rgba(0,255,133,0.2)]'
          : 'bg-[#1A1D23] hover:bg-[#1f232b] border-[#2D3139] hover:border-[#00FF85] shadow-sm'
      }`}
    >
      {/* Top badges & type */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
              <Sparkles className="w-3 h-3 text-[#00FF85]" />
              {tournament.typeLabel}
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0F1115] text-gray-400 border border-[#2D3139]">
              {tournament.badge}
            </span>
          </div>

          {isRegistered && (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#00FF85] bg-[#00FF85]/15 px-2.5 py-0.5 rounded-full border border-[#00FF85]/40 shadow-[0_0_10px_rgba(0,255,133,0.2)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF85]" />
              Locked
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base sm:text-lg font-black italic text-white group-hover:text-[#00FF85] transition-colors font-display tracking-tight uppercase">
          {tournament.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          {tournament.tagline}
        </p>

        {/* Bento Details Sub-Grid: Entry Fee & Winning Amount */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-[#2D3139] text-xs">
          {/* Entry Fee Tile */}
          <div className="flex items-center gap-2 bg-[#0F1115] p-2.5 rounded-xl border border-[#2D3139]">
            <div className="w-8 h-8 rounded-lg bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-black text-[#00FF85]">₹</span>
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Entry Fee</span>
              <span className="font-extrabold text-white truncate block text-xs">
                {tournament.entryFee}
              </span>
            </div>
          </div>

          {/* Winning Amount / Prize */}
          <div className="flex items-center gap-2 bg-[#0F1115] p-2.5 rounded-xl border border-[#2D3139]">
            <div className="w-8 h-8 rounded-lg bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5 text-[#00FF85]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Winning Amount</span>
              <span className="font-extrabold text-[#00FF85] truncate block text-xs">
                {tournament.prizePool}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule & Platform Specs */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-[#2D3139]/50 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>{tournament.startDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span>{tournament.matchDuration}</span>
          </span>
        </div>

        {/* Slots progress bar */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-400 flex items-center gap-1 font-medium">
              <Users className="w-3 h-3 text-gray-500" />
              Slots: <span className="text-white font-bold">{tournament.filledSlots} / {tournament.totalSlots}</span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${remainingSlots <= 8 ? 'text-amber-400' : 'text-[#00FF85]'}`}>
              {remainingSlots > 0 ? `${remainingSlots} slots remaining` : 'Tournament Full'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#0F1115] border border-[#2D3139] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all bg-[#00FF85] shadow-[0_0_8px_rgba(0,255,133,0.5)]"
              style={{ width: `${percentageFilled}%` }}
            />
          </div>
        </div>
      </div>

      {/* CTA Button - Bento electric neon touch-friendly */}
      <div className="mt-4 pt-3 border-t border-[#2D3139]">
        <button
          type="button"
          id={`btn-register-${tournament.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(tournament);
          }}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all min-h-[46px] bg-[#00FF85] hover:brightness-110 text-black shadow-[0_0_20px_rgba(0,255,133,0.3)] active:scale-[0.98] cursor-pointer"
        >
          <span>
            {tournament.entryFeeAmount 
              ? `Enter • ${tournament.entryFee} (Win ₹${tournament.winningAmount})`
              : `Register for Tournament • ${tournament.entryFee}`}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
