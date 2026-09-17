import React, { useState } from 'react';
import { 
  Ticket, 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  Trash2, 
  User, 
  Shield, 
  Hash, 
  Phone, 
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { getPassTimeRemaining } from '../utils/passExpiration';

interface RegistrationTicketProps {
  records?: RegistrationRecord[];
  record?: RegistrationRecord | null;
  onClose: () => void;
  onCancelRegistration?: (id: string) => void;
  onRegisterAgain?: () => void;
  latestRecordId?: string | null;
}

export const RegistrationTicket: React.FC<RegistrationTicketProps> = ({
  records,
  record,
  onClose,
  onCancelRegistration,
  onRegisterAgain,
  latestRecordId,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Consolidate passes
  const allPasses: RegistrationRecord[] = records 
    ? records 
    : record 
      ? [record] 
      : [];

  const getPassSummaryText = (rec: RegistrationRecord) => {
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
    navigator.clipboard.writeText(getPassSummaryText(rec));
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (rec: RegistrationRecord) => {
    const encoded = encodeURIComponent(getPassSummaryText(rec));
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-lg border-t sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        {/* Header bar */}
        <div 
          className="p-4 sm:p-5 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--theme-card-subtle)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--theme-badge-bg)',
                borderColor: 'var(--theme-badge-border)',
                color: 'var(--theme-accent)',
              }}
            >
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black italic uppercase text-white font-display tracking-tight">
                  Passes ({allPasses.length})
                </h2>
                <span 
                  className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--theme-badge-bg)',
                    borderColor: 'var(--theme-badge-border)',
                    color: 'var(--theme-accent)',
                  }}
                >
                  <Clock className="w-2.5 h-2.5" />
                  <span>12h Validity</span>
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Passes automatically expire 12 hours after registration
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-passes-modal-x"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white border transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
            aria-label="Close passes modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Registration Confirmed Banner (displayed after successful registration) */}
        {latestRecordId && (
          <div 
            className="px-4 py-2.5 border-b flex items-center gap-2.5 text-xs animate-in fade-in duration-200"
            style={{
              backgroundColor: 'rgba(0, 255, 133, 0.08)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex-1 flex items-center justify-between gap-2">
              <div>
                <span className="font-black uppercase tracking-wider text-emerald-400 text-[11px]">
                  Registration Confirmed!
                </span>
                <span className="text-gray-300 text-[11px] ml-1.5 hidden sm:inline">
                  Your tournament slot and pass have been registered.
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {latestRecordId}
              </span>
            </div>
          </div>
        )}

        {/* Passes Body List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {allPasses.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-xs text-gray-400">No active passes found.</p>
              {onRegisterAgain && (
                <button
                  type="button"
                  onClick={onRegisterAgain}
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: '#000000',
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Register Now</span>
                </button>
              )}
            </div>
          ) : (
            allPasses.map((rec) => {
              const isNew = latestRecordId === rec.id;
              const timeInfo = getPassTimeRemaining(rec);

              return (
                <div
                  key={rec.id}
                  className="p-3 rounded-xl border transition-all space-y-1.5"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: isNew ? 'var(--theme-accent)' : 'var(--theme-border)',
                    boxShadow: isNew ? '0 0 16px var(--theme-accent-glow)' : undefined,
                  }}
                >
                  {/* LINE 1: Slot badge + Tournament Title + Entry Fee + Pass ID */}
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
                      {isNew && (
                        <span 
                          className="text-[8px] font-black uppercase px-1 py-0.2 rounded border"
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

                  {/* LINE 3: WhatsApp • Date • 12h Expiry + Inline Actions (Copy, Share, Cancel) */}
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
                        onClick={() => handleWhatsAppShare(rec)}
                        className="p-1 rounded border text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
                        style={{
                          backgroundColor: 'var(--theme-bg)',
                          borderColor: 'var(--theme-border)',
                        }}
                        title="Share to WhatsApp"
                      >
                        <MessageCircle className="w-2.5 h-2.5" />
                      </button>

                      {onCancelRegistration && (
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
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer controls */}
        <div 
          className="p-3 sm:p-4 border-t flex flex-col sm:flex-row items-center gap-2"
          style={{
            backgroundColor: 'var(--theme-card-subtle)',
            borderColor: 'var(--theme-border)',
          }}
        >
          {onRegisterAgain && (
            <button
              type="button"
              id="btn-register-another-entry"
              onClick={onRegisterAgain}
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: '#000000',
                boxShadow: '0 0 16px var(--theme-accent-glow)',
              }}
              className="w-full sm:flex-1 py-2.5 px-3 rounded-xl hover:brightness-110 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[42px]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Register Another Tournament</span>
            </button>
          )}

          <button
            type="button"
            id="btn-close-passes-modal"
            onClick={onClose}
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:border-[var(--theme-accent)] transition-colors cursor-pointer min-h-[42px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
