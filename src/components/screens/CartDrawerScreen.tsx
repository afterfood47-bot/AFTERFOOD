import React, { useState } from 'react';
import { AppScreen, CartItem } from '../../types';

interface CartDrawerScreenProps {
  items: CartItem[];
  savedCard?: { last4: string; brand: string } | null;
  paymentMethod?: 'card' | 'yape' | 'cash' | null;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onNavigate: (screen: AppScreen) => void;
  onGoToCheckout?: () => void;
  onConfirmOrder?: (
    method: 'card' | 'yape' | 'cash',
    cashDetails?: { given: number; returned: number }
  ) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const CartDrawerScreen: React.FC<CartDrawerScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onGoToCheckout,
  onClose,
  isModal = false,
}) => {
  const [appliedPromo] = useState<boolean>(true);

  const subtotal = items.reduce((sum, it) => sum + it.totalPrice, 0);
  const deliveryFee = 4.5;
  const promoDiscount = appliedPromo ? 4.5 : 0;
  const total = Math.max(0, subtotal + deliveryFee - promoDiscount);

  // Redireciona diretamente para a tela de Revisar pedido
  const handleFinalizarPedido = () => {
    if (onGoToCheckout) {
      onGoToCheckout();
    } else {
      onNavigate('checkout');
    }
  };

  const content = (
    <div className="flex flex-col w-full h-full pb-36 animate-in fade-in duration-200 bg-gray-50 text-gray-900">
      {/* Barra de encabezado limpia */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-600 text-[22px]">
            shopping_bag
          </span>
          <h2 className="text-base font-bold text-gray-900">
            Mi Carrito
          </h2>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold">
            {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
          </span>
        </div>

        {onClose && isModal && (
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Conteúdo do Carrinho */}
      <div className="px-4 pt-3 flex flex-col gap-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-3 bg-white border border-gray-200 rounded-xl shadow-xs my-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-[32px]">
                remove_shopping_cart
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-gray-900">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-gray-500 max-w-xs leading-tight">
                Explora los restaurantes y agrega tus platillos o bebidas favoritas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="mt-2 h-10 px-5 rounded-lg bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              Explorar restaurantes
            </button>
          </div>
        ) : (
          <>
            {/* Cabecera de ítems seleccionados y vaciar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">
                Ítems en el pedido ({items.reduce((a, b) => a + b.quantity, 0)})
              </span>
              <button
                onClick={onClearCart}
                className="text-[11px] text-red-600 hover:text-red-700 font-bold transition-colors cursor-pointer"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Lista de itens empilhados verticalmente em cards limpos */}
            <div className="flex flex-col gap-2.5">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs hover:shadow-sm transition-shadow"
                >
                  {/* Foto do produto */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-100"
                  />

                  {/* Detalhes do produto */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-gray-900 truncate leading-tight">
                      {item.product.name}
                    </span>
                    <span className="text-[11px] text-gray-500 truncate leading-tight mt-0.5 font-medium">
                      {item.product.storeName}
                    </span>

                    {/* Extras */}
                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <span className="text-[10px] text-purple-700 font-semibold truncate leading-tight mt-0.5">
                        +{item.selectedExtras.map((e) => e.name).join(', ')}
                      </span>
                    )}

                    {/* Instruções */}
                    {item.specialInstructions && (
                      <span className="text-[10px] text-gray-500 italic truncate leading-tight">
                        Nota: "{item.specialInstructions}"
                      </span>
                    )}

                    <span className="text-xs font-black text-purple-700 mt-1 leading-none">
                      S/ {item.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Controles de cantidad (+ / - / eliminar) */}
                  <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-lg border border-gray-200 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.quantity <= 1) {
                          onRemoveItem(index);
                        } else {
                          onUpdateQuantity(index, item.quantity - 1);
                        }
                      }}
                      aria-label="Disminuir o eliminar"
                      className="w-6 h-6 rounded bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors active:scale-90 border border-gray-200 shadow-2xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {item.quantity <= 1 ? 'delete' : 'remove'}
                      </span>
                    </button>

                    <span className="text-xs font-black text-gray-900 w-5 text-center leading-none">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                      className="w-6 h-6 rounded bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors active:scale-90 shadow-2xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        add
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen financiero del pedido */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-gray-900">
                Resumen del pedido
              </span>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  S/ {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Costo de entrega</span>
                <span className="font-semibold text-gray-900">
                  S/ {deliveryFee.toFixed(2)}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-600">
                  <span>Descuento de bienvenida</span>
                  <span className="font-bold">- S/ {promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="h-px bg-gray-200 my-1" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-gray-900">
                  Total
                </span>
                <span className="text-base font-black text-purple-700">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Botón Fijo Principal: Continuar con el pedido -> Revisar pedido */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-md mx-auto w-full">
            <button
              type="button"
              onClick={handleFinalizarPedido}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-between px-4 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  shopping_cart_checkout
                </span>
                <span className="text-sm font-extrabold tracking-wide">Continuar con el pedido</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black">S/ {total.toFixed(2)}</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
        <div
          className="w-full max-w-md bg-white text-gray-900 rounded-t-2xl sm:rounded-2xl border-t sm:border border-gray-200 max-h-[90vh] overflow-y-auto shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  }

  return content;
};
