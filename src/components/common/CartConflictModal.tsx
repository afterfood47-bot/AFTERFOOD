import React from 'react';

interface CartConflictModalProps {
  isOpen: boolean;
  currentStoreName: string;
  incomingStoreName: string;
  onClearAndAdd: () => void;
  onCancel: () => void;
}

export const CartConflictModal: React.FC<CartConflictModalProps> = ({
  isOpen,
  currentStoreName,
  incomingStoreName,
  onClearAndAdd,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 shadow-2xl flex flex-col gap-3.5 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header icon & title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-black text-gray-900 leading-tight">
              ¿Deseas iniciar un nuevo pedido?
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Restricción de comercios múltiples
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cerrar advertencia"
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Explicación amigable */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col gap-1.5 leading-relaxed">
          <p>
            Ya tienes productos de <strong className="font-extrabold text-gray-900">{currentStoreName}</strong> en tu carrito.
          </p>
          <p className="text-[11px] text-amber-800">
            Cada pedido de entrega en AfterFood se prepara y despacha desde un solo comercio a la vez. Si agregas productos de <strong className="font-bold text-gray-900">{incomingStoreName}</strong>, tu carrito anterior se vaciará.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={onClearAndAdd}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] text-white font-bold text-xs shadow-md shadow-orange-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            <span>Vaciar carrito y agregar nuevo producto</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Mantener productos de {currentStoreName}
          </button>
        </div>
      </div>
    </div>
  );
};
