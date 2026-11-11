import React, { useState } from 'react';

interface PaymentMethodModalProps {
  isOpen: boolean;
  total: number;
  savedCard?: { last4: string; brand: string } | null;
  initialMethod?: 'card' | 'yape' | 'cash';
  onClose: () => void;
  onConfirm: (
    method: 'card' | 'yape' | 'cash',
    cashDetails?: { given: number; returned: number }
  ) => void;
  onNavigateToCardForm?: () => void;
  onNavigateToYapeScreen?: () => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  total,
  savedCard,
  initialMethod = 'card',
  onClose,
  onConfirm,
  onNavigateToCardForm,
  onNavigateToYapeScreen,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'yape' | 'cash'>(initialMethod);
  const [cashGiven, setCashGiven] = useState<number>(Math.max(50, Math.ceil(total / 10) * 10));
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const calculatedChange = Math.max(0, cashGiven - total);

  const handleConfirmPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(selectedMethod, selectedMethod === 'cash' ? { given: cashGiven, returned: calculatedChange } : undefined);
      onClose();
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white text-gray-900 rounded-t-3xl sm:rounded-2xl border border-gray-300 shadow-2xl p-5 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-250 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Pill for Mobile Sheet */}
        <div className="w-12 h-1.5 rounded-full bg-gray-300 mx-auto -mt-1 sm:hidden" />

        {/* Header con Alto Contraste */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 leading-tight">
                Seleccionar Medio de Pago
              </h2>
              <p className="text-[11px] text-gray-600 font-medium">
                Paga de forma rápida y segura
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Resumen Total a Pagar con Alto Contraste */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            Total de la orden:
          </span>
          <span className="text-lg font-black text-purple-900 tracking-tight">
            S/ {total.toFixed(2)}
          </span>
        </div>

        {/* Opciones de Pago con Alto Contraste (Fondo blanco, texto oscuro, bordes nítidos) */}
        <div className="flex flex-col gap-2.5">
          {/* Opción 1: Tarjeta de Crédito / Débito */}
          <div
            onClick={() => setSelectedMethod('card')}
            className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              selectedMethod === 'card'
                ? 'border-[#c2410c] bg-orange-50/70 shadow-xs'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#c2410c] border border-orange-200 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">credit_card</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-gray-900">
                  Tarjeta de Crédito / Débito
                </span>
                <span className="text-[11px] text-gray-700 font-medium">
                  {savedCard ? `${savedCard.brand} •••• ${savedCard.last4}` : 'Visa, Mastercard o Débito'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onNavigateToCardForm && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToCardForm();
                  }}
                  className="text-[11px] font-bold text-[#c2410c] hover:underline px-2 py-1 rounded bg-white border border-orange-200"
                >
                  {savedCard ? 'Cambiar' : 'Datos'}
                </button>
              )}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'card'
                    ? 'border-[#c2410c] bg-[#c2410c]'
                    : 'border-gray-400 bg-white'
                }`}
              >
                {selectedMethod === 'card' && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>

          {/* Opción 2: Yape / Plin */}
          <div
            onClick={() => setSelectedMethod('yape')}
            className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              selectedMethod === 'yape'
                ? 'border-purple-700 bg-purple-50/70 shadow-xs'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-900 border border-purple-200 flex items-center justify-center shrink-0 font-black text-base">
                Y
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-gray-900">
                    Yape / Plin
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-[9px] font-black uppercase">
                    Directo
                  </span>
                </div>
                <span className="text-[11px] text-gray-700 font-medium">
                  Transferencia o escaneo QR 24/7
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onNavigateToYapeScreen && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToYapeScreen();
                  }}
                  className="text-[11px] font-bold text-purple-800 hover:underline px-2 py-1 rounded bg-white border border-purple-200"
                >
                  Ver QR
                </button>
              )}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'yape'
                    ? 'border-purple-700 bg-purple-700'
                    : 'border-gray-400 bg-white'
                }`}
              >
                {selectedMethod === 'yape' && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>

          {/* Opción 3: Efectivo contraentrega */}
          <div
            onClick={() => setSelectedMethod('cash')}
            className={`p-3.5 rounded-xl border-2 flex flex-col gap-2.5 cursor-pointer transition-all ${
              selectedMethod === 'cash'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">payments</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-gray-900">
                    Efectivo Contraentrega
                  </span>
                  <span className="text-[11px] text-gray-700 font-medium">
                    Pagas en efectivo al repartidor
                  </span>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'cash'
                    ? 'border-emerald-600 bg-emerald-600'
                    : 'border-gray-400 bg-white'
                }`}
              >
                {selectedMethod === 'cash' && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* Ajuste de Vuelto / Billete con Alto Contraste */}
            {selectedMethod === 'cash' && (
              <div
                className="pt-2 border-t border-emerald-200 flex flex-col gap-2 text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <label htmlFor="cash-given-input" className="font-bold text-gray-900 text-[11px]">
                    ¿Con cuánto billete pagarás?
                  </label>
                  <span className="font-black text-emerald-800 text-[11px] bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    Vuelto: S/ {calculatedChange.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-gray-600 font-bold text-xs">
                      S/
                    </span>
                    <input
                      id="cash-given-input"
                      type="number"
                      min={total}
                      step="1"
                      value={cashGiven}
                      onChange={(e) => setCashGiven(Math.max(total, Number(e.target.value) || total))}
                      className="w-full h-9 pl-8 pr-2.5 bg-white border border-gray-400 rounded-lg text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCashGiven(total)}
                    className="h-9 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 font-bold text-[11px]"
                  >
                    Exacto
                  </button>
                  <button
                    type="button"
                    onClick={() => setCashGiven(50)}
                    className="h-9 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 font-bold text-[11px]"
                  >
                    S/ 50
                  </button>
                  <button
                    type="button"
                    onClick={() => setCashGiven(100)}
                    className="h-9 px-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 font-bold text-[11px]"
                  >
                    S/ 100
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botón Principal con Contraste Aumentado (#c2410c + texto branco negrito) */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirmPayment}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-950/20 flex items-center justify-between px-4 transition-all cursor-pointer disabled:opacity-60"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">
                {selectedMethod === 'card'
                  ? 'credit_card'
                  : selectedMethod === 'yape'
                  ? 'qr_code_scanner'
                  : 'payments'}
              </span>
              <span>Confirmar y Pagar</span>
            </div>
            <div className="flex items-center gap-1.5 font-black text-sm">
              <span>S/ {total.toFixed(2)}</span>
              <span className="material-symbols-outlined text-[18px]">
                {isSubmitting ? 'progress_activity' : 'arrow_forward'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
