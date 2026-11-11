/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';

import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

// Courier components
import { CourierAnalysisScreen } from './components/courier/CourierAnalysisScreen';
import { CourierCompletedSummaryScreen } from './components/courier/CourierCompletedSummaryScreen';
import { CourierDeliveryPinScreen } from './components/courier/CourierDeliveryPinScreen';
import { CourierHeatMapScreen } from './components/courier/CourierHeatMapScreen';
import { CourierIncomingOrderScreen } from './components/courier/CourierIncomingOrderScreen';
import { CourierLoginScreen } from './components/courier/CourierLoginScreen';
import { CourierOfflineDashboardScreen } from './components/courier/CourierOfflineDashboardScreen';
import { CourierRegisterDataScreen } from './components/courier/CourierRegisterDataScreen';
import { CourierToClientScreen } from './components/courier/CourierToClientScreen';
import { CourierToRestaurantScreen } from './components/courier/CourierToRestaurantScreen';
import { CourierVehicleDocsScreen } from './components/courier/CourierVehicleDocsScreen';
import { CourierWeeklyHistoryScreen } from './components/courier/CourierWeeklyHistoryScreen';
import { CourierProfileScreen } from './components/courier/CourierProfileScreen';
import { CourierManageVehiclesScreen } from './components/courier/CourierManageVehiclesScreen';
import { CourierVehicleDetailDocsScreen } from './components/courier/CourierVehicleDetailDocsScreen';
import { CourierSupportScreen } from './components/courier/CourierSupportScreen';

// Merchant components
import { MerchantApprovedScreen } from './components/merchant/MerchantApprovedScreen';
import { MerchantCatalogScreen } from './components/merchant/MerchantCatalogScreen';
import { MerchantCreateProductScreen } from './components/merchant/MerchantCreateProductScreen';
import { MerchantDashboardScreen } from './components/merchant/MerchantDashboardScreen';
import { MerchantIncomingOrderScreen } from './components/merchant/MerchantIncomingOrderScreen';
import { MerchantKitchenOrdersScreen } from './components/merchant/MerchantKitchenOrdersScreen';
import { MerchantOnboardingScreen } from './components/merchant/MerchantOnboardingScreen';
import { MerchantPickupPinScreen } from './components/merchant/MerchantPickupPinScreen';
import { MerchantRegisterScreen } from './components/merchant/MerchantRegisterScreen';
import { MerchantReviewScreen } from './components/merchant/MerchantReviewScreen';
import { MerchantSalesMetricsScreen } from './components/merchant/MerchantSalesMetricsScreen';
import { MerchantProfileScreen } from './components/merchant/MerchantProfileScreen';

// Client screens
import { AddressSelectorScreen } from './components/screens/AddressSelectorScreen';
import { CartDrawerScreen } from './components/screens/CartDrawerScreen';
import { CashChangeModal } from './components/screens/CashChangeModal';
import { CartConflictModal } from './components/common/CartConflictModal';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { CourierContactModal } from './components/screens/CourierContactModal';
import { EditProfileScreen } from './components/screens/EditProfileScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { MyOrdersScreen } from './components/screens/MyOrdersScreen';
import { NotificationsModal } from './components/screens/NotificationsModal';
import { OrderConfirmedScreen } from './components/screens/OrderConfirmedScreen';
import { OrderTrackingScreen } from './components/screens/OrderTrackingScreen';
import { AddCardPaymentScreen } from './components/screens/payment/AddCardPaymentScreen';
import { TipPaymentMethodScreen } from './components/screens/payment/TipPaymentMethodScreen';
import { YapePaymentScreen } from './components/screens/payment/YapePaymentScreen';
import { ProductDetailScreen } from './components/screens/ProductDetailScreen';
import { RatingScreen } from './components/screens/RatingScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { RestaurantProfileScreen } from './components/screens/RestaurantProfileScreen';
import { RoleSelectorScreen } from './components/screens/RoleSelectorScreen';
import { SplashScreen } from './components/screens/SplashScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { WelcomeModal } from './components/screens/WelcomeModal';
import { INITIAL_ORDER } from './data/mockData';
import { AppScreen } from './types';

/**
 * Main Layout Shell
 * Wraps all routes with consistent Top Header, Modals, Toast notifications and Bottom Navigation
 */
function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentScreen,
    navigateToScreen,
    currentAddress,
    cartCount,
    isLightMode,
    setIsLightMode,
    toastMessage,
    showToast,
    activeModal,
    setActiveModal,
    cartItems,
    activeOrder,
    cashAmountGiven,
    setCashAmountGiven,
    setCashChangeReturned,
    setPaymentMethod,
    handlePlaceOrder,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    isOnboardingSequence,
    setIsOnboardingSequence,
    storeConflictModal,
    handleResolveStoreConflict,
  } = useApp();

  const isCourierRoute = location.pathname.startsWith('/entregador');
  const isMerchantRoute = location.pathname.startsWith('/comercio');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center selection:bg-orange-500 selection:text-white relative">
      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md text-xs font-bold animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[16px] text-orange-500">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Shell Wrapper */}
      <div className="w-full max-w-md min-h-screen bg-gray-50 text-gray-900 flex flex-col relative shadow-sm pb-20">
        {/* Universal Top Header */}
        <Header
          currentScreen={currentScreen}
          currentAddress={currentAddress}
          onOpenAddressSelector={() => navigate('/cliente/endereco')}
          cartCount={cartCount}
          isLightMode={isLightMode}
          onToggleLightMode={() => setIsLightMode(!isLightMode)}
          onNavigate={(screen) => navigateToScreen(screen)}
          onBack={() => {
            if (currentScreen === 'rate_order') {
              navigateToScreen('orders');
              return;
            }
            if (currentScreen === 'orders') {
              navigateToScreen('home');
              return;
            }
            if (currentScreen === 'product_detail' || currentScreen === 'order_tracking') {
              navigateToScreen('home');
              return;
            }
            if (
              currentScreen === 'login' ||
              currentScreen === 'register' ||
              currentScreen === 'courier_login' ||
              currentScreen === 'merchant_onboarding'
            ) {
              navigateToScreen('role_selection');
              return;
            }
            if (currentScreen === 'merchant_pickup_pin') {
              navigateToScreen('merchant_kitchen_orders');
              return;
            }
            // Native history back
            navigate(-1);
          }}
          onOpenNotifications={() => {
            if (!isCourierRoute) {
              showToast('No tienes notificaciones pendientes');
            } else {
              showToast('Notificaciones activas para repartidores');
            }
          }}
          onOpenProfile={() => navigate('/cliente/perfil')}
        />

        {/* Route Content Area */}
        <main className="flex-1 flex flex-col pt-14 w-full">
          <Outlet />
        </main>

        {/* Bottom Tab Navigation for Client and Courier */}
        {!isMerchantRoute && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => navigateToScreen(screen)}
            cartCount={cartCount}
          />
        )}
      </div>

      {/* Global Modals - Inverted Onboarding: Notificaciones triggers AFTER Ubicación, then opens Welcome Promo */}
      <NotificationsModal
        isOpen={activeModal === 'push_notifications'}
        onClose={() => {
          setActiveModal('none');
          if (isOnboardingSequence && !hasCompletedOnboarding) {
            setTimeout(() => setActiveModal('welcome_promo'), 250);
          } else {
            navigate('/cliente/inicio');
          }
        }}
        onAllow={() => {
          showToast('Notificaciones activadas');
          setActiveModal('none');
          if (isOnboardingSequence && !hasCompletedOnboarding) {
            setTimeout(() => setActiveModal('welcome_promo'), 350);
          } else {
            navigate('/cliente/inicio');
          }
        }}
      />

      <WelcomeModal
        isOpen={activeModal === 'welcome_promo'}
        onClose={() => {
          setHasCompletedOnboarding(true);
          setIsOnboardingSequence(false);
          try {
            localStorage.setItem('afterfood_onboarding_completed', 'true');
          } catch {}
          setActiveModal('none');
          navigate('/cliente/inicio');
        }}
        onStartShopping={() => {
          setHasCompletedOnboarding(true);
          setIsOnboardingSequence(false);
          try {
            localStorage.setItem('afterfood_onboarding_completed', 'true');
          } catch {}
          setActiveModal('none');
          navigate('/cliente/inicio');
        }}
      />

      <CashChangeModal
        isOpen={activeModal === 'cash_change'}
        totalOrder={
          cartItems.length > 0
            ? cartItems.reduce((acc, it) => acc + it.totalPrice, 0)
            : activeOrder
            ? activeOrder.total
            : 47.4
        }
        initialCash={cashAmountGiven}
        onClose={() => {
          setActiveModal('none');
          navigate('/cliente/checkout');
        }}
        onConfirm={(cash, change) => {
          setPaymentMethod('cash');
          setCashAmountGiven(cash);
          setCashChangeReturned(change);
          setActiveModal('none');
          showToast(`Pago en efectivo configurado. Vuelto: S/ ${change.toFixed(2)}`);
          navigate('/cliente/checkout');
        }}
      />

      {(activeModal === 'call_courier' || activeModal === 'chat_courier') && (
        <CourierContactModal
          type={activeModal === 'call_courier' ? 'call' : 'chat'}
          courier={(activeOrder || INITIAL_ORDER).courier}
          onClose={() => setActiveModal('none')}
        />
      )}

      {/* Cart Multi-Commerce Conflict Modal */}
      <CartConflictModal
        isOpen={Boolean(storeConflictModal?.isOpen)}
        currentStoreName={storeConflictModal?.currentStoreName || ''}
        incomingStoreName={storeConflictModal?.incomingStoreName || ''}
        onClearAndAdd={() => handleResolveStoreConflict(true)}
        onCancel={() => handleResolveStoreConflict(false)}
      />
    </div>
  );
}

// ==========================================
// CLIENT ROUTE VIEWS WRAPPER
// ==========================================

function ClientHomeScreen() {
  const {
    currentAddress,
    navigateToScreen,
    setSelectedProduct,
    setSelectedStore,
    setActiveCategoryFilter,
  } = useApp();
  return (
    <HomeScreen
      currentAddress={currentAddress}
      onNavigate={navigateToScreen}
      onSelectProduct={(prod) => {
        if (prod) setSelectedProduct(prod);
        navigateToScreen('product_detail');
      }}
      onSelectStore={(st) => {
        setSelectedStore(st);
        navigateToScreen('restaurant_profile');
      }}
      onOpenAddressSelector={() => navigateToScreen('address_selector')}
      onFilterCategory={(cat) => {
        setActiveCategoryFilter(cat);
        navigateToScreen('explore');
      }}
    />
  );
}

function ClientExploreScreen() {
  const {
    currentAddress,
    navigateToScreen,
    setSelectedProduct,
    setSelectedStore,
    handleAddToCartDirect,
    cartCount,
    cartTotal,
    activeCategoryFilter,
  } = useApp();
  return (
    <ExploreScreen
      currentAddress={currentAddress}
      onNavigate={navigateToScreen}
      onSelectProduct={(prod) => {
        if (prod) setSelectedProduct(prod);
        navigateToScreen('product_detail');
      }}
      onSelectStore={(st) => {
        setSelectedStore(st);
        navigateToScreen('restaurant_profile');
      }}
      onAddToCartDirect={handleAddToCartDirect}
      cartCount={cartCount}
      cartTotal={cartTotal}
      activeFilter={activeCategoryFilter}
    />
  );
}

function ClientRestaurantScreen() {
  const {
    selectedStore,
    navigateToScreen,
    setSelectedProduct,
    handleAddToCartDirect,
    cartCount,
    cartTotal,
  } = useApp();
  return (
    <RestaurantProfileScreen
      store={selectedStore}
      onNavigate={navigateToScreen}
      onSelectProduct={(prod) => {
        setSelectedProduct(prod);
        navigateToScreen('product_detail');
      }}
      onAddToCartDirect={handleAddToCartDirect}
      cartCount={cartCount}
      cartTotal={cartTotal}
      onOpenCart={() => navigateToScreen('cart')}
    />
  );
}

function ClientProductDetailScreen() {
  const { selectedProduct, handleAddToCart, navigateToScreen } = useApp();
  return (
    <ProductDetailScreen
      product={selectedProduct}
      onAddToCart={handleAddToCart}
      onNavigate={navigateToScreen}
    />
  );
}

function ClientCartScreen() {
  const navigate = useNavigate();
  const {
    cartItems,
    savedCard,
    paymentMethod,
    handleUpdateCartQuantity,
    handleRemoveCartItem,
    handleClearCart,
    navigateToScreen,
  } = useApp();
  return (
    <CartDrawerScreen
      items={cartItems}
      savedCard={savedCard}
      paymentMethod={paymentMethod}
      onUpdateQuantity={handleUpdateCartQuantity}
      onRemoveItem={handleRemoveCartItem}
      onClearCart={handleClearCart}
      onNavigate={navigateToScreen}
      onGoToCheckout={() => navigate('/cliente/checkout')}
      onClose={() => navigate(-1)}
    />
  );
}

function ClientCheckoutScreen() {
  const {
    currentAddress,
    cartItems,
    selectedStore,
    paymentMethod,
    savedCard,
    cashAmountGiven,
    cashChangeReturned,
    setPaymentMethod,
    setActiveModal,
    navigateToScreen,
    handlePlaceOrder,
    setTipModeActive,
    setAddressReturnScreen,
  } = useApp();
  return (
    <CheckoutScreen
      currentAddress={currentAddress}
      items={cartItems}
      store={selectedStore}
      paymentMethod={paymentMethod}
      savedCard={savedCard}
      cashAmountGiven={cashAmountGiven}
      cashChangeReturned={cashChangeReturned}
      onSelectPaymentMethod={setPaymentMethod}
      onOpenCashModal={() => setActiveModal('cash_change')}
      onOpenAddressSelector={() => {
        setAddressReturnScreen('checkout');
        navigateToScreen('address_selector');
      }}
      onConfirmOrder={() => {
        handlePlaceOrder(
          paymentMethod || 'card',
          paymentMethod === 'cash'
            ? { given: cashAmountGiven, returned: cashChangeReturned }
            : undefined
        );
      }}
      onNavigate={(s) => {
        if (s === 'payment_card') {
          setTipModeActive(false);
          navigateToScreen('payment_card');
        } else if (s === 'payment_yape') {
          setTipModeActive(false);
          navigateToScreen('payment_yape');
        } else {
          navigateToScreen(s);
        }
      }}
    />
  );
}

function ClientPaymentCardScreen() {
  const navigate = useNavigate();
  const {
    tipModeActive,
    tipAmount,
    cartTotal,
    setSavedCard,
    setPaymentMethod,
    showToast,
    setTipPaid,
    setTipModeActive,
    navigateToScreen,
  } = useApp();
  return (
    <AddCardPaymentScreen
      amount={tipModeActive ? tipAmount : cartTotal}
      isTipMode={tipModeActive}
      onCardSaved={(card) => {
        setSavedCard(card);
        setPaymentMethod('card');
        showToast(`Tarjeta ${card.brand} •••• ${card.last4} guardada`);
        if (tipModeActive) {
          setTipPaid(true);
          setTipModeActive(false);
          showToast(`¡Propina de S/ ${tipAmount.toFixed(2)} pagada con tarjeta!`);
          navigateToScreen('rate_order');
        } else {
          navigateToScreen('checkout');
        }
      }}
      onNavigate={navigateToScreen}
      onBack={() => {
        if (tipModeActive) navigateToScreen('tip_payment_select');
        else navigateToScreen('checkout');
      }}
    />
  );
}

function ClientPaymentYapeScreen() {
  const {
    tipModeActive,
    tipAmount,
    cartTotal,
    setPaymentMethod,
    showToast,
    setTipPaid,
    setTipModeActive,
    navigateToScreen,
    handlePlaceOrder,
  } = useApp();
  return (
    <YapePaymentScreen
      amount={tipModeActive ? tipAmount : cartTotal}
      isTipMode={tipModeActive}
      onConfirmYape={(code) => {
        setPaymentMethod('yape');
        if (code) {
          showToast(`Yape #${code} verificado con éxito`);
        } else {
          showToast('Pago Yape verificado con éxito');
        }
        if (tipModeActive) {
          setTipPaid(true);
          setTipModeActive(false);
          showToast(`¡Propina de S/ ${tipAmount.toFixed(2)} pagada con Yape!`);
          navigateToScreen('rate_order');
        } else {
          handlePlaceOrder('yape');
        }
      }}
      onNavigate={navigateToScreen}
      onBack={() => {
        if (tipModeActive) navigateToScreen('tip_payment_select');
        else navigateToScreen('checkout');
      }}
    />
  );
}

function ClientTipSelectScreen() {
  const {
    tipAmount,
    activeOrder,
    setTipModeActive,
    navigateToScreen,
  } = useApp();
  const navigate = useNavigate();
  return (
    <TipPaymentMethodScreen
      tipAmount={tipAmount}
      courierName={(activeOrder || INITIAL_ORDER).courier.name}
      courierAvatar={(activeOrder || INITIAL_ORDER).courier.avatar}
      onSelectMethod={(method) => {
        setTipModeActive(true);
        if (method === 'yape') {
          navigateToScreen('payment_yape');
        } else {
          navigateToScreen('payment_card');
        }
      }}
      onNavigate={navigateToScreen}
      onBack={() => navigate(-1)}
    />
  );
}

function ClientOrderTrackingScreen() {
  const {
    activeOrder,
    isLightMode,
    navigateToScreen,
    handleFinalizeOrder,
    setActiveModal,
  } = useApp();
  return (
    <OrderTrackingScreen
      order={activeOrder || INITIAL_ORDER}
      isLightMode={isLightMode}
      onNavigate={(s) => {
        if (s === 'rate_order') {
          handleFinalizeOrder((activeOrder || INITIAL_ORDER).id);
          navigateToScreen('rate_order');
        } else {
          navigateToScreen(s);
        }
      }}
      onCallCourier={() => setActiveModal('call_courier')}
      onChatCourier={() => setActiveModal('chat_courier')}
    />
  );
}

function ClientRatingScreen() {
  const {
    activeOrder,
    userOrders,
    selectedStore,
    ratingFormData,
    tipAmount,
    tipPaid,
    setRatingFormData,
    setTipAmount,
    setTipModeActive,
    handleFinalizeOrder,
    handleFinalizeRating,
    navigateToScreen,
  } = useApp();

  // Asegurar que el pedido esté marcado como entregado/finalizado solo una vez al montar
  React.useEffect(() => {
    const targetId = activeOrder?.id || (userOrders.length > 0 ? userOrders[0].id : undefined);
    if (targetId) {
      handleFinalizeOrder(targetId);
    }
  }, []);

  const handleSkip = () => {
    const targetId = activeOrder?.id || (userOrders.length > 0 ? userOrders[0].id : undefined);
    if (targetId) {
      handleFinalizeOrder(targetId);
    }
    navigateToScreen('orders');
  };

  return (
    <RatingScreen
      order={activeOrder || (userOrders.length > 0 ? userOrders[0] : INITIAL_ORDER)}
      store={selectedStore}
      initialDriverRating={ratingFormData.driverRating}
      initialRestaurantRating={ratingFormData.restaurantRating}
      initialDriverComment={ratingFormData.driverComment}
      initialRestaurantComment={ratingFormData.restaurantComment}
      initialSelectedTip={ratingFormData.selectedTip}
      tipAmount={tipAmount}
      tipPaid={tipPaid}
      onUpdateForm={(updated) => {
        setRatingFormData((prev) => ({ ...prev, ...updated }));
      }}
      onNavigate={navigateToScreen}
      onSkip={handleSkip}
      onConfirmTip={(amt) => {
        setTipAmount(amt);
        setRatingFormData((prev) => ({ ...prev, selectedTip: amt.toString() as any }));
        setTipModeActive(true);
        navigateToScreen('tip_payment_select');
      }}
      onFinalizeRating={handleFinalizeRating}
    />
  );
}

function ClientOrderConfirmedScreen() {
  const { activeOrder, navigateToScreen } = useApp();
  return (
    <OrderConfirmedScreen
      order={activeOrder || INITIAL_ORDER}
      onNavigate={navigateToScreen}
    />
  );
}

function ClientOrdersScreen() {
  const { activeOrder, userOrders, navigateToScreen, handleRepeatOrder } = useApp();
  return (
    <MyOrdersScreen
      activeOrder={activeOrder}
      orders={userOrders}
      onNavigate={navigateToScreen}
      onRepeatOrder={handleRepeatOrder}
    />
  );
}

function ClientProfileScreen() {
  const {
    userProfile,
    setUserProfile,
    setCurrentAddress,
    showToast,
    navigateToScreen,
    setAddressReturnScreen,
  } = useApp();
  return (
    <EditProfileScreen
      initialName={userProfile.name}
      initialPhone={userProfile.phone}
      initialEmail={userProfile.email}
      initialAddress={userProfile.defaultAddress}
      onSave={(data) => {
        setUserProfile(data);
        setCurrentAddress((prev) => ({
          ...prev,
          street: data.defaultAddress,
        }));
        showToast('¡Datos personales actualizados!');
      }}
      onNavigate={(s) => {
        if (s === 'address_selector') {
          setAddressReturnScreen('profile');
        }
        navigateToScreen(s);
      }}
    />
  );
}

function ClientSupportScreen() {
  const { userOrders, activeOrder, navigateToScreen } = useApp();
  return (
    <SupportScreen
      orders={userOrders}
      activeOrder={activeOrder}
      onNavigate={navigateToScreen}
    />
  );
}

function ClientAddressScreen() {
  const {
    currentAddress,
    isLightMode,
    setCurrentAddress,
    setUserProfile,
    showToast,
    isOnboardingSequence,
    hasCompletedOnboarding,
    setActiveModal,
    navigateToScreen,
    addressReturnScreen,
    setAddressReturnScreen,
  } = useApp();

  const handleReturn = (targetScreen?: AppScreen) => {
    if (addressReturnScreen) {
      const destination = addressReturnScreen;
      setAddressReturnScreen(null);
      navigateToScreen(destination);
      return;
    }
    if (targetScreen) {
      navigateToScreen(targetScreen);
      return;
    }
    if (isOnboardingSequence && !hasCompletedOnboarding) {
      setActiveModal('push_notifications');
    } else {
      navigateToScreen('home');
    }
  };

  return (
    <AddressSelectorScreen
      currentAddress={currentAddress}
      isLightMode={isLightMode}
      returnToScreen={addressReturnScreen}
      onSelectAddress={(addr) => {
        setCurrentAddress(addr);
        if (addressReturnScreen === 'profile') {
          setUserProfile((prev) => ({
            ...prev,
            defaultAddress: addr.street,
          }));
        }
        showToast('Ubicación guardada');
      }}
      onNavigate={handleReturn}
      onOpenNextModal={() => handleReturn()}
      onOpenPromoModal={() => handleReturn()}
    />
  );
}

function ClientLoginScreen() {
  const navigate = useNavigate();
  const {
    navigateToScreen,
    showToast,
    setIsOnboardingSequence,
  } = useApp();
  return (
    <LoginScreen
      onNavigate={navigateToScreen}
      onLoginSuccess={(email, isGoogleOrNew) => {
        showToast(`Sesión: ${email}`);
        if (isGoogleOrNew) {
          setIsOnboardingSequence(true);
          navigate('/cliente/endereco');
        } else {
          navigateToScreen('home');
        }
      }}
      onOpenAddress={() => {
        setIsOnboardingSequence(true);
        navigate('/cliente/endereco');
      }}
    />
  );
}

function ClientRegisterScreen() {
  const navigate = useNavigate();
  const {
    navigateToScreen,
    showToast,
    setIsOnboardingSequence,
    setUserProfile,
  } = useApp();
  return (
    <RegisterScreen
      onNavigate={navigateToScreen}
      onRegisterSuccess={(u) => {
        setUserProfile((prev) => ({
          ...prev,
          name: u.name || prev.name,
          email: u.email || prev.email,
        }));
        showToast(`¡Registro confirmado! Cuenta creada: ${u.name}`);
        setIsOnboardingSequence(true);
        navigate('/cliente/endereco');
      }}
      onOpenAddress={() => {
        setIsOnboardingSequence(true);
        navigate('/cliente/endereco');
      }}
    />
  );
}

// ==========================================
// REPARTIDOR ROUTE VIEWS WRAPPER
// ==========================================

function CourierLoginView() {
  const { setCourierIsGoogleAuth, showToast, navigateToScreen } = useApp();
  return (
    <CourierLoginScreen
      onNavigate={navigateToScreen}
      onGoogleLogin={() => {
        setCourierIsGoogleAuth(true);
        showToast('Acceso validado con Google');
        navigateToScreen('courier_register');
      }}
      onManualRegister={() => {
        setCourierIsGoogleAuth(false);
        navigateToScreen('courier_register');
      }}
    />
  );
}

function CourierRegisterView() {
  const { courierIsGoogleAuth, setCourierRegistrationData, showToast, navigateToScreen } = useApp();
  return (
    <div className="light bg-[#f4f6fb] text-slate-900 w-full min-h-screen">
      <CourierRegisterDataScreen
        isGoogleAuth={courierIsGoogleAuth}
        onNavigate={navigateToScreen}
        onSaveData={(data) => {
          setCourierRegistrationData(data);
          showToast('Datos personales guardados. Completa el paso 2.');
        }}
      />
    </div>
  );
}

function CourierVehicleView() {
  const { courierRegistrationData, showToast, navigateToScreen } = useApp();
  return (
    <CourierVehicleDocsScreen
      onNavigate={navigateToScreen}
      personalData={courierRegistrationData}
      onSubmitVerification={() => {
        showToast('¡Registro de repartidor enviado y confirmado!');
      }}
    />
  );
}

function CourierVerificationView() {
  const { showToast, navigateToScreen } = useApp();
  return (
    <CourierAnalysisScreen
      onNavigate={navigateToScreen}
      onApproveAccount={() => {
        showToast('¡Cuenta Aprobada para Trujillo!');
        navigateToScreen('courier_dashboard');
      }}
    />
  );
}

function CourierDashboardView() {
  const { showToast, navigateToScreen } = useApp();
  return (
    <div className="light bg-[#f8f9fa] text-slate-900 w-full min-h-[calc(100vh-4rem)]">
      <CourierOfflineDashboardScreen
        onNavigate={navigateToScreen}
        onConnect={() => {
          showToast('¡Conectado! Buscando pedidos...');
          navigateToScreen('courier_heat_map');
        }}
      />
    </div>
  );
}

function CourierHeatMapView() {
  const { showToast, navigateToScreen } = useApp();
  return (
    <div className="light bg-white text-slate-900 w-full h-full">
      <CourierHeatMapScreen
        isLightMode={true}
        onNavigate={navigateToScreen}
        onDisconnect={() => {
          showToast('Te has desconectado');
          navigateToScreen('courier_dashboard');
        }}
      />
    </div>
  );
}

function CourierIncomingOrderView() {
  const { isLightMode, showToast, navigateToScreen } = useApp();
  return (
    <CourierIncomingOrderScreen
      isLightMode={isLightMode}
      onNavigate={navigateToScreen}
      onAcceptOrder={() => {
        showToast('¡Entrega aceptada! Dirigiéndose al local...');
        navigateToScreen('courier_to_restaurant');
      }}
      onRejectOrder={() => {
        showToast('Oferta rechazada');
        navigateToScreen('courier_heat_map');
      }}
    />
  );
}

function CourierToRestaurantView() {
  const { isLightMode, showToast, navigateToScreen } = useApp();
  return (
    <CourierToRestaurantScreen
      isLightMode={isLightMode}
      onNavigate={navigateToScreen}
      onConfirmPickup={() => {
        showToast('Pedido #AF-3092 retirado con éxito');
        navigateToScreen('courier_to_client');
      }}
    />
  );
}

function CourierToClientView() {
  const { isLightMode, showToast, navigateToScreen } = useApp();
  return (
    <CourierToClientScreen
      isLightMode={isLightMode}
      onNavigate={navigateToScreen}
      onArrivedAtClient={() => {
        showToast('Llegada al cliente registrada');
        navigateToScreen('courier_delivery_pin');
      }}
    />
  );
}

function CourierDeliveryPinView() {
  const { showToast, navigateToScreen } = useApp();
  return (
    <CourierDeliveryPinScreen
      onNavigate={navigateToScreen}
      onDeliveryConfirmed={() => {
        showToast('¡PIN verificado! Entrega completada');
        navigateToScreen('courier_completed_summary');
      }}
    />
  );
}

function CourierCompletedSummaryView() {
  const { showToast, navigateToScreen } = useApp();
  return (
    <CourierCompletedSummaryScreen
      onNavigate={navigateToScreen}
      onBackToOrders={() => {
        showToast('En línea buscando nuevos pedidos');
        navigateToScreen('courier_heat_map');
      }}
      onViewHistory={() => {
        navigateToScreen('courier_weekly_history');
      }}
    />
  );
}

function CourierWeeklyHistoryView() {
  const { showToast, navigateToScreen } = useApp();
  return (
    <CourierWeeklyHistoryScreen
      onNavigate={navigateToScreen}
      onReconnect={() => {
        showToast('¡Reconectado! Listo para recibir pedidos');
        navigateToScreen('courier_heat_map');
      }}
    />
  );
}

function CourierProfileView() {
  const { isLightMode, setIsLightMode, navigateToScreen } = useApp();
  return (
    <CourierProfileScreen
      isLightMode={isLightMode}
      onToggleLightMode={() => setIsLightMode(!isLightMode)}
      onNavigate={navigateToScreen}
    />
  );
}

function CourierManageVehiclesView() {
  const { navigateToScreen } = useApp();
  return <CourierManageVehiclesScreen onNavigate={navigateToScreen} />;
}

function CourierVehicleDocsDetailView() {
  const { navigateToScreen } = useApp();
  return <CourierVehicleDetailDocsScreen onNavigate={navigateToScreen} />;
}

function CourierSupportView() {
  const { navigateToScreen } = useApp();
  return <CourierSupportScreen onNavigate={navigateToScreen} />;
}

// ==========================================

// COMERCIO ROUTE VIEWS WRAPPER

// ==========================================



function MerchantDashboardView() {

  const { showToast, navigateToScreen } = useApp();

  return (

    <MerchantKitchenOrdersScreen

      onNavigate={navigateToScreen}

      onMarkReady={() => {

        showToast('¡Pedido marcado como listo! Notificando al repartidor');

      }}

      onCancelOrder={() => {

        showToast('Pedido cancelado');

      }}

    />

  );

}



function MerchantOnboardingView() {
  const { setMerchantAuthCredentials, showToast, navigateToScreen } = useApp();
  return (
    <MerchantOnboardingScreen
      onNavigate={navigateToScreen}
      onGoogleLogin={() => {
        setMerchantAuthCredentials({ email: 'google-auth', authType: 'google' });
        showToast('¡Autenticado con Google como Comercio!');
        navigateToScreen('merchant_register');
      }}
      onManualRegister={({ email, pass }) => {
        setMerchantAuthCredentials({ email, password: pass, authType: 'manual' });
      }}
    />
  );
}

function MerchantRegisterView() {
  const { merchantAuthCredentials, setMerchantProfile, showToast, navigateToScreen } = useApp();
  return (
    <MerchantRegisterScreen
      onNavigate={navigateToScreen}
      merchantAuth={merchantAuthCredentials}
      onSaveData={(data) => {
        if (data) {
          setMerchantProfile((prev) => ({
            ...prev,
            name: data.businessName || prev.name,
            ruc: data.ruc || prev.ruc,
            category: data.category || prev.category,
            address: data.address || prev.address,
            nightHours: data.nightHours || prev.nightHours,
            phone: data.phone || prev.phone,
            email: data.email || prev.email,
            operatingDays: data.operatingDays || prev.operatingDays,
          }));
        }
        showToast('¡Comercio registrado y enviado con éxito!');
      }}
    />
  );
}



function MerchantReviewView() {

  const { showToast, navigateToScreen } = useApp();

  return (

    <MerchantReviewScreen

      onNavigate={navigateToScreen}

      onSimulateApproval={() => {

        showToast('¡Comercio validado y approved con éxito!');

        navigateToScreen('merchant_approved');

      }}

    />

  );

}



function MerchantApprovedView() {

  const { navigateToScreen } = useApp();

  return <MerchantApprovedScreen onNavigate={navigateToScreen} />;

}



function MerchantCreateProductView() {

  const { handleAddMerchantProduct, navigateToScreen } = useApp();

  return (

    <MerchantCreateProductScreen

      onNavigate={navigateToScreen}

      onProductCreated={(prod) => handleAddMerchantProduct(prod)}

    />

  );

}



function MerchantCatalogView() {

  const {

    merchantProducts,

    handleToggleProductStatus,

    handleUpdateMerchantProduct,

    showToast,

    navigateToScreen,

  } = useApp();

  return (

    <MerchantCatalogScreen

      onNavigate={navigateToScreen}

      products={merchantProducts}

      onToggleProductStatus={handleToggleProductStatus}

      onUpdateProduct={handleUpdateMerchantProduct}

      onSimulateIncomingOrder={() => {

        showToast('Navegando a Pedidos En Vivo');

        navigateToScreen('merchant_kitchen_orders');

      }}

    />

  );

}



function MerchantIncomingOrderView() {

  const { showToast, navigateToScreen } = useApp();

  return (

    <MerchantIncomingOrderScreen

      onNavigate={navigateToScreen}

      onAcceptOrder={() => {

        showToast('¡Pedido #AF-1023 aceptado! Pasando a cocina');

      }}

      onRejectOrder={() => {

        showToast('Pedido rechazado');

      }}

    />

  );

}



function MerchantKitchenOrdersView() {

  const { showToast, navigateToScreen } = useApp();

  return (

    <MerchantKitchenOrdersScreen

      onNavigate={navigateToScreen}

      onMarkReady={() => {

        showToast('¡Pedido marcado como listo! Notificando al repartidor');

      }}

      onCancelOrder={() => {

        showToast('Pedido cancelado');

      }}

    />

  );

}



function MerchantPickupPinView() {

  const { showToast, navigateToScreen } = useApp();

  return (

    <MerchantPickupPinScreen

      onNavigate={navigateToScreen}

      onConfirmDeliveryToCourier={(pin) => {

        showToast(`¡PIN ${pin} verificado! Pedido entregado al repartidor`);

      }}

    />

  );

}



function MerchantSalesMetricsView() {

  const { navigateToScreen } = useApp();

  return <MerchantSalesMetricsScreen onNavigate={navigateToScreen} />;

}



function MerchantProfileView() {

  const {

    merchantProfile,

    merchantIsOpen,

    setMerchantIsOpen,

    showToast,

    navigateToScreen,

  } = useApp();

  return (

    <MerchantProfileScreen

      onNavigate={navigateToScreen}

      businessName={merchantProfile.name}

      businessAddress={merchantProfile.address}

      businessRuc={merchantProfile.ruc}

      nightHours={merchantProfile.nightHours}

      category={merchantProfile.category}

      phone={merchantProfile.phone}

      email={merchantProfile.email}

      rating={merchantProfile.rating}

      totalReviews={merchantProfile.totalReviews}

      isOpen={merchantIsOpen}

      onToggleOpen={(open) => {

        setMerchantIsOpen(open);

        showToast(open ? 'Local Abierto: Recibiendo pedidos' : 'Local Cerrado: Pausado temporalmente');

      }}

    />

  );

}



function SplashView() {

  const navigate = useNavigate();

  return (

    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center">

      <SplashScreen onEnterApp={() => navigate('/selecionar-perfil')} />

    </div>

  );

}



function RoleSelectorView() {

  const navigate = useNavigate();

  return (

    <RoleSelectorScreen

      onNavigate={(s) => {

        if (s === 'courier_login') navigate('/entregador/login');

        else if (s === 'merchant_onboarding') navigate('/comercio/onboarding');

        else if (s === 'login') navigate('/cliente/login');

        else if (s === 'register') navigate('/cliente/registro');

        else navigate('/cliente/inicio');

      }}

      onSelectRole={(role) => {

        if (role === 'negocio') navigate('/comercio/cozinha');

        else if (role === 'repartidor') navigate('/entregador/login');

        else navigate('/cliente/inicio');

      }}

    />

  );

}



/**

 * Main Application Component with BrowserRouter & 3 Core Route Branches:

 * - /cliente

 * - /entregador

 * - /comercio

 */

export default function App() {

  return (

    <BrowserRouter>

      <AppProvider>

        <Routes>

          {/* Standalone Splash Entry Route */}

          <Route path="/" element={<SplashView />} />

          <Route path="/splash" element={<SplashView />} />



          {/* Role Selector Route */}

          <Route element={<AppLayout />}>

            <Route path="/selecionar-perfil" element={<RoleSelectorView />} />



            {/* =========================================================

                1. ROTA PRINCIPAL: /cliente (Modo Cliente)

               ========================================================= */}

            <Route path="/cliente">

              <Route index element={<Navigate to="/cliente/inicio" replace />} />

              <Route path="inicio" element={<ClientHomeScreen />} />

              <Route path="explorar" element={<ClientExploreScreen />} />

              <Route path="restaurante" element={<ClientRestaurantScreen />} />

              <Route path="produto" element={<ClientProductDetailScreen />} />

              <Route path="carrinho" element={<ClientCartScreen />} />

              <Route path="checkout" element={<ClientCheckoutScreen />} />

              <Route path="pagamento-cartao" element={<ClientPaymentCardScreen />} />

              <Route path="pagamento-yape" element={<ClientPaymentYapeScreen />} />

              <Route path="propina" element={<ClientTipSelectScreen />} />

              <Route path="rastreamento" element={<ClientOrderTrackingScreen />} />

              <Route path="pedido-confirmado" element={<ClientOrderConfirmedScreen />} />

              <Route path="avaliar" element={<ClientRatingScreen />} />

              <Route path="pedidos" element={<ClientOrdersScreen />} />

              <Route path="perfil" element={<ClientProfileScreen />} />

              <Route path="suporte" element={<ClientSupportScreen />} />

              <Route path="endereco" element={<ClientAddressScreen />} />

              <Route path="login" element={<ClientLoginScreen />} />

              <Route path="registro" element={<ClientRegisterScreen />} />

            </Route>



            {/* =========================================================

                2. ROTA PRINCIPAL: /entregador (Modo Repartidor)

               ========================================================= */}

            <Route path="/entregador">

              <Route index element={<Navigate to="/entregador/painel" replace />} />

              <Route path="login" element={<CourierLoginView />} />

              <Route path="registro" element={<CourierRegisterView />} />

              <Route path="veiculo" element={<CourierVehicleView />} />

              <Route path="verificacao" element={<CourierVerificationView />} />

              <Route path="painel" element={<CourierDashboardView />} />

              <Route path="mapa-calor" element={<CourierHeatMapView />} />

              <Route path="pedido-recebido" element={<CourierIncomingOrderView />} />

              <Route path="para-restaurante" element={<CourierToRestaurantView />} />

              <Route path="para-cliente" element={<CourierToClientView />} />

              <Route path="confirmar-pin" element={<CourierDeliveryPinView />} />

              <Route path="resumo" element={<CourierCompletedSummaryView />} />

              <Route path="historico" element={<CourierWeeklyHistoryView />} />

              <Route path="perfil" element={<CourierProfileView />} />

              <Route path="veiculos" element={<CourierManageVehiclesView />} />

              <Route path="documentos" element={<CourierVehicleDocsDetailView />} />

              <Route path="suporte" element={<CourierSupportView />} />

            </Route>



            {/* =========================================================

                3. ROTA PRINCIPAL: /comercio (Modo Comercio Aliado)

               ========================================================= */}

            <Route path="/comercio">

              {/* Redireciona por defeito para /comercio/cozinha */}

              <Route index element={<Navigate to="/comercio/cozinha" replace />} />

              <Route path="painel" element={<MerchantKitchenOrdersView />} />

              <Route path="onboarding" element={<MerchantOnboardingView />} />

              <Route path="registro" element={<MerchantRegisterView />} />

              <Route path="revisao" element={<MerchantReviewView />} />

              <Route path="aprovado" element={<MerchantApprovedView />} />

              <Route path="novo-produto" element={<MerchantCreateProductView />} />

              <Route path="catalogo" element={<MerchantCatalogView />} />

              <Route path="pedido-recebido" element={<MerchantIncomingOrderView />} />

              <Route path="cozinha" element={<MerchantKitchenOrdersView />} />

              <Route path="pin-recolha" element={<MerchantPickupPinView />} />

              <Route path="metricas" element={<MerchantSalesMetricsView />} />

              <Route path="perfil" element={<MerchantProfileView />} />

            </Route>

          </Route>



          {/* Catch-all route -> redirect to client home */}

          <Route path="*" element={<Navigate to="/cliente/inicio" replace />} />

        </Routes>

      </AppProvider>

    </BrowserRouter>

  );

} 