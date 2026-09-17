import React, { useState } from 'react';
import { 
  Ticket, 
  Trash2, 
  Copy, 
  Check, 
  MessageCircle, 
  User, 
  Shield, 
  Hash, 
  Phone, 
  PlusCircle,
  Sparkles,
  Clock
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { getPassTimeRemaining } from '../utils/passExpiration';

interface MyRegistrationsProps {
  records: RegistrationRecord[];
  onCancelRegistration: (id: string) => void;
  onBrowseTournaments: () => void;
  latestRecordId?: string | null;
}

export const MyRegistrations: React.FC<MyRegistrationsProps> = ({
  records,
  onCancelRegistration,
  onBrowseTournaments,
  latestRecordId,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getPassText = (rec: RegistrationRecord) => {
    const timeInfo = getPassTimeRemaining(rec);
    return `⚽ PES MASTER TOURNAMENT PASS ⚽
Tournament: ${rec.tournamentTitle} (${rec.tournamentType === '1vs1' ? '1 Vs 1 Solo' : 'Mega Tournament'})
Slot: #${rec.slotNumber} | Entry Fee: ${rec.entryFee || 'Free'}
Pass ID: ${rec.id}
Player: ${rec.formData.name}
Team: ${rec.formData.teamName}
eFootball Game ID: ${rec.formData.gameId}
WhatsApp: ${rec.formData.whatsapp}
Gmail: ${rec.formData.gmail}
Registered: ${rec.registeredAt}
Validity: 12 Hours (${timeInfo.displayText})`;
  };

  const handleCopy = (rec: RegistrationRecord) => {
    navigator.clipboard.writeText(getPassText(rec));
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (rec: RegistrationRecord) => {
    const encoded = encodeURIComponent(getPassText(rec));
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  if (records.length === 0) {
    return (
      <div 
        className="text-center py-8 px-4 space-y-3 rounded-2xl border"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div 
          className="w-10 h-10 rounded-xl border flex items-center justify-center mx-auto"
          style={{
            backgroundColor: 'var(--theme-badge-bg)',
            borderColor: 'var(--theme-badge-border)',
            color: 'var(--theme-accent)',
          }}
        >
          <Ticket className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-black italic uppercase text-white font-display">
            No Registered Passes
          </h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            You haven't registered for any tournament yet. Choose a tournament below to lock your slot!
          </p>
        </div>
        <button
          type="button"
          id="btn-empty-browse-tournaments"
          onClick={onBrowseTournaments}
          style={{
            backgroundColor: 'var(--theme-accent)',
            color: '#000000',
            boxShadow: '0 0 16px var(--theme-accent-glow)',
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl hover:brightness-110 font-black uppercase tracking-wider text-xs transition-all cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Browse Tournaments</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5" id="passes-container">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
          Tournament Passes ({records.length})
        </h3>
        <span 
          className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border"
          style={{
            backgroundColor: 'var(--theme-badge-bg)',
            borderColor: 'var(--theme-badge-border)',
            color: 'var(--theme-accent)',
          }}
        >
          Verified & Active
        </span>
      </div>

      <div className="space-y-2">
        {records.map((rec) => {
          const isLatest = latestRecordId === rec.id;
          const timeInfo = getPassTimeRemaining(rec);
          return (
            <div
              key={rec.id}
              className="p-3 rounded-xl border transition-all space-y-1.5"
              style={{
                backgroundColor: 'var(--theme-card-subtle)',
                borderColor: isLatest ? 'var(--theme-accent)' : 'var(--theme-border)',
                boxShadow: isLatest ? '0 0 16px var(--theme-accent-glow)' : undefined,
              }}
            >
              {/* LINE 1: Slot + Tournament Title + Entry Fee + Pass ID */}
              <div className="flex items-center justify-between gap-1.5 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span 
                    className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded shrink-0 border"
                    style={{
                      backgroundColor: 'var(--theme-badge-bg)',
                      color: 'var(--theme-accent)',
                      borderColor: 'var(--theme-badge-border)',
                    }}
                  >
                    Slot #{rec.slotNumber}
                  </span>
                  <h4 className="font-black italic uppercase text-white truncate text-xs sm:text-sm font-display">
                    {rec.tournamentTitle}
                  </h4>
                  <span 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 text-gray-300"
                    style={{
                      backgroundColor: 'var(--theme-bg)',
                      borderColor: 'var(--theme-border)',
                    }}
                  >
                    Fee: {rec.entryFee || 'Free'}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {isLatest && (
                    <span 
                      className="text-[8px] font-black uppercase px-1 py-0.2 rounded border hidden xs:inline"
                      style={{
                        backgroundColor: 'var(--theme-badge-bg)',
                        color: 'var(--theme-accent)',
                        borderColor: 'var(--theme-badge-border)',
                      }}
                    >
                      New
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">
                    {rec.id}
                  </span>
                </div>
              </div>

              {/* LINE 2: Player Name • Team Name • eFootball Game ID */}
              <div className="flex items-center gap-1.5 text-[11px] text-gray-300 truncate py-0.5">
                <span className="flex items-center gap-1 truncate font-semibold text-white">
                  <User className="w-3 h-3 shrink-0" style={{ color: 'var(--theme-accent)' }} />
                  <span className="truncate">{rec.formData.name}</span>
                </span>
                <span className="text-gray-600 shrink-0">•</span>
                <span className="flex items-center gap-1 truncate text-gray-400">
                  <Shield className="w-3 h-3 shrink-0" style={{ color: 'var(--theme-accent)' }} />
                  <span className="truncate">{rec.formData.teamName}</span>
                </span>
                <span className="text-gray-600 shrink-0">•</span>
                <span className="flex items-center gap-1 font-mono font-bold shrink-0" style={{ color: 'var(--theme-accent)' }}>
                  <Hash className="w-3 h-3 shrink-0" />
                  <span>{rec.formData.gameId}</span>
                </span>
              </div>

              {/* LINE 3: WhatsApp • Date + Inline Actions (Copy, Share, Cancel) */}
              <div 
                className="flex items-center justify-between gap-2 text-[10px] pt-1 border-t border-dashed"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <div className="flex items-center gap-1.5 text-gray-400 truncate min-w-0">
                  <span className="truncate flex items-center gap-1">
                    <Phone className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
                    <span className="truncate">{rec.formData.whatsapp}</span>
                  </span>
                  <span className="text-gray-600 shrink-0">•</span>
                  <span className="text-gray-500 shrink-0">{rec.registeredAt}</span>
                  <span className="text-gray-600 shrink-0">•</span>
                  <span 
                    className="flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-semibold shrink-0"
                    style={{
                      backgroundColor: timeInfo.isExpired ? 'rgba(239, 68, 68, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: timeInfo.isExpired ? '#F87171' : '#FBBF24',
                      border: `1px solid ${timeInfo.isExpired ? 'rgba(239, 68, 68, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
                    }}
                    title="Pass valid for 12 hours from registration"
                  >
                    <Clock className="w-2.5 h-2.5" />
                    <span>{timeInfo.displayText}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(rec)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase transition-all hover:border-[var(--theme-accent)] cursor-pointer"
                    style={{
                      backgroundColor: 'var(--theme-bg)',
                      borderColor: 'var(--theme-border)',
                      color: copiedId === rec.id ? 'var(--theme-accent)' : 'var(--theme-text)',
                    }}
                    title="Copy Pass Details"
                  >
                    {copiedId === rec.id ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copiedId === rec.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShareWhatsApp(rec)}
                    className="p-1 rounded border text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
                    style={{
                      backgroundColor: 'var(--theme-bg)',
                      borderColor: 'var(--theme-border)',
                    }}
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-2.5 h-2.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onCancelRegistration(rec.id)}
                    className="p-1 rounded border text-gray-500 hover:text-rose-400 hover:border-rose-500/40 transition-all cursor-pointer"
                    style={{
                      backgroundColor: 'var(--theme-bg)',
                      borderColor: 'var(--theme-border)',
                    }}
                    title="Cancel Pass"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

