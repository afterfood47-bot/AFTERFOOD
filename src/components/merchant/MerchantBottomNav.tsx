import React from 'react';
import { AppScreen } from '../../types';

interface MerchantBottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  activeKitchenCount?: number;
}

export const MerchantBottomNav: React.FC<MerchantBottomNavProps> = ({
  currentScreen,
  onNavigate,
  activeKitchenCount = 1,
}) => {
  const navItems = [
    {
      id: 'merchant_kitchen_orders',
      label: 'En Vivo',
      icon: 'skillet',
      screen: 'merchant_kitchen_orders' as AppScreen,
      badge: activeKitchenCount > 0 ? activeKitchenCount : undefined,
    },
    {
      id: 'merchant_catalog',
      label: 'Catálogo',
      icon: 'inventory_2',
      screen: 'merchant_catalog' as AppScreen,
    },
    {
      id: 'merchant_sales_metrics',
      label: 'Ventas',
      icon: 'payments',
      screen: 'merchant_sales_metrics' as AppScreen,
    },
    {
      id: 'merchant_profile',
      label: 'Mi Perfil',
      icon: 'badge',
      screen: 'merchant_profile' as AppScreen,
    },
  ];

  return (
    <nav
      aria-label="Navegación del Comercio"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-colors duration-200"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.screen ||
            (item.screen === 'merchant_kitchen_orders' &&
              (currentScreen === 'merchant_incoming_order' || currentScreen === 'merchant_pickup_pin')) ||
            (item.screen === 'merchant_catalog' && currentScreen === 'merchant_create_product');

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.screen)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-all group cursor-pointer ${
                isActive
                  ? 'text-[#FF7A00]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Active top notch indicator */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF7A00] rounded-b-full shadow-[0_2px_8px_rgba(255,122,0,0.4)]" />
              )}

              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[23px] transition-transform group-active:scale-90 ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  {item.icon}
                </span>

                {/* Badge for active kitchen / live orders */}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF7A00] text-white text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-0.5 tracking-tight font-bold ${
                  isActive ? 'text-[#FF7A00]' : ''
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};