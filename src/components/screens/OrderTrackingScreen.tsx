import React, { useState } from 'react';
import { AppScreen, Order } from '../../types';
import { AfterFoodGoogleMap } from '../maps/AfterFoodGoogleMap';
import { TRUJILLO_COORDINATES } from '../maps/mapStyles';

interface OrderTrackingScreenProps {
  order: Order;
  onNavigate: (screen: AppScreen) => void;
  onCallCourier: () => void;
  onChatCourier: () => void;
  isLightMode?: boolean;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  order,
  onNavigate,
  onCallCourier,
  onChatCourier,
  isLightMode = true,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="flex flex-col w-full relative select-none pb-24 animate-in fade-in duration-200 bg-gray-50 text-gray-900">
      {/* Top Floating Order ID Pill sobre el mapa */}
      <div className="absolute top-2 right-4 pointer-events-none z-20">
        <div className="pointer-events-auto flex items-center bg-white/98 backdrop-blur-md border border-gray-300 px-3 py-1.5 rounded-full shadow-md">
          <span className="text-xs text-[#c2410c] font-black tracking-wide">{order.id}</span>
        </div>
      </div>

      {/* Interactive Google Maps Layer - Turn-by-Turn Delivery Tracking */}
      <div className="relative w-full h-[270px] overflow-hidden border-b border-gray-300 transition-colors">
        <AfterFoodGoogleMap
          center={TRUJILLO_COORDINATES.courierOnRouteToClient}
          zoom={17}
          isLightMode={isLightMode}
          height="100%"
          showRecenterButton={true}
          showHazardLayer={false}
          markers={[
            {
              id: 'store-destination',
              position: TRUJILLO_COORDINATES.restaurant,
              title: order.storeName || 'Burger Night UPAO',
              subtitle: 'Comercio',
              type: 'store',
            },
            {
              id: 'courier-loc',
              position: TRUJILLO_COORDINATES.courierOnRouteToClient,
              title: order.courier?.name || 'Repartidor',
              subtitle: 'En camino',
              type: 'courier',
            },
            {
              id: 'client-dest',
              position: TRUJILLO_COORDINATES.client,
              title: order.address?.street || 'Calle Los Pinos 456',
              subtitle: 'Destino de entrega',
              type: 'client',
            },
          ]}
          routePath={[
            TRUJILLO_COORDINATES.restaurant,
            TRUJILLO_COORDINATES.courierOnRouteToClient,
            TRUJILLO_COORDINATES.client,
          ]}
          routeColor="#ea580c"
        />
      </div>

      {/* Painel Inferior Sobre o Mapa com Alto Contraste */}
      <div className="relative -mt-6 z-30 flex flex-col bg-white text-gray-900 rounded-t-3xl border-t border-gray-300 shadow-2xl px-4 pt-3.5 pb-8">
        <div className="w-12 h-1 rounded-full bg-gray-300 mx-auto mb-3" />

        {/* ETA Header com Texto Escuro de Alto Contraste */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-[20px] font-bold">
                schedule
              </span>
              <span className="text-base sm:text-lg text-gray-900 font-black tracking-tight leading-tight">
                Llega en {order.estimatedArrivalMinutes} min
              </span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5 leading-tight font-medium">
              Ventana estimada:{' '}
              <strong className="font-extrabold text-gray-900">{order.timeWindow}</strong>
            </p>
          </div>
        </div>

        {/* 4-Step Animated Timeline Progress Track com Alto Contraste */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3 mb-3 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-gray-700 uppercase tracking-wider font-extrabold">
              Estado de entrega
            </span>
            <span className="text-xs text-[#c2410c] font-black">
              Paso 3 de 4
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-2">
            <div className="h-2 rounded-full bg-[#c2410c]" />
            <div className="h-2 rounded-full bg-[#c2410c]" />
            <div className="h-2 rounded-full bg-[#ea580c] ring-2 ring-orange-300" />
            <div className="h-2 rounded-full bg-gray-300" />
          </div>

          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-700 font-bold">Confirmado</span>
            <span className="text-gray-700 font-bold text-center">En preparación</span>
            <span className="text-gray-900 font-black text-center flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c] inline-block" />
              En camino
            </span>
            <span className="text-gray-500 font-semibold text-right">
              Entregado
            </span>
          </div>
        </div>

        {/* Security Delivery PIN Card com Alto Contraste */}
        <div className="bg-orange-50 rounded-xl p-3 mb-3 border-2 border-orange-300 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center text-[#c2410c] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px] font-bold">verified_user</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#9a3412] font-black uppercase tracking-wider">
                    Código PIN de entrega
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-orange-200 border border-orange-300 text-[#7c2d12] text-[9px] font-extrabold uppercase">
                    Obligatorio
                  </span>
                </div>
                <p className="text-[11px] text-gray-800 font-medium truncate leading-tight mt-0.5">
                  Indica este código al repartidor
                </p>
              </div>
            </div>
            <div className="flex items-center px-3 py-1.5 rounded-xl bg-white border-2 border-[#c2410c] shadow-xs flex-shrink-0">
              <span className="text-lg font-black text-[#7c2d12] tracking-widest leading-none font-mono">
                {order.securityPin}
              </span>
            </div>
          </div>
        </div>

        {/* Courier / Driver Profile Section Card com Alto Contraste */}
        <div className="bg-white border border-gray-300 rounded-xl p-3.5 mb-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={order.courier.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80'}
                alt={order.courier.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80';
                }}
                className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-orange-500"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-[11px] font-black">
                  verified
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <h2 className="text-xs sm:text-sm text-gray-900 font-black truncate leading-tight">
                {order.courier.name}
              </h2>
              <span className="text-[11px] text-gray-700 truncate leading-tight mt-0.5 font-medium">
                {order.courier.vehicle} •{' '}
                <strong className="text-gray-900 font-extrabold bg-gray-100 px-1 rounded border border-gray-200">
                  {order.courier.plate}
                </strong>
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className="material-symbols-outlined text-amber-500 text-[14px] fill-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-xs text-gray-900 font-black">
                  {order.courier.rating}
                </span>
                <span className="text-[10px] text-gray-600 font-medium">
                  ({order.courier.deliveriesCount}+ entregas)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Communication Micro Actions com Alto Contraste */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onCallCourier}
              aria-label="Llamar repartidor"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center justify-center transition-colors active:scale-90 border border-gray-300 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">call</span>
            </button>
            <button
              onClick={onChatCourier}
              aria-label="Abrir chat con repartidor"
              className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center justify-center transition-colors active:scale-90 border border-gray-300 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">chat_bubble</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-orange-600" />
            </button>
          </div>
        </div>

        {/* Order Items Drawer Accordion com Alto Contraste */}
        <div className="bg-white border border-gray-300 rounded-xl mb-3 overflow-hidden shadow-xs">
          <div
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 flex-shrink-0 border border-gray-200">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-900 font-extrabold truncate leading-tight">
                  {order.items.reduce((sum, it) => sum + it.quantity, 0)} productos • {order.storeName}
                </span>
                <span className="text-[11px] text-gray-700 truncate leading-tight mt-0.5 font-medium">
                  Total: <strong className="text-purple-950 font-black">S/ {order.total.toFixed(2)}</strong> •{' '}
                  {order.paymentMethod === 'card'
                    ? 'Tarjeta de crédito'
                    : order.paymentMethod === 'yape'
                    ? 'Pago con Yape'
                    : 'Pago en efectivo'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-700 text-[20px] font-bold">
              {isAccordionOpen ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {isAccordionOpen && (
            <div className="px-3.5 pb-3.5 pt-2 space-y-2 border-t border-gray-200 text-xs bg-gray-50/50">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 py-1 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-white border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-900 text-xs font-extrabold truncate">
                        <strong className="text-orange-700 font-black">{it.quantity}x</strong> {it.product.name}
                      </span>
                      {it.selectedExtras && it.selectedExtras.length > 0 && (
                        <span className="text-[10px] text-gray-600 truncate font-medium">
                          +{it.selectedExtras.map((e) => e.name).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-black text-purple-900 text-xs flex-shrink-0">
                    S/ {it.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}

              {order.paymentMethod === 'cash' && (
                <div className="mt-2 pt-2 bg-emerald-50 rounded-lg p-2.5 flex items-center justify-between text-emerald-950 text-xs border border-emerald-200 font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700">
                      payments
                    </span>
                    <span>
                      Pagará con S/{' '}
                      {(order.cashAmountGiven || order.total).toFixed(2)}
                    </span>
                  </div>
                  <span className="text-emerald-900 font-black">
                    Vuelto: S/ {(order.cashChangeReturned || 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main CTA Bar com Alto Contraste (#ea580c a #c2410c + texto branco negrito) */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onNavigate('rate_order')}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md shadow-orange-950/20 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span>
            <span>Confirmar Entrega y Calificar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
