import React, { useRef, useState } from 'react';
import { AppScreen } from '../../types';
import { AfterFoodGoogleMap } from '../maps/AfterFoodGoogleMap';
import { TRUJILLO_COORDINATES, TRUJILLO_HAZARD_ZONES } from '../maps/mapStyles';

interface CourierToClientScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onArrivedAtClient: () => void;
  isLightMode?: boolean;
}

export const CourierToClientScreen: React.FC<CourierToClientScreenProps> = ({
  onNavigate,
  onArrivedAtClient,
  isLightMode,
}) => {
  const [isSheetExpanded, setIsSheetExpanded] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<'none' | 'call' | 'chat'>('none');
  const [chatMessages, setChatMessages] = useState<string[]>([
    '¡Hola Juan! Ya recogí tu pedido en Burger Night UPAO y voy en camino a Calle Los Pinos 456.',
  ]);
  const [newMsg, setNewMsg] = useState('');

  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = touchCurrentY.current - touchStartY.current;
    if (diff > 45) {
      setIsSheetExpanded(false);
    } else if (diff < -45) {
      setIsSheetExpanded(true);
    }
  };

  const handleOpenGoogleMaps = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=Calle+Los+Pinos+456+Urb+El+Recreo+Trujillo';
    window.open(url, '_blank');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [...prev, newMsg.trim()]);
    setNewMsg('');
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-[#f8f9fa] text-[#1a1d20] select-none animate-in fade-in duration-200">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AfterFoodGoogleMap
          center={TRUJILLO_COORDINATES.courierOnRouteToClient}
          zoom={18}
          isLightMode={isLightMode}
          markers={[
            {
              id: 'store-origin',
              position: TRUJILLO_COORDINATES.restaurant,
              title: 'Burger Night (Recogido)',
              type: 'store',
            },
            {
              id: 'courier-loc',
              position: TRUJILLO_COORDINATES.courierOnRouteToClient,
              title: 'Tu ubicación',
              type: 'courier',
            },
            {
              id: 'client-dest',
              position: TRUJILLO_COORDINATES.client,
              title: 'Cliente: Juan Pérez',
              subtitle: 'Calle Los Pinos 456',
              type: 'client',
            },
          ]}
          routePath={[
            TRUJILLO_COORDINATES.restaurant,
            TRUJILLO_COORDINATES.courierOnRouteToClient,
            { lat: -8.1210, lng: -79.0285 },
            TRUJILLO_COORDINATES.client,
          ]}
          routeColor="#10B981"
          showRecenterButton={true}
          hazardAlerts={TRUJILLO_HAZARD_ZONES}
          showHazardLayer={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/90 pointer-events-none" />
      </div>

      <div className="relative z-20 px-4 pt-3 flex flex-col gap-2.5">
        
        {/* Cartão de Informação PIN de Entrega (Para pedir ao cliente) */}
        <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider">Pedido</span>
            <span className="text-base font-black text-[#1a1d20]">#8472</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider">PIN Entrega</span>
            <span className="text-xl font-black text-[#6C5CE7] leading-none">Pedir</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-lg">
            <span className="material-symbols-outlined text-[16px] text-emerald-500">
              sports_motorsports
            </span>
            <span className="text-xs font-black text-[#1a1d20]">
              Paso 2: En camino al cliente
            </span>
          </div>

          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span>~11 min (2.8 km)</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsSheetExpanded(!isSheetExpanded)}
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white border border-slate-200 text-xs font-black text-[#1a1d20] flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-[#6C5CE7]">
              {isSheetExpanded ? 'unfold_less' : 'unfold_more'}
            </span>
            <span>{isSheetExpanded ? 'Ver mapa completo' : 'Ver datos cliente'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenGoogleMaps}
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-xs font-bold text-[#1a1d20] flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-500">
              navigation
            </span>
            <span>Abrir en Google Maps</span>
          </button>
        </div>
      </div>

      <div className="relative z-30 px-3 pb-20 mt-auto">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`w-full bg-white border border-slate-200 rounded-3xl shadow-[0_-8px_35px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out flex flex-col overflow-hidden ${
            isSheetExpanded ? 'p-4 sm:p-5' : 'p-3 hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <div
            onClick={() => setIsSheetExpanded(!isSheetExpanded)}
            className="w-full flex flex-col items-center justify-center pt-0.5 pb-2 cursor-pointer group"
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#FF7A00] transition-colors" />
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#64748b] group-hover:text-[#1a1d20] mt-1">
              <span>{isSheetExpanded ? 'Desliza hacia abajo para colapsar mapa' : 'Desliza o toca para expandir información del cliente'}</span>
              <span className="material-symbols-outlined text-[14px]">
                {isSheetExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
              </span>
            </div>
          </div>

          {!isSheetExpanded ? (
            <div
              onClick={() => setIsSheetExpanded(true)}
              className="flex items-center justify-between gap-3 pt-1"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Juan Pérez"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-[#1a1d20] truncate">
                    Juan Pérez • Calle Los Pinos 456
                  </p>
                  <p className="text-[10px] text-[#64748b] truncate">
                    Urb. El Recreo • +51 948 112 309
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal('call');
                  }}
                  className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                  title="Llamar"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onArrivedAtClient();
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-sm flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">where_to_vote</span>
                  <span>Llegué</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5 animate-in fade-in duration-200">
              <div className="flex items-start gap-3 bg-[#f8f9fa] rounded-2xl p-3.5 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <span className="material-symbols-outlined text-[22px]">location_on</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block">
                    Dirección de Entrega
                  </span>
                  <p className="text-sm font-black text-[#1a1d20] truncate">
                    Calle Los Pinos 456
                  </p>
                  <p className="text-xs text-[#64748b] truncate">
                    Urb. El Recreo, Trujillo • Timbre 2B (Dpto. 201)
                  </p>
                  <p className="text-[11px] text-[#6C5CE7] mt-0.5 font-semibold">
                    Referencia: Portón negro frente al parque
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Juan Pérez"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[#1a1d20] truncate">Juan Pérez</p>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">phone</span>
                      <span>+51 948 112 309</span>
                    </p>
                    <p className="text-[10px] text-[#64748b]">Cliente frecuente AfterFood</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveModal('call')}
                    className="w-11 h-11 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center active:scale-95 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.35)] cursor-pointer"
                    title="Llamar a Juan Pérez"
                  >
                    <span className="material-symbols-outlined text-[22px]">call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal('chat')}
                    className="w-11 h-11 rounded-2xl bg-[#6C5CE7] text-white hover:bg-[#5b4cdb] flex items-center justify-center active:scale-95 transition-all shadow-[0_4px_14px_rgba(108,92,231,0.35)] cursor-pointer"
                    title="Mensaje a Juan Pérez"
                  >
                    <span className="material-symbols-outlined text-[22px]">chat</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-2.5 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-[#64748b] font-medium">Contenido del pedido:</span>
                <span className="text-[#1a1d20] font-black">1x Smash Doble + 1x Papas Rústicas</span>
              </div>

              <button
                type="button"
                onClick={onArrivedAtClient}
                className="w-full h-13 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-sm transition-all shadow-[0_8px_25px_rgba(16,185,129,0.45)] flex items-center justify-center gap-2 border border-emerald-400 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">where_to_vote</span>
                <span>Llegué a la ubicación (Pedir PIN)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {activeModal === 'call' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xs bg-white border border-slate-200 rounded-3xl p-6 text-center flex flex-col items-center gap-3 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px] animate-pulse">call</span>
            </div>
            <h4 className="font-title-md font-bold text-[#1a1d20] text-base">
              Llamando a Juan Pérez
            </h4>
            <a
              href="tel:+51948112309"
              className="text-sm text-emerald-600 font-extrabold hover:underline"
            >
              +51 948 112 309
            </a>
            <div className="flex gap-2 w-full mt-2">
              <a
                href="tel:+51948112309"
                className="flex-1 h-10 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Marcar</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="flex-1 h-10 rounded-xl bg-slate-100 text-[#1a1d20] font-bold text-xs border border-transparent hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'chat' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 max-h-[70vh] shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6C5CE7]">chat</span>
                <span className="text-xs font-bold text-[#1a1d20]">Chat con Juan Pérez</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="text-[#64748b] hover:text-[#1a1d20] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2 py-2 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-[#6C5CE7] text-white rounded-2xl p-2.5 max-w-[85%] self-end shadow-xs"
                >
                  {msg}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe un mensaje al cliente..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 bg-[#f8f9fa] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#1a1d20] outline-none focus:ring-2 focus:ring-[#6C5CE7]"
              />
              <button
                type="submit"
                className="px-3.5 rounded-xl bg-[#6C5CE7] text-white font-bold text-xs active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};