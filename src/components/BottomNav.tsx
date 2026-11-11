import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen?: AppScreen;
  onNavigate?: (screen: AppScreen) => void;
  cartCount?: number;
  activeOrdersCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  cartCount = 0,
  activeOrdersCount = 0,
}) => {
  const location = useLocation();
  const path = location.pathname;

  // 1. Ocultar a barra completamente em ecrãs de login, splash e seleção de perfis
  const isExcludedScreen =
    path === '/cliente/login' ||
    path === '/cliente/registro' ||
    path === '/cliente/endereco' ||
    path === '/entregador/login' ||
    path === '/' ||
    path === '/splash' ||
    path === '/selecionar-perfil' ||
    path === '/role_selector' ||
    currentScreen === 'login' ||
    currentScreen === 'register' ||
    currentScreen === 'courier_login' ||
    currentScreen === 'role_selector' ||
    currentScreen === 'role_selection' ||
    currentScreen === 'splash';

  if (isExcludedScreen) {
    return null;
  }

  // Identifica se estamos no fluxo do Entregador ou do Comércio
  const isCourierMode = path.startsWith('/entregador') || (currentScreen && currentScreen.startsWith('courier_'));
  const isMerchantMode = path.startsWith('/comercio') || (currentScreen && currentScreen.startsWith('merchant_'));

  // Se for Comércio, oculta esta barra (o comércio costuma ter a sua própria navegação)
  if (isMerchantMode) {
    return null;
  }

  const handleTabClick = (screen: AppScreen) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  // ==========================================
  // RENDERIZAÇÃO MODO ENTREGADOR (4 BOTÕES)
  // Perfil, Radar, Pedidos e Histórico de Ventas
  // ==========================================
  if (isCourierMode) {
    const isRadarActive =
      path === '/entregador' ||
      path === '/entregador/radar' ||
      path === '/entregador/inicio' ||
      path === '/entregador/painel' ||
      path === '/entregador/mapa-calor' ||
      currentScreen === 'courier_dashboard' ||
      currentScreen === 'courier_heat_map';

    const isCourierOrdersActive =
      path.startsWith('/entregador/pedidos') ||
      path.startsWith('/entregador/pedido-ativo') ||
      path.startsWith('/entregador/pedido-recebido') ||
      path.startsWith('/entregador/para-restaurante') ||
      path.startsWith('/entregador/para-cliente') ||
      path.startsWith('/entregador/confirmar-pin') ||
      currentScreen === 'courier_incoming_order' ||
      currentScreen === 'courier_to_restaurant' ||
      currentScreen === 'courier_to_client' ||
      currentScreen === 'courier_delivery_pin';

    const isHistoryActive =
      path.startsWith('/entregador/historial') ||
      path.startsWith('/entregador/historico') ||
      path.startsWith('/entregador/resumo') ||
      currentScreen === 'courier_weekly_history' ||
      currentScreen === 'courier_completed_summary';

    const isCourierProfileActive =
      path.startsWith('/entregador/perfil') ||
      path.startsWith('/entregador/veiculos') ||
      path.startsWith('/entregador/vehiculos') ||
      path.startsWith('/entregador/documentos') ||
      path.startsWith('/entregador/suporte') ||
      currentScreen === 'courier_profile' ||
      currentScreen === 'courier_manage_vehicles' ||
      currentScreen === 'courier_vehicle_docs_detail' ||
      currentScreen === 'courier_support';

    return (
      <nav aria-label="Navegación del Repartidor" className="fixed bottom-0 left-0 right-0 z-[99] bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] shadow-sm transition-colors duration-200">
        <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-1">
          {/* 1. Radar */}
          <Link
            to="/entregador/mapa-calor"
            onClick={(e) => { e.preventDefault(); handleTabClick('courier_heat_map'); }}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${isRadarActive ? 'text-[#6C5CE7] font-bold' : 'text-[#64748b] hover:text-[#1a1d20]'}`}
          >
            <div className="relative">
              <span className={`material-symbols-outlined text-[24px] transition-transform ${isRadarActive ? 'scale-110 text-[#6C5CE7]' : 'text-[#94a3b8]'}`} style={{ fontVariationSettings: isRadarActive ? "'FILL' 1" : "'FILL' 0" }}>radar</span>
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Radar</span>
            {isRadarActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-0.5 shadow-sm" />}
          </Link>

          {/* 2. Pedidos Entregador */}
          <Link
            to="/entregador/para-restaurante"
            onClick={(e) => { 
              e.preventDefault(); 
              handleTabClick('courier_to_restaurant'); 
            }}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${isCourierOrdersActive ? 'text-[#6C5CE7] font-bold' : 'text-[#64748b] hover:text-[#1a1d20]'}`}
          >
            <div className="relative">
              <span className={`material-symbols-outlined text-[24px] transition-transform ${isCourierOrdersActive ? 'scale-110 text-[#6C5CE7]' : 'text-[#94a3b8]'}`} style={{ fontVariationSettings: isCourierOrdersActive ? "'FILL' 1" : "'FILL' 0" }}>inventory_2</span>
              {activeOrdersCount > 0 && <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-bold shadow-xs">{activeOrdersCount}</span>}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Pedidos</span>
            {isCourierOrdersActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-0.5 shadow-sm" />}
          </Link>

          {/* 3. Histórico de Ventas */}
          <Link
            to="/entregador/historico"
            onClick={(e) => { e.preventDefault(); handleTabClick('courier_weekly_history'); }}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 text-center ${isHistoryActive ? 'text-[#6C5CE7] font-bold' : 'text-[#64748b] hover:text-[#1a1d20]'}`}
          >
            <div className="relative">
              <span className={`material-symbols-outlined text-[24px] transition-transform ${isHistoryActive ? 'scale-110 text-[#6C5CE7]' : 'text-[#94a3b8]'}`} style={{ fontVariationSettings: isHistoryActive ? "'FILL' 1" : "'FILL' 0" }}>history</span>
            </div>
            <span className="text-[9px] mt-0.5 tracking-tight font-medium leading-none">Histórico de Ventas</span>
            {isHistoryActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-0.5 shadow-sm" />}
          </Link>

          {/* 4. Perfil Entregador */}
          <Link
            to="/entregador/perfil"
            onClick={(e) => { e.preventDefault(); handleTabClick('courier_profile'); }}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${isCourierProfileActive ? 'text-[#6C5CE7] font-bold' : 'text-[#64748b] hover:text-[#1a1d20]'}`}
          >
            <div className="relative">
              <span className={`material-symbols-outlined text-[24px] transition-transform ${isCourierProfileActive ? 'scale-110 text-[#6C5CE7]' : 'text-[#94a3b8]'}`} style={{ fontVariationSettings: isCourierProfileActive ? "'FILL' 1" : "'FILL' 0" }}>person</span>
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Perfil</span>
            {isCourierProfileActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-0.5 shadow-sm" />}
          </Link>
        </div>
      </nav>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO MODO CLIENTE (3 BOTÕES)
  // ==========================================
  const isHomeActive =
    path === '/cliente' ||
    path === '/cliente/inicio' ||
    path.startsWith('/cliente/restaurante') ||
    path.startsWith('/cliente/produto') ||
    (!path.includes('/pedidos') &&
      !path.includes('/perfil') &&
      !path.includes('/suporte') &&
      !path.includes('/rastreamento') &&
      (currentScreen === 'home' || currentScreen === 'explore'));

  const isClientOrdersActive =
    path.startsWith('/cliente/pedidos') ||
    path.startsWith('/cliente/rastreamento') ||
    path.startsWith('/cliente/pedido-confirmado') ||
    currentScreen === 'orders' ||
    currentScreen === 'order_tracking' ||
    currentScreen === 'order_confirmed';

  const isClientProfileActive =
    path.startsWith('/cliente/perfil') ||
    path.startsWith('/cliente/suporte') ||
    currentScreen === 'profile' ||
    currentScreen === 'support';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-sm transition-colors duration-200">
      <div className="max-w-md mx-auto grid grid-cols-3 items-center h-16 px-4">
        {/* 1. Início Cliente */}
        <Link
          to="/cliente/inicio"
          onClick={(e) => { e.preventDefault(); handleTabClick('home'); }}
          className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${isHomeActive ? 'text-orange-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="relative">
            <span className={`material-symbols-outlined text-[24px] transition-transform ${isHomeActive ? 'scale-110 text-orange-600' : 'text-gray-400'}`} style={{ fontVariationSettings: isHomeActive ? "'FILL' 1" : "'FILL' 0" }}>home</span>
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">Início</span>
          {isHomeActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-0.5" />}
        </Link>

        {/* 2. Pedidos Cliente */}
        <Link
          to="/cliente/pedidos"
          onClick={(e) => { e.preventDefault(); handleTabClick('orders'); }}
          className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${isClientOrdersActive ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="relative">
            <span className={`material-symbols-outlined text-[24px] transition-transform ${isClientOrdersActive ? 'scale-110 text-purple-700' : 'text-gray-400'}`} style={{ fontVariationSettings: isClientOrdersActive ? "'FILL' 1" : "'FILL' 0" }}>receipt_long</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-orange-500 text-white text-[9px] font-bold shadow-xs">{cartCount}</span>}
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">Pedidos</span>
          {isClientOrdersActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5" />}
        </Link>

        {/* 3. Perfil Cliente */}
        <Link
          to="/cliente/perfil"
          onClick={(e) => { e.preventDefault(); handleTabClick('profile'); }}
          className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${isClientProfileActive ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="relative">
            <span className={`material-symbols-outlined text-[24px] transition-transform ${isClientProfileActive ? 'scale-110 text-purple-700' : 'text-gray-400'}`} style={{ fontVariationSettings: isClientProfileActive ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-medium">Perfil</span>
          {isClientProfileActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5" />}
        </Link>
      </div>
    </nav>
  );
};