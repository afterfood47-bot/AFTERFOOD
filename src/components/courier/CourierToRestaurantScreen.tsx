import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { AfterFoodGoogleMap } from '../maps/AfterFoodGoogleMap';
import { TRUJILLO_COORDINATES, TRUJILLO_HAZARD_ZONES } from '../maps/mapStyles';

interface CourierToRestaurantScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onConfirmPickup: () => void;
  isLightMode?: boolean;
}

export const CourierToRestaurantScreen: React.FC<CourierToRestaurantScreenProps> = ({
  onNavigate,
  onConfirmPickup,
  isLightMode,
}) => {
  const [arrivedAtStore, setArrivedAtStore] = useState<boolean>(false);
  const [orderReady, setOrderReady] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.('1234');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleOpenGoogleMaps = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=Av.+América+Sur+123+Trujillo';
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-[#f8f9fa] text-[#1a1d20] select-none animate-in fade-in duration-200">
      {/* Interactive Google Maps: Route to Restaurant */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AfterFoodGoogleMap
          center={TRUJILLO_COORDINATES.courierOnRouteToRestaurant}
          zoom={17}
          isLightMode={isLightMode}
          markers={[
            {
              id: 'restaurant-destination',
              position: TRUJILLO_COORDINATES.restaurant,
              title: 'BURGER NIGHT UPAO',
              subtitle: 'Av. América Sur 123',
              type: 'store',
            },
            {
              id: 'courier-loc',
              position: TRUJILLO_COORDINATES.courierOnRouteToRestaurant,
              title: 'Repartidor',
              type: 'courier',
            },
          ]}
          routePath={[
            TRUJILLO_COORDINATES.courierOnRouteToRestaurant,
            { lat: -8.1250, lng: -79.0315 },
            TRUJILLO_COORDINATES.restaurant,
          ]}
          routeColor="#FF7A00"
          showRecenterButton={true}
          hazardAlerts={TRUJILLO_HAZARD_ZONES}
          showHazardLayer={true}
        />
        {/* Soft Ambient Overlay around edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/90 pointer-events-none" />
      </div>

      {/* Top Navigation Strip */}
      <div className="relative z-20 px-4 pt-4 flex flex-col gap-2.5">
        
        {/* NOVO: Cartão de Informação PIN de Recojo (Para mostrar ao restaurante) */}
        <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider">Pedido</span>
            <span className="text-base font-black text-[#1a1d20]">#8472</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider">PIN Recojo</span>
            <span className="text-xl font-black text-[#FF7A00] leading-none">1234</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Step Pill */}
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FF7A00]/40 shadow-lg">
            <span className="material-symbols-outlined text-[16px] text-[#FF7A00]">
              directions_bike
            </span>
            <span className="text-xs font-black text-[#1a1d20]">
              Paso 1: Dirígete al local de recojo
            </span>
          </div>

          {/* ETA Floating Pill */}
          <div className="bg-[#6C5CE7] text-white px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span>~8 min (1.2 km)</span>
          </div>
        </div>

        {/* Action Button: Abrir en Google Maps */}
        <button
          type="button"
          onClick={handleOpenGoogleMaps}
          className="self-end px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-xs font-bold text-[#1a1d20] flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-emerald-500">
            navigation
          </span>
          <span>Abrir en Google Maps</span>
        </button>
      </div>

      {/* Bottom Operational Card: Recojo en Comercio */}
      <div className="relative z-20 px-4 pb-20 mt-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
          {/* Order Code & Preparation Status */}
          <div className="flex items-center justify-between bg-[#f8f9fa] rounded-2xl p-3.5 border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block">
                PIN de Recojo
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[#FF7A00] tracking-wide">
                  1234
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2 py-0.5 rounded-md bg-slate-200 text-[10px] font-bold text-[#1a1d20] hover:bg-[#FF7A00] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block">
                Prep. en Cocina
              </span>
              <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Lista en ~3 min</span>
              </div>
            </div>
          </div>

          {/* Restaurant Details Strip */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] shrink-0">
              <span className="material-symbols-outlined text-[24px]">storefront</span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-[#1a1d20] truncate">
                Burger Night UPAO
              </h4>
              <p className="text-xs text-[#64748b] truncate">
                Av. América Sur 123 (Frente al campus)
              </p>
              <p className="text-[11px] text-[#6C5CE7] mt-0.5 font-semibold">
                Artículos: 1x Smash Doble + 1x Papas Rústicas
              </p>
            </div>
          </div>

          {/* Actions: "Llegué al local" & "Pedido recogido" */}
          <div className="flex flex-col gap-2.5 pt-1">
            {!arrivedAtStore ? (
              <button
                type="button"
                onClick={() => setArrivedAtStore(true)}
                className="w-full h-12 rounded-2xl bg-[#6C5CE7] hover:bg-[#5e4edb] active:scale-95 text-white font-extrabold text-sm transition-all shadow-[0_6px_25px_rgba(108,92,231,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">near_me</span>
                <span>Llegué al local</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>¡En el local! Muestra el PIN 1234</span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderReady}
                      onChange={(e) => setOrderReady(e.target.checked)}
                      className="rounded accent-[#FF7A00] cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-[#1a1d20]">Pedido listo</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={onConfirmPickup}
                  className="w-full h-13 rounded-2xl bg-[#FF7A00] hover:bg-[#ff891a] active:scale-95 text-white font-black text-sm transition-all shadow-[0_6px_25px_rgba(255,122,0,0.5)] flex items-center justify-center gap-2 border border-[#ffa043] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">inventory</span>
                  <span>Pedido recogido</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};