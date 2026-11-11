import React, { useState, useEffect } from 'react';
import { AppScreen } from '../../types';

interface MerchantIncomingOrderScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onAcceptOrder?: () => void;
  onRejectOrder?: () => void;
}

export const MerchantIncomingOrderScreen: React.FC<MerchantIncomingOrderScreenProps> = ({
  onNavigate,
  onAcceptOrder,
  onRejectOrder,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleAccept = () => {
    if (onAcceptOrder) onAcceptOrder();
    onNavigate('merchant_kitchen_orders');
  };

  const handleReject = () => {
    if (onRejectOrder) onRejectOrder();
    onNavigate('merchant_catalog');
  };

  const progressPercent = Math.max(0, Math.min(100, (secondsLeft / 45) * 100));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50  text-slate-900  px-4 pt-4 pb-20 relative select-none animate-in fade-in duration-200 transition-colors">
      {/* Background Ambience Neon Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF7A00]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header with Return & Sound */}
      <div className="flex items-center justify-between relative z-10 mb-3">
        <button
          type="button"
          onClick={() => onNavigate('merchant_catalog')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-slate-700  hover:text-slate-900  transition-all shadow-sm active:scale-95"
          aria-label="Volver al catálogo"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FF7A00] font-black text-xs uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
          <span>¡Nuevo Pedido Nocturno!</span>
        </div>

        <button
          type="button"
          onClick={() => setSoundActive(!soundActive)}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm ${
            soundActive
              ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-[#FF7A00]'
              : 'bg-white  border-slate-200  text-slate-400'
          }`}
          title={soundActive ? 'Silenciar campanilla' : 'Activar sonido'}
        >
          <span className="material-symbols-outlined text-lg">
            {soundActive ? 'volume_up' : 'volume_off'}
          </span>
        </button>
      </div>

      {/* Ultra-Clear Timer Banner with Explicit Time Remaining and Action */}
      <div className="relative z-10 bg-white  border-2 border-[#FF7A00] rounded-2xl p-4 shadow-lg shadow-[#FF7A00]/10  mb-3 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/50 flex flex-col items-center justify-center text-[#FF7A00] shrink-0">
              <span className="text-xl font-black font-mono leading-none tabular-nums">
                {secondsLeft}s
              </span>
              <span className="text-[9px] font-extrabold uppercase mt-0.5">Límite</span>
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 ">
                Tiempo restante para responder
              </p>
              <p className="text-xs text-[#FF7A00] font-bold mt-0.5">
                Acción: Acepta el pedido para iniciar preparación
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar of countdown */}
        <div className="w-full h-2 rounded-full bg-slate-100  mt-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF7A00] to-rose-500 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Order Details Card */}
      <div className="relative z-10 bg-white  border border-slate-200  rounded-2xl p-4 shadow-sm flex flex-col gap-3.5 transition-colors">
        {/* Order Identifier & Timing */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 ">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900  tracking-wide">
                Pedido #AF-1023
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#6C5CE7]/15 text-[#6C5CE7]  text-[10px] font-bold">
                Excedente Nocturno
              </span>
            </div>
            <p className="text-xs text-slate-500  mt-0.5">
              Cliente: Juan Pérez • Trujillo Centro
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500  block">Ingreso Neto</span>
            <span className="text-xl font-black text-[#FF7A00] font-mono">S/ 42.50</span>
          </div>
        </div>

        {/* Preparation Time & Delivery Indicator */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50  rounded-xl p-2.5 border border-slate-200  flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">timer</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-slate-500 ">
                Tiempo estimado
              </p>
              <p className="text-xs font-black text-slate-900  truncate">
                15 min de preparación
              </p>
            </div>
          </div>

          <div className="bg-slate-50  rounded-xl p-2.5 border border-slate-200  flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">two_wheeler</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-slate-500 ">
                Repartidor
              </p>
              <p className="text-xs font-black text-[#6C5CE7]  truncate">
                Asignado en ruta
              </p>
            </div>
          </div>
        </div>

        {/* Items List Breakdown */}
        <div className="bg-slate-50  rounded-xl p-3 border border-slate-200 ">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200 ">
            <span className="text-[11px] font-black uppercase text-slate-600 ">
              Productos a Preparar
            </span>
            <span className="text-[11px] font-bold text-[#FF7A00]">3 ítems</span>
          </div>

          <div className="flex flex-col divide-y divide-slate-200 ">
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#FF7A00]/15 text-[#FF7A00] font-black text-xs flex items-center justify-center shrink-0">
                  2x
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900 ">
                    Combo Hamburguesa Clásica Nocturna
                  </p>
                  <p className="text-[10px] text-slate-500 ">
                    Carne artesanal 150g, cheddar, papas
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900  tabular-nums">
                S/ 29.80
              </span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#FF7A00]/15 text-[#FF7A00] font-black text-xs flex items-center justify-center shrink-0">
                  1x
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900 ">
                    Papas Rústicas Excedente
                  </p>
                  <p className="text-[10px] text-slate-500 ">
                    Porción grande + tártara
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900  tabular-nums">
                S/ 6.90
              </span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#FF7A00]/15 text-[#FF7A00] font-black text-xs flex items-center justify-center shrink-0">
                  1x
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900 ">
                    Chicha Morada Artesanal (500ml)
                  </p>
                  <p className="text-[10px] text-slate-500 ">Fría</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900  tabular-nums">
                S/ 5.80
              </span>
            </div>
          </div>
        </div>

        {/* Customer Note */}
        <div className="bg-slate-50  rounded-xl p-2.5 border border-slate-200  flex items-start gap-2">
          <span className="material-symbols-outlined text-[#6C5CE7]  text-base mt-0.5 shrink-0">
            sticky_note_2
          </span>
          <div>
            <p className="text-[11px] font-bold text-slate-900 ">Nota del Cliente:</p>
            <p className="text-xs text-slate-600  italic">
              "Por favor enviar servilletas y ají extra."
            </p>
          </div>
        </div>

        {/* Action Buttons: Acciones Concretas Inmediatas */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleReject}
            className="w-1/3 h-12 rounded-xl bg-slate-100  hover:bg-slate-200  active:scale-[0.98] border border-slate-300  text-rose-600  font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
            <span>Rechazar</span>
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 h-12 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/30 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">skillet</span>
            <span>Aceptar Pedido (Pasar a Cocina)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
