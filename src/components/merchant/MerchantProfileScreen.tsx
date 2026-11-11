import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MerchantBottomNav } from './MerchantBottomNav';

interface MerchantProfileScreenProps {
  onNavigate: (screen: AppScreen) => void;
  businessName?: string;
  businessLogo?: string;
  businessAddress?: string;
  businessRuc?: string;
  nightHours?: string;
  category?: string;
  isOpen?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
  phone?: string;
  email?: string;
  rating?: number;
  totalReviews?: number;
}

export const MerchantProfileScreen: React.FC<MerchantProfileScreenProps> = ({
  onNavigate,
  businessName = 'Burger Night UPAO',
  businessLogo = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
  businessAddress = 'Av. América Sur 1234, Trujillo',
  businessRuc = '20608945123',
  nightHours = '8:00 PM - 4:00 AM',
  category = 'Comida Rápida',
  isOpen: initialIsOpen = true,
  onToggleOpen,
  phone = '+51 944 812 390',
  email = 'contacto@burgernight.pe',
  rating = 4.9,
  totalReviews = 184,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isCopied, setIsCopied] = useState(false);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (onToggleOpen) onToggleOpen(next);
  };

  const copyRuc = () => {
    navigator.clipboard?.writeText(businessRuc);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'farmacia':
        return 'local_pharmacy';
      case 'comida rápida':
        return 'fastfood';
      case 'pizzería nocturna':
        return 'local_pizza';
      case 'pastelería & postres':
        return 'cake';
      case 'bebidas & tragos':
        return 'local_bar';
      case 'minimarket / tienda':
        return 'store';
      case 'otros':
        return 'category';
      default:
        return 'restaurant';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50  text-slate-900  px-4 pt-3 pb-28 relative select-none animate-in fade-in duration-200 transition-colors">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-56 bg-gradient-to-b from-[#FF7A00]/15 via-[#6C5CE7]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header bar con badge Socio Verificado */}
      <div className="flex items-center justify-end mb-4 relative z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
          <span className="material-symbols-outlined text-[#FF7A00] text-[15px]">verified</span>
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            Socio Verificado
          </span>
        </div>
      </div>

      {/* Hero Card del Comercio (estilo PedidosYa / iFood Partner) */}
      <div className="bg-white  rounded-3xl p-5 border border-slate-200  shadow-md relative overflow-hidden mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={businessLogo}
                alt={businessName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200  shadow-sm"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white  ${
                  isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-lg font-black text-slate-900  tracking-tight">
                  {businessName}
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-500/10 text-[#FF7A00] text-[11px] font-bold border border-orange-500/20">
                  <span className="material-symbols-outlined text-[13px]">{getCategoryIcon(category)}</span>
                  <span>{category}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600  text-[11px] font-bold border border-amber-500/20">
                  <span className="material-symbols-outlined text-[13px] fill-1 text-amber-500">star</span>
                  <span>{rating}</span>
                  <span className="text-[10px] text-slate-500  font-normal">({totalReviews})</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle de Estado del Local: Abierto / Cerrado */}
        <div className="mt-4 pt-4 border-t border-slate-100  flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-900  flex items-center gap-1.5">
              <span>Estado del Local:</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold uppercase ${
                isOpen
                  ? 'bg-emerald-500/15 text-emerald-600 '
                  : 'bg-rose-500/15 text-rose-600 '
              }`}>
                {isOpen ? 'Abierto para Pedidos' : 'Cerrado Temporalmente'}
              </span>
            </p>
            <p className="text-[11px] text-slate-500  mt-0.5">
              {isOpen ? 'Aceptando solicitudes y despachos en vivo.' : 'Tu catálogo está pausado para los clientes.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer shadow-inner shrink-0 ${
              isOpen ? 'bg-emerald-500' : 'bg-slate-300 '
            }`}
            aria-label="Alternar apertura de tienda"
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                isOpen ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[14px] ${
                  isOpen ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {isOpen ? 'check' : 'close'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bloque 1: Horario de Atención y Despacho */}
      <div className="bg-white  rounded-2xl p-4 border border-slate-200  shadow-sm mb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
          </div>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 ">
            Horario de Atención
          </h2>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#FF7A00]">nights_stay</span>
              <span className="text-xs font-semibold text-slate-700 ">Turno Nocturno</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 ">{nightHours}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-emerald-500">calendar_month</span>
              <span className="text-xs font-semibold text-slate-700 ">Días Operativos</span>
            </div>
            <span className="text-xs font-bold text-slate-900 ">Lunes a Domingo</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-blue-500">timer</span>
              <span className="text-xs font-semibold text-slate-700 ">Tiempo de Preparación</span>
            </div>
            <span className="text-xs font-bold text-slate-900 ">10 - 18 min</span>
          </div>
        </div>
      </div>

      {/* Bloque 2: Ubicación & Datos Fiscales */}
      <div className="bg-white  rounded-2xl p-4 border border-slate-200  shadow-sm mb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-[#FF7A00] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
          </div>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 ">
            Ubicación & Datos Fiscales
          </h2>
        </div>

        <div className="space-y-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <span className="text-[10px] font-bold uppercase text-slate-500  block mb-0.5">
              Dirección del Establecimiento
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-900 ">{businessAddress}</span>
              <span className="material-symbols-outlined text-slate-400 text-sm shrink-0">map</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <span className="text-[10px] font-bold uppercase text-slate-500  block mb-0.5">
              RUC Registrado
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 ">{businessRuc}</span>
              <button
                type="button"
                onClick={copyRuc}
                className="text-[11px] font-bold text-[#FF7A00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">{isCopied ? 'done' : 'content_copy'}</span>
                <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 3: Datos de Contacto y Soporte */}
      <div className="bg-white  rounded-2xl p-4 border border-slate-200  shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
          </div>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 ">
            Datos de Contacto
          </h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-emerald-500">call</span>
              <span className="text-xs text-slate-600 ">Teléfono / WhatsApp:</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 ">{phone}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50  border border-slate-200/80 ">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-blue-500">mail</span>
              <span className="text-xs text-slate-600 ">Correo Electrónico:</span>
            </div>
            <span className="text-xs font-medium text-slate-900 ">{email}</span>
          </div>
        </div>
      </div>

      {/* Botón de Acción Rápida */}
      <div className="mb-3">
        <button
          type="button"
          onClick={() => onNavigate('merchant_register')}
          className="w-full h-11 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Editar Datos</span>
        </button>
      </div>

      {/* Botón Cerrar Sesión */}
      <button
        type="button"
        onClick={() => onNavigate('role_selection')}
        className="w-full h-11 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 active:scale-[0.99] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer mb-6"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        <span>Cerrar Sesión</span>
      </button>

      {/* Barra de Navegación fija del Comercio */}
      <MerchantBottomNav currentScreen="merchant_profile" onNavigate={onNavigate} />
    </div>
  );
};
