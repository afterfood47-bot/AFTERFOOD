import React, { useState } from 'react';
import { AppScreen, Order } from '../../types';

interface MyOrdersScreenProps {
  activeOrder: Order | null;
  orders: Order[];
  onNavigate: (screen: AppScreen) => void;
  onRepeatOrder: (order: Order) => void;
}

export const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({
  activeOrder,
  orders,
  onNavigate,
  onRepeatOrder,
}) => {
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);

  const stages = [
    { step: 1, label: 'Confirmado' },
    { step: 2, label: 'En preparación' },
    { step: 3, label: 'En camino' },
    { step: 4, label: 'Entregado' },
  ];

  // Consolidar todos los pedidos (activo e historial) sin duplicados
  const allOrdersList = [
    ...(activeOrder ? [activeOrder] : []),
    ...orders.filter((o) => o.id !== activeOrder?.id),
  ];

  // 1. Pedido en curso: aquel pedido activo no entregado (step < 4)
  const activeOrderInCourse =
    activeOrder && activeOrder.step < 4
      ? activeOrder
      : allOrdersList.find((o) => o.step < 4) || null;

  // 2. Pedidos finalizados: todos los pedidos entregados (step >= 4)
  const finalizedOrders = allOrdersList.filter(
    (o) => o.step >= 4 && o.id !== activeOrderInCourse?.id
  );

  const hasNoOrders = !activeOrderInCourse && finalizedOrders.length === 0;

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-1 animate-in fade-in duration-200 gap-3">
      {/* Estado vacío cuando no hay pedidos activos ni historial */}
      {hasNoOrders && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-3 bg-card border border-border rounded-2xl shadow-sm mt-3">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground border border-border">
            <span className="material-symbols-outlined text-[32px] text-secondary">
              receipt_long
            </span>
          </div>
          <div className="flex flex-col gap-1 max-w-xs">
            <h3 className="text-base font-extrabold text-foreground">
              Aún no tienes pedidos registrados
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tus pedidos de comida, bebidas o farmacia aparecerán aquí con seguimiento en tiempo real tan pronto realices tu primera compra.
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="mt-2 h-10 px-6 rounded-full bg-secondary-container hover:brightness-110 active:scale-95 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">restaurant</span>
            <span>Explorar Restaurantes y Tiendas</span>
          </button>
        </div>
      )}

      {/* 1. SECCIÓN SUPERIOR: PEDIDO EN CURSO (ACTIVO) */}
      {activeOrderInCourse && (
        <section className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xs sm:text-sm font-extrabold text-foreground leading-tight">
                Pedido en Curso
              </h2>
            </div>
            <span className="text-[10px] text-secondary font-mono font-bold">
              {activeOrderInCourse.id}
            </span>
          </div>

          {/* Tarjeta del Pedido Activo */}
          <div className="bg-card border border-border rounded-2xl p-3 shadow-md flex flex-col gap-2.5">
            {/* Cabecera del restaurante */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-border">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={activeOrderInCourse.storeImage}
                  alt={activeOrderInCourse.storeName}
                  className="w-11 h-11 rounded-xl object-cover bg-muted border border-border flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-extrabold text-foreground truncate leading-tight">
                    {activeOrderInCourse.storeName}
                  </h3>
                  <span className="text-[11px] text-muted-foreground truncate block leading-tight mt-0.5">
                    {activeOrderInCourse.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ') || 'Pedido en preparación'}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[10px] text-muted-foreground block">Llegada</span>
                <span className="text-xs font-black text-secondary">
                  {activeOrderInCourse.timeWindow.split('–')[0]?.trim() || 'En 20 min'}
                </span>
              </div>
            </div>

            {/* BARRA DE ESTADO DEL ENVÍO EN TIEMPO REAL (No modificable manualmente por el usuario) */}
            <div className="flex flex-col gap-2 py-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-muted-foreground">
                  Estado en tiempo real:
                </span>
                <span className="font-extrabold text-[#FF7A00] tracking-wide">
                  {stages[(activeOrderInCourse.step || 1) - 1]?.label || 'Confirmado'}
                </span>
              </div>

              {/* Indicadores de etapa en tiempo real - Solo texto descriptivo sin iconos */}
              <div className="grid grid-cols-4 gap-1.5 items-center">
                {stages.map((st) => {
                  const currentStep = activeOrderInCourse.step || 1;
                  const isPassed = st.step <= currentStep;
                  const isCurrent = st.step === currentStep;

                  return (
                    <div
                      key={st.step}
                      className="flex flex-col items-center gap-1.5 select-none text-center"
                    >
                      {/* Barra de etapa */}
                      <div
                        className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#FF7A00] shadow-[0_0_8px_rgba(255,122,0,0.6)]'
                            : isPassed
                            ? 'bg-emerald-500'
                            : 'bg-muted'
                        }`}
                      />

                      {/* Únicamente el texto descriptivo del estado */}
                      <span
                        className={`text-[10px] truncate font-bold leading-none ${
                          isCurrent
                            ? 'text-[#FF7A00]'
                            : isPassed
                            ? 'text-emerald-500'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón directo para Ver Mapa y Repartidor en GPS (Color Púrpura) */}
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('order_tracking')}
                className="flex-1 h-9 rounded-full bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-[0.98] text-white text-[11px] font-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#6C5CE7]/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">
                  two_wheeler
                </span>
                <span>Ver GPS y Repartidor en vivo</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. SECCIÓN INFERIOR: HISTORIAL DE PEDIDOS FINALIZADOS */}
      {finalizedOrders.length > 0 && (
        <section className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-extrabold text-foreground leading-tight">
              Pedidos Finalizados
            </h2>
            <span className="text-[10px] text-muted-foreground font-semibold">
              {finalizedOrders.length} {finalizedOrders.length === 1 ? 'pedido' : 'pedidos'}
            </span>
          </div>

          {/* Listado del historial */}
          <div className="flex flex-col gap-2.5">
            {finalizedOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrderDetail(order)}
                className="bg-card border border-border rounded-xl p-3 shadow-sm flex flex-col gap-2 hover:border-primary/40 transition-colors cursor-pointer"
              >
                {/* Encabezado: Fecha, Estado y Código */}
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-border flex-wrap gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="material-symbols-outlined text-[14px] text-emerald-500">
                      check_circle
                    </span>
                    <span className="text-[11px] font-bold text-emerald-500">
                      Entregado
                    </span>
                    <span className="text-muted-foreground">·</span>
                    {order.rating ? (
                      <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-black flex items-center gap-0.5 border border-purple-200">
                        <span
                          className="material-symbols-outlined text-[11px] text-purple-600 fill-1"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        Calificado ({order.rating.driverRating || 5}.0)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-black border border-amber-300">
                        Pendiente de Calificar
                      </span>
                    )}
                    <span className="text-muted-foreground">·</span>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {order.createdAt || 'Hoy'}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono font-bold">
                    {order.id}
                  </span>
                </div>

                {/* Contenido: Tienda, resumen de productos y precio */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={order.storeImage}
                      alt={order.storeName}
                      className="w-11 h-11 rounded-lg object-cover bg-muted flex-shrink-0 border border-border"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-foreground truncate leading-tight">
                        {order.storeName}
                      </h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 leading-tight mt-0.5">
                        {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                      </p>
                      <span className="text-xs font-extrabold text-foreground leading-tight block mt-0.5">
                        Total: S/ {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Acciones: Calificar si pendiente + Ver Detalle */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {!order.rating && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('rate_order');
                        }}
                        className="h-8 px-2.5 rounded-full bg-amber-500/15 hover:bg-amber-500 text-amber-700 hover:text-white text-[10px] font-black flex items-center justify-center gap-1 flex-shrink-0 transition-all active:scale-95 border border-amber-500/30 cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          star
                        </span>
                        <span>Calificar</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrderDetail(order);
                      }}
                      className="h-8 px-3 rounded-full bg-muted hover:bg-secondary-container hover:text-white text-secondary text-[10px] font-black flex items-center justify-center gap-1 flex-shrink-0 transition-all active:scale-95 border border-border shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        visibility
                      </span>
                      <span>Ver detalle</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. MODAL DE DETALLE DEL PEDIDO (Muestra fotos reales, productos y desglose exacto) */}
      {selectedOrderDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedOrderDetail(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-4 shadow-2xl flex flex-col gap-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  receipt_long
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-foreground">
                    Detalle del Pedido {selectedOrderDetail.id}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    {selectedOrderDetail.createdAt} · Entregado
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="w-7 h-7 rounded-full bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                aria-label="Cerrar detalle"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Tienda */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-muted border border-border">
              <img
                src={selectedOrderDetail.storeImage}
                alt={selectedOrderDetail.storeName}
                className="w-10 h-10 rounded-lg object-cover bg-card border border-border"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-foreground block truncate">
                  {selectedOrderDetail.storeName}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Despacho nocturno AfterFood
                </span>
              </div>
            </div>

            {/* Lista detallada de productos comprados con fotos sincronizadas */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-foreground">
                Productos comprados ({selectedOrderDetail.items.length})
              </span>
              <div className="flex flex-col gap-2">
                {selectedOrderDetail.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-muted/60 border border-border gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-card border border-border flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-foreground truncate">
                          {item.quantity}x {item.product.name}
                        </span>
                        {item.specialInstructions && (
                          <span className="text-[10px] text-muted-foreground italic truncate">
                            Nota: "{item.specialInstructions}"
                          </span>
                        )}
                        {item.selectedExtras && item.selectedExtras.length > 0 && (
                          <span className="text-[9px] text-secondary truncate">
                            +{item.selectedExtras.map((e) => e.name).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-foreground flex-shrink-0">
                      S/ {item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dirección de entrega */}
            <div className="p-2.5 rounded-xl bg-muted/40 border border-border flex flex-col gap-1 text-xs">
              <span className="font-bold text-foreground flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
                Dirección de entrega
              </span>
              <span className="text-muted-foreground pl-5 text-[11px]">
                {selectedOrderDetail.address.street}, {selectedOrderDetail.address.city}
              </span>
            </div>

            {/* Desglose final */}
            <div className="p-2.5 rounded-xl bg-muted/40 border border-border flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">S/ {selectedOrderDetail.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span className="font-semibold text-foreground">S/ {selectedOrderDetail.deliveryFee.toFixed(2)}</span>
              </div>
              {selectedOrderDetail.discount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Descuento de bienvenida</span>
                  <span className="font-semibold">- S/ {selectedOrderDetail.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="h-px bg-border my-0.5" />
              <div className="flex justify-between font-bold text-sm text-foreground">
                <span>Total</span>
                <span className="text-secondary">S/ {selectedOrderDetail.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Botón repetir pedido */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  onRepeatOrder(selectedOrderDetail);
                  setSelectedOrderDetail(null);
                }}
                className="w-full h-11 rounded-full bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-[#6C5CE7]/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">replay</span>
                <span>Repetir este pedido</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
