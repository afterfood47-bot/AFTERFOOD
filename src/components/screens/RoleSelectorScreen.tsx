import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppScreen } from '../../types';
import {
  ClientIllustration,
  CourierIllustration,
  MerchantIllustration,
} from '../illustrations/PedidosYaIcons';

interface RoleSelectorScreenProps {
  onNavigate?: (screen: AppScreen) => void;
  onSelectRole?: (role: 'cliente' | 'repartidor' | 'negocio') => void;
}

export const RoleSelectorScreen: React.FC<RoleSelectorScreenProps> = ({
  onNavigate,
  onSelectRole,
}) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'cliente' | 'repartidor' | 'negocio'>('cliente');

  const handleRoleClick = (role: 'cliente' | 'repartidor' | 'negocio') => {
    setSelectedRole(role);
    if (onSelectRole) onSelectRole(role);
    if (role === 'cliente') {
      if (onNavigate) onNavigate('login');
      else navigate('/cliente/inicio');
    } else if (role === 'repartidor') {
      if (onNavigate) onNavigate('courier_login');
      else navigate('/entregador/login');
    } else if (role === 'negocio') {
      if (onNavigate) onNavigate('merchant_onboarding');
      else navigate('/comercio/onboarding');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 pt-3 animate-in fade-in duration-200">
      {/* Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-44 bg-primary-container/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-24 -right-12 w-48 h-48 bg-secondary-container/15 blur-3xl pointer-events-none rounded-full" />
      </div>

      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4 text-center z-10 cursor-default select-none pointer-events-none">
        <img
          src="/logo-completo.png"
          alt="AfterFood Logo"
          className="w-40 sm:w-44 h-auto object-contain mb-3 cursor-default select-none pointer-events-none"
          onError={(e) => {
            if (!e.currentTarget.src.includes('/assets/')) {
              e.currentTarget.src = '/assets/logo-completo.png';
            }
          }}
        />
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          ¿Cómo deseas ingresar?
        </h1>
      </div>

      {/* 3 Clean, Direct Role Cards */}
      <div className="flex flex-col gap-3 mt-1 z-10">
        {/* CARD 1: Soy cliente */}
        <button
          type="button"
          onClick={() => handleRoleClick('cliente')}
          className={`group relative flex items-center justify-between p-4 rounded-2xl bg-card border transition-all duration-200 cursor-pointer overflow-hidden active:scale-[0.98] text-left w-full ${
            selectedRole === 'cliente'
              ? 'border-[#FF7A00] shadow-[0_8px_24px_-4px_rgba(255,122,0,0.35)] ring-2 ring-[#FF7A00]/40'
              : 'border-border shadow-sm hover:border-[#FF7A00]/60'
          }`}
        >
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ClientIllustration size={46} />
            </div>
            <span className="text-base sm:text-lg text-foreground font-black tracking-tight group-hover:text-[#FF7A00] transition-colors">
              Soy cliente
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-[#FF7A00] text-muted-foreground group-hover:text-white flex items-center justify-center transition-all shadow-sm shrink-0 border border-border">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </button>

        {/* CARD 2: Soy repartidor */}
        <button
          type="button"
          onClick={() => handleRoleClick('repartidor')}
          className={`group relative flex items-center justify-between p-4 rounded-2xl bg-card border transition-all duration-200 cursor-pointer overflow-hidden active:scale-[0.98] text-left w-full ${
            selectedRole === 'repartidor'
              ? 'border-[#6C5CE7] shadow-[0_8px_24px_-4px_rgba(108,92,231,0.35)] ring-2 ring-[#6C5CE7]/40'
              : 'border-border shadow-sm hover:border-[#6C5CE7]/60'
          }`}
        >
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CourierIllustration size={46} />
            </div>
            <span className="text-base sm:text-lg text-foreground font-black tracking-tight group-hover:text-[#6C5CE7] transition-colors">
              Soy repartidor
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-[#6C5CE7] text-muted-foreground group-hover:text-white flex items-center justify-center transition-all shadow-sm shrink-0 border border-border">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </button>

        {/* CARD 3: Soy un comercio */}
        <button
          type="button"
          onClick={() => handleRoleClick('negocio')}
          className={`group relative flex items-center justify-between p-4 rounded-2xl bg-card border transition-all duration-200 cursor-pointer overflow-hidden active:scale-[0.98] text-left w-full ${
            selectedRole === 'negocio'
              ? 'border-emerald-500 shadow-[0_8px_24px_-4px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500/40'
              : 'border-border shadow-sm hover:border-emerald-500/60'
          }`}
        >
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MerchantIllustration size={46} />
            </div>
            <span className="text-base sm:text-lg text-foreground font-black tracking-tight group-hover:text-emerald-500 transition-colors">
              Soy un comercio
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-emerald-500 text-muted-foreground group-hover:text-white flex items-center justify-center transition-all shadow-sm shrink-0 border border-border">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};

