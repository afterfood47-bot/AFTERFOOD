import React, { useState } from 'react';

export type FilterOptionType = 'abiertos' | 'barato' | 'valorados' | null;

interface FilterDropdownAccordionProps {
  activeFilter: FilterOptionType;
  onSelectFilter: (filter: FilterOptionType) => void;
  className?: string;
}

export const FilterDropdownAccordion: React.FC<FilterDropdownAccordionProps> = ({
  activeFilter,
  onSelectFilter,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: { id: FilterOptionType; label: string; icon: string; description: string }[] = [
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

  const activeOption = options.find((opt) => opt.id === activeFilter);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (id: FilterOptionType) => {
    // Si ya está activo, desmarca; si no, aplica el nuevo filtro
    if (activeFilter === id) {
      onSelectFilter(null);
    } else {
      onSelectFilter(id);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Botón Disparador Dropdown/Accordion */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs cursor-pointer select-none ${
          isOpen
            ? 'bg-orange-50/70 border-orange-500 text-orange-700 ring-2 ring-orange-500/20'
            : activeFilter
            ? 'bg-orange-50/50 border-orange-400 text-orange-700'
            : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
              activeFilter ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {activeOption ? activeOption.icon : 'tune'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <span className="text-gray-500 font-medium">Filtros:</span>
            <span className="text-gray-900 font-extrabold truncate">
              {activeOption ? activeOption.label : 'Todos los locales'}
            </span>
            {activeFilter && (
              <span className="px-1.5 py-0.2 rounded-full bg-orange-200 text-orange-900 text-[9px] font-black uppercase">
                Activo
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500">
          {activeFilter && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectFilter(null);
              }}
              title="Quitar filtro"
              className="w-5 h-5 rounded-full hover:bg-orange-200/60 text-orange-700 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
          <span
            className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-orange-600' : 'text-gray-400'
            }`}
          >
            expand_more
          </span>
        </div>
      </button>

      {/* Panel Acordeón / Dropdown Desplegable */}
      {isOpen && (
        <div className="mt-1.5 w-full bg-white border border-gray-200 rounded-xl p-2 shadow-lg z-30 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-gray-500 border-b border-gray-100">
            <span>Ordenar y filtrar por:</span>
            {activeFilter && (
              <button
                type="button"
                onClick={() => {
                  onSelectFilter(null);
                  setIsOpen(false);
                }}
                className="text-orange-600 hover:text-orange-800 text-[10px] font-bold"
              >
                Restablecer
              </button>
            )}
          </div>

          {options.map((opt) => {
            const isSelected = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-50 border border-orange-300 text-orange-900 font-bold'
                    : 'hover:bg-gray-50 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600'
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
                    <span className="text-xs font-bold leading-tight">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-gray-500 leading-tight mt-0.5">
                      {opt.description}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="material-symbols-outlined text-[18px] text-orange-600 font-bold">
                    check_circle
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
