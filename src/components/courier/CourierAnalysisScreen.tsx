import React from 'react';
import { AppScreen } from '../../types';

interface CourierAnalysisScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onApproveAccount: () => void;
}

export const CourierAnalysisScreen: React.FC<CourierAnalysisScreenProps> = ({
  onNavigate,
  onApproveAccount,
}) => {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-20 pt-4 justify-between animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20] ">
      {/* Top Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-full flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => onNavigate('courier_profile')}
            aria-label="Volver a Mi Perfil"
            className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-[#64748b]  hover:text-[#1a1d20]  active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-1.5 bg-[#FF7A00]/15 px-3 py-1 rounded-full border border-[#FF7A00]/30 text-[#FF7A00] text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
            <span>Perfil en análisis</span>
          </div>
        </div>

        {/* Animated Badge Graphic */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#6C5CE7]/15 flex items-center justify-center text-[#6C5CE7] border border-[#6C5CE7]/40 shadow-[0_0_30px_rgba(108,92,231,0.25)] animate-pulse">
            <span className="material-symbols-outlined text-[48px]">pending_actions</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FF7A00] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
          </div>
        </div>

        {/* Main Title & Status */}
        <h1 className="text-2xl font-black text-[#1a1d20]  tracking-tight">
          Perfil en análisis
        </h1>
        <p className="mt-2 text-xs text-[#64748b]  max-w-xs leading-relaxed">
          Tu expediente para la zona de <strong className="text-[#1a1d20] ">Trujillo</strong> está siendo revisado por nuestro equipo de validación 24/7.
        </p>

        {/* Info card */}
        <div className="w-full mt-6 bg-white  border border-slate-200  rounded-2xl p-4 flex flex-col gap-3.5 text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6C5CE7]/15 flex items-center justify-center text-[#6C5CE7] shrink-0">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a1d20] ">Tiempo Estimado: Menos de 24 Horas</p>
            </div>
          </div>

          <div className="h-px bg-slate-200  w-full" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/15 flex items-center justify-center text-[#FF7A00] shrink-0">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a1d20] ">Aviso por WhatsApp y Notificación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Testing Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        {/* Testing Button: Simular Aprobación */}
        <button
          type="button"
          onClick={onApproveAccount}
          className="w-full h-13 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#FF7A00] hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm shadow-[0_8px_24px_-4px_rgba(108,92,231,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Simular Aprobación (Ir a Dashboard)</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('role_selector')}
          className="w-full h-11 rounded-full bg-white  hover:bg-slate-50  border border-slate-200  text-[#1a1d20]  font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Volver al Menú Principal</span>
        </button>
      </div>
    </div>
  );
};
