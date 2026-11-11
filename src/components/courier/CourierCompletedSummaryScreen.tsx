import React from 'react';
import { AppScreen } from '../../types';

interface CourierCompletedSummaryScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onBackToOrders: () => void;
  onViewHistory: () => void;
}

export const CourierCompletedSummaryScreen: React.FC<CourierCompletedSummaryScreenProps> = ({
  onNavigate,
  onBackToOrders,
  onViewHistory,
}) => {
  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between p-5 bg-[#f8f9fa]  text-[#1a1d20]  select-none animate-in fade-in duration-300">
      {/* Celebration Glowing Top Section */}
      <div className="my-auto flex flex-col items-center text-center gap-4 py-4">
        {/* Animated Success Badge with Rays */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] animate-bounce duration-1000">
            <span className="material-symbols-outlined text-emerald-500 text-[48px]">
              task_alt
            </span>
          </div>
          {/* Neon Halo Rings */}
          <div className="absolute inset-0 rounded-full border border-emerald-500/30 scale-125 animate-ping opacity-30" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600  font-extrabold text-[11px] uppercase tracking-wider border border-emerald-500/30">
            ¡Entrega Exitosa!
          </span>
          <h2 className="font-title-lg font-black text-[#1a1d20]  text-2xl mt-2">
            ¡Excelente Trabajo!
          </h2>
          <p className="text-xs text-[#64748b]  mt-1">
            Pedido #AF-3092 completado en 16 minutos
          </p>
        </div>

        {/* Total Earned Highlight Box */}
        <div className="w-full max-w-sm bg-white  border-2 border-[#FF7A00]/50 rounded-3xl p-5 shadow-[0_12px_40px_rgba(255,122,0,0.2)] flex flex-col gap-3">
          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase font-bold text-[#64748b]  tracking-wider">
              Total Ganado en este Viaje
            </span>
            <span className="text-4xl font-black text-[#FF7A00] tracking-tight mt-1">
              S/ 11.50
            </span>
          </div>

          <div className="w-full h-px bg-slate-200  my-1" />

          {/* Desglose de Ganancias */}
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between text-[#64748b] ">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#6C5CE7]">
                  local_shipping
                </span>
                <span>Tarifa base por recogida</span>
              </div>
              <span className="font-bold text-[#1a1d20] ">S/ 5.00</span>
            </div>

            <div className="flex items-center justify-between text-[#64748b] ">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#FF7A00]">
                  route
                </span>
                <span>Distancia recorrida (4.0 km)</span>
              </div>
              <span className="font-bold text-[#1a1d20] ">S/ 3.50</span>
            </div>

            <div className="flex items-center justify-between text-[#64748b] ">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">
                  volunteer_activism
                </span>
                <span>Propina directa del cliente</span>
              </div>
              <span className="font-bold text-emerald-600 ">+ S/ 3.00</span>
            </div>

            <div className="w-full h-px border-t border-dashed border-slate-200  my-0.5" />

            <div className="flex items-center justify-between font-black text-sm">
              <span className="text-[#1a1d20] ">Ganancia Neta Total</span>
              <span className="text-[#FF7A00]">S/ 11.50</span>
            </div>
          </div>
        </div>

        {/* Customer Rating Card */}
        <div className="w-full max-w-sm bg-white  border border-slate-200  rounded-2xl p-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">star</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[#1a1d20] ">Calificación de Juan</p>
              <p className="text-[10px] text-[#64748b] ">"Muy rápido y amable"</p>
            </div>
          </div>
          <div className="flex text-amber-400 text-xs">★★★★★</div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Volver a buscar pedidos -> Regresa al mapa en línea */}
        <button
          type="button"
          onClick={onBackToOrders}
          className="w-full h-13 rounded-2xl bg-[#FF7A00] hover:bg-[#ff891a] active:scale-95 text-white font-black text-sm transition-all shadow-[0_6px_25px_rgba(255,122,0,0.5)] flex items-center justify-center gap-2 border border-[#ffa043] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">radar</span>
          <span>Volver a buscar pedidos</span>
        </button>

        {/* Ver Historial -> Pasa a Screen 12 */}
        <button
          type="button"
          onClick={onViewHistory}
          className="w-full h-12 rounded-2xl bg-white  hover:bg-slate-50  active:scale-95 text-[#1a1d20]  font-bold text-xs transition-all border border-slate-200  flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px] text-[#6C5CE7]">
            history
          </span>
          <span>Ver Historial y Desempeño</span>
        </button>
      </div>
    </div>
  );
};
