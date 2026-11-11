import React, { useState, useEffect, useMemo } from 'react';
import { RESTAURANT_MENUS, STORES_DATA } from '../../data/mockData';
import { Address, AppScreen, Product, Store } from '../../types';
import { FilterOptionType } from '../common/FilterDropdownAccordion';

interface ExploreScreenProps {
  currentAddress: Address;
  onNavigate: (screen: AppScreen) => void;
  onSelectProduct: (product?: Product) => void;
  onSelectStore?: (store: Store) => void;
  onAddToCartDirect: (item: { name: string; price: number; storeName: string }) => void;
  cartCount: number;
  cartTotal: number;
  activeFilter?: string;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  currentAddress,
  onNavigate,
  onSelectProduct,
  onSelectStore,
  onAddToCartDirect,
  cartCount,
  cartTotal,
  activeFilter = 'open24',
}) => {
  const [selectedCategory, setSelectedCategory] = useState(activeFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterOptionType>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    if (activeFilter) {
      setSelectedCategory(activeFilter);
    }
  }, [activeFilter]);

  const categoryOptions = [
    { id: 'open24', label: 'Todas las categorías', dot: true },
    { id: 'Restaurantes', label: 'Restaurantes', emoji: '🍔' },
    { id: 'Market', label: 'Market', emoji: '🏪' },
    { id: 'Farmácia', label: 'Farmácia', emoji: '💊' },
    { id: 'Licorería', label: 'Licorería', emoji: '🍻' },
  ];

  const filteredStores = useMemo(() => {
    let stores = [...STORES_DATA];

    // Busca rápida
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      stores = stores.filter((store) => {
        const matchStore = store.name.toLowerCase().includes(q);
        const matchTags = store.tags.some((t) => t.toLowerCase().includes(q));
        const matchItems = store.featuredItems.some((it) => it.name.toLowerCase().includes(q));
        return matchStore || matchTags || matchItems;
      });
    }

    // Filtro por Categoria
    if (selectedCategory && selectedCategory !== 'open24') {
      stores = stores.filter((store) => store.category === selectedCategory);
    }

    // Filtro Dropdown/Accordion: "Abiertos ahora", "Más barato", "Más valorados"
    if (filterType === 'abiertos') {
      stores = stores.filter(
        (s) =>
          s.badgeTag.toLowerCase().includes('abierto') ||
          s.badgeTag.toLowerCase().includes('24h') ||
          s.badgeTag.toLowerCase().includes('abierta')
      );
    } else if (filterType === 'barato') {
      stores.sort((a, b) => a.deliveryFee - b.deliveryFee);
    } else if (filterType === 'valorados') {
      stores.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
    }

    return stores;
  }, [searchQuery, selectedCategory, filterType]);

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-200">
      {/* Dynamic Ambience & Search Section */}
      <section className="px-4 pt-2 pb-2 flex flex-col gap-2.5">
        {/* Active Delivery Context Chip */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onNavigate('address_selector')}
            className="flex items-center gap-1.5 min-w-0 bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-left shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-orange-600 text-[18px]">
              near_me
            </span>
            <span className="text-xs text-gray-900 truncate font-bold">
              {currentAddress?.street?.trim() || 'Seleccionar ubicación'}
            </span>
            <span className="material-symbols-outlined text-gray-400 text-[16px]">
              expand_more
            </span>
          </button>
          <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold">Entrega 24/7</span>
          </div>
        </div>

        {/* Search Input Bar with Integrated Filter Button */}
        <div className="relative flex items-center w-full">
          <div className="relative flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-xs transition-colors">
            <span className="material-symbols-outlined text-gray-400 text-[20px] ml-1">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar platos, bebidas o farmacia..."
              className="w-full bg-transparent border-0 outline-none pl-2 pr-24 py-2 text-gray-900 placeholder:text-gray-400 text-xs font-medium"
            />

            {/* Controles a la derecha dentro del buscador */}
            <div className="absolute right-1.5 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 p-1 cursor-pointer rounded-full transition-colors"
                  title="Limpiar búsqueda"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}

              {/* Botón de Filtros Integrado en la esquina derecha del buscador */}
              <button
                type="button"
                onClick={() => setIsFilterMenuOpen((prev) => !prev)}
                aria-label="Filtrar locales"
                aria-expanded={isFilterMenuOpen}
                className={`h-8 px-2.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer select-none ${
                  filterType
                    ? 'bg-orange-500 text-white shadow-xs hover:bg-orange-600'
                    : isFilterMenuOpen
                    ? 'bg-orange-100 text-orange-700 border border-orange-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
                title={filterType ? `Filtro activo: ${filterType}` : 'Filtrar categoría'}
              >
                <span
                  className="material-symbols-outlined text-[17px]"
                  style={{
                    fontVariationSettings: filterType === 'valorados' ? "'FILL' 1" : undefined,
                  }}
                >
                  {filterType === 'abiertos'
                    ? 'schedule'
                    : filterType === 'barato'
                    ? 'savings'
                    : filterType === 'valorados'
                    ? 'star'
                    : 'tune'}
                </span>
                {filterType ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ) : (
                  <span className="text-[11px] font-bold">Filtro</span>
                )}
              </button>
            </div>
          </div>

          {/* Menú Desplegable / Popover de Filtros Integrado */}
          {isFilterMenuOpen && (
            <>
              {/* Overlay para cerrar al hacer clic afuera */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsFilterMenuOpen(false)}
              />

              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-gray-200 rounded-2xl p-2.5 shadow-xl z-40 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-gray-500 border-b border-gray-100">
                  <span>Ordenar y filtrar locales:</span>
                  {filterType && (
                    <button
                      type="button"
                      onClick={() => {
                        setFilterType(null);
                        setIsFilterMenuOpen(false);
                      }}
                      className="text-orange-600 hover:text-orange-800 text-[10px] font-bold cursor-pointer hover:underline"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterType(filterType === 'abiertos' ? null : 'abiertos');
                      setIsFilterMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      filterType === 'abiertos'
                        ? 'bg-orange-50 text-orange-700 font-bold border border-orange-200'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-emerald-600">
                        schedule
                      </span>
                      <span>Abiertos 24/7 ahora</span>
                    </div>
                    {filterType === 'abiertos' && (
                      <span className="material-symbols-outlined text-[16px] text-orange-600">
                        check
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFilterType(filterType === 'barato' ? null : 'barato');
                      setIsFilterMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      filterType === 'barato'
                        ? 'bg-orange-50 text-orange-700 font-bold border border-orange-200'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-amber-500">
                        savings
                      </span>
                      <span>Envío más económico</span>
                    </div>
                    {filterType === 'barato' && (
                      <span className="material-symbols-outlined text-[16px] text-orange-600">
                        check
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFilterType(filterType === 'valorados' ? null : 'valorados');
                      setIsFilterMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      filterType === 'valorados'
                        ? 'bg-orange-50 text-orange-700 font-bold border border-orange-200'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[17px] text-amber-500 fill-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>Mejor valorados (4.8+)</span>
                    </div>
                    {filterType === 'valorados' && (
                      <span className="material-symbols-outlined text-[16px] text-orange-600">
                        check
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Category Pills */}
      <section className="w-full px-4 py-1 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          {categoryOptions.map((opt) => {
            const active = selectedCategory === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(opt.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-xs flex-shrink-0 transition-transform active:scale-95 text-xs font-bold cursor-pointer ${
                  active
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {opt.dot && <span className={`w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-orange-500'}`} />}
                {opt.emoji && <span className="text-sm">{opt.emoji}</span>}
                <span className="whitespace-nowrap">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Feed Title & Metric */}
      <div className="px-4 flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h1 className="text-sm text-gray-900 font-bold leading-tight">
            Tiendas disponibles
          </h1>
          <span className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] px-2 py-0.2 rounded-full font-bold">
            {filteredStores.length} {filteredStores.length === 1 ? 'local' : 'locales'}
          </span>
        </div>
        <span className="text-xs text-orange-600 flex items-center gap-0.5 font-bold">
          <span className="material-symbols-outlined text-[13px]">bolt</span> Ultra rápido
        </span>
      </div>

      {/* Feed of Stores - Heart / Favorite button removed */}
      <section className="px-4 flex flex-col gap-3">
        {filteredStores.length === 0 ? (
          <div className="p-8 bg-white border border-gray-200 rounded-xl text-center flex flex-col items-center gap-2 shadow-xs">
            <span className="material-symbols-outlined text-gray-400 text-3xl">storefront</span>
            <p className="text-xs font-bold text-gray-900">No se encontraron tiendas con estos filtros</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('open24');
                setSearchQuery('');
                setFilterType(null);
              }}
              className="mt-1 px-4 py-2 bg-orange-500 text-white text-xs rounded-lg font-bold hover:bg-orange-600 cursor-pointer shadow-sm"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          filteredStores.map((store) => (
            <article
              key={store.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs flex flex-col transition-all hover:shadow-md"
            >
              {/* Store Header Image */}
              <div
                onClick={() => {
                  if (onSelectStore) {
                    onSelectStore(store);
                  }
                  onNavigate('restaurant_profile');
                }}
                className="relative w-full h-36 overflow-hidden cursor-pointer group"
              >
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-bold flex items-center gap-1 shadow-sm border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {store.badgeTag}
                  </span>
                  <span className="bg-orange-500/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white shadow-sm font-bold">
                    {store.categoryTag}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <h2 className="text-base text-white font-extrabold drop-shadow-md truncate leading-tight">
                    {store.name}
                  </h2>
                </div>
              </div>

              {/* Store Meta */}
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center text-purple-700 font-bold">
                      <span
                        className="material-symbols-outlined text-[16px] text-amber-500 mr-0.5 fill-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {store.rating}
                    </span>
                    <span className="text-gray-400">({store.ratingCount}+)</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1 text-gray-700 font-medium">
                      <span className="material-symbols-outlined text-[15px] text-orange-600">
                        schedule
                      </span>
                      {store.deliveryTime}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                      store.isFreeDelivery
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {store.isFreeDelivery
                      ? 'Envío Gratis'
                      : `S/ ${store.deliveryFee.toFixed(2)} envío`}
                  </span>
                </div>

                {/* Highlighted Items with direct "+" add buttons */}
                <div className="bg-gray-50 rounded-xl p-2.5 flex flex-col gap-2 border border-gray-200">
                  {store.featuredItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
                    >
                      <div
                        onClick={() => {
                          const storeMenu = RESTAURANT_MENUS[store.id];
                          let foundProd: Product | undefined;
                          if (storeMenu) {
                            for (const cat of storeMenu) {
                              const match = cat.items.find(
                                (p) => p.name.toLowerCase() === item.name.toLowerCase()
                              );
                              if (match) {
                                foundProd = match;
                                break;
                              }
                            }
                          }

                          if (foundProd) {
                            onSelectProduct(foundProd);
                            return;
                          }

                          const prodCategory: 'hambre' | 'sed' | 'farmacia' | 'tragos' | 'tienda' =
                            store.id === 'store-4' || store.id === 'store-7'
                              ? 'farmacia'
                              : store.id === 'store-8' || store.id === 'store-9'
                              ? 'tragos'
                              : store.id === 'store-3' || store.id === 'store-6'
                              ? 'tienda'
                              : 'hambre';

                          const prod: Product = {
                            id: `${store.id}-${idx}`,
                            name: item.name,
                            storeId: store.id,
                            category: prodCategory,
                            price: item.price,
                            description: `Producto de ${store.name}, preparado y disponible para entrega nocturna inmediata.`,
                            image: store.image,
                            storeName: store.name,
                            rating: store.rating,
                            ratingCount: store.ratingCount,
                            prepTime: store.deliveryTime,
                          };
                          onSelectProduct(prod);
                        }}
                        className="flex flex-col min-w-0 pr-2 cursor-pointer group/item"
                      >
                        <span className="text-xs text-gray-900 group-hover/item:text-orange-600 font-bold truncate transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs text-purple-700 font-black">
                          S/ {item.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onAddToCartDirect({
                            name: item.name,
                            price: item.price,
                            storeName: store.name,
                          })
                        }
                        aria-label={`Agregar ${item.name}`}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs font-bold flex items-center gap-1 active:scale-95 flex-shrink-0 shadow-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Añadir</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Sticky Mini-Cart Floating Action Preview Bar */}
      {cartCount > 0 && (
        <aside className="fixed bottom-20 left-0 right-0 px-4 z-40 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-gray-200 text-gray-900 rounded-full p-2 pl-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {cartCount}
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">Total actual</span>
                <span className="text-xs font-black text-purple-700 leading-tight">
                  S/ {cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('cart')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-xs shadow-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <span>Ver mi carrito</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
