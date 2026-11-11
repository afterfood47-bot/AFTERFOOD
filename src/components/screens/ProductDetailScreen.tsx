import React, { useState } from 'react';
import { MAIN_PRODUCT } from '../../data/mockData';
import { AppScreen, CartItem, Product } from '../../types';

interface ProductDetailScreenProps {
  product?: Product;
  onAddToCart: (item: CartItem) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product = MAIN_PRODUCT,
  onAddToCart,
  onNavigate,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const extras = product.availableExtras !== undefined ? product.availableExtras : (product.id === 'prod-1' ? MAIN_PRODUCT.availableExtras || [] : []);

  const extrasSum = extras.reduce((sum, extra) => {
    return selectedExtras[extra.id] ? sum + extra.price : sum;
  }, 0);

  const unitTotal = product.price + extrasSum;
  const grandTotal = unitTotal * quantity;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddItem = () => {
    const activeExtras = extras.filter((ex) => selectedExtras[ex.id]);
    onAddToCart({
      product,
      quantity,
      selectedExtras: activeExtras,
      specialInstructions: notes,
      totalPrice: grandTotal,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const handleFinishOrder = () => {
    handleAddItem();
    onNavigate('checkout');
  };

  return (
    <div className="flex flex-col w-full pb-36 animate-in fade-in duration-200">
      {/* 1. Hero del Producto compacto (máx 160px / h-36 a h-40) */}
      <section className="relative w-full px-3 pt-1">
        <div className="relative w-full h-36 sm:h-40 max-h-[160px] overflow-hidden rounded-xl bg-muted shadow-md border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

          {/* Badges sobre la foto en color PÚRPURA */}
          <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6C5CE7] text-white font-label-md text-[10px] shadow-sm font-bold">
              <span
                className="material-symbols-outlined text-[13px] fill-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              Más vendido
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6C5CE7]/90 backdrop-blur-md text-white font-label-md text-[10px] font-bold border border-white/20">
              <span
                className="material-symbols-outlined text-[13px] fill-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                nightlight
              </span>
              Nocturno
            </span>
          </div>
        </div>
      </section>

      {/* 2. Información del Producto: Título, Precio y Valoraciones Compactos */}
      <section className="flex flex-col px-3 mt-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base text-foreground tracking-tight leading-tight font-extrabold truncate">
              {product.name}
            </h1>

            {/* Rating & Metadatos */}
            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 mt-0.5 text-muted-foreground text-[10px] leading-none">
              <div className="inline-flex items-center gap-0.5 text-secondary-container font-bold">
                <span
                  className="material-symbols-outlined text-[13px] text-amber-500 fill-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-[11px] text-foreground font-bold">
                  {product.rating}
                </span>
              </div>
              <span>•</span>
              <span>({product.ratingCount}+ valoraciones)</span>
              <span>•</span>
              <div className="inline-flex items-center gap-0.5 text-foreground">
                <span className="material-symbols-outlined text-[12px] text-primary">
                  schedule
                </span>
                <span className="font-semibold text-[10px]">{product.prepTime}</span>
              </div>
            </div>
          </div>

          {/* Precio unitario base en color PÚRPURA */}
          <div className="text-right flex-shrink-0">
            <span className="text-base text-[#6C5CE7] font-extrabold block leading-tight">
              S/ {product.price.toFixed(2)}
            </span>
            <span className="text-[9px] text-muted-foreground block leading-none mt-0.5 font-medium">
              precio base
            </span>
          </div>
        </div>

        {/* 3. Descripción con límite de 2 líneas y botón "Ver más / Ver menos" */}
        <div className="mt-1 p-2.5 rounded-lg bg-card border border-border shadow-xs">
          <p
            className={`text-xs text-foreground leading-snug transition-all ${
              !showFullDescription ? 'line-clamp-2' : ''
            }`}
          >
            {product.description}
          </p>
          <button
            type="button"
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="mt-0.5 text-primary hover:text-primary/80 text-[10px] font-bold inline-flex items-center gap-0.5 cursor-pointer select-none"
          >
            <span>{showFullDescription ? 'Ver menos' : 'Ver más'}</span>
            <span className="material-symbols-outlined text-[13px]">
              {showFullDescription ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </section>

      {/* 4. Lista compacta de adicionales (desmarcados por defecto) */}
      <section className="flex flex-col px-3 mt-2 gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="font-title-md text-xs text-foreground font-bold">
              Elige tus extras
            </h2>
            <span className="font-body-sm text-[10px] text-muted-foreground">
              (opcionales, desmarcados)
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/30 font-label-sm text-[9px] uppercase font-bold">
            Opcional
          </span>
        </div>

        {/* Extras list compact */}
        <div className="grid grid-cols-1 gap-1.5">
          {extras.map((extra) => {
            const checked = !!selectedExtras[extra.id];
            return (
              <label
                key={extra.id}
                onClick={() => toggleExtra(extra.id)}
                className={`group flex items-center justify-between p-2 rounded-lg border cursor-pointer select-none transition-all active:scale-[0.99] shadow-xs ${
                  checked
                    ? 'bg-[#6C5CE7]/10 border-[#6C5CE7] text-foreground'
                    : 'bg-card hover:bg-muted border-border text-foreground'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                      checked
                        ? 'bg-[#6C5CE7] text-white'
                        : 'bg-muted border border-border'
                    }`}
                  >
                    {checked && (
                      <span className="material-symbols-outlined text-[14px] font-bold">
                        check
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-md text-xs text-foreground group-hover:text-[#6C5CE7] transition-colors font-semibold leading-tight truncate">
                      {extra.name}
                    </span>
                    <span className="font-body-sm text-[10px] text-muted-foreground truncate">
                      {extra.description}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 pl-2">
                  <span className="font-title-md text-xs text-[#6C5CE7] font-bold">
                    + S/ {extra.price.toFixed(2)}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Instrucciones opcionales compactas */}
        <div className="mt-1">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Instrucciones especiales para el local (opcional)"
            className="w-full px-2.5 py-1.5 rounded-lg bg-card text-foreground placeholder:text-muted-foreground font-body-md text-xs border border-border focus:border-[#6C5CE7] focus:outline-none transition-all shadow-xs"
          />
        </div>
      </section>

      {/* 5. Contenedor Compacto Inferior (Justo Encima de Bottom Nav: bottom-16) */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]  px-3 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2.5">
          {/* Importe Total a Pagar Destacado en color PÚRPURA */}
          <div className="flex flex-col min-w-max">
            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
              Total
            </span>
            <span className="text-lg sm:text-xl font-black text-[#6C5CE7] leading-tight drop-shadow-sm">
              S/ {grandTotal.toFixed(2)}
            </span>
          </div>

          {/* Barra de Selección de Cantidad (- 1 +) Compacta */}
          <div className="flex items-center bg-muted p-0.5 rounded-lg border border-border flex-shrink-0">
            <button
              type="button"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              aria-label="Restar unidad"
              className="w-7 h-7 rounded-md bg-card text-foreground hover:bg-muted border border-border flex items-center justify-center transition-colors active:scale-90 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">remove</span>
            </button>
            <span className="w-6 text-center font-title-md text-xs text-foreground font-bold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Sumar unidad"
              className="w-7 h-7 rounded-md bg-card text-foreground hover:bg-muted border border-border flex items-center justify-center transition-colors active:scale-90 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
            </button>
          </div>

          {/* Botón Principal "Añadir al carrito" en color PÚRPURA */}
          <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
            <button
              type="button"
              onClick={handleAddItem}
              className={`h-9 px-3 rounded-lg font-label-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md flex-1 min-w-0 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#6C5CE7] hover:bg-[#5b4cdb] text-white shadow-md shadow-[#6C5CE7]/30'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] flex-shrink-0">
                {addedSuccess ? 'check' : 'add_shopping_cart'}
              </span>
              <span className="truncate">{addedSuccess ? '¡Añadido!' : 'Añadir al carrito'}</span>
            </button>

            {/* Acceso rápido a Checkout */}
            <button
              type="button"
              onClick={handleFinishOrder}
              title="Ir a pagar"
              aria-label="Ir a pagar"
              className="h-9 px-2.5 rounded-lg bg-card hover:bg-muted border border-border text-primary font-label-lg text-xs font-bold flex items-center justify-center transition-all active:scale-95 flex-shrink-0 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
