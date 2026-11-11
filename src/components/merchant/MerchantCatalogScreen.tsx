import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MerchantProductItem } from './MerchantCreateProductScreen';
import { MerchantBottomNav } from './MerchantBottomNav';

interface MerchantCatalogScreenProps {
  onNavigate: (screen: AppScreen) => void;
  products: MerchantProductItem[];
  onToggleProductStatus: (id: string) => void;
  onSimulateIncomingOrder?: () => void;
  onUpdateProduct?: (updatedProduct: MerchantProductItem) => void;
}

export const MerchantCatalogScreen: React.FC<MerchantCatalogScreenProps> = ({
  onNavigate,
  products,
  onToggleProductStatus,
  onUpdateProduct,
  onSimulateIncomingOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'activos' | 'agotados'>('activos');

  // Estado para la edición de productos (modal interactivo)
  const [editingProduct, setEditingProduct] = useState<MerchantProductItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editOriginalPrice, setEditOriginalPrice] = useState('');
  const [editDiscountPrice, setEditDiscountPrice] = useState('');
  const [editQuantity, setEditQuantity] = useState(1);
  const [editPickupTime, setEditPickupTime] = useState('');
  const [editError, setEditError] = useState<string | null>(null);

  const activeProducts = products.filter((p) => p.isActive);
  const soldOutProducts = products.filter((p) => !p.isActive);

  const displayedProducts = activeTab === 'activos' ? activeProducts : soldOutProducts;

  const handleOpenEdit = (product: MerchantProductItem) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditDesc(product.description);
    setEditOriginalPrice(product.originalPrice.toString());
    setEditDiscountPrice(product.discountPrice.toString());
    setEditQuantity(product.quantity);
    setEditPickupTime(product.pickupTime);
    setEditError(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editName.trim()) {
      setEditError('Ingresa el nombre del producto.');
      return;
    }

    const numOriginal = parseFloat(editOriginalPrice) || 0;
    const numDiscount = parseFloat(editDiscountPrice) || 0;

    if (numOriginal <= 0 || numDiscount <= 0) {
      setEditError('Los precios deben ser mayores a S/ 0.');
      return;
    }

    if (numDiscount >= numOriginal) {
      setEditError('El precio de oferta debe ser menor al precio original.');
      return;
    }

    if (editQuantity < 0) {
      setEditError('La cantidad no puede ser negativa.');
      return;
    }

    const updated: MerchantProductItem = {
      ...editingProduct,
      name: editName.trim(),
      description: editDesc.trim(),
      originalPrice: numOriginal,
      discountPrice: numDiscount,
      quantity: editQuantity,
      pickupTime: editPickupTime.trim() || 'Horario nocturno',
    };

    if (onUpdateProduct) {
      onUpdateProduct(updated);
    }
    setEditingProduct(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-4 pb-28 pt-3 bg-slate-50 text-slate-900 transition-colors duration-200 animate-in fade-in duration-200">
      {/* Top Header: Acción Simular activa el pedido entrante simulado */}
      <div className="flex items-center justify-end mb-3">
        <button
          type="button"
          onClick={() => {
            if (onSimulateIncomingOrder) {
              onSimulateIncomingOrder();
            } else {
              onNavigate('merchant_kitchen_orders');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FF7A00] text-xs font-bold hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Simular un pedido entrante"
        >
          <span className="material-symbols-outlined text-[16px]">skillet</span>
          <span>Simular</span>
        </button>
      </div>

      {/* Title & Quick Stats */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Catálogo de Productos
          </h1>
          <p className="text-xs text-slate-600">
            Toca cualquier producto para editar sus datos o cambiar su stock
          </p>
        </div>
        <button
          onClick={() => onNavigate('merchant_create_product')}
          className="px-3 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nuevo</span>
        </button>
      </div>

      {/* Tabs: "Activos" y "Agotados" */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/80 border border-slate-300 mb-3.5">
        <button
          type="button"
          onClick={() => setActiveTab('activos')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'activos'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>Activos ({activeProducts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('agotados')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'agotados'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-base">block</span>
          <span>Agotados ({soldOutProducts.length})</span>
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {displayedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-white border border-dashed border-slate-300 text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
              {activeTab === 'activos' ? 'remove_shopping_cart' : 'done_all'}
            </span>
            <p className="text-sm font-bold text-slate-900">
              {activeTab === 'activos'
                ? 'No tienes productos activos en este momento'
                : 'No hay productos marcados como agotados'}
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              {activeTab === 'activos'
                ? 'Usa el botón "+ Nuevo" para publicar porciones con descuento.'
                : 'Cuando agotes un lote, desactívalo y aparecerá aquí.'}
            </p>
          </div>
        ) : (
          displayedProducts.map((product) => {
            const discountPct = Math.round(
              ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                onClick={() => handleOpenEdit(product)}
                className={`p-3 rounded-2xl bg-white border transition-all shadow-sm cursor-pointer group hover:shadow-md ${
                  product.isActive
                    ? 'border-slate-200 hover:border-[#FF7A00]'
                    : 'border-slate-200 opacity-80 hover:border-slate-400'
                }`}
                title="Toca para editar este producto"
              >
                <div className="flex items-start gap-3">
                  {/* Photo */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        !product.isActive ? 'grayscale' : ''
                      }`}
                    />
                    {discountPct > 0 && product.isActive && (
                      <span className="absolute top-1 left-1 bg-[#FF7A00] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                        -{discountPct}%
                      </span>
                    )}
                    {!product.isActive && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-[9px] font-black text-rose-300 uppercase tracking-wider">
                          Agotado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#FF7A00] transition-colors">
                        {product.name}
                      </h3>
                      <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#FF7A00] transition-colors shrink-0">
                        edit
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm font-black text-[#FF7A00] tabular-nums">
                        S/ {product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through tabular-nums">
                        S/ {product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-[#6C5CE7] bg-[#6C5CE7]/15 px-1.5 py-0.5 rounded font-bold ml-auto tabular-nums">
                        Stock: {product.quantity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        <span>{product.pickupTime}</span>
                      </div>

                      {/* Interactive Toggle Switch (Activo / Agotado) */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold ${
                            product.isActive ? 'text-emerald-600' : 'text-slate-400'
                          }`}
                        >
                          {product.isActive ? 'Activo' : 'Agotado'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleProductStatus(product.id);
                          }}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            product.isActive ? 'bg-[#FF7A00]' : 'bg-slate-300'
                          }`}
                          aria-label="Alternar estado activo"
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              product.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal / Formulario de Edición de Producto */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 p-5 shadow-2xl flex flex-col gap-3 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF7A00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    Editar Producto
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Modifica precios, stock o descripción
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {editError && (
              <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-2.5">
              {/* Nombre */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-800">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>

              {/* Descripción */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-800">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-[#FF7A00] resize-none"
                />
              </div>

              {/* Precios */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-800">
                    Precio regular (S/)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={editOriginalPrice}
                    onChange={(e) => setEditOriginalPrice(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 outline-none focus:ring-1 focus:ring-[#FF7A00]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#FF7A00]">
                    Precio oferta (S/)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={editDiscountPrice}
                    onChange={(e) => setEditDiscountPrice(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-orange-50/50 border border-orange-200 text-xs font-mono font-bold text-[#FF7A00] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                  />
                </div>
              </div>

              {/* Stock y Horario */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-800">
                    Stock disponible
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditQuantity((q) => Math.max(0, q - 1))}
                      className="w-8 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(parseInt(e.target.value) || 0)}
                      className="w-full h-10 text-center rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setEditQuantity((q) => q + 1)}
                      className="w-8 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-800">
                    Horario de recojo
                  </label>
                  <input
                    type="text"
                    value={editPickupTime}
                    onChange={(e) => setEditPickupTime(e.target.value)}
                    placeholder="ej: 11:00 PM - 2:00 AM"
                    className="w-full h-10 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-[#FF7A00]"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-1">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] text-white font-bold text-xs shadow-md shadow-[#FF7A00]/25 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <MerchantBottomNav
        currentScreen="merchant_catalog"
        onNavigate={onNavigate}
        activeKitchenCount={1}
      />
    </div>
  );
};