import React, { useState } from 'react';
import { AppScreen } from '../types';

export interface StepItem {
  number: number;
  label: string;
  icon: string;
  type: 'screen' | 'modal';
}

export const ORDERED_STEPS: StepItem[] = [
  { number: 1, label: 'Splash screen', icon: 'bolt', type: 'screen' },
  { number: 2, label: 'Selector de Rol', icon: 'badge', type: 'screen' },
  { number: 3, label: 'Iniciar sesión', icon: 'login', type: 'screen' },
  { number: 4, label: 'Registro de usuario', icon: 'person_add', type: 'screen' },
  { number: 5, label: 'Modal: permitir notificaciones', icon: 'notifications_active', type: 'modal' },
  { number: 6, label: 'Selector de ubicación', icon: 'location_on', type: 'screen' },
  { number: 7, label: 'Modal: 3 envíos gratis', icon: 'redeem', type: 'modal' },
  { number: 8, label: 'Inicio', icon: 'home', type: 'screen' },
  { number: 9, label: 'Explorar', icon: 'explore', type: 'screen' },
  { number: 10, label: 'Detalle producto', icon: 'lunch_dining', type: 'screen' },
  { number: 11, label: 'Revisar pedido', icon: 'shopping_cart_checkout', type: 'screen' },
  { number: 12, label: 'Modal: cambio en efectivo', icon: 'payments', type: 'modal' },
  { number: 13, label: 'Seguimiento GPS', icon: 'near_me', type: 'screen' },
  { number: 14, label: 'Calificar el pedido', icon: 'star', type: 'screen' },
];

export const COURIER_STEPS: { number: number; label: string; icon: string; screen: AppScreen }[] = [
  { number: 1, label: 'Login/Registro Repartidor', icon: 'sports_motorsports', screen: 'courier_login' },
  { number: 2, label: 'Registro Datos y DNI', icon: 'badge', screen: 'courier_register' },
  { number: 3, label: 'Vehículo y Documentos', icon: 'two_wheeler', screen: 'courier_vehicle' },
  { number: 4, label: 'Cuenta en Análisis (24h)', icon: 'pending_actions', screen: 'courier_verification' },
  { number: 5, label: 'Dashboard Offline (Conectar)', icon: 'power_settings_new', screen: 'courier_dashboard' },
  { number: 6, label: 'Mapa Zonas Calientes', icon: 'local_fire_department', screen: 'courier_heat_map' },
  { number: 7, label: 'Oferta Entrante (30s)', icon: 'notifications_active', screen: 'courier_incoming_order' },
  { number: 8, label: 'Ruta al Comercio (Recojo)', icon: 'storefront', screen: 'courier_to_restaurant' },
  { number: 9, label: 'Ruta al Cliente (Entrega)', icon: 'navigation', screen: 'courier_to_client' },
  { number: 10, label: 'Confirmación con PIN', icon: 'pin', screen: 'courier_delivery_pin' },
  { number: 11, label: 'Resumen de Entrega', icon: 'task_alt', screen: 'courier_completed_summary' },
  { number: 12, label: 'Historial y Desempeño', icon: 'bar_chart', screen: 'courier_weekly_history' },
  { number: 13, label: 'Mi Perfil Conductor', icon: 'account_circle', screen: 'courier_profile' },
  { number: 14, label: 'Gestionar Vehículos', icon: 'two_wheeler', screen: 'courier_manage_vehicles' },
  { number: 15, label: 'Documentos Vehiculares', icon: 'description', screen: 'courier_vehicle_docs_detail' },
  { number: 16, label: 'Centro de Ayuda Conductor', icon: 'support_agent', screen: 'courier_support' },
];

export const MERCHANT_STEPS: { number: number; label: string; icon: string; screen: AppScreen }[] = [
  { number: 0, label: 'Dashboard Principal (Inicio)', icon: 'dashboard', screen: 'merchant_dashboard' },
  { number: 1, label: 'Onboarding / Registro', icon: 'storefront', screen: 'merchant_onboarding' },
  { number: 2, label: 'Datos del Negocio (RUC)', icon: 'edit_note', screen: 'merchant_register' },
  { number: 3, label: 'Cuenta en Revisión (24h)', icon: 'hourglass_top', screen: 'merchant_review' },
  { number: 4, label: 'Cuenta Aprobada', icon: 'verified', screen: 'merchant_approved' },
  { number: 5, label: 'Publicar Excedentes', icon: 'add_box', screen: 'merchant_create_product' },
  { number: 6, label: 'Gestión del Catálogo', icon: 'inventory_2', screen: 'merchant_catalog' },
  { number: 7, label: 'Pedido Entrante (Alerta)', icon: 'notifications_active', screen: 'merchant_incoming_order' },
  { number: 8, label: 'Pedidos en Cocina (KDS)', icon: 'restaurant', screen: 'merchant_kitchen_orders' },
  { number: 9, label: 'Recojo con PIN', icon: 'pin', screen: 'merchant_pickup_pin' },
  { number: 10, label: 'Métricas de Ventas', icon: 'bar_chart', screen: 'merchant_sales_metrics' },
];

interface ScreenSwitcherProps {
  currentStep: number;
  currentScreen: AppScreen;
  onGoToStep: (stepNumber: number) => void;
  onGoToCourierScreen: (screen: AppScreen) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentStep,
  currentScreen,
  onGoToStep,
  onGoToCourierScreen,
  onPrevStep,
  onNextStep,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCourierMode = currentScreen.startsWith('courier_');
  const isMerchantMode = currentScreen.startsWith('merchant_');

  const currentStepItem = ORDERED_STEPS.find((s) => s.number === currentStep) || ORDERED_STEPS[0];
  const currentCourierItem = COURIER_STEPS.find((c) => c.screen === currentScreen);
  const currentMerchantItem = MERCHANT_STEPS.find((m) => m.screen === currentScreen);

  return (
    <>
      {/* Floating Top-Right Step Switcher Pill */}
      <aside className="fixed top-20 right-3 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all active:scale-95 text-xs font-bold shadow-lg ${
            isMerchantMode
              ? 'bg-[#1e1f27]/95 border-[#FF7A00] text-[#ffb472] shadow-[0_4px_20px_rgba(255,122,0,0.4)]'
              : isCourierMode
              ? 'bg-[#1e1f27]/95 border-[#6C5CE7] text-[#c5c0ff] shadow-[0_4px_20px_rgba(108,92,231,0.4)]'
              : 'bg-[#1e1f27]/95 border-[#5a49e3]/70 text-[#c5c0ff] shadow-[0_4px_20px_rgba(90,73,227,0.4)]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              isMerchantMode
                ? 'text-[#FF7A00]'
                : isCourierMode
                ? 'text-[#FF7A00]'
                : 'text-secondary-container'
            }`}
          >
            {isMerchantMode
              ? 'storefront'
              : isCourierMode
              ? 'sports_motorsports'
              : 'format_list_numbered'}
          </span>
          <span>
            {isMerchantMode
              ? `Comercio: ${currentMerchantItem ? currentMerchantItem.number : 1}/6`
              : isCourierMode
              ? `Repartidor: ${currentCourierItem ? currentCourierItem.number : 1}/12`
              : `${currentStep}. ${currentStepItem.label}`}
          </span>
          <span className="material-symbols-outlined text-[14px]">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {/* Modal Drawer listing steps */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-10 w-80 max-h-[82vh] overflow-y-auto bg-[#1a1b22] border border-[#34343c] rounded-2xl shadow-2xl p-3 z-50 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#34343c]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    checklist
                  </span>
                  <span className="font-title-md text-xs text-[#e3e1ec] font-bold">
                    Navegación de Pantallas
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full bg-[#292931] flex items-center justify-center text-[#c8c4d7] hover:text-[#e3e1ec]"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>

              {/* SECTION: MODO COMERCIO ALIADO (Telas 1 a 6) */}
              <div className="pt-1">
                <div className="flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-extrabold text-[#FF7A00] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">storefront</span>
                    <span>Modo Comercio (Telas 1 a 10)</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FF7A00]/20 text-[#ffb472] font-bold">
                    Nuevo
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {MERCHANT_STEPS.map((ms) => {
                    const isActive = currentScreen === ms.screen;
                    return (
                      <button
                        key={ms.screen}
                        onClick={() => {
                          onGoToCourierScreen(ms.screen);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-[#FF7A00] text-white font-bold shadow-md'
                            : 'bg-[#1e1f27] hover:bg-[#292931] text-[#e3e1ec]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                              isActive
                                ? 'bg-white text-[#FF7A00]'
                                : 'bg-[#292931] text-[#c5c0ff]'
                            }`}
                          >
                            {ms.number}
                          </span>
                          <span className="material-symbols-outlined text-[16px] flex-shrink-0">
                            {ms.icon}
                          </span>
                          <span className="text-xs truncate">{ms.label}</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#292931] text-[#ffb472] font-bold shrink-0">
                          C{ms.number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: MODO REPARTIDOR (Telas 1 a 12) */}
              <div className="pt-2 border-t border-[#34343c]">
                <div className="flex items-center justify-between px-1 mb-1">
                  <span className="text-[11px] font-extrabold text-[#c5c0ff] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">sports_motorsports</span>
                    <span>Modo Repartidor (Telas 1 a 12)</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#6C5CE7]/20 text-[#c5c0ff] font-bold">
                    Completo
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {COURIER_STEPS.map((cs) => {
                    const isActive = currentScreen === cs.screen;
                    return (
                      <button
                        key={cs.screen}
                        onClick={() => {
                          onGoToCourierScreen(cs.screen);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-[#6C5CE7] text-white font-bold shadow-md'
                            : 'bg-[#1e1f27] hover:bg-[#292931] text-[#e3e1ec]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                              isActive
                                ? 'bg-white text-[#6C5CE7]'
                                : 'bg-[#292931] text-[#FF7A00]'
                            }`}
                          >
                            {cs.number}
                          </span>
                          <span className="material-symbols-outlined text-[16px] flex-shrink-0">
                            {cs.icon}
                          </span>
                          <span className="text-xs truncate">{cs.label}</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#292931] text-[#c5c0ff] font-bold shrink-0">
                          R{cs.number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: MODO CLIENTE (Telas 1 a 14) */}
              <div className="pt-2 border-t border-[#34343c]">
                <div className="px-1 mb-1 text-[11px] font-extrabold text-[#c5c0ff] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                  <span>Modo Cliente (Telas 1 a 14)</span>
                </div>

                <div className="flex flex-col gap-1">
                  {ORDERED_STEPS.map((s) => {
                    const isActive = !isCourierMode && currentStep === s.number;
                    return (
                      <button
                        key={s.number}
                        onClick={() => {
                          onGoToStep(s.number);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-[#5a49e3] text-white font-bold shadow-md'
                            : 'bg-[#1e1f27] hover:bg-[#292931] text-[#e3e1ec]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                              isActive
                                ? 'bg-white text-[#5a49e3]'
                                : 'bg-[#292931] text-secondary'
                            }`}
                          >
                            {s.number}
                          </span>
                          <span className="material-symbols-outlined text-[15px] flex-shrink-0">
                            {s.icon}
                          </span>
                          <span className="text-xs truncate">{s.label}</span>
                        </div>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ${
                            s.type === 'modal'
                              ? 'bg-secondary-container/20 text-secondary'
                              : 'bg-[#292931] text-[#c8c4d7]'
                          }`}
                        >
                          {s.type === 'modal' ? 'Modal' : 'Tela'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Persistent Bottom Tour Stepper Bar */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm bg-[#1a1b22]/95 backdrop-blur-xl border border-primary/40 rounded-full px-3 py-1.5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
        <button
          onClick={onPrevStep}
          disabled={!isCourierMode && !isMerchantMode && currentStep <= 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
            !isCourierMode && !isMerchantMode && currentStep <= 1
              ? 'text-[#928ea1] opacity-40 cursor-not-allowed'
              : 'text-white bg-[#292931] hover:bg-[#34343c]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          <span>Ant.</span>
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center px-2 py-0.5 leading-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            {isMerchantMode
              ? `Comercio • ${currentMerchantItem ? currentMerchantItem.number : 1}/6`
              : isCourierMode
              ? `Repartidor • ${currentCourierItem ? currentCourierItem.number : 1}/12`
              : `Paso ${currentStep} de 14`}
          </span>
          <span className="text-[11px] font-extrabold text-white truncate max-w-[170px]">
            {isMerchantMode
              ? currentMerchantItem?.label || 'Modo Comercio'
              : isCourierMode
              ? currentCourierItem?.label || 'Modo Repartidor'
              : currentStepItem.label}
          </span>
        </button>

        <button
          onClick={onNextStep}
          disabled={!isCourierMode && !isMerchantMode && currentStep >= 14}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
            !isCourierMode && !isMerchantMode && currentStep >= 14
              ? 'text-[#928ea1] opacity-40 cursor-not-allowed'
              : isMerchantMode
              ? 'text-white bg-[#FF7A00] hover:bg-[#e06c00] shadow-sm'
              : isCourierMode
              ? 'text-white bg-[#6C5CE7] hover:bg-[#5b4cdb] shadow-sm'
              : 'text-white bg-secondary-container hover:bg-[#ff9432] shadow-sm'
          }`}
        >
          <span>Sig.</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </>
  );
};
