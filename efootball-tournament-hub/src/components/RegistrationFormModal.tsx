import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Shield, 
  Hash, 
  Phone, 
  Mail, 
  AlertCircle, 
  CheckCircle, 
  HelpCircle, 
  Trophy, 
  Sparkles,
  Info,
  Lock,
  Ticket
} from 'lucide-react';
import { Tournament, RegistrationFormData, FormErrors } from '../types';

interface RegistrationFormModalProps {
  tournament: Tournament;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: RegistrationFormData) => void;
}

const initialFormData: RegistrationFormData = {
  name: '',
  teamName: '',
  gameId: '',
  whatsapp: '',
  gmail: '',
  entryFee: '',
  deviceModel: 'Android Mobile',
  preferredRegion: 'Global Matchmaking',
};

const W3FORMS_ACCESS_KEY = 'w3f_ca63577d8bab348e725dc2b311f44827ec0536625c14c5dc';
const W3FORMS_API_URL = 'https://api.w3forms.com/submit';

export const RegistrationFormModal: React.FC<RegistrationFormModalProps> = ({
  tournament,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    ...initialFormData,
    entryFee: tournament.entryFee,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showGameIdHelp, setShowGameIdHelp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Reset form whenever modal opens or active tournament changes, auto-filling entry fee
  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...initialFormData,
        entryFee: tournament.entryFee,
      });
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
      setSubmissionError(null);
    }
  }, [isOpen, tournament.id, tournament.entryFee]);

  if (!isOpen) return null;

  const validateField = (name: keyof RegistrationFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'teamName':
        if (!value.trim()) return 'Team Name is required';
        if (value.trim().length < 2) return 'Team name must be at least 2 characters';
        return undefined;
      case 'gameId':
        if (!value.trim()) return 'eFootball Game ID is required';
        if (value.trim().length < 6) return 'Game ID must be at least 6 digits / characters';
        return undefined;
      case 'whatsapp':
        if (!value.trim()) return 'WhatsApp Number is required';
        // Clean phone validation (digits, spaces, plus, hyphens, min 8 digits)
        const digits = value.replace(/\D/g, '');
        if (digits.length < 8) return 'Please enter a valid WhatsApp number (min 8 digits)';
        return undefined;
      case 'gmail':
        if (!value.trim()) return 'Gmail ID is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        if (!value.toLowerCase().includes('@')) return 'Must contain valid email domain';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleBlur = (field: keyof RegistrationFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field] || '');
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const fields: (keyof FormErrors)[] = ['name', 'teamName', 'gameId', 'whatsapp', 'gmail'];
    
    fields.forEach((f) => {
      const err = validateField(f, formData[f] || '');
      if (err) {
        newErrors[f] = err;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      teamName: true,
      gameId: true,
      whatsapp: true,
      gmail: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('access_key', W3FORMS_ACCESS_KEY);
      payload.append('subject', `PES MASTER - Tournament Registration: ${formData.name.trim()} (${tournament.title})`);
      payload.append('from_name', 'PES MASTER Tournament Hub');

      // The submitted fields specified for W3Forms
      payload.append('Player Name', formData.name.trim());
      payload.append('Team Name', formData.teamName.trim());
      payload.append('eFootball Game ID', formData.gameId.trim());
      payload.append('WhatsApp Number', formData.whatsapp.trim());
      payload.append('Gmail', formData.gmail.trim());
      payload.append('Platform Target', tournament.platform || 'eFootball 2026 Mobile (Android)');
      payload.append('Tournament Type', tournament.type === '1vs1' ? '1 vs 1 Solo' : 'Mega Tournament');
      payload.append('Selected Tournament Tier', tournament.title);
      payload.append('Entry Fee', tournament.entryFee);
      payload.append('Winning Amount', tournament.prizePool);
      payload.append('Registration Date/Time', new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }));

      // Standard bindings for W3Forms dashboard
      payload.append('name', formData.name.trim());
      payload.append('email', formData.gmail.trim());

      const response = await fetch(W3FORMS_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: payload,
      });

      const result = await response.json();

      if (response.ok && (result.success || response.status === 200)) {
        setIsSubmitting(false);
        const submittedData: RegistrationFormData = {
          ...formData,
          entryFee: tournament.entryFee,
        };
        // Reset form fields on successful submission
        setFormData(initialFormData);
        setErrors({});
        setTouched({});
        setSubmissionError(null);
        onSubmit(submittedData);
      } else {
        // If W3Forms returns an error, keep entered info and show error
        setIsSubmitting(false);
        const errorMsg = result?.message || 'W3Forms was unable to process the registration. Please try again.';
        setSubmissionError(errorMsg);
      }
    } catch (err) {
      console.error('W3Forms submission error:', err);
      setIsSubmitting(false);
      setSubmissionError('Network error connecting to W3Forms server. Please check your internet connection and try again.');
    }
  };

  const is1v1 = tournament.type === '1vs1';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-lg border-t sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-black max-h-[92vh] flex flex-col overflow-hidden card-aesthetic transition-colors duration-200"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div 
          className="p-4 sm:p-5 border-b flex items-start justify-between transition-colors duration-200"
          style={{
            backgroundColor: 'var(--theme-card-subtle)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--theme-badge-bg)',
                  color: 'var(--theme-accent)',
                  borderColor: 'var(--theme-badge-border)',
                }}
              >
                {tournament.typeLabel}
              </span>
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                Registration Form
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black italic text-white uppercase font-display tracking-tight">
              {tournament.title}
            </h2>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
              <Trophy className="w-3 h-3" style={{ color: 'var(--theme-accent)' }} />
              <span className="text-white font-bold">{tournament.prizePool}</span>
              <span className="text-gray-600">•</span>
              <span className="font-bold" style={{ color: 'var(--theme-accent)' }}>{tournament.entryFee}</span>
            </p>
          </div>

          <button
            type="button"
            id="close-registration-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border text-gray-400 hover:text-white flex items-center justify-center transition-colors shrink-0 hover:border-[var(--theme-accent)]"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Banner Notice - All details required */}
        <div 
          className="px-4 sm:px-5 py-2.5 border-b flex items-center text-xs transition-colors duration-200"
          style={{
            backgroundColor: 'var(--theme-card-subtle)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-2 text-gray-300">
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            />
            <span className="text-[11px]">
              All details are <strong style={{ color: 'var(--theme-accent)' }}>strictly required</strong> for tournament eligibility.
            </span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* W3Forms Backend Configurations & Meta Fields */}
          <input type="hidden" name="access_key" value={W3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value={`PES MASTER - Registration: ${formData.name || 'Participant'} (${tournament.title})`} />
          <input type="hidden" name="from_name" value="PES MASTER Tournament Hub" />
          <input type="hidden" name="Platform Target" value={tournament.platform || 'eFootball 2026 Mobile (Android)'} />
          <input type="hidden" name="Tournament Type" value={tournament.type === '1vs1' ? '1 vs 1 Solo' : 'Mega Tournament'} />
          <input type="hidden" name="Selected Tournament Tier" value={tournament.title} />
          <input type="hidden" name="Entry Fee" value={tournament.entryFee} />
          <input type="hidden" name="Winning Amount" value={tournament.prizePool} />
          <input type="hidden" name="Registration Date/Time" value={new Date().toLocaleString()} />

          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-gray-200 font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                Player Name <span className="text-rose-400 font-bold">*</span>
              </span>
              <span className="text-[10px] text-gray-500 font-normal">Real / Gamer Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="input-player-name"
                name="Player Name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="Enter player name"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: errors.name ? '#F43F5E' : touched.name && !errors.name ? 'var(--theme-accent)' : 'var(--theme-border)',
                }}
                className="w-full border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none transition-all"
              />
              {touched.name && !errors.name && (
                <CheckCircle className="w-4 h-4 absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--theme-accent)' }} />
              )}
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.name}
              </p>
            )}
          </div>

          {/* 2. Team Name */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-gray-200 font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                Team Name <span className="text-rose-400 font-bold">*</span>
              </span>
              <span className="text-[10px] text-gray-500 font-normal">Club / Squad / Clan</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="input-team-name"
                name="Team Name"
                value={formData.teamName}
                onChange={(e) => handleChange('teamName', e.target.value)}
                onBlur={() => handleBlur('teamName')}
                placeholder="Enter team name"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: errors.teamName ? '#F43F5E' : touched.teamName && !errors.teamName ? 'var(--theme-accent)' : 'var(--theme-border)',
                }}
                className="w-full border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none transition-all"
              />
              {touched.teamName && !errors.teamName && (
                <CheckCircle className="w-4 h-4 absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--theme-accent)' }} />
              )}
            </div>
            {errors.teamName && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.teamName}
              </p>
            )}
          </div>

          {/* 3. eFootball (PES) Game ID */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-gray-200 font-bold text-xs uppercase tracking-wider">
                <Hash className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                eFootball (PES) Game ID <span className="text-rose-400 font-bold">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowGameIdHelp(!showGameIdHelp)}
                className="text-[10px] hover:underline flex items-center gap-1 font-bold uppercase tracking-wider"
                style={{ color: 'var(--theme-accent)' }}
              >
                <HelpCircle className="w-3 h-3" />
                Where is my ID?
              </button>
            </div>

            {/* Helper callout for eFootball Game ID */}
            {showGameIdHelp && (
              <div 
                className="p-3 rounded-xl border text-[11px] text-gray-300 space-y-1 animate-in fade-in duration-150"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <p className="font-bold flex items-center gap-1" style={{ color: 'var(--theme-accent)' }}>
                  <Info className="w-3.5 h-3.5" />
                  Finding your eFootball Owner ID:
                </p>
                <ol className="list-decimal list-inside text-gray-400 space-y-0.5 ml-1">
                  <li>Open eFootball on your Android mobile device.</li>
                  <li>Tap <strong>Extras</strong> &gt; <strong>User Information</strong>.</li>
                  <li>Select <strong>User Details</strong> &gt; copy your <strong>Owner ID</strong>.</li>
                </ol>
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                id="input-game-id"
                name="eFootball Game ID"
                inputMode="text"
                value={formData.gameId}
                onChange={(e) => handleChange('gameId', e.target.value)}
                onBlur={() => handleBlur('gameId')}
                placeholder="Enter eFootball owner ID"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: errors.gameId ? '#F43F5E' : touched.gameId && !errors.gameId ? 'var(--theme-accent)' : 'var(--theme-border)',
                }}
                className="w-full border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none transition-all font-mono"
              />
              {touched.gameId && !errors.gameId && (
                <CheckCircle className="w-4 h-4 absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--theme-accent)' }} />
              )}
            </div>
            {errors.gameId && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.gameId}
              </p>
            )}
          </div>

          {/* 4. WhatsApp Number */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-gray-200 font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                WhatsApp Number <span className="text-rose-400 font-bold">*</span>
              </span>
              <span className="text-[10px] text-gray-500 font-normal">For Match Room & Fixtures</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="input-whatsapp"
                name="WhatsApp Number"
                inputMode="tel"
                autoComplete="tel"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                onBlur={() => handleBlur('whatsapp')}
                placeholder="Enter WhatsApp number"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: errors.whatsapp ? '#F43F5E' : touched.whatsapp && !errors.whatsapp ? 'var(--theme-accent)' : 'var(--theme-border)',
                }}
                className="w-full border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none transition-all"
              />
              {touched.whatsapp && !errors.whatsapp && (
                <CheckCircle className="w-4 h-4 absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--theme-accent)' }} />
              )}
            </div>
            {errors.whatsapp && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.whatsapp}
              </p>
            )}
            <p className="text-[10px] text-gray-500">
              Fixtures and opponent details will be shared via our official WhatsApp tournament group.
            </p>
          </div>

          {/* 5. Gmail ID */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-gray-200 font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                Gmail ID <span className="text-rose-400 font-bold">*</span>
              </span>
              <span className="text-[10px] text-gray-500 font-normal">Official Confirmation</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="input-gmail"
                name="Gmail"
                inputMode="email"
                autoComplete="email"
                value={formData.gmail}
                onChange={(e) => handleChange('gmail', e.target.value)}
                onBlur={() => handleBlur('gmail')}
                placeholder="Enter Gmail address"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: errors.gmail ? '#F43F5E' : touched.gmail && !errors.gmail ? 'var(--theme-accent)' : 'var(--theme-border)',
                }}
                className="w-full border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none transition-all"
              />
              {touched.gmail && !errors.gmail && (
                <CheckCircle className="w-4 h-4 absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--theme-accent)' }} />
              )}
            </div>
            {errors.gmail && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.gmail}
              </p>
            )}
          </div>

          {/* 6. Entry Fee Section (Auto-filled from chosen section & locked) */}
          <div className="space-y-1.5" id="section-entry-fee">
            <label className="flex items-center justify-between text-gray-200 font-bold text-xs uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
                Entry Fee
              </span>
              <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3 text-gray-500" />
                Auto-filled • Fixed
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="input-entry-fee"
                name="Entry Fee"
                value={formData.entryFee || tournament.entryFee}
                readOnly
                aria-readonly="true"
                style={{
                  backgroundColor: 'var(--theme-bg)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-accent)',
                }}
                className="w-full border rounded-xl px-3.5 py-2.5 text-xs font-black tracking-wider cursor-not-allowed select-none transition-all outline-none"
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5 pointer-events-none">
                <span 
                  className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: 'var(--theme-badge-bg)',
                    color: 'var(--theme-accent)',
                    borderColor: 'var(--theme-badge-border)',
                  }}
                >
                  Locked
                </span>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 flex items-center justify-between">
              <span>Auto-filled for selected {tournament.title}</span>
              <span className="text-gray-500 italic">Cannot be modified</span>
            </p>
          </div>

          {/* W3Forms Submission Error Alert */}
          {submissionError && (
            <div 
              className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs animate-in fade-in duration-200"
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.12)',
                borderColor: '#F43F5E',
                color: '#FECDD3',
              }}
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-rose-300">Registration Error</p>
                <p className="text-[11px] text-rose-200 leading-normal">{submissionError}</p>
                <p className="text-[10px] text-gray-400">All entered information has been preserved. Please verify your details and retry.</p>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              id="submit-registration-btn"
              disabled={isSubmitting}
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: '#000000',
                boxShadow: '0 0 24px var(--theme-accent-glow)',
              }}
              className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 min-h-[48px] hover:brightness-110 active:scale-[0.98] cursor-pointer ${
                isSubmitting ? 'opacity-75 cursor-wait' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Validating & Registering...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>Submit Tournament Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
