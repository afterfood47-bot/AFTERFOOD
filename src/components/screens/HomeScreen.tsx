import React, { useState, useMemo } from 'react';
import { STORES_DATA, STORE_CATEGORIES, StoreCategory } from '../../data/mockData';
import { Address, AppScreen, Product, Store } from '../../types';
import { FilterOptionType } from '../common/FilterDropdownAccordion';
import {
  BurgerFriesIllustration,
  DrinksBarIllustration,
  PharmacyIllustration,
  StoreMarketIllustration,
} from '../illustrations/PedidosYaIcons';

interface HomeScreenProps {
  currentAddress?: Address;
  onNavigate: (screen: AppScreen) => void;
  onSelectProduct?: (product?: Product) => void;
  onSelectStore?: (store: Store) => void;
  onOpenAddressSelector?: () => void;
  onFilterCategory?: (category: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectStore,
  onFilterCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterOptionType>(null);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filterOptions: { id: FilterOptionType; label: string; icon: string; description: string }[] = [
    {
      id: 'abiertos',
      label: 'Abiertos ahora',
      icon: 'schedule',
      description: 'Locales atendiendo en este momento 24/7',
    },
    {
      id: 'barato',
      label: 'Más barato',
      icon: 'savings',
      description: 'Menor costo de entrega y mejores precios',
    },
    {
      id: 'valorados',
      label: 'Más valorados',
      icon: 'star',
      description: 'Mayor calificación por usuarios',
    },
  ];

  const handleCategorySelect = (category: StoreCategory) => {
    // Alterna a categoria: se já estiver selecionada, volta para 'all'
    const nextCategory = selectedCategory === category ? 'all' : category;
    setSelectedCategory(nextCategory);
    if (onFilterCategory) {
      onFilterCategory(nextCategory);
    }
  };

  const filteredStores = useMemo(() => {
    let stores = [...STORES_DATA];

    // Filtro pelas 4 categorias exatas
    if (selectedCategory !== 'all') {
      stores = stores.filter((store) => store.category === selectedCategory);
    }

    // Busca rápida opcional
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      stores = stores.filter(
        (store) =>
          store.name.toLowerCase().includes(q) ||
          store.categoryTag.toLowerCase().includes(q) ||
          store.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Aplicação do Filtro: "Abiertos ahora", "Más barato", "Más valorados"
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
  }, [selectedCategory, searchQuery, filterType]);

  return (
    <div className="flex flex-col w-full pb-24 bg-gray-50 text-gray-900 animate-in fade-in duration-200">
      <div className="flex flex-col w-full px-4 pt-2 gap-3.5">
        {/* Barra de Búsqueda con Botón de Filtro Integrado a la Derecha */}
        <div className="relative w-full">
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-24 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none border border-gray-200 focus:border-orange-500 shadow-sm transition-all font-medium"
              placeholder="Buscar restaurantes, mercados, farmacias, bebidas..."
              type="text"
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

              {/* Botón de Filtros Integrado */}
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
                title={filterType ? `Filtro activo: ${filterType}` : 'Filtrar locales'}
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
                      Restablecer
                    </button>
                  )}
                </div>

                {filterOptions.map((opt) => {
                  const isSelected = filterType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setFilterType(isSelected ? null : opt.id);
                        setIsFilterMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-50 border border-orange-300 text-orange-900 font-bold'
                          : 'hover:bg-gray-50 text-gray-800 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[17px]"
                            style={{
                              fontVariationSettings: isSelected && opt.id === 'valorados' ? "'FILL' 1" : undefined,
                            }}
                          >
                            {opt.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold leading-tight">{opt.label}</span>
                          <span className="text-[10px] text-gray-500 leading-tight mt-0.5">{opt.description}</span>
                        </div>
                      </div>

                      {isSelected ? (
                        <span className="material-symbols-outlined text-[18px] text-orange-600 font-bold">
                          check_circle
                        </span>
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Chip de filtro activo para fácil visualización y eliminación rápida */}
          {filterType && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-gray-500 font-medium">Filtro aplicado:</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 shadow-2xs">
                <span>
                  {filterOptions.find((o) => o.id === filterType)?.label || filterType}
                </span>
                <button
                  type="button"
                  onClick={() => setFilterType(null)}
                  className="hover:bg-orange-200 rounded-full p-0.5 cursor-pointer flex items-center justify-center text-orange-700"
                  title="Quitar filtro"
                >
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </span>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* GRID DO TOPO: 4 CATEGORIAS PRINCIPAIS                        */}
        {/* Restaurantes, Market, Farmacia, Licorería                    */}
        {/* ============================================================ */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>Categorías</span>
              {selectedCategory !== 'all' && (
                <span className="text-[10px] font-semibold text-[#FF7A00] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                  Filtro: {selectedCategory === 'Farmácia' ? 'Farmacias' : selectedCategory === 'Licorería' ? 'Licorerías' : selectedCategory}
                </span>
              )}
            </h2>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-[#FF7A00] hover:underline cursor-pointer"
              >
                Limpiar filtro
              </button>
            )}
          </div>

          {/* Grid 2x2 con 4 botones de categorías con diseño e ilustración 3D moderno (estilo PedidosYa / Rappi) */}
          <div className="grid grid-cols-2 gap-2.5">
            {STORE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  aria-pressed={isActive}
                  className={`group relative p-3 rounded-2xl border text-left cursor-pointer transition-all duration-200 active:scale-[0.98] flex flex-col justify-between min-h-[114px] overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-b from-orange-50/90 via-white to-orange-50/40 border-[#FF7A00] ring-2 ring-[#FF7A00]/30 shadow-md'
                      : 'bg-white border-gray-200/90 hover:border-orange-300 hover:shadow-sm hover:bg-orange-50/10'
                  }`}
                >
                  {/* Fila superior: Ícono 3D moderno con volumen y Badge de estado */}
                  <div className="flex items-start justify-between w-full">
                    {/* Contenedor pedestal 3D con degradado y sombra volumétrica estilo PedidosYa */}
                    <div
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 flex-shrink-0 ${
                        cat.id === 'Restaurantes'
                          ? 'bg-gradient-to-br from-amber-100 via-orange-50 to-orange-200/80 border border-orange-200/90 shadow-[0_4px_12px_rgba(255,107,0,0.22)]'
                          : cat.id === 'Market'
                          ? 'bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200/80 border border-emerald-200/90 shadow-[0_4px_12px_rgba(16,185,129,0.22)]'
                          : cat.id === 'Farmácia'
                          ? 'bg-gradient-to-br from-cyan-100 via-teal-50 to-cyan-200/80 border border-cyan-200/90 shadow-[0_4px_12px_rgba(6,182,212,0.22)]'
                          : 'bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200/80 border border-purple-200/90 shadow-[0_4px_12px_rgba(139,92,246,0.22)]'
                      }`}
                    >
                      {/* Brillo especular superior del pedestal 3D */}
                      <span className="absolute inset-x-2 top-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-full pointer-events-none" />

                      {/* Ilustración 3D correspondiente */}
                      {cat.id === 'Restaurantes' && (
                        <BurgerFriesIllustration size={38} className="drop-shadow-sm" />
                      )}
                      {cat.id === 'Market' && (
                        <StoreMarketIllustration size={38} className="drop-shadow-sm" />
                      )}
                      {cat.id === 'Farmácia' && (
                        <PharmacyIllustration size={38} className="drop-shadow-sm" />
                      )}
                      {cat.id === 'Licorería' && (
                        <DrinksBarIllustration size={38} className="drop-shadow-sm" />
                      )}
                    </div>

                    {/* Badge estilo PedidosYa */}
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-[#FF7A00] text-white shadow-xs'
                          : cat.id === 'Restaurantes'
                          ? 'bg-orange-50 text-orange-700 border border-orange-200/80'
                          : cat.id === 'Market'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : cat.id === 'Farmácia'
                          ? 'bg-cyan-50 text-cyan-800 border border-cyan-200/80'
                          : 'bg-purple-50 text-purple-700 border border-purple-200/80'
                      }`}
                    >
                      {isActive ? 'Activo' : cat.badge}
                    </span>
                  </div>

                  {/* Título y descripción de la categoría */}
                  <div className="flex flex-col mt-2.5">
                    <span className="text-sm font-extrabold leading-tight text-gray-900 group-hover:text-[#FF7A00] transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium leading-tight">
                      {cat.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* LISTA VERTICAL DE LOJAS (Sem scroll horizontal)              */}
        {/* Botão de curtir (coração) removido dos cards                 */}
        {/* ============================================================ */}
        <div className="flex flex-col gap-2.5 mt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">
              {selectedCategory === 'all'
                ? 'Todos los establecimientos'
                : `Locales de ${selectedCategory}`}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {filteredStores.length} {filteredStores.length === 1 ? 'local' : 'locales'}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {filteredStores.length === 0 ? (
              <div className="p-8 bg-white border border-gray-200 rounded-xl text-center flex flex-col items-center gap-2 shadow-xs">
                <span className="material-symbols-outlined text-gray-400 text-3xl">storefront</span>
                <p className="text-xs font-bold text-gray-900">Nenhum estabelecimento encontrado com este filtro</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
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
                  onClick={() => {
                    if (onSelectStore) {
                      onSelectStore(store);
                    }
                    onNavigate('restaurant_profile');
                  }}
                  className="group bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden cursor-pointer hover:border-orange-500/60 transition-all active:scale-[0.99]"
                >
                  {/* Imagem no Topo */}
                  <div className="relative w-full h-36 bg-gray-100 overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Tag de Categoria */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-900 shadow-xs border border-gray-200">
                      {store.category}
                    </div>

                    {/* Tempo de Entrega */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-gray-900/80 backdrop-blur-xs text-[10px] font-bold text-white flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[12px] text-orange-400">schedule</span>
                      <span>{store.deliveryTime}</span>
                    </div>

                    {/* Nota do Estabelecimento */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-purple-700 text-[10px] font-bold text-white flex items-center gap-0.5 shadow-xs">
                      <span className="material-symbols-outlined text-[12px] text-yellow-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{store.rating}</span>
                      <span className="text-purple-200 text-[9px]">({store.ratingCount})</span>
                    </div>
                  </div>

                  {/* Informações da Loja */}
                  <div className="p-3.5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {store.name}
                      </h4>
                      <span className={`text-xs font-bold ${store.isFreeDelivery ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {store.isFreeDelivery ? 'Entrega Grátis' : `S/ ${store.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    {/* Descrição e Tags */}
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {store.tags.join(' • ')}
                    </p>

                    {/* Rodapé do Card com Distância */}
                    <div className="flex items-center gap-2 pt-1 border-t border-gray-100 text-[11px] text-gray-500">
                      <span className="font-semibold text-purple-700">{store.badgeTag}</span>
                      <span>•</span>
                      <span>A {store.distanceKm} km de você</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
