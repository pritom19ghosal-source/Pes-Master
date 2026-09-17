import React from 'react';
import { ShieldCheck, Wifi, Camera, Check, AlertTriangle } from 'lucide-react';

export const RulesGuide: React.FC = () => {
  return (
    <div className="space-y-4">
      <div 
        className="border rounded-2xl p-4 sm:p-5 space-y-3"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-9 h-9 rounded-xl border flex items-center justify-center"
            style={{
              backgroundColor: 'var(--theme-badge-bg)',
              borderColor: 'var(--theme-badge-border)',
              color: 'var(--theme-accent)',
            }}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black italic uppercase text-white font-display">
              Official eFootball Tournament Rules
            </h3>
            <p className="text-[11px] text-gray-400">
              Standard competitive regulations for Android Mobile players
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-2.5 text-xs pt-2">
          {/* Match Settings */}
          <div 
            className="p-3.5 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <h4 
              className="font-black uppercase tracking-wider flex items-center gap-1.5 text-xs"
              style={{ color: 'var(--theme-accent)' }}
            >
              <Check className="w-3.5 h-3.5" /> 1. Standard Match Room Settings
            </h4>
            <ul className="text-gray-300 text-[11px] space-y-1 list-disc list-inside ml-1">
              <li>Match Timing: 6 Minutes with Penalties (PK), No Extra Time.</li>
              <li>Injuries: OFF. Condition: Normal.</li>
            </ul>
          </div>

          {/* Android Connection */}
          <div 
            className="p-3.5 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <h4 
              className="font-black uppercase tracking-wider flex items-center gap-1.5 text-xs"
              style={{ color: 'var(--theme-accent)' }}
            >
              <Wifi className="w-3.5 h-3.5" /> 2. Android Connection & Latency
            </h4>
            <ul className="text-gray-300 text-[11px] space-y-1 list-disc list-inside ml-1">
              <li>Use high-speed Wi-Fi or low-ping 4G/5G mobile data.</li>
              <li>Close all background heavy applications before initiating match.</li>
              <li>If severe latency occurs before kickoff, cancel immediately and re-create room.</li>
            </ul>
          </div>

          {/* Screenshot Submissions */}
          <div 
            className="p-3.5 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <h4 className="font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 text-xs">
              <Camera className="w-3.5 h-3.5" /> 3. Screenshot Verification
            </h4>
            <ul className="text-gray-300 text-[11px] space-y-1 list-disc list-inside ml-1">
              <li>Only the winner must take and submit a screenshot of the final score screen.</li>
              <li>Submit screenshot to the official tournament WhatsApp coordinator within 10 minutes.</li>
              <li>In disputes, match stats (possession, shots) are used for verification.</li>
            </ul>
          </div>

          {/* Fair Play & Penalties */}
          <div 
            className="p-3.5 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <h4 className="font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" /> 4. Disconnection & Fair Play
            </h4>
            <ul className="text-gray-300 text-[11px] space-y-1 list-disc list-inside ml-1">
              <li>Deliberate game closing / app quitting results in immediate DQ (3-0 forfeit).</li>
              <li>Server disconnections in 1st half: restart remaining minutes with same score.</li>
              <li>Toxic behavior or abusive messaging leads to a permanent tournament ban.</li>
            </ul>
          </div>

          {/* Opponent Readiness & Refund Guarantee */}
          <div 
            className="p-3.5 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <h4 className="font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" /> 5. Opponent Readiness & Refund Policy
            </h4>
            <ul className="text-gray-300 text-[11px] space-y-1 list-disc list-inside ml-1">
              <li>If one opponent is ready but another opponent is not, then the registration money is refunded within 12 hrs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
