import React, { useState } from 'react';
import { AppScreen } from '../../../types';

interface YapePaymentScreenProps {
  amount?: number;
  isTipMode?: boolean;
  onConfirmYape: (approvalCode?: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onBack?: () => void;
}

export const YapePaymentScreen: React.FC<YapePaymentScreenProps> = ({
  amount = 47.4,
  isTipMode = false,
  onConfirmYape,
  onNavigate,
  onBack,
}) => {
  const [approvalCode, setApprovalCode] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const YAPE_PHONE = '944 892 410';
  const ACCOUNT_NAME = 'AfterFood Delivery S.A.C.';

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(YAPE_PHONE.replace(/\s/g, ''));
    setCopiedPhone(true);
    setTimeout(() => {
      setCopiedPhone(false);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onConfirmYape(approvalCode);
      if (isTipMode) {
        onNavigate('rate_order');
      } else {
        onNavigate('order_confirmed');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-48 pt-2 animate-in fade-in duration-200">
      {/* Header con botón de retorno y estilo distintivo Yape */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#742284] to-[#51135c] text-white flex items-center justify-between shadow-lg mb-3 border border-white/10">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack || (() => onNavigate('checkout'))}
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Volver a Revisar pedido"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-[#742284] text-lg shadow-md">
            Y
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wide">Yape</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#00D2B5] text-[#12131a] text-[9px] font-black uppercase">
                Instantáneo
              </span>
            </div>
            <span className="text-[10px] text-white/80 leading-tight">
              {isTipMode ? 'Pago de propina al repartidor' : 'Pago de orden seguro y sin comisiones'}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[9px] text-white/70 block uppercase font-bold">
            Monto a pagar
          </span>
          <span className="text-sm sm:text-base font-black text-[#00D2B5]">
            S/ {amount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Tarjeta Central: Código QR de Yape */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm text-center">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs font-extrabold text-foreground">
            Escanea el código QR desde tu app Yape
          </span>
          <span className="text-[10px] text-muted-foreground">
            Válido para pagos desde cualquier celular con Yape o Plin
          </span>
        </div>

        {/* QR Code Graphic con marco morado y logo de Yape en el centro */}
        <div className="relative p-3 bg-white rounded-2xl shadow-xl border-4 border-[#742284] flex items-center justify-center">
          <svg
            width="170"
            height="170"
            viewBox="0 0 160 160"
            className="w-40 h-40"
          >
            {/* Esquinas de posicionamiento */}
            <rect x="10" y="10" width="40" height="40" fill="#742284" rx="4" />
            <rect x="18" y="18" width="24" height="24" fill="#ffffff" rx="2" />
            <rect x="24" y="24" width="12" height="12" fill="#742284" rx="2" />

            <rect x="110" y="10" width="40" height="40" fill="#742284" rx="4" />
            <rect x="118" y="18" width="24" height="24" fill="#ffffff" rx="2" />
            <rect x="124" y="24" width="12" height="12" fill="#742284" rx="2" />

            <rect x="10" y="110" width="40" height="40" fill="#742284" rx="4" />
            <rect x="18" y="118" width="24" height="24" fill="#ffffff" rx="2" />
            <rect x="24" y="124" width="12" height="12" fill="#742284" rx="2" />

            {/* Módulos de datos */}
            <rect x="58" y="14" width="12" height="12" fill="#12131a" />
            <rect x="74" y="14" width="8" height="8" fill="#12131a" />
            <rect x="88" y="18" width="10" height="10" fill="#12131a" />
            <rect x="60" y="32" width="16" height="8" fill="#12131a" />
            <rect x="82" y="30" width="14" height="14" fill="#12131a" />

            <rect x="14" y="58" width="12" height="12" fill="#12131a" />
            <rect x="32" y="62" width="10" height="10" fill="#12131a" />
            <rect x="14" y="80" width="14" height="14" fill="#12131a" />
            <rect x="34" y="86" width="12" height="8" fill="#12131a" />

            <rect x="114" y="58" width="14" height="8" fill="#12131a" />
            <rect x="134" y="64" width="12" height="12" fill="#12131a" />
            <rect x="114" y="80" width="10" height="14" fill="#12131a" />
            <rect x="130" y="86" width="16" height="10" fill="#12131a" />

            <rect x="58" y="114" width="14" height="10" fill="#12131a" />
            <rect x="78" y="118" width="12" height="12" fill="#12131a" />
            <rect x="58" y="132" width="10" height="14" fill="#12131a" />
            <rect x="74" y="134" width="16" height="12" fill="#12131a" />

            <rect x="98" y="114" width="12" height="12" fill="#12131a" />
            <rect x="116" y="118" width="14" height="10" fill="#12131a" />
            <rect x="136" y="114" width="10" height="14" fill="#12131a" />
            <rect x="100" y="134" width="14" height="12" fill="#12131a" />
            <rect x="122" y="132" width="12" height="14" fill="#12131a" />

            {/* Centro Yape Logo Badge */}
            <circle cx="80" cy="80" r="22" fill="#742284" />
            <circle cx="80" cy="80" r="19" fill="#ffffff" />
            <text
              x="80"
              y="86"
              fill="#742284"
              fontSize="20"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              Y
            </text>
          </svg>
        </div>

        {/* Datos de transferencia: Número telefónico y Titular */}
        <div className="w-full bg-muted rounded-xl p-3 border border-border flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                O yapea directo al número:
              </span>
              <span className="text-sm font-black text-foreground tracking-wider font-mono">
                {YAPE_PHONE}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyPhone}
              className={`h-8 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                copiedPhone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#742284] hover:bg-[#8e29a2] text-white shadow'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {copiedPhone ? 'check' : 'content_copy'}
              </span>
              <span>{copiedPhone ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="pt-1.5 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Titular de la cuenta:</span>
            <span className="font-bold text-foreground">{ACCOUNT_NAME}</span>
          </div>
        </div>
      </div>

      {/* Campo Opcional: Código de Aprobación */}
      <div className="mt-3 bg-card border border-border rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
        <label className="text-[11px] font-bold text-foreground flex items-center justify-between">
          <span>Código de Aprobación de Yape (Opcional)</span>
          <span className="text-[9px] text-emerald-500 font-bold">6 dígitos</span>
        </label>
        <p className="text-[10px] text-muted-foreground leading-tight">
          Ingresa los 6 dígitos que aparecen en tu comprobante de Yape para validar tu orden al instante.
        </p>
        <div className="relative flex items-center mt-0.5">
          <span className="absolute left-3 material-symbols-outlined text-[16px] text-muted-foreground">
            receipt_long
          </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={approvalCode}
            onChange={(e) => setApprovalCode(e.target.value.replace(/\D/g, ''))}
            placeholder="Ej: 839201"
            className="w-full h-10 pl-9 pr-3 bg-muted border border-border rounded-xl text-xs font-mono font-bold tracking-widest text-foreground placeholder:text-muted-foreground outline-none focus:border-[#742284] transition-colors"
          />
        </div>
      </div>

      {/* Pasos rápidos */}
      <div className="mt-2.5 px-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-[#742284] text-white flex items-center justify-center font-bold text-[8px]">
            1
          </span>
          <span>Abre Yape</span>
        </div>
        <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-[#742284] text-white flex items-center justify-center font-bold text-[8px]">
            2
          </span>
          <span>Escanea o pega número</span>
        </div>
        <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-[#00D2B5] text-[#12131a] flex items-center justify-center font-bold text-[8px]">
            3
          </span>
          <span className="text-foreground font-bold">Confirma Pago</span>
        </div>
      </div>

      {/* Botones de acción inferiores elevamos para evitar el corte por la barra de navegación (bottom-16 z-50) */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl z-50">
        <div className="max-w-md mx-auto w-full flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleConfirmPayment}
            disabled={isVerifying}
            className="w-full h-11 rounded-full bg-gradient-to-r from-[#742284] via-[#8e29a2] to-[#00D2B5] hover:brightness-110 active:scale-[0.98] text-white font-black text-xs shadow-[0_6px_20px_-2px_rgba(116,34,132,0.5)] flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">
                  progress_activity
                </span>
                <span>Verificando Yape...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">
                  check_circle
                </span>
                <span>
                  {isTipMode
                    ? `Confirmar Pago de Propina (S/ ${amount.toFixed(2)})`
                    : 'Confirmar Yape y Volver al Pedido'}
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
    </div>
  );
};