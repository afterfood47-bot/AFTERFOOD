import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppScreen } from '../types';
import { VibrantCartIcon, VibrantLocationPin } from './illustrations/PedidosYaIcons';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onBack?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  title?: string;
  showBack?: boolean;
  currentAddress?: { street: string; reference?: string };
  onOpenAddressSelector?: () => void;
  cartCount?: number;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  onOpenNotifications,
  onOpenProfile,
  title,
  showBack = false,
  currentAddress,
  onOpenAddressSelector,
  cartCount = 2,
  isLightMode = false,
  onToggleLightMode,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentScreen === 'rate_order') {
      onNavigate('orders');
      return;
    }
    if (currentScreen === 'orders') {
      onNavigate('home');
      return;
    }
    if (currentScreen === 'product_detail' || currentScreen === 'order_tracking') {
      onNavigate('home');
      return;
    }
    if (
      currentScreen === 'login' ||
      currentScreen === 'register' ||
      currentScreen === 'courier_login' ||
      currentScreen === 'merchant_onboarding'
    ) {
      onNavigate('role_selection');
      return;
    }
    if (currentScreen === 'merchant_pickup_pin') {
      onNavigate('merchant_kitchen_orders');
      return;
    }
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  const isBackVisible =
    showBack ||
    [
      'product_detail',
      'restaurant_profile',
      'cart',
      'payment_card',
      'payment_yape',
      'tip_payment_select',
      'orders',
      'profile',
      'checkout',
      'order_confirmed',
      'order_tracking',
      'rate_order',
      'address_selector',
      'role_selector',
      'login',
      'register',
      'courier_login',
      'courier_register',
      'courier_vehicle',
      'courier_verification',
      'courier_dashboard',
      'courier_heat_map',
      'courier_incoming_order',
      'courier_to_restaurant',
      'courier_to_client',
      'courier_delivery_pin',
      'courier_completed_summary',
      'courier_weekly_history',
      'courier_profile',
      'courier_manage_vehicles',
      'courier_vehicle_docs_detail',
      'courier_support',
      'merchant_onboarding',
      'merchant_register',
      'merchant_review',
      'merchant_approved',
      'merchant_create_product',
      'merchant_catalog',
      'merchant_incoming_order',
      'merchant_kitchen_orders',
      'merchant_pickup_pin',
      'merchant_sales_metrics',
      'merchant_profile',
    ].includes(currentScreen);

  // Screens that must NOT display share or favorite icons
  const isMinimalAuthScreen = [
    'role_selector',
    'login',
    'register',
    'product_detail',
    'restaurant_profile',
    'cart',
    'payment_card',
    'payment_yape',
    'tip_payment_select',
    'orders',
    'profile',
    'checkout',
    'order_tracking',
    'rate_order',
    'address_selector',
  ].includes(currentScreen);

  const getScreenTitle = () => {
    if (title) return title;
    switch (currentScreen) {
      case 'orders':
        return 'Mis Pedidos';
      case 'profile':
        return 'Mi Perfil';
      case 'restaurant_profile':
        return 'Catálogo del Local';
      case 'cart':
        return 'Mi Carrito de Compras';
      case 'payment_card':
        return 'Agregar Tarjeta';
      case 'payment_yape':
        return 'Pagar con Yape';
      case 'tip_payment_select':
        return 'Medio de Pago - Propina';
      case 'product_detail':
        return 'Detalle Del Producto';
      case 'checkout':
        return 'Selección de Pago';
      case 'order_confirmed':
        return '¡Pedido Confirmado!';
      case 'order_tracking':
        return 'Detalle Del Pedido';
      case 'rate_order':
        return 'Calificar Pedido';
      case 'address_selector':
        return 'Dirección de Entrega';
      case 'role_selector':
        return 'Elige tu Perfil';
      case 'login':
        return 'Iniciar Sesión';
      case 'register':
        return 'Registro';
      case 'courier_login':
        return 'Acceso Repartidores';
      case 'courier_register':
        return 'Registro de Repartidor';
      case 'courier_vehicle':
        return 'Vehículo y Documentos';
      case 'courier_verification':
        return 'Verificación en Análisis';
      case 'courier_dashboard':
        return 'Modo Repartidor';
      case 'courier_heat_map':
        return 'Zonas Calientes Trujillo';
      case 'courier_incoming_order':
        return 'Nueva Solicitud';
      case 'courier_to_restaurant':
        return 'En Ruta al Local';
      case 'courier_to_client':
        return 'En Ruta al Cliente';
      case 'courier_delivery_pin':
        return 'Confirmar Entrega';
      case 'courier_completed_summary':
        return 'Resumen de Entrega';
      case 'courier_weekly_history':
        return 'Historial y Ganancias';
      case 'courier_profile':
        return 'Mi Perfil Conductor';
      case 'courier_manage_vehicles':
        return 'Gestión de Vehículos';
      case 'courier_vehicle_docs_detail':
        return 'Documentos Vehiculares';
      case 'courier_support':
        return 'Centro de Ayuda Conductor';
      case 'merchant_dashboard':
        return 'Comercio Aliado';
      case 'merchant_onboarding':
        return 'Inicia sesión en AfterFood';
      case 'merchant_register':
        return 'Datos del Comercio';
      case 'merchant_review':
        return 'Negocio en Revisión';
      case 'merchant_approved':
        return '¡Cuenta Aprobada!';
      case 'merchant_create_product':
        return 'Publicar Excedente';
      case 'merchant_catalog':
        return 'Catálogo de Excedentes';
      case 'merchant_incoming_order':
        return 'Nuevo Pedido Entrante';
      case 'merchant_kitchen_orders':
        return 'Cocina en Vivo (KDS)';
      case 'merchant_pickup_pin':
        return 'Entrega a Repartidor';
      case 'merchant_sales_metrics':
        return 'Panel de Ventas';
      case 'merchant_profile':
        return 'Perfil del Comercio';
      default:
        return 'AfterFood';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-md mx-auto h-14 px-4 flex items-center justify-between gap-2">
        {/* Left section: Back button or Home Location Display */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {isBackVisible ? (
            <button
              onClick={handleBack}
              aria-label="Volver"
              className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground active:bg-muted transition-colors flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : null}

          {/* On Home screen: LogoHorizontal on left + Location Selector */}
          {currentScreen === 'home' ? (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div
                className="cursor-default select-none pointer-events-none flex-shrink-0"
                aria-label="AfterFood"
              >
                <img
                  src="/logo-horizontal.png"
                  alt="AfterFood Logo"
                  className="h-7 w-auto object-contain cursor-default select-none pointer-events-none"
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('/assets/')) {
                      e.currentTarget.src = '/assets/logo-horizontal.png';
                    }
                  }}
                />
              </div>
              <div className="h-5 w-[1px] bg-border/60 flex-shrink-0" />
              <button
                onClick={onOpenAddressSelector || (() => onNavigate('address_selector'))}
                className="flex items-center gap-1.5 text-left min-w-0 group cursor-pointer flex-1"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center flex-shrink-0">
                  <VibrantLocationPin size={13} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] text-[#FF7A00] uppercase font-black tracking-wider leading-none">
                    Entrega
                  </span>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-[11px] text-foreground font-extrabold truncate group-hover:text-[#FF7A00] transition-colors leading-tight">
                      {currentAddress?.street?.trim() ? currentAddress.street.split(',')[0] : 'Ingresar dirección'}
                    </span>
                    <span className="material-symbols-outlined text-[13px] text-[#FF7A00]">
                      expand_more
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ) : !isBackVisible ? (
            <div
              className="flex items-center gap-2 cursor-default select-none pointer-events-none"
              aria-label="AfterFood"
            >
              <img
                src="/logo-horizontal.png"
                alt="AfterFood Logo"
                className="h-7 w-auto object-contain cursor-default select-none pointer-events-none"
                onError={(e) => {
                  if (!e.currentTarget.src.includes('/assets/')) {
                    e.currentTarget.src = '/assets/logo-horizontal.png';
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs sm:text-sm text-foreground tracking-tight font-bold truncate leading-tight">
                {getScreenTitle()}
              </span>
            </div>
          )}
        </div>

        {/* Right section: Cart Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Cart Icon with Orange badge */}
          {['home', 'explore', 'restaurant_profile', 'product_detail', 'cart', 'checkout'].includes(currentScreen) && (
            <button
              onClick={() => onNavigate(currentScreen === 'cart' ? 'checkout' : 'cart')}
              aria-label="Carrito de compras"
              className="relative w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-100 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <VibrantCartIcon size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
