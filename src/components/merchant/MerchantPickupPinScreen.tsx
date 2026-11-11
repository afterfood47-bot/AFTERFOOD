import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MerchantBottomNav } from './MerchantBottomNav';
import { useApp } from '../../context/AppContext';

interface MerchantPickupPinScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onConfirmDeliveryToCourier?: (pin: string) => void;
}

export const MerchantPickupPinScreen: React.FC<MerchantPickupPinScreenProps> = ({
  onNavigate,
  onConfirmDeliveryToCourier,
}) => {
  const { handleCompleteKitchenOrder, merchantKitchenOrders } = useApp();
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeOrder = merchantKitchenOrders[0];

  const handleDigitInput = (num: string) => {
    setErrorMessage(null);
    const nextIndex = pinDigits.findIndex((d) => d === '');
    if (nextIndex !== -1) {
      const newDigits = [...pinDigits];
      newDigits[nextIndex] = num;
      setPinDigits(newDigits);
    }
  };

  const handleDeleteDigit = () => {
    setErrorMessage(null);
    const lastFilledIndex = [...pinDigits].reverse().findIndex((d) => d !== '');
    if (lastFilledIndex !== -1) {
      const realIndex = 3 - lastFilledIndex;
      const newDigits = [...pinDigits];
      newDigits[realIndex] = '';
      setPinDigits(newDigits);
    }
  };

  const handleValidateAndConfirm = () => {
    const fullPin = pinDigits.join('');
    if (fullPin.length < 4) {
      setErrorMessage('Ingresa los 4 dígitos del PIN presentado por el repartidor.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      if (activeOrder) {
        handleCompleteKitchenOrder(activeOrder.id);
      } else {
        handleCompleteKitchenOrder('#AF-1023');
      }
      if (onConfirmDeliveryToCourier) onConfirmDeliveryToCourier(fullPin);
      onNavigate('merchant_sales_metrics');
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 px-4 pt-3 pb-28 relative select-none animate-in fade-in duration-200 transition-colors">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header centrado sin flecha redundante (mantiene únicamente la flecha superior universal) */}
      <div className="flex items-center justify-center mb-3">
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
            Listo para Recojo
          </span>
          <h1 className="text-base font-black text-slate-900">
            Validar PIN de Entrega
          </h1>
        </div>
      </div>

      {/* Driver Waiting Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 mb-3.5 flex items-center justify-between shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#FF7A00] flex items-center justify-center text-white font-black text-base shadow-sm">
              <span className="material-symbols-outlined text-2xl">sports_motorsports</span>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900">
                {activeOrder?.courierName || 'Carlos Mendoza'}
              </h3>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 font-extrabold uppercase">
                En Ventanilla
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {activeOrder?.courierVehicle || 'Honda CB 125'} • TR-4821
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-slate-900 block">
            {activeOrder?.id || '#AF-1023'}
          </span>
          <span className="text-[10px] text-[#FF7A00] font-bold">
            {activeOrder?.items?.length || 2} ítems listos
          </span>
        </div>
      </div>

      {/* PIN Verification Section */}
      <div className="bg-white border-2 border-[#FF7A00] rounded-3xl p-5 shadow-sm flex flex-col items-center gap-3.5 text-center mb-4 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
          <span className="material-symbols-outlined text-2xl">pin</span>
        </div>

        <div>
          <h2 className="text-base font-black text-slate-900">
            Código PIN del Repartidor
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xs">
            Pide al repartidor el código de 4 dígitos en su pantalla para confirmar la entrega.
          </p>
        </div>

        {/* 4 Digit Boxes */}
        <div className="flex items-center gap-2.5 my-1">
          {pinDigits.map((digit, index) => (
            <div
              key={index}
              className={`w-13 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-black font-mono transition-all ${
                digit
                  ? 'border-[#FF7A00] bg-[#FF7A00]/10 text-slate-900 shadow-sm'
                  : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              {digit ? digit : '•'}
            </div>
          ))}
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-xs text-rose-600 font-bold bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/30">
            {errorMessage}
          </p>
        )}

        {/* Success message */}
        {isSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30 animate-pulse">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>¡Código verificado! Entregando pedido...</span>
          </div>
        )}

        {/* Numeric Keypad for fast touch input (el botón con icono check confirma la entrega) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[280px] mt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigitInput(digit)}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-900 font-black text-base shadow-sm transition-all cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleDeleteDigit}
            className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Borrar dígito"
          >
            <span className="material-symbols-outlined text-xl">backspace</span>
          </button>
          <button
            type="button"
            onClick={() => handleDigitInput('0')}
            className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-900 font-black text-base shadow-sm transition-all cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleValidateAndConfirm}
            className="h-11 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-95 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer"
            title="Confirmar entrega"
            aria-label="Confirmar entrega"
          >
            <span className="material-symbols-outlined text-xl">check</span>
          </button>
        </div>
      </div>

      {/* Merchant Bottom Nav */}
      <MerchantBottomNav
        currentScreen="merchant_pickup_pin"
        onNavigate={onNavigate}
        activeKitchenCount={merchantKitchenOrders.length}
      />
    </div>
  );
};
