import React, { useState } from 'react';

interface CashChangeModalProps {
  isOpen: boolean;
  totalOrder?: number;
  initialCash?: number;
  onClose: () => void;
  onConfirm: (cashAmount: number, changeAmount: number) => void;
}

export const CashChangeModal: React.FC<CashChangeModalProps> = ({
  isOpen,
  totalOrder = 47.4,
  initialCash = 50.0,
  onClose,
  onConfirm,
}) => {
  const [cashValue, setCashValue] = useState<string>(() => {
    const initial = initialCash >= totalOrder ? initialCash : Math.ceil(totalOrder / 10) * 10;
    return initial.toFixed(2);
  });

  React.useEffect(() => {
    if (isOpen) {
      const target = initialCash >= totalOrder ? initialCash : Math.max(totalOrder, 50);
      setCashValue(target.toFixed(2));
    }
  }, [isOpen, totalOrder, initialCash]);

  if (!isOpen) return null;

  const paying = parseFloat(cashValue) || 0;
  const change = paying - totalOrder;
  const isExact = Math.abs(change) < 0.01;
  const isInsufficient = change < -0.01;

  const handleChipClick = (amount: number) => {
    setCashValue(amount.toFixed(2));
  };

  const handleConfirm = () => {
    if (isInsufficient) return;
    onConfirm(paying, Math.max(0, change));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0d0e15]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet com margem de segurança ajustada */}
      <div className="relative z-10 w-full max-w-md bg-card rounded-t-[28px] border-t border-border shadow-2xl flex flex-col pt-3 pb-10 px-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 transition-colors">
        {/* Glow Gradients */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#5a49e3]/25 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-20 right-4 w-40 h-28 bg-[#ff7f1c]/15 blur-2xl pointer-events-none rounded-full" />

        {/* Drag Bar Handle */}
        <div className="w-full flex justify-center items-center py-1 mb-2">
          <div className="w-12 h-1.5 rounded-full bg-border" />
        </div>

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5a49e3]/30 flex items-center justify-center text-primary relative shadow-md">
              <span
                className="material-symbols-outlined text-xl fill-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[9px] text-white font-bold">
                  check
                </span>
              </div>
            </div>
            <div>
              <span className="text-[9px] text-secondary uppercase tracking-wider block font-bold leading-none">
                Pago Seguro
              </span>
              <p className="text-xs text-foreground font-bold mt-0.5">Efectivo contra entrega</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-2.5">
          <h2 className="text-base text-foreground tracking-tight font-extrabold leading-tight">
            Confirmar Vuelto
          </h2>
        </div>

        {/* Interactive Cash Input Section */}
        <div className="space-y-3">
          <div>
            <label
              className="block text-xs text-muted-foreground mb-1.5 font-semibold leading-tight"
              htmlFor="cash-input"
            >
              ¿Con cuánto dinero vas a pagar?
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-[#FF7A00] font-black text-sm">
                <span>S/</span>
              </div>
              <input
                id="cash-input"
                type="number"
                step="0.50"
                min={totalOrder}
                value={cashValue}
                onChange={(e) => setCashValue(e.target.value)}
                className="w-full h-11 bg-input text-foreground text-base font-bold pl-10 pr-10 rounded-xl focus:outline-none border border-border focus:border-primary transition-colors"
                placeholder="0.00"
              />
              {cashValue && (
                <button
                  type="button"
                  onClick={() => setCashValue('')}
                  aria-label="Borrar monto"
                  className="absolute right-3 w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:text-foreground"
                >
                  <span className="material-symbols-outlined text-sm">cancel</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
            <button
              type="button"
              onClick={() => handleChipClick(totalOrder)}
              className={`shrink-0 py-1.5 px-3 rounded-full text-xs transition-all active:scale-95 ${
                isExact
                  ? 'bg-[#FF7A00] text-white shadow-sm font-bold ring-2 ring-[#FF7A00]/40'
                  : 'bg-[#FF7A00]/15 text-[#e06c00] border border-[#FF7A00]/30 hover:bg-[#FF7A00]/25 font-semibold'
              }`}
            >
              Exacto (S/ {totalOrder.toFixed(2)})
            </button>
            {(() => {
              const baseList = [50, 100, 200];
              const higher = Math.ceil(totalOrder / 10) * 10;
              const rounded50 = Math.ceil(totalOrder / 50) * 50;
              const combined = Array.from(new Set([...baseList, higher, rounded50]))
                .filter((amt) => amt > totalOrder + 0.01)
                .sort((a, b) => a - b)
                .slice(0, 3);
              return combined.length > 0 ? combined : [Math.ceil(totalOrder) + 10, Math.ceil(totalOrder) + 50];
            })().map((amt) => {
              const active = Math.abs(paying - amt) < 0.01;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleChipClick(amt)}
                  className={`shrink-0 py-1.5 px-3 rounded-full text-xs transition-all active:scale-95 ${
                    active
                      ? 'bg-[#FF7A00] text-white shadow-sm font-bold ring-2 ring-[#FF7A00]/40'
                      : 'bg-[#FF7A00]/15 text-[#e06c00] border border-[#FF7A00]/30 hover:bg-[#FF7A00]/25 font-semibold'
                  }`}
                >
                  S/ {amt.toFixed(2)}
                </button>
              );
            })}
          </div>

          {/* Real-time Change Calculation Card */}
          <div className="rounded-xl p-3 bg-muted transition-all duration-200 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isInsufficient
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-secondary-container/20 text-secondary-container'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isInsufficient ? 'warning' : 'monetization_on'}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {isInsufficient
                      ? 'Monto insuficiente'
                      : isExact
                      ? 'Pago exacto'
                      : 'Tu vuelto será'}
                  </p>
                  <p
                    className={`text-sm font-bold leading-tight mt-0.5 ${
                      isInsufficient
                        ? 'text-red-400'
                        : isExact
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  >
                    {isInsufficient ? (
                      <span>
                        - <span className="text-[#FF7A00] font-black">S/</span> {Math.abs(change).toFixed(2)}
                      </span>
                    ) : (
                      <span>
                        <span className="text-[#FF7A00] font-black">S/</span> {Math.max(0, change).toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {!isInsufficient && (
                <div className="py-0.5 px-2 rounded-full bg-card text-foreground text-[9px] uppercase tracking-wider flex items-center gap-1 border border-border font-bold">
                  <span className="material-symbols-outlined text-[11px] text-primary">
                    verified
                  </span>
                  <span>Confirmado</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col space-y-2">
          <button
            type="button"
            disabled={isInsufficient}
            onClick={handleConfirm}
            className={`w-full h-11 rounded-full text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] font-bold ${
              isInsufficient
                ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
                : 'bg-[#6C5CE7] hover:bg-[#5b4cdb] text-white shadow-[0_8px_24px_-4px_rgba(108,92,231,0.5)]'
            }`}
          >
            <span>Confirmar Troco y Volver a Revisar Pedido</span>
            <span className="material-symbols-outlined text-lg">check_circle</span>
          </button>

          <button
            type="button"
            onClick={() => handleChipClick(totalOrder)}
            className="w-full py-1.5 rounded-full text-center text-primary hover:text-primary/80 text-xs font-semibold transition-colors"
          >
            Prefiero pagar con monto exacto (S/ {totalOrder.toFixed(2)})
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1 text-center text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
          >
            Cancelar y volver a Revisar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};