import React, { useEffect, useState } from 'react';
import { AppScreen } from '../../types';
import { AfterFoodGoogleMap } from '../maps/AfterFoodGoogleMap';
import { TRUJILLO_COORDINATES } from '../maps/mapStyles';

interface CourierIncomingOrderScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onAcceptOrder: () => void;
  onRejectOrder: () => void;
  isLightMode?: boolean;
}

export const CourierIncomingOrderScreen: React.FC<CourierIncomingOrderScreenProps> = ({
  onNavigate,
  onAcceptOrder,
  onRejectOrder,
  isLightMode,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(30);
  const totalSeconds = 30;

  useEffect(() => {
    if (secondsLeft <= 0) {
      onRejectOrder();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onRejectOrder]);

  const progressPercentage = (secondsLeft / totalSeconds) * 100;

  return (
    <div className={`relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20] `}>
      {/* Background Google Maps: Panoramic Radar View of Active Orders (Zoom 13) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AfterFoodGoogleMap
          center={TRUJILLO_COORDINATES.center}
          zoom={13}
          isLightMode={isLightMode}
          height="100%"
          showRecenterButton={false}
          markers={[
            {
              id: 'order-store',
              position: TRUJILLO_COORDINATES.restaurant,
              title: 'Burger Night UPAO',
              subtitle: 'Local de Recojo',
              type: 'store',
            },
            {
              id: 'order-client',
              position: TRUJILLO_COORDINATES.client,
              title: 'Urb. El Recreo',
              subtitle: 'Punto de Entrega',
              type: 'client',
            },
            {
              id: 'courier-radar-pos',
              position: TRUJILLO_COORDINATES.courierOnRouteToRestaurant,
              title: 'Tu Posición',
              subtitle: 'En Radar',
              type: 'courier',
            },
          ]}
          routePath={[
            TRUJILLO_COORDINATES.restaurant,
            TRUJILLO_COORDINATES.client,
          ]}
          routeColor="#FF7A00"
        />

        {/* Ambient Radar Pulse & Vignette Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/90   " />

        {/* Sweeping Radar Rings Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#FF7A00]/25 pointer-events-none animate-ping opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-[#6C5CE7]/35 pointer-events-none animate-pulse opacity-50" />
      </div>

      {/* Top Floating Badge & Status - Make "Nueva Solicitud" alert card prominent */}
      <div className="relative z-20 px-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 bg-white  px-4 py-2 rounded-2xl border-2 border-[#FF7A00] shadow-[0_4px_20px_rgba(255,122,0,0.3)] text-xs font-black text-[#1a1d20] ">
          <span className="material-symbols-outlined text-[22px] text-[#FF7A00] animate-bounce">
            notification_important
          </span>
          <div className="flex flex-col">
            <span className="leading-tight text-xs font-extrabold uppercase tracking-wide text-[#FF7A00]">
              ¡Nueva Solicitud!
            </span>
            <span className="text-[10px] text-[#64748b]  font-semibold">
              Pedido activo disponible en tu zona
            </span>
          </div>
        </div>

        {/* 30s Countdown Circular Widget - Centrado perfecto vertical y horizontal */}
        <div className="relative w-14 h-14 flex items-center justify-center bg-white/95  rounded-full shadow-md border border-[#e2e8f0]  shrink-0">
          <svg className="w-12 h-12 -rotate-90 block">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e2e8f0"
              strokeWidth="3.5"
              fill="transparent"
              className=""
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke={secondsLeft <= 8 ? '#EF4444' : '#FF7A00'}
              strokeWidth="3.5"
              fill="transparent"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * progressPercentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className={`text-xs font-black tracking-tight leading-none text-center ${
                secondsLeft <= 8 ? 'text-red-500 animate-pulse' : 'text-[#1a1d20] '
              }`}
            >
              {secondsLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Main Floating Offer Card */}
      <div className="relative z-20 px-4 pb-20 mt-auto">
        <div className="bg-white  border-2 border-[#FF7A00] rounded-3xl p-5 shadow-[0_16px_50px_rgba(255,122,0,0.25)] flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
          {/* Header Card: Restaurant & Estimated Earnings (Removed 'Fast food' and '+ Propina sugerida') */}
          <div className="flex items-start justify-between gap-3 border-b border-[#e2e8f0]  pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[26px]">lunch_dining</span>
              </div>
              <div>
                <h3 className="font-title-lg font-black text-[#1a1d20]  text-base leading-tight">
                  Burger Night UPAO
                </h3>
                <p className="text-xs text-[#64748b]  mt-0.5">
                  Pedido #AF-3092 • 2 artículos
                </p>
              </div>
            </div>

            {/* Ganancia Estimada */}
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-[#64748b]  tracking-wider block">
                Ganancia estimada
              </span>
              <span className="text-2xl font-black text-[#FF7A00] tracking-tight">
                S/ 8.50
              </span>
            </div>
          </div>

          {/* Métricas Operativas Clave: Distancia al Local vs Distancia al Cliente (high contrast in dark and light mode) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Distancia al local */}
            <div className="bg-slate-50  border border-[#e2e8f0]  rounded-2xl p-3 flex flex-col justify-between shadow-xs">
              <div className="flex items-center gap-1.5 text-[#FF7A00] mb-1">
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                  Al Comercio
                </span>
              </div>
              <p className="text-sm font-black text-[#1a1d20] ">1.2 km</p>
              <p className="text-[11px] text-[#475569]  truncate">
                Av. América Sur 123
              </p>
              <span className="text-[10px] text-[#64748b]  mt-1 font-medium">~5 min de viaje</span>
            </div>

            {/* Distancia al cliente */}
            <div className="bg-slate-50  border border-[#e2e8f0]  rounded-2xl p-3 flex flex-col justify-between shadow-xs">
              <div className="flex items-center gap-1.5 text-emerald-600  mb-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                  Al Cliente
                </span>
              </div>
              <p className="text-sm font-black text-[#1a1d20] ">2.8 km</p>
              <p className="text-[11px] text-[#475569]  truncate">
                Urb. El Recreo
              </p>
              <span className="text-[10px] text-[#64748b]  mt-1 font-medium">~11 min de viaje</span>
            </div>
          </div>

          {/* Desglose de Ruta */}
          <div className="bg-slate-100  rounded-xl p-2.5 flex items-center justify-between text-xs text-[#334155]  border border-[#e2e8f0] ">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#6C5CE7]">
                route
              </span>
              <span>Distancia total estimada: <strong className="text-[#1a1d20] ">4.0 km</strong></span>
            </div>
            <span className="text-[11px] font-bold text-[#64748b] ">
              ~16 min total
            </span>
          </div>

          {/* Action Buttons: Rechazar vs Aceptar Entrega */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onRejectOrder}
              className="flex-1 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-[#64748b] hover:text-[#1a1d20] font-bold text-xs transition-all border border-[#e2e8f0] flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Rechazar</span>
            </button>

            <button
              type="button"
              onClick={onAcceptOrder}
              className="flex-2 h-12 rounded-2xl bg-[#FF7A00] hover:bg-[#ff891a] active:scale-95 text-white font-extrabold text-sm transition-all shadow-[0_6px_25px_rgba(255,122,0,0.5)] flex items-center justify-center gap-2 border border-[#ffa043] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Aceptar Entrega</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
