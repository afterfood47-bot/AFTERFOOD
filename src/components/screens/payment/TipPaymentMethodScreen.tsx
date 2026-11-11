import React from 'react';
import { AppScreen } from '../../../types';

interface TipPaymentMethodScreenProps {
  tipAmount: number;
  courierName?: string;
  courierAvatar?: string;
  onSelectMethod: (method: 'yape' | 'card') => void;
  onNavigate: (screen: AppScreen) => void;
  onBack: () => void;
}

export const TipPaymentMethodScreen: React.FC<TipPaymentMethodScreenProps> = ({
  tipAmount,
  courierName = 'Carlos Mendoza',
  courierAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  onSelectMethod,
  onBack,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pb-32 pt-2 animate-in fade-in duration-200">
      {/* Banner de Propina al Repartidor en Light Mode */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={courierAvatar}
              alt={courierName}
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] shadow">
              <span className="material-symbols-outlined text-[13px] fill-1">
                verified
              </span>
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] text-orange-600 uppercase font-bold tracking-wider leading-none">
              Propina al repartidor
            </span>
            <span className="text-sm font-extrabold text-gray-900 truncate leading-tight mt-0.5">
              {courierName}
            </span>
            <span className="text-[11px] text-gray-500 leading-tight">
              Honda CB125F • Entrega rápida 24H
            </span>
          </div>

          {/* Monto de Propina Destacado */}
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-[9px] text-gray-400 uppercase font-bold">
              Monto
            </span>
            <span className="text-base font-black text-purple-700">
              S/ {tipAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-gray-600 leading-tight pt-2 border-t border-gray-100">
          El 100% de esta propina va directamente a tu repartidor. Elige tu medio de pago preferido:
        </p>
      </div>

      {/* Título de la sección */}
      <div className="mb-2">
        <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight">
          Medio de Pago para la Propina
        </h2>
        <p className="text-[11px] text-gray-500 leading-tight">
          Selecciona una de las dos opciones disponibles
        </p>
      </div>

      {/* ÚNICAMENTE DOS OPCIONES ELEGIBLES: YAPE O TARJETA DE CRÉDITO/DÉBITO */}
      <div className="flex flex-col gap-2.5">
        {/* Opción 1: Yape */}
        <button
          type="button"
          onClick={() => onSelectMethod('yape')}
          className="group w-full p-3.5 rounded-2xl bg-white hover:bg-purple-50/50 border border-gray-200 hover:border-purple-300 text-left transition-all active:scale-[0.98] shadow-xs flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#742284] to-[#491254] flex items-center justify-center text-white font-black text-xl shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
              Y
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-purple-700 transition-colors">
                  Yape
                </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[9px] font-black uppercase">
                  Directo
                </span>
              </div>
              <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                Escanea el QR o yapea al número oficial al instante
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#742284] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </div>
        </button>

        {/* Opción 2: Tarjeta de Crédito / Débito */}
        <button
          type="button"
          onClick={() => onSelectMethod('card')}
          className="group w-full p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-gray-200 hover:border-orange-300 text-left transition-all active:scale-[0.98] shadow-xs flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5a49e3] to-[#372aa7] flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">
                credit_card
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#5a49e3] transition-colors">
                  Tarjeta de Crédito / Débito
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-black uppercase">
                  Seguro
                </span>
              </div>
              <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                Paga con Visa, Mastercard o tarjeta de débito
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#5a49e3] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </div>
        </button>
      </div>

      {/* Botón Volver */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-gray-500 hover:text-gray-900 font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Regresar a la calificación</span>
        </button>
      </div>
    </div>
  );
};
