import React, { useState } from 'react';
import { MOCK_COURIER, STORES_DATA } from '../../data/mockData';
import { AppScreen, Order, Store } from '../../types';

interface RatingScreenProps {
  order?: Order | null;
  store?: Store | null;
  initialDriverRating?: number;
  initialRestaurantRating?: number;
  initialDriverComment?: string;
  initialRestaurantComment?: string;
  initialSelectedTip?: '0' | '2' | '3' | '5' | null;
  tipAmount?: number;
  tipPaid?: boolean;
  onUpdateForm?: (data: {
    driverRating?: number;
    restaurantRating?: number;
    driverComment?: string;
    restaurantComment?: string;
    selectedTip?: '0' | '2' | '3' | '5' | null;
  }) => void;
  onNavigate: (screen: AppScreen) => void;
  onSkip?: () => void;
  onConfirmTip?: (amount: number) => void;
  onFinalizeRating?: (data: {
    driverRating: number;
    restaurantRating: number;
    driverComment: string;
    restaurantComment: string;
    tipAmount: number;
    tipPaid: boolean;
  }) => void;
}

export const RatingScreen: React.FC<RatingScreenProps> = ({
  order,
  store,
  initialDriverRating = 0,
  initialRestaurantRating = 0,
  initialDriverComment = '',
  initialRestaurantComment = '',
  initialSelectedTip = null,
  tipAmount = 3.0,
  tipPaid = false,
  onUpdateForm,
  onNavigate,
  onSkip,
  onConfirmTip,
  onFinalizeRating,
}) => {
  const currentOrder = order || null;

  // Resolución dinámica y exacta del comercio donde se realizó la compra
  const matchingStore = STORES_DATA.find(
    (s) =>
      (currentOrder?.storeName && s.name.toLowerCase() === currentOrder.storeName.toLowerCase()) ||
      (currentOrder?.items?.[0]?.product.storeId && s.id === currentOrder.items[0].product.storeId) ||
      (store && s.id === store.id)
  );

  const resolvedStoreName =
    currentOrder?.storeName || store?.name || matchingStore?.name || 'Comercio AfterFood';
  const resolvedStoreImage =
    currentOrder?.storeImage || store?.image || matchingStore?.image || currentOrder?.items?.[0]?.product.image || STORES_DATA[0].image;
  const resolvedStoreCategory =
    matchingStore?.categoryTag || store?.categoryTag || 'Especialidad nocturna';
  const totalItemCount =
    currentOrder?.items?.reduce((sum, it) => sum + it.quantity, 0) || 1;
  const orderNumber = currentOrder?.id || '#AF-89241';
  const courierData = currentOrder?.courier || MOCK_COURIER;

  // Estados persistidos: inicializados con los valores del formulario
  const [driverRating, setDriverRating] = useState<number>(initialDriverRating);
  const [restaurantRating, setRestaurantRating] = useState<number>(initialRestaurantRating);
  const [driverComment, setDriverComment] = useState<string>(initialDriverComment);
  const [restaurantComment, setRestaurantComment] = useState<string>(initialRestaurantComment);
  const [tip, setTip] = useState<'0' | '2' | '3' | '5' | null>(
    tipPaid ? ((tipAmount?.toString() as any) || '3') : initialSelectedTip
  );
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const driverRatingTexts = [
    'Muy mejorable',
    'Regular',
    'Buen servicio',
    '¡Muy buen servicio!',
    '¡Excelente servicio!',
  ];

  const restaurantRatingTexts = [
    'Mala experiencia',
    'Aceptable',
    'Buena sazón',
    '¡Muy rico!',
    '¡Comida deliciosa!',
  ];

  const handleDriverRatingChange = (val: number) => {
    setDriverRating(val);
    if (onUpdateForm) onUpdateForm({ driverRating: val });
  };

  const handleRestaurantRatingChange = (val: number) => {
    setRestaurantRating(val);
    if (onUpdateForm) onUpdateForm({ restaurantRating: val });
  };

  const handleDriverCommentChange = (text: string) => {
    setDriverComment(text);
    if (onUpdateForm) onUpdateForm({ driverComment: text });
  };

  const handleRestaurantCommentChange = (text: string) => {
    setRestaurantComment(text);
    if (onUpdateForm) onUpdateForm({ restaurantComment: text });
  };

  const handleTipSelect = (val: '0' | '2' | '3' | '5') => {
    setTip(val);
    if (onUpdateForm) onUpdateForm({ selectedTip: val });
  };

  const handleGoToTipPayment = () => {
    const tipNum = Number(tip || 3);
    if (onConfirmTip) onConfirmTip(tipNum);
    onNavigate('tip_payment_select');
  };

  const handleFinalize = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      const effectiveTip = tipPaid ? tipAmount : Number(tip || 0);
      if (onFinalizeRating) {
        onFinalizeRating({
          driverRating: driverRating || 5,
          restaurantRating: restaurantRating || 5,
          driverComment,
          restaurantComment,
          tipAmount: effectiveTip,
          tipPaid,
        });
      } else {
        setTimeout(() => {
          onNavigate('orders');
        }, 600);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-40 pt-2 animate-in fade-in duration-200">
      {/* Banner Superior con Identificador Dinámico */}
      <div className="relative mb-3 p-3 rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary-container/20 blur-2xl pointer-events-none" />
        <div className="flex items-start gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center shrink-0 text-primary">
            <span
              className="material-symbols-outlined text-[18px] fill-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rate_review
            </span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <span className="px-1.5 py-0.2 rounded-full bg-primary text-white text-[9px] tracking-wide uppercase font-bold">
                {orderNumber} • Entregado
              </span>
              <span className="flex items-center gap-1 text-secondary text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
                24/7 Flash
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              Tu opinión nos ayuda a mantener un servicio de alta calidad.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Evalúa al Repartidor (Datos Dinámicos + Persistencia de Estrellas y Comentario) */}
      <section className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm text-foreground flex items-center gap-1.5 font-bold leading-tight">
            <span className="material-symbols-outlined text-primary text-[17px]">
              two_wheeler
            </span>
            Evalúa al Repartidor
          </h2>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">
            Paso 1 de 2
          </span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <img
                src={courierData.avatar}
                alt={courierData.name}
                className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-primary"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                <span
                  className="material-symbols-outlined text-[11px] fill-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm text-foreground font-bold truncate leading-tight">
                  {courierData.name}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-muted text-primary text-[9px] font-bold border border-border">
                  Repartidor Oficial
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                {courierData.vehicle} • Trujillo Centro
              </span>
            </div>
          </div>

          {/* Stars Repartidor */}
          <div className="flex flex-col items-center justify-center py-2 bg-muted rounded-xl px-2 border border-border">
            <div className="flex items-center gap-2 mb-0.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleDriverRatingChange(val)}
                  className="hover:scale-110 active:scale-95 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-[26px] transition-colors ${
                      driverRating > 0 && val <= driverRating ? 'text-purple-600 fill-1' : 'text-[#474555]'
                    }`}
                    style={{ fontVariationSettings: driverRating > 0 && val <= driverRating ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            <span className="text-[11px] text-purple-700 font-bold leading-tight">
              {driverRating > 0 ? `${driverRatingTexts[driverRating - 1]} (${driverRating}.0)` : 'Toca las estrellas para calificar'}
            </span>
          </div>

          <textarea
            rows={2}
            value={driverComment}
            onChange={(e) => handleDriverCommentChange(e.target.value)}
            placeholder="Deja un comentario u observación sobre el repartidor (opcional)..."
            className="w-full bg-input text-foreground placeholder:text-muted-foreground text-xs rounded-xl p-2 outline-none focus:ring-1 focus:ring-primary border border-border resize-none"
          />
        </div>
      </section>

      {/* 2. Evalúa al Restaurante (Datos 100% Dinámicos de la Tienda de Compra) */}
      <section className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm text-foreground flex items-center gap-1.5 font-bold leading-tight">
            <span className="material-symbols-outlined text-purple-600 text-[17px]">
              storefront
            </span>
            Evalúa al Restaurante / Local
          </h2>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">
            Paso 2 de 2
          </span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <img
                src={resolvedStoreImage}
                alt={resolvedStoreName}
                className="w-10 h-10 rounded-xl object-cover shadow-md border border-purple-600/40"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shadow">
                <span
                  className="material-symbols-outlined text-[11px] fill-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm text-foreground font-bold truncate leading-tight">
                {resolvedStoreName}
              </span>
              <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                {resolvedStoreCategory} • {totalItemCount} {totalItemCount === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>

          {/* Stars Restaurante */}
          <div className="flex flex-col items-center justify-center py-2 bg-muted rounded-xl px-2 border border-border">
            <div className="flex items-center gap-2 mb-0.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleRestaurantRatingChange(val)}
                  className="hover:scale-110 active:scale-95 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-[26px] transition-colors ${
                      restaurantRating > 0 && val <= restaurantRating
                        ? 'text-purple-600 fill-1'
                        : 'text-muted-foreground/40'
                    }`}
                    style={{ fontVariationSettings: restaurantRating > 0 && val <= restaurantRating ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            <span className="text-[11px] text-purple-700 font-bold leading-tight">
              {restaurantRating > 0 ? `${restaurantRatingTexts[restaurantRating - 1]} (${restaurantRating}.0)` : 'Toca las estrellas para calificar'}
            </span>
          </div>

          <textarea
            rows={2}
            value={restaurantComment}
            onChange={(e) => handleRestaurantCommentChange(e.target.value)}
            placeholder="¿Qué tal estuvo tu comida? Cuéntanos tu experiencia (opcional)..."
            className="w-full bg-input text-foreground placeholder:text-muted-foreground text-xs rounded-xl p-2 outline-none focus:ring-1 focus:ring-primary border border-border resize-none"
          />
        </div>
      </section>

      {/* 3. Propina Section con Etiqueta Dinámica "Propina seleccionada" */}
      <section className="bg-card border border-border rounded-xl p-3 shadow-sm mb-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-purple-600 text-[18px] fill-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              volunteer_activism
            </span>
            <span className="text-xs text-foreground font-bold leading-tight">
              ¿Deseas agregar una propina para el repartidor?
            </span>
          </div>
          {tipPaid && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black">
              ✓ Pagada
            </span>
          )}
        </div>

        {/* ETIQUETA DESTACADA: "Propina seleccionada" cuando se haya elegido monto */}
        {(tipPaid || (tip && tip !== '0')) && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-foreground animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-purple-600">
                payments
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">
                  Propina seleccionada:{' '}
                  <strong className="text-purple-600 font-black">
                    S/ {(tipPaid ? tipAmount : Number(tip)).toFixed(2)}
                  </strong>
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {tipPaid
                    ? 'Procesada con éxito mediante Yape / Tarjeta'
                    : 'Será debitada al confirmar o pagar'}
                </span>
              </div>
            </div>
            {tipPaid ? (
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-black uppercase">
                Confirmada
              </span>
            ) : (
              <button
                type="button"
                onClick={handleGoToTipPayment}
                className="text-[10px] text-primary hover:underline font-bold"
              >
                Pagar ahora →
              </button>
            )}
          </div>
        )}

        {/* Botones de montos de propina */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: '0', label: 'Sin propina' },
            { id: '2', label: 'S/ 2.00' },
            { id: '3', label: 'S/ 3.00' },
            { id: '5', label: 'S/ 5.00' },
          ].map((item) => {
            const isSelected = tip === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTipSelect(item.id as any)}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-semibold text-center transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow font-bold'
                    : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Botón para ir al medio de pago de la propina */}
        {tip && tip !== '0' && !tipPaid && (
          <button
            type="button"
            onClick={handleGoToTipPayment}
            className="w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm bg-primary hover:bg-primary/90 text-white"
          >
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span>
              Ir a Pagar Propina de S/ {Number(tip).toFixed(2)} (Yape o Tarjeta)
            </span>
          </button>
        )}
      </section>

      {/* 4. Sticky Bottom Action: Botón explícito "Finalizar Calificación" con PADDING inferior */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pt-3 pb-8 bg-card/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_25px_rgba(0,0,0,0.1)] z-50 flex flex-col items-center gap-1.5">
        <div className="max-w-md mx-auto w-full flex flex-col items-center gap-1">
          <button
            type="button"
            disabled={isSending || isSuccess}
            onClick={handleFinalize}
            className={`w-full h-11 rounded-full text-xs shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-bold ${
              isSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#FF7A00] to-[#E02644] text-white shadow-[0_8px_25px_-4px_rgba(255,122,0,0.5)] hover:brightness-110 cursor-pointer'
            }`}
          >
            {isSending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
                <span>Guardando evaluación...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>¡Calificación y propina guardadas!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="text-sm font-black">Finalizar Calificación</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (onSkip) {
                onSkip();
              } else {
                onNavigate('orders');
              }
            }}
            className="py-1 px-4 text-muted-foreground hover:text-foreground text-[11px] transition-colors font-semibold cursor-pointer"
          >
            Omitir y ver mis pedidos
          </button>
        </div>
      </div>
    </div>
  );
};