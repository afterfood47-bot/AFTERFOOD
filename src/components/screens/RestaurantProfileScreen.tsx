import React, { useState, useEffect } from 'react';
import { RESTAURANT_MENUS, STORES_DATA } from '../../data/mockData';
import { AppScreen, CartItem, Product, Store } from '../../types';

interface RestaurantProfileScreenProps {
  store?: Store;
  onNavigate: (screen: AppScreen) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const RestaurantProfileScreen: React.FC<RestaurantProfileScreenProps> = ({
  store = STORES_DATA[0],
  onNavigate,
  onSelectProduct,
  onAddToCartDirect,
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  const storeMenus = RESTAURANT_MENUS[store.id] || RESTAURANT_MENUS['store-1'];
  const [activeCategory, setActiveCategory] = useState<string>(
    storeMenus[0]?.category || 'Promos'
  );
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  useEffect(() => {
    if (storeMenus.length > 0 && !storeMenus.some((m) => m.category === activeCategory)) {
      setActiveCategory(storeMenus[0].category);
    }
  }, [store.id, storeMenus, activeCategory]);

  const handleAddDirect = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCartDirect(product);
    setAddedItemEffect(product.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  const currentCategoryMenu =
    storeMenus.find((m) => m.category === activeCategory) || storeMenus[0];

  return (
    <div className="flex flex-col w-full pb-32 animate-in fade-in duration-200">
      {/* 1. Portada del Restaurante con Portada, Logo, Nombre, Calificación, Tiempo y Envío */}
      <section className="relative w-full">
        {/* Cover Photo */}
        <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-gray-100">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badges superiores sobre portada */}
          <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-orange-400 text-[10px] font-black flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {store.badgeTag || '24H Abierto'}
            </span>
            {store.isFreeDelivery && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-black shadow-sm">
                Envío Gratis
              </span>
            )}
          </div>

          {/* Logo no topo do restaurante */}
          <div className="absolute top-2.5 right-3 flex items-center gap-1.5 cursor-default select-none pointer-events-none">
            <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm flex items-center cursor-default select-none pointer-events-none">
              <img
                src="/logo-horizontal.png"
                alt="AfterFood Logo"
                className="h-4 w-auto object-contain cursor-default select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Info Card sobrepuesta al estilo PedidosYa / Rappi */}
        <div className="px-4 -mt-10 relative z-10 flex flex-col">
          <div className="bg-card border border-border rounded-2xl p-3 shadow-xl backdrop-blur-md flex flex-col gap-2">
            <div className="flex items-start gap-3">
              {/* Logo / Avatar circular del comercio */}
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-muted border-2 border-[#FF7A00]/50 shadow-md flex-shrink-0 -mt-6">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nombre y Especialidad */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm sm:text-base text-foreground font-extrabold truncate leading-tight">
                    {store.name}
                  </h1>
                  <span
                    className="material-symbols-outlined text-[15px] text-[#FF7A00] fill-1 flex-shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">
                  {store.categoryTag || store.tags.join(' · ')}
                </span>
              </div>
            </div>

            {/* Metadatos en formato limpio y compacto: Calificación, Tiempo de entrega, Costo de envío */}
            <div className="flex items-center justify-between pt-1.5 border-t border-border text-xs">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[15px] text-amber-400 fill-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-extrabold text-foreground text-[11px]">
                  {store.rating.toFixed(1)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  ({store.ratingCount}+)
                </span>
              </div>

              <span className="text-border">|</span>

              {/* Tiempo de entrega */}
              <div className="flex items-center gap-1 text-foreground">
                <span className="material-symbols-outlined text-[14px] text-[#FF7A00]">
                  schedule
                </span>
                <span className="text-[11px] font-bold">{store.deliveryTime}</span>
              </div>

              <span className="text-border">|</span>

              {/* Costo de envío */}
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-emerald-500">
                  two_wheeler
                </span>
                <span
                  className={`text-[11px] font-bold ${
                    store.isFreeDelivery ? 'text-emerald-500' : 'text-foreground'
                  }`}
                >
                  {store.isFreeDelivery
                    ? 'Envío Gratis'
                    : `S/ ${store.deliveryFee.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Abas de Categorias do Restaurante (Sem scroll horizontal: flex-wrap) */}
      <section className="sticky top-14 z-30 bg-white/95 backdrop-blur-md pt-2.5 pb-2 px-4 border-b border-gray-200 mt-1">
        <div className="flex flex-wrap gap-2 py-0.5">
          {storeMenus.map((section) => {
            const isActive = activeCategory === section.category;
            return (
              <button
                key={section.category}
                onClick={() => setActiveCategory(section.category)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {section.icon || 'restaurant'}
                </span>
                <span>{section.category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {section.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Catálogo de Produtos da Categoria Selecionada */}
      <section className="px-4 mt-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-gray-900 leading-tight">
              {currentCategoryMenu.category}
            </h2>
            <span className="text-[11px] text-gray-500 font-medium">
              ({currentCategoryMenu.items.length} itens)
            </span>
          </div>
          <span className="text-[11px] text-orange-600 font-bold">
            Disponível agora
          </span>
        </div>

        {/* Lista Vertical de Produtos (Cards minimalistas) */}
        <div className="flex flex-col gap-3">
          {currentCategoryMenu.items.map((prod) => {
            const isJustAdded = addedItemEffect === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onNavigate('product_detail');
                }}
                className="group bg-white border border-gray-200 hover:border-orange-500/50 transition-all rounded-lg p-3 flex items-center justify-between gap-3 shadow-sm cursor-pointer active:scale-[0.99]"
              >
                {/* Coluna Esquerda: Informações do produto */}
                <div className="flex flex-col flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-1">
                      {prod.name}
                    </h3>
                    {prod.isPopular && (
                      <span className="px-1.5 py-0.2 rounded bg-purple-50 border border-purple-200 text-purple-700 text-[9px] font-bold uppercase">
                        Destaque
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-tight mt-1">
                    {prod.description}
                  </p>

                  <div className="flex items-center gap-2.5 mt-2.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-orange-600">
                        R$ {prod.price.toFixed(2)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          R$ {prod.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <span className="text-gray-300 text-xs">·</span>

                    <span className="text-xs text-gray-600 flex items-center gap-0.5 font-medium">
                      <span className="material-symbols-outlined text-[13px] text-purple-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {prod.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Coluna Direita: Imagem e botão "+ Adicionar" */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <button
                    type="button"
                    onClick={(e) => handleAddDirect(e, prod)}
                    aria-label={`Agregar ${prod.name} al carrito`}
                    className={`absolute bottom-1.5 right-1.5 h-7 px-2.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer ${
                      isJustAdded
                        ? 'bg-purple-700 text-white scale-105'
                        : 'bg-white text-orange-600 border border-gray-200 hover:bg-orange-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isJustAdded ? 'check' : 'add'}
                    </span>
                    <span>{isJustAdded ? 'Adicionado' : 'Adicionar'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Barra Flotante Inferior de Carrito (si hay productos añadidos) */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 p-3 z-40 pointer-events-none">
          <div className="max-w-md mx-auto w-full pointer-events-auto">
            <button
              onClick={onOpenCart}
              className="w-full h-11 px-4 bg-gradient-to-r from-[#FF7A00] to-[#E02644] hover:brightness-110 active:scale-[0.99] text-white rounded-2xl shadow-[0_8px_25px_rgba(255,122,0,0.5)] flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                  {cartCount}
                </div>
                <span className="text-xs font-black tracking-wide">
                  Ver mi carrito
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold">
                  S/ {cartTotal.toFixed(2)}
                </span>
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
