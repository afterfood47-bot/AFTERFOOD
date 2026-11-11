import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_CHECKOUT_ITEMS, STORES_DATA } from '../../data/mockData';
import { Address, AppScreen, CartItem, Store } from '../../types';

interface CheckoutScreenProps {
  currentAddress: Address;
  items?: CartItem[];
  store?: Store;
  paymentMethod: 'card' | 'yape' | 'cash' | null;
  savedCard?: { last4: string; brand: string } | null;
  cashAmountGiven: number;
  cashChangeReturned: number;
  onSelectPaymentMethod: (method: 'card' | 'yape' | 'cash') => void;
  onOpenCashModal: () => void;
  onOpenAddressSelector: () => void;
  onConfirmOrder: () => void;
  onNavigate: (screen: AppScreen) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  currentAddress,
  items = INITIAL_CHECKOUT_ITEMS,
  store,
  paymentMethod = 'card',
  savedCard,
  cashAmountGiven = 50.0,
  cashChangeReturned,
  onSelectPaymentMethod,
  onOpenCashModal,
  onOpenAddressSelector,
  onConfirmOrder,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(true);

  const activeMethod = paymentMethod || 'card';

  const itemsToDisplay = items && items.length > 0 ? items : INITIAL_CHECKOUT_ITEMS;

  const matchingStore = STORES_DATA.find(
    (s) =>
      s.id === itemsToDisplay[0]?.product.storeId ||
      s.name.toLowerCase() === itemsToDisplay[0]?.product.storeName?.toLowerCase()
  );
  const resolvedStoreName =
    itemsToDisplay[0]?.product.storeName || matchingStore?.name || store?.name || 'AfterFood Store';
  const resolvedStoreImage =
    matchingStore?.image || store?.image || itemsToDisplay[0]?.product.image || STORES_DATA[0].image;

  const subtotal = itemsToDisplay.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 4.5;
  const discount = 4.5; // Cupom de boas-vindas / frete grátis
  const total = Math.max(0, subtotal + shipping - discount);

  // Vuelto calculado para efectivo
  const calculatedChange = Math.max(0, (cashAmountGiven || total) - total);

  // Selección y enrutamiento hacia la configuración de cada medio de pago
  const handleSelectCard = () => {
    onSelectPaymentMethod('card');
    onNavigate('payment_card');
  };

  const handleSelectYape = () => {
    onSelectPaymentMethod('yape');
  };

  const handleSelectCash = () => {
    onSelectPaymentMethod('cash');
    onOpenCashModal();
  };

  // Confirmar Pedido
  const handleConfirmOrder = () => {
    if (activeMethod === 'yape') {
      onNavigate('payment_yape');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmOrder();
    }, 400);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pb-60 animate-in fade-in duration-200 bg-gray-50 text-gray-900">
      {/* 1. Header: Revisar pedido */}
      <section className="px-4 pt-2 mb-2">
        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-gray-900 leading-tight">
              Revisar pedido
            </h1>
          </div>
          <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Total: S/ {total.toFixed(2)}
          </span>
        </div>
      </section>

      {/* 2. Resumen de la Compra (Restaurante y Productos) */}
      <section className="px-4 mb-2.5">
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={resolvedStoreImage}
                alt={resolvedStoreName}
                className="w-10 h-10 rounded-xl object-cover shrink-0 border border-gray-100"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-900 truncate font-extrabold">
                  {resolvedStoreName}
                </span>
                <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[12px] text-emerald-600">
                    schedule
                  </span>
                  <span>Entrega en 20–30 min</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowItemDetails(!showItemDetails)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5 cursor-pointer bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200"
            >
              <span>{showItemDetails ? 'Ocultar' : 'Ver'} ({itemsToDisplay.length})</span>
              <span className="material-symbols-outlined text-[16px]">
                {showItemDetails ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>

          {/* Lista de productos */}
          {showItemDetails && (
            <div className="flex flex-col gap-2 pt-1 animate-in fade-in">
              {itemsToDisplay.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="flex items-center justify-between gap-2.5 py-1.5 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-11 h-11 rounded-lg object-cover shrink-0 bg-gray-100 border border-gray-200"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-gray-900 truncate">
                        {item.quantity}x {item.product.name}
                      </span>
                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <span className="text-[10px] text-purple-700 font-semibold truncate">
                          +{item.selectedExtras.map((e) => e.name).join(', ')}
                        </span>
                      )}
                      {item.specialInstructions && (
                        <span className="text-[10px] text-gray-500 italic truncate">
                          "{item.specialInstructions}"
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-black text-gray-900 shrink-0">
                    S/ {item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Dirección de Entrega */}
      <section className="px-4 mb-2.5">
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-[18px]">
                location_on
              </span>
              <span>Dirección de Entrega</span>
            </span>
            <button
              type="button"
              onClick={onOpenAddressSelector}
              className="text-xs text-orange-600 hover:text-orange-700 font-bold cursor-pointer"
            >
              Cambiar
            </button>
          </div>

          <div className="flex flex-col pl-6">
            <span className="text-xs font-bold text-gray-900">
              {currentAddress?.tag || 'Casa / Destino'}
            </span>
            <span className="text-gray-600 text-[11px] truncate">
              {currentAddress?.street?.trim() || 'Av. Larco 845, Trujillo'}
            </span>
            {currentAddress?.reference && (
              <span className="text-gray-500 text-[10px]">
                Ref: {currentAddress.reference}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 4. Configuración del Medio de Pago */}
      <section className="px-4 mb-2.5">
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-[18px]">
                payments
              </span>
              <span>Configuración del Medio de Pago</span>
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Selecciona uno
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Opción 1: Tarjeta (Cartão) */}
            <div
              onClick={handleSelectCard}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                activeMethod === 'card'
                  ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-xs'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    activeMethod === 'card'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-gray-900">
                      Tarjeta (Crédito / Débito)
                    </span>
                    {activeMethod === 'card' && (
                      <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700 text-[9px] font-black uppercase">
                        Seleccionado
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-600">
                    {savedCard
                      ? `${savedCard.brand} terminada en •••• ${savedCard.last4}`
                      : 'Configurar tarjeta Visa o Mastercard'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCard();
                  }}
                  className="text-[11px] text-orange-600 hover:text-orange-700 font-bold hover:underline bg-white px-2 py-1 rounded-md border border-orange-200 shadow-2xs"
                >
                  {savedCard ? 'Cambiar' : 'Configurar'}
                </button>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    activeMethod === 'card'
                      ? 'border-orange-600 bg-orange-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {activeMethod === 'card' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Opción 2: Yape (Código QR) */}
            <div
              onClick={handleSelectYape}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                activeMethod === 'yape'
                  ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-600/20 shadow-xs'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-black text-sm ${
                    activeMethod === 'yape'
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  Y
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-gray-900">
                      Yape / Plin
                    </span>
                    {activeMethod === 'yape' && (
                      <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 text-[9px] font-black uppercase">
                        Seleccionado
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-600">
                    Escaneo de código QR disponible al confirmar pedido
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectYape();
                  }}
                  className={`text-[11px] font-bold px-2 py-1 rounded-md border shadow-2xs transition-colors ${
                    activeMethod === 'yape'
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'bg-white text-purple-700 hover:text-purple-800 border-purple-200'
                  }`}
                >
                  {activeMethod === 'yape' ? 'Seleccionado' : 'Seleccionar'}
                </button>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    activeMethod === 'yape'
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {activeMethod === 'yape' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Opción 3: Efectivo (Dinheiro - Troco / Vuelto) */}
            <div
              onClick={handleSelectCash}
              className={`p-3 rounded-xl border flex flex-col gap-2 cursor-pointer transition-all ${
                activeMethod === 'cash'
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 shadow-xs'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      activeMethod === 'cash'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-gray-900">
                        Efectivo contraentrega
                      </span>
                      {activeMethod === 'cash' && (
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">
                          Seleccionado
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-600">
                      Pagas al recibir. Vuelto: S/ {calculatedChange.toFixed(2)} (Pagas con: S/{' '}
                      {cashAmountGiven.toFixed(2)})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCash();
                    }}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold hover:underline bg-white px-2 py-1 rounded-md border border-emerald-200 shadow-2xs"
                  >
                    Troco
                  </button>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      activeMethod === 'cash'
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {activeMethod === 'cash' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>

              {activeMethod === 'cash' && (
                <div
                  className="pt-2 border-t border-emerald-200 flex items-center justify-between text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-emerald-800 font-medium text-[11px]">
                    ¿Cambiar monto de billete?
                  </span>
                  <button
                    type="button"
                    onClick={onOpenCashModal}
                    className="text-emerald-700 font-extrabold text-[11px] underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    <span>Configurar troco</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Resumen Financiero de la Orden */}
      <section className="px-4 mb-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-2">
          <span className="text-xs font-extrabold text-gray-900">
            Resumen de Cuenta
          </span>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">S/ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Costo de envío</span>
            <div className="flex items-center gap-1.5">
              <span className="line-through text-gray-400">S/ {shipping.toFixed(2)}</span>
              <span className="font-bold text-emerald-600">Gratis (Promo)</span>
            </div>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between text-xs text-emerald-600">
              <span>Descuento aplicado</span>
              <span className="font-bold">-S/ {discount.toFixed(2)}</span>
            </div>
          )}

          <div className="h-px bg-gray-200 my-1" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-gray-900">
              Total a Pagar
            </span>
            <span className="text-lg font-black text-purple-700">
              S/ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </section>

      {/* 6. Botón Flutuante ELEVADO (bottom-16) para não ser tapado pela barra inferior do cliente */}
      <div className="fixed bottom-16 left-0 right-0 px-3 py-2 bg-white/95 backdrop-blur-md border-t border-b border-gray-200 shadow-xl z-50">
        <div className="max-w-md mx-auto w-full">
          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-between px-4 transition-all cursor-pointer disabled:opacity-60"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-orange-100 flex items-center gap-1">
                <span>Pago:</span>
                <span className="font-black text-white">
                  {activeMethod === 'card'
                    ? savedCard
                      ? `Tarjeta •••• ${savedCard.last4}`
                      : 'Tarjeta'
                    : activeMethod === 'yape'
                    ? 'Yape (QR)'
                    : `Efectivo (Vuelto: S/ ${calculatedChange.toFixed(2)})`}
                </span>
              </span>
              <span className="text-sm font-black leading-tight tracking-wide">
                Confirmar pedido
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-black">
                {isSubmitting ? 'Procesando...' : `S/ ${total.toFixed(2)}`}
              </span>
              <span className="material-symbols-outlined text-[20px]">
                {isSubmitting ? 'progress_activity' : 'arrow_forward'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};