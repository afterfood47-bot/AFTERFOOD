import React from 'react';
import { AppScreen } from '../../types';

interface MerchantReviewScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSimulateApproval: () => void;
}

export const MerchantReviewScreen: React.FC<MerchantReviewScreenProps> = ({
  onNavigate,
  onSimulateApproval,
}) => {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-20 pt-4 justify-between bg-slate-50  text-slate-900  transition-colors duration-200 animate-in fade-in duration-200">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('merchant_register')}
            className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-slate-600  hover:text-slate-900  transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-1.5 bg-white  px-3 py-1 rounded-full border border-slate-200  shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-800  uppercase tracking-wider">
              En Verificación
            </span>
          </div>
          <div className="w-9" />
        </div>

        {/* Informative Card */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Animated Hourglass Badge */}
          <div className="relative mb-4">
            <div className="relative w-20 h-20 rounded-3xl bg-amber-500/15 border-2 border-amber-500/50 flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-4xl text-amber-500">
                hourglass_top
              </span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase shadow-sm">
              Pendiente
            </div>
          </div>

          <h1 className="text-xl font-black text-slate-900  tracking-tight">
            Validando expediente comercial
          </h1>
          <p className="text-xs text-slate-600  mt-1 max-w-xs font-medium">
            Verificamos tu RUC y datos en SUNAT. Tiempo estimado: menos de 24 horas.
          </p>

          {/* Verification Checklist Breve */}
          <div className="w-full mt-4 bg-white  border border-slate-200  rounded-2xl p-3.5 text-left flex flex-col gap-2.5 shadow-sm">
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100 ">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                <span className="text-slate-900  font-medium">RUC y Razón Social</span>
              </div>
              <span className="text-[10px] text-emerald-600  font-bold">Recibido</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100 ">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-lg animate-pulse">sync</span>
                <span className="text-slate-900  font-medium">Cruce SUNAT Trujillo</span>
              </div>
              <span className="text-[10px] text-amber-600  font-bold">En proceso</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-lg">schedule</span>
                <span className="text-slate-500 ">Activación de catálogo</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Siguiente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-6">
        <button
          onClick={onSimulateApproval}
          type="button"
          className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px]">verified</span>
          <span>Aprobar Inmediatamente (Simulación)</span>
        </button>

        <button
          onClick={() => onNavigate('merchant_dashboard')}
          type="button"
          className="w-full h-10 rounded-xl bg-white  hover:bg-slate-100  text-slate-700  text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-slate-200  shadow-sm"
        >
          <span>Ir al Dashboard</span>
        </button>
      </div>
    </div>
  );
};
