import React, { useState } from 'react';
import { AppScreen } from '../../../types';

interface AddCardPaymentScreenProps {
  amount?: number;
  isTipMode?: boolean;
  onCardSaved: (cardInfo: { last4: string; brand: string }) => void;
  onNavigate: (screen: AppScreen) => void;
  onBack?: () => void;
}

export const AddCardPaymentScreen: React.FC<AddCardPaymentScreenProps> = ({
  amount = 47.4,
  isTipMode = false,
  onCardSaved,
  onNavigate,
  onBack,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Formateo de número de tarjeta en grupos de 4 dígitos
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  // Formateo de fecha de vencimiento MM/AA
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setExpiry(raw);
    }
  };

  // Formateo de CVV
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(raw);
  };

  // Detectar marca (Visa o Mastercard)
  const isMastercard = cardNumber.startsWith('5');
  const isVisa = cardNumber.startsWith('4') || (!isMastercard && cardNumber.length > 0);
  const brandName = isMastercard ? 'Mastercard' : 'Visa';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (cleanNumber.length < 15) {
      setFormError('Por favor ingresa un número de tarjeta válido (16 dígitos).');
      return;
    }
    if (expiry.length < 5) {
      setFormError('Por favor ingresa una fecha de expiración válida (MM/AA).');
      return;
    }
    if (cvv.length < 3) {
      setFormError('Por favor ingresa el código CVV de seguridad (3 dígitos).');
      return;
    }
    if (holderName.trim().length < 3) {
      setFormError('Por favor ingresa el nombre del titular tal como figura en la tarjeta.');
      return;
    }

    setFormError(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const last4 = cleanNumber.slice(-4);
      onCardSaved({ last4, brand: brandName });

      if (isTipMode) {
        onNavigate('rate_order');
      } else {
        onNavigate('checkout');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-48 pt-2 animate-in fade-in duration-200">
      {/* Encabezado contextual con botón de retorno a Revisar pedido */}
      <div className="flex items-center justify-between mb-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack || (() => onNavigate('checkout'))}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            aria-label="Volver a Revisar pedido"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
              {isTipMode ? 'Pagar Propina con Tarjeta' : 'Configurar Tarjeta'}
            </h1>
            <p className="text-[11px] text-gray-500 leading-tight">
              {isTipMode
                ? `Monto de la propina: S/ ${amount.toFixed(2)}`
                : `Total del pedido: S/ ${amount.toFixed(2)}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#ea580c] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
          <span className="material-symbols-outlined text-[13px]">lock</span>
          <span className="text-[10px] font-bold">256-bit SSL</span>
        </div>
      </div>

      {/* Tarjeta Visual Interactiva Dinámica */}
      <div className="w-full relative h-44 rounded-2xl p-4 overflow-hidden shadow-xl mb-4 text-white flex flex-col justify-between bg-gradient-to-tr from-[#1f1b2e] via-[#33224b] to-[#5a49e3] border border-white/15">
        {/* Glow & chip decorativo */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#FF7A00]/20 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            {/* Chip de tarjeta dorado */}
            <div className="w-9 h-7 rounded bg-gradient-to-br from-amber-300 to-amber-500 border border-amber-200/50 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[14px] text-amber-900 opacity-80">
                contactless
              </span>
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#e3e1ec]/80 uppercase">
              AfterFood Pay
            </span>
          </div>

          {/* Logo Visa o Mastercard */}
          <div className="flex items-center gap-1 font-black text-sm tracking-wider uppercase">
            {isMastercard ? (
              <div className="flex items-center -space-x-2">
                <div className="w-5 h-5 rounded-full bg-red-500/90" />
                <div className="w-5 h-5 rounded-full bg-amber-400/90" />
              </div>
            ) : (
              <span className="italic font-extrabold text-[#38BDF8] text-base drop-shadow">
                VISA
              </span>
            )}
          </div>
        </div>

        {/* Número de tarjeta interactivo */}
        <div className="relative z-10 my-1">
          <div className="text-base sm:text-lg font-mono font-bold tracking-widest text-white/95 drop-shadow">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>
        </div>

        {/* Titular y Fecha de Expiración */}
        <div className="flex items-end justify-between relative z-10 text-xs">
          <div className="flex flex-col min-w-0 flex-1 mr-2">
            <span className="text-[8px] uppercase tracking-wider text-white/60 font-semibold">
              Titular de la Tarjeta
            </span>
            <span className="font-bold truncate text-white/90 uppercase tracking-wide text-[11px]">
              {holderName || 'NOMBRE Y APELLIDO'}
            </span>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-[8px] uppercase tracking-wider text-white/60 font-semibold">
              Vence
            </span>
            <span className="font-mono font-bold text-white/90 text-[11px]">
              {expiry || 'MM/AA'}
            </span>
          </div>
        </div>
      </div>

      {/* Formulario de Registro de Tarjeta */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        {formError && (
          <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-red-400">
              error
            </span>
            <span>{formError}</span>
          </div>
        )}

        {/* 1. Número de Tarjeta */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-foreground flex items-center justify-between">
            <span>Número de Tarjeta</span>
            <span className="text-[10px] text-muted-foreground">16 dígitos</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 material-symbols-outlined text-[18px] text-muted-foreground">
              credit_card
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              className="w-full h-10 pl-10 pr-12 bg-card border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-[#FF7A00] transition-colors shadow-xs"
            />
            <span className="absolute right-3 text-[10px] font-bold text-[#FF7A00] uppercase">
              {brandName}
            </span>
          </div>
        </div>

        {/* 2. Fecha de Vencimiento y CVV */}
        <div className="grid grid-cols-2 gap-2">
          {/* Vencimiento */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-foreground">
              Fecha de Vencimiento
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 material-symbols-outlined text-[16px] text-muted-foreground">
                calendar_today
              </span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/AA"
                className="w-full h-10 pl-9 pr-3 bg-card border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-[#FF7A00] transition-colors shadow-xs"
              />
            </div>
          </div>

          {/* CVV */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-foreground flex items-center justify-between">
              <span>Código CVV</span>
              <span className="text-[10px] text-muted-foreground">Dorso</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 material-symbols-outlined text-[16px] text-muted-foreground">
                security
              </span>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                className="w-full h-10 pl-9 pr-3 bg-card border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-[#FF7A00] transition-colors shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* 3. Nombre del Titular */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-foreground">
            Nombre del Titular
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 material-symbols-outlined text-[18px] text-muted-foreground">
              person
            </span>
            <input
              type="text"
              autoComplete="cc-name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value.toUpperCase())}
              placeholder="Ej: JUAN PEREZ LOPEZ"
              className="w-full h-10 pl-10 pr-3 bg-card border border-border rounded-xl text-xs font-medium text-foreground placeholder:text-muted-foreground outline-none focus:border-[#FF7A00] transition-colors uppercase shadow-xs"
            />
          </div>
        </div>

        {/* Checkbox guardar tarjeta */}
        <label className="flex items-center gap-2 mt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="w-4 h-4 rounded bg-card border border-border accent-[#FF7A00]"
          />
          <span className="text-[11px] text-muted-foreground">
            Guardar esta tarjeta de forma segura para futuras compras
          </span>
        </label>

        {/* Sello de Seguridad */}
        <div className="mt-2 p-2.5 rounded-xl bg-muted/60 border border-border flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-foreground leading-tight">
              Transacción 100% Encriptada y Protegida
            </span>
            <span className="text-[9px] text-muted-foreground leading-tight">
              Cumplimiento certificado PCI-DSS. Tus datos nunca se almacenan sin cifrar.
            </span>
          </div>
        </div>

        {/* Botones de acción corrigidos: bottom-16 e z-50 para ficar por cima da navegação */}
        <div className="fixed bottom-16 left-0 right-0 p-3 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl z-50">
          <div className="max-w-md mx-auto w-full flex flex-col gap-1.5">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-11 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E02644] hover:brightness-110 active:scale-[0.98] text-white font-black text-xs shadow-[0_6px_20px_-2px_rgba(255,122,0,0.5)] flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">
                    progress_activity
                  </span>
                  <span>Procesando Pago...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>
                    {isTipMode
                      ? `Confirmar Pago de Propina (S/ ${amount.toFixed(2)})`
                      : 'Guardar Tarjeta y Volver al Pedido'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBack || (() => onNavigate('checkout'))}
              className="py-1 text-center text-xs text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              Cancelar y volver a Revisar Pedido
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};