import React from 'react';
import { AppScreen } from '../../types';

interface MerchantApprovedScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const MerchantApprovedScreen: React.FC<MerchantApprovedScreenProps> = ({
  onNavigate,
}) => {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-16 pt-4 justify-between bg-slate-50  text-slate-900  transition-colors duration-200 animate-in zoom-in-95 duration-200">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-9" />
          <div className="flex items-center gap-1.5 bg-white  px-3 py-1 rounded-full border border-slate-200  shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-slate-800  uppercase tracking-wider">
              ¡Negocio Aprobado!
            </span>
          </div>
          <div className="w-9" />
        </div>

        {/* Hero Success */}
        <div className="flex flex-col items-center text-center mt-3">
          <div className="relative mb-4">
            <div className="relative w-22 h-22 rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/60 flex items-center justify-center shadow-lg shadow-emerald-500/15">
              <span className="material-symbols-outlined text-5xl text-emerald-500 font-extrabold">
                check_circle
              </span>
            </div>
            <div className="absolute -top-1 -right-2 px-2.5 py-0.5 rounded-full bg-[#6C5CE7] text-white font-black text-[10px] uppercase shadow-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>100% Activo</span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-slate-900  tracking-tight">
            ¡Tu local está listo para vender!
          </h1>
          <p className="text-xs text-slate-600  mt-1 max-w-xs font-medium">
            Ya puedes publicar excedentes con descuento y recibir pedidos nocturnos en Trujillo.
          </p>

          {/* Quick Metrics */}
          <div className="w-full mt-5 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white  border border-slate-200  flex flex-col items-center text-center shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center mb-1.5">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
              <span className="text-xs font-bold text-slate-900 ">0% Comisión</span>
              <span className="text-[10px] text-slate-500 ">Primeros 30 días</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white  border border-slate-200  flex flex-col items-center text-center shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center mb-1.5">
                <span className="material-symbols-outlined text-xl">two_wheeler</span>
              </div>
              <span className="text-xs font-bold text-slate-900 ">Flota Nocturna</span>
              <span className="text-[10px] text-slate-500 ">Cobertura activa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col gap-2 mt-6">
        <button
          onClick={() => onNavigate('merchant_create_product')}
          type="button"
          className="w-full h-12 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Publicar Primer Excedente</span>
        </button>

        <button
          onClick={() => onNavigate('merchant_dashboard')}
          type="button"
          className="w-full h-11 rounded-xl bg-white  hover:bg-slate-100  text-slate-800  text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200  shadow-sm"
        >
          <span className="material-symbols-outlined text-[17px] text-[#FF7A00]">storefront</span>
          <span>Ir al Dashboard Principal</span>
        </button>

        <button
          onClick={() => onNavigate('merchant_catalog')}
          type="button"
          className="w-full h-10 rounded-xl text-slate-600  hover:text-[#FF7A00] text-xs font-semibold flex items-center justify-center transition-colors"
        >
          Ver catálogo de productos
        </button>
      </div>
    </div>
  );
};
