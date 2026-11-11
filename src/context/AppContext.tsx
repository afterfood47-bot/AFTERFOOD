import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DEFAULT_ADDRESS,
  INITIAL_CHECKOUT_ITEMS,
  INITIAL_ORDER,
  MAIN_PRODUCT,
  MOCK_COURIER,
  STORES_DATA,
  RESTAURANT_MENUS,
} from '../data/mockData';
import { ActiveModal, Address, AppScreen, CartItem, Order, Product, Store, KitchenOrder, HistoryOrderItem } from '../types';
import { MerchantProductItem } from '../components/merchant/MerchantCreateProductScreen';

export const SCREEN_TO_ROUTE: Record<AppScreen, string> = {
  splash: '/',
  role_selector: '/selecionar-perfil',
  role_selection: '/selecionar-perfil',
  login: '/cliente/login',
  register: '/cliente/registro',
  address_selector: '/cliente/endereco',
  home: '/cliente/inicio',
  explore: '/cliente/explorar',
  restaurant_profile: '/cliente/restaurante',
  cart: '/cliente/carrinho',
  product_detail: '/cliente/produto',
  checkout: '/cliente/checkout',
  payment_card: '/cliente/pagamento-cartao',
  payment_yape: '/cliente/pagamento-yape',
  tip_payment_select: '/cliente/propina',
  order_tracking: '/cliente/rastreamento',
  rate_order: '/cliente/avaliar',
  order_confirmed: '/cliente/pedido-confirmado',
  orders: '/cliente/pedidos',
  profile: '/cliente/perfil',
  support: '/cliente/suporte',

  // Repartidor
  courier_login: '/entregador/login',
  courier_register: '/entregador/registro',
  courier_vehicle: '/entregador/veiculo',
  courier_verification: '/entregador/verificacao',
  courier_dashboard: '/entregador/painel',
  courier_heat_map: '/entregador/mapa-calor',
  courier_incoming_order: '/entregador/pedido-recebido',
  courier_to_restaurant: '/entregador/para-restaurante',
  courier_to_client: '/entregador/para-cliente',
  courier_delivery_pin: '/entregador/confirmar-pin',
  courier_completed_summary: '/entregador/resumo',
  courier_weekly_history: '/entregador/historico',
  courier_profile: '/entregador/perfil',
  courier_manage_vehicles: '/entregador/veiculos',
  courier_vehicle_docs_detail: '/entregador/documentos',
  courier_support: '/entregador/suporte',

  // Comercio
  merchant_dashboard: '/comercio/painel',
  merchant_onboarding: '/comercio/onboarding',
  merchant_register: '/comercio/registro',
  merchant_review: '/comercio/revisao',
  merchant_approved: '/comercio/aprovado',
  merchant_create_product: '/comercio/novo-produto',
  merchant_catalog: '/comercio/catalogo',
  merchant_incoming_order: '/comercio/pedido-recebido',
  merchant_incoming_orders: '/comercio/pedido-recebido',
  merchant_kitchen_orders: '/comercio/cozinha',
  merchant_pickup_pin: '/comercio/pin-recolha',
  merchant_sales_metrics: '/comercio/metricas',
  merchant_profile: '/comercio/perfil',
};

// Inverse lookup to determine current AppScreen from current pathname
export const ROUTE_TO_SCREEN: Record<string, AppScreen> = Object.entries(
  SCREEN_TO_ROUTE
).reduce((acc, [screen, route]) => {
  acc[route] = screen as AppScreen;
  return acc;
}, {} as Record<string, AppScreen>);

const INITIAL_MERCHANT_PRODUCTS: MerchantProductItem[] = [
  {
    id: 'm-prod-1',
    name: 'Combo Hamburguesa Clásica Nocturna',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    description: 'Carne artesanal de 150g, queso cheddar derretido, lechuga y papas rústicas.',
    originalPrice: 24.0,
    discountPrice: 14.5,
    quantity: 6,
    pickupTime: '11:00 PM - 2:00 AM',
    isActive: true,
  },
  {
    id: 'm-prod-2',
    name: 'Porción Alitas BBQ Crocantes (8 pcs)',
    photoUrl: 'https://images.unsplash.com/photo-1527477378408-1bc09a23591f?auto=format&fit=crop&w=500&q=80',
    description: 'Bañadas en salsa BBQ ahumada con dip de salsa ranch y apio fresco.',
    originalPrice: 28.0,
    discountPrice: 16.9,
    quantity: 4,
    pickupTime: '11:30 PM - 3:00 AM',
    isActive: true,
  },
  {
    id: 'm-prod-3',
    name: 'Pack 2x Salchipapa Especial UPAO',
    photoUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=500&q=80',
    description: 'Frankfurter en rodajas, papas amarillas fritas y cremas artesanales.',
    originalPrice: 32.0,
    discountPrice: 18.0,
    quantity: 0,
    pickupTime: 'Agotado hoy',
    isActive: false,
  },
];

const INITIAL_KITCHEN_ORDERS: KitchenOrder[] = [
  {
    id: '#AF-1023',
    status: 'new',
    statusLabel: 'Nuevo Pedido',
    customerName: 'Juan Pérez',
    address: 'Trujillo Centro',
    total: 42.5,
    items: [
      { quantity: 2, name: 'Combo Smash Burger Especial', price: 32.0 },
      { quantity: 1, name: 'Batata Rústica com Cheddar', price: 10.5 },
    ],
    courierName: 'Carlos Mendoza',
    courierVehicle: 'Honda CB 125',
    courierEtaMin: 5,
  },
  {
    id: '#AF-1024',
    status: 'preparing',
    statusLabel: 'En Preparación',
    customerName: 'Maria Silva',
    address: 'Urb. El Recreo',
    total: 28.0,
    items: [
      { quantity: 1, name: 'Pizza Broto Calabresa', price: 20.0 },
      { quantity: 1, name: 'Refrigerante 500ml', price: 8.0 },
    ],
    courierName: 'Jorge Luis',
    courierVehicle: 'Yamaha YBR',
    courierEtaMin: 12,
  },
];

const INITIAL_SALES_ORDERS: HistoryOrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: '#AF-4092',
    time: '11:45 PM',
    isToday: true,
    customerName: 'Carlos Mendoza',
    items: [
      { name: 'Combo Hamburguesa Clásica', quantity: 2, price: 14.5 },
      { name: 'Papas Fritas Medianas', quantity: 1, price: 6.0 },
    ],
    paymentMethod: 'Yape Móvil',
    paymentIcon: 'smartphone',
    subtotal: 35.0,
    deliveryFee: 4.5,
    commission: 0.0,
    netTotal: 35.0,
    status: 'Entregado',
  },
  {
    id: 'ord-2',
    orderNumber: '#AF-4089',
    time: '11:18 PM',
    isToday: true,
    customerName: 'Valeria Ríos',
    items: [
      { name: 'Pizza Familiar Pepperoni Nocturna', quantity: 1, price: 28.0 },
      { name: 'Gaseosa Inka Kola 500ml', quantity: 2, price: 4.5 },
    ],
    paymentMethod: 'Plin Interbancario',
    paymentIcon: 'account_balance_wallet',
    subtotal: 37.0,
    deliveryFee: 4.0,
    commission: 0.0,
    netTotal: 37.0,
    status: 'Entregado',
  },
  {
    id: 'ord-3',
    orderNumber: '#AF-4085',
    time: '10:52 PM',
    isToday: true,
    customerName: 'Diego Flores',
    items: [
      { name: 'Combo Alitas BBQ (12 und)', quantity: 1, price: 22.5 },
    ],
    paymentMethod: 'Tarjeta de Débito Visa',
    paymentIcon: 'credit_card',
    subtotal: 22.5,
    deliveryFee: 3.5,
    commission: 0.0,
    netTotal: 22.5,
    status: 'Entregado',
  },
  {
    id: 'ord-4',
    orderNumber: '#AF-4081',
    time: '10:20 PM',
    isToday: true,
    customerName: 'Ana Paula Castillo',
    items: [
      { name: 'Salchipapa Especial Nocturna', quantity: 1, price: 16.0 },
    ],
    paymentMethod: 'Efectivo',
    paymentIcon: 'payments',
    subtotal: 16.0,
    deliveryFee: 4.0,
    commission: 0.0,
    netTotal: 16.0,
    status: 'Cancelado',
  },
  {
    id: 'ord-5',
    orderNumber: '#AF-4078',
    time: '09:44 PM',
    isToday: true,
    customerName: 'Lucía Morales',
    items: [
      { name: 'Combo Hamburguesa Doble Queso', quantity: 2, price: 18.0 },
      { name: 'Porción Tequeños de Queso (8 und)', quantity: 1, price: 12.0 },
    ],
    paymentMethod: 'Yape Móvil',
    paymentIcon: 'smartphone',
    subtotal: 48.0,
    deliveryFee: 4.5,
    commission: 0.0,
    netTotal: 48.0,
    status: 'Entregado',
  },
];

interface AppContextType {
  // Navigation helper
  navigateToScreen: (screen: AppScreen | string) => void;
  currentScreen: AppScreen;
  activeModal: ActiveModal;
  setActiveModal: (modal: ActiveModal) => void;

  // Business state
  currentAddress: Address;
  setCurrentAddress: React.Dispatch<React.SetStateAction<Address>>;
  selectedStore: Store;
  setSelectedStore: React.Dispatch<React.SetStateAction<Store>>;
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartCount: number;
  cartTotal: number;
  handleAddToCart: (item: CartItem) => void;
  handleAddToCartDirect: (item: Product | { name: string; price: number; storeName: string }) => void;
  handleUpdateCartQuantity: (index: number, newQty: number) => void;
  handleRemoveCartItem: (index: number) => void;
  handleClearCart: () => void;
  storeConflictModal: {
    isOpen: boolean;
    currentStoreName: string;
    incomingStoreName: string;
    pendingItem: CartItem;
  } | null;
  handleResolveStoreConflict: (confirmClearAndAdd: boolean) => void;

  // Orders
  activeOrder: Order | null;
  setActiveOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  userOrders: Order[];
  setUserOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  handlePlaceOrder: (method: 'cash' | 'card' | 'yape', cashDetails?: { given: number; returned: number }) => void;
  handleFinalizeOrder: (orderId?: string) => void;
  handleRepeatOrder: (order: Order) => void;

  // Checkout & Payment
  paymentMethod: 'card' | 'yape' | 'cash' | null;
  setPaymentMethod: React.Dispatch<React.SetStateAction<'card' | 'yape' | 'cash' | null>>;
  savedCard: { last4: string; brand: string } | null;
  setSavedCard: React.Dispatch<React.SetStateAction<{ last4: string; brand: string } | null>>;
  cashAmountGiven: number;
  setCashAmountGiven: React.Dispatch<React.SetStateAction<number>>;
  cashChangeReturned: number;
  setCashChangeReturned: React.Dispatch<React.SetStateAction<number>>;

  // Navigation return targets
  addressReturnScreen: AppScreen | null;
  setAddressReturnScreen: React.Dispatch<React.SetStateAction<AppScreen | null>>;

  // Tips & Rating
  tipAmount: number;
  setTipAmount: React.Dispatch<React.SetStateAction<number>>;
  tipPaid: boolean;
  setTipPaid: React.Dispatch<React.SetStateAction<boolean>>;
  tipModeActive: boolean;
  setTipModeActive: React.Dispatch<React.SetStateAction<boolean>>;
  ratingFormData: {
    driverRating: number;
    restaurantRating: number;
    driverComment: string;
    restaurantComment: string;
    selectedTip: '0' | '2' | '3' | '5' | null;
  };
  setRatingFormData: React.Dispatch<
    React.SetStateAction<{
      driverRating: number;
      restaurantRating: number;
      driverComment: string;
      restaurantComment: string;
      selectedTip: '0' | '2' | '3' | '5' | null;
    }>
  >;
  handleFinalizeRating: (data: {
    driverRating: number;
    restaurantRating: number;
    driverComment: string;
    restaurantComment: string;
    tipAmount: number;
    tipPaid: boolean;
  }) => void;

  // Filter & Toast
  activeCategoryFilter: string;
  setActiveCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Theme
  isLightMode: boolean;
  setIsLightMode: React.Dispatch<React.SetStateAction<boolean>>;

  // Merchant State
  merchantProducts: MerchantProductItem[];
  setMerchantProducts: React.Dispatch<React.SetStateAction<MerchantProductItem[]>>;
  merchantIsOpen: boolean;
  setMerchantIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  merchantProfile: {
    name: string;
    category: string;
    address: string;
    ruc: string;
    nightHours: string;
    phone: string;
    email: string;
    rating: number;
    totalReviews: number;
    operatingDays?: string[];
  };
  setMerchantProfile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      category: string;
      address: string;
      ruc: string;
      nightHours: string;
      phone: string;
      email: string;
      rating: number;
      totalReviews: number;
      operatingDays?: string[];
    }>
  >;
  handleToggleProductStatus: (id: string) => void;
  handleAddMerchantProduct: (product: MerchantProductItem) => void;
  handleUpdateMerchantProduct: (product: MerchantProductItem) => void;
  merchantKitchenOrders: KitchenOrder[];
  setMerchantKitchenOrders: React.Dispatch<React.SetStateAction<KitchenOrder[]>>;
  merchantSalesOrders: HistoryOrderItem[];
  setMerchantSalesOrders: React.Dispatch<React.SetStateAction<HistoryOrderItem[]>>;
  handleCancelKitchenOrder: (orderId: string) => void;
  handleCompleteKitchenOrder: (orderId: string) => void;

  // User Profile & Onboarding
  userProfile: {
    name: string;
    phone: string;
    email: string;
    defaultAddress: string;
  };
  setUserProfile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      email: string;
      defaultAddress: string;
    }>
  >;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  isOnboardingSequence: boolean;
  setIsOnboardingSequence: React.Dispatch<React.SetStateAction<boolean>>;
  courierIsGoogleAuth: boolean;
  setCourierIsGoogleAuth: React.Dispatch<React.SetStateAction<boolean>>;
  courierRegistrationData: Record<string, unknown> | null;
  setCourierRegistrationData: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
  merchantAuthCredentials: { email: string; password?: string; authType: 'google' | 'manual' } | null;
  setMerchantAuthCredentials: React.Dispatch<
    React.SetStateAction<{ email: string; password?: string; authType: 'google' | 'manual' } | null>
  >;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [currentAddress, setCurrentAddress] = useState<Address>(DEFAULT_ADDRESS);
  const [selectedStore, setSelectedStore] = useState<Store>(STORES_DATA[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(MAIN_PRODUCT);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('afterfood_onboarding_completed') === 'true';
    } catch {
      return false;
    }
  });
  const [isOnboardingSequence, setIsOnboardingSequence] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yape' | 'cash' | null>('card');
  const [savedCard, setSavedCard] = useState<{ last4: string; brand: string } | null>({
    last4: '4242',
    brand: 'Visa',
  });
  const [tipAmount, setTipAmount] = useState<number>(3.0);
  const [tipPaid, setTipPaid] = useState<boolean>(false);
  const [tipModeActive, setTipModeActive] = useState<boolean>(false);
  const [ratingFormData, setRatingFormData] = useState<{
    driverRating: number;
    restaurantRating: number;
    driverComment: string;
    restaurantComment: string;
    selectedTip: '0' | '2' | '3' | '5' | null;
  }>({
    driverRating: 0,
    restaurantRating: 0,
    driverComment: '',
    restaurantComment: '',
    selectedTip: null,
  });
  const [cashAmountGiven, setCashAmountGiven] = useState(50.0);
  const [cashChangeReturned, setCashChangeReturned] = useState(2.6);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('open24');
  const [addressReturnScreen, setAddressReturnScreen] = useState<AppScreen | null>(null);
  const [storeConflictModal, setStoreConflictModal] = useState<{
    isOpen: boolean;
    currentStoreName: string;
    incomingStoreName: string;
    pendingItem: CartItem;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLightMode, setIsLightMode] = useState<boolean>(true);

  const [merchantProducts, setMerchantProducts] = useState<MerchantProductItem[]>(INITIAL_MERCHANT_PRODUCTS);
  const [merchantIsOpen, setMerchantIsOpen] = useState<boolean>(true);
  const [merchantKitchenOrders, setMerchantKitchenOrders] = useState<KitchenOrder[]>(INITIAL_KITCHEN_ORDERS);
  const [merchantSalesOrders, setMerchantSalesOrders] = useState<HistoryOrderItem[]>(INITIAL_SALES_ORDERS);
  const [merchantProfile, setMerchantProfile] = useState<{
    name: string;
    category: string;
    address: string;
    ruc: string;
    nightHours: string;
    phone: string;
    email: string;
    rating: number;
    totalReviews: number;
    operatingDays?: string[];
  }>({
    name: 'Burger Night UPAO',
    category: 'Comida Rápida',
    address: 'Av. América Sur 1234, Trujillo',
    ruc: '20608945123',
    nightHours: '8:00 PM - 4:00 AM',
    phone: '+51 944 812 390',
    email: 'contacto@burgernight.pe',
    rating: 4.9,
    totalReviews: 184,
    operatingDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  });
  const [userProfile, setUserProfile] = useState({
    name: 'Lucas Cabral Mendoza',
    phone: '+51 944 892 410',
    email: 'lcabralm1@upao.edu.pe',
    defaultAddress: 'Av. Larco 845, Dpto 402, Trujillo',
  });
  const [courierIsGoogleAuth, setCourierIsGoogleAuth] = useState<boolean>(false);
  const [courierRegistrationData, setCourierRegistrationData] = useState<Record<string, unknown> | null>(null);
  const [merchantAuthCredentials, setMerchantAuthCredentials] = useState<{
    email: string;
    password?: string;
    authType: 'google' | 'manual';
  } | null>(null);

  // Enforce exclusive Light Mode across entire document
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Centralized navigation that supports AppScreen IDs, direct path strings, and populates window.history natively
  const navigateToScreen = (screenOrPath: AppScreen | string) => {
    if (screenOrPath in SCREEN_TO_ROUTE) {
      navigate(SCREEN_TO_ROUTE[screenOrPath as AppScreen]);
    } else if (screenOrPath.startsWith('/')) {
      navigate(screenOrPath);
    } else {
      // Default to client subroute
      navigate(`/cliente/${screenOrPath}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current AppScreen from current pathname for components that rely on AppScreen
  const currentScreen: AppScreen = (() => {
    const path = location.pathname;
    if (ROUTE_TO_SCREEN[path]) return ROUTE_TO_SCREEN[path];
    if (path.startsWith('/entregador')) return 'courier_dashboard';
    if (path.startsWith('/comercio')) return 'merchant_dashboard';
    return 'home';
  })();

  const handleToggleProductStatus = (id: string) => {
    setMerchantProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextActive = !item.isActive;
          showToast(nextActive ? `"${item.name}" marcado como Activo` : `"${item.name}" marcado como Agotado`);
          return { ...item, isActive: nextActive };
        }
        return item;
      })
    );
  };

  const handleAddMerchantProduct = (product: MerchantProductItem) => {
    setMerchantProducts((prev) => [product, ...prev]);
    showToast(`¡"${product.name}" publicado en el catálogo nocturno!`);
  };

  const handleUpdateMerchantProduct = (updated: MerchantProductItem) => {
    setMerchantProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Producto "${updated.name}" actualizado`);
  };

  const handleCancelKitchenOrder = (orderId: string) => {
    const order = merchantKitchenOrders.find((o) => o.id === orderId);
    if (order) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      const cancelled: HistoryOrderItem = {
        id: `ord-cancel-${Date.now()}`,
        orderNumber: order.id,
        time: timeStr,
        isToday: true,
        customerName: order.customerName,
        items: order.items.map((it) => ({ name: it.name, quantity: it.quantity, price: it.price })),
        paymentMethod: 'Tarjeta / Pago Online',
        paymentIcon: 'credit_card',
        subtotal: order.total,
        deliveryFee: 4.0,
        commission: 0.0,
        netTotal: order.total,
        status: 'Cancelado',
      };
      setMerchantSalesOrders((prev) => [cancelled, ...prev]);
      setMerchantKitchenOrders((prev) => prev.filter((o) => o.id !== orderId));
      showToast(`Pedido ${order.id} cancelado y trasladado a Cancelados`);
    }
  };

  const handleCompleteKitchenOrder = (orderId: string) => {
    const order = merchantKitchenOrders.find((o) => o.id === orderId) || merchantKitchenOrders[0];
    if (order) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      const delivered: HistoryOrderItem = {
        id: `ord-done-${Date.now()}`,
        orderNumber: order.id,
        time: timeStr,
        isToday: true,
        customerName: order.customerName,
        items: order.items.map((it) => ({ name: it.name, quantity: it.quantity, price: it.price })),
        paymentMethod: 'Yape / Tarjeta',
        paymentIcon: 'payments',
        subtotal: order.total,
        deliveryFee: 4.5,
        commission: 0.0,
        netTotal: order.total,
        status: 'Entregado',
      };
      setMerchantSalesOrders((prev) => [delivered, ...prev]);
      setMerchantKitchenOrders((prev) => prev.filter((o) => o.id !== order.id));
      showToast(`¡Pedido ${order.id} completado y guardado en Ventas!`);
    }
  };

  // Cart operations
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cartItems.reduce((acc, it) => acc + it.totalPrice, 0);

  const handleAddToCart = (item: CartItem) => {
    // Regla de Negocio: Restricción de Carrito Multi-Comercio
    if (cartItems.length > 0) {
      const currentStore = cartItems[0].product.storeName;
      const incomingStore = item.product.storeName;
      if (
        currentStore &&
        incomingStore &&
        currentStore.trim().toLowerCase() !== incomingStore.trim().toLowerCase()
      ) {
        setStoreConflictModal({
          isOpen: true,
          currentStoreName: currentStore,
          incomingStoreName: incomingStore,
          pendingItem: item,
        });
        return;
      }
    }

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === item.product.id &&
          it.specialInstructions === item.specialInstructions &&
          JSON.stringify(it.selectedExtras || []) === JSON.stringify(item.selectedExtras || [])
      );
      if (existingIdx >= 0) {
        return prev.map((it, idx) =>
          idx === existingIdx
            ? {
                ...it,
                quantity: it.quantity + item.quantity,
                totalPrice: it.totalPrice + item.totalPrice,
              }
            : it
        );
      }
      return [...prev, item];
    });
    showToast(`¡${item.product.name} agregado al carrito!`);
    navigateToScreen('cart');
  };

  const handleAddToCartDirect = (item: Product | { name: string; price: number; storeName: string }) => {
    let directProduct: Product;
    if ('id' in item && 'description' in item) {
      directProduct = item as Product;
    } else {
      const matchingStore =
        STORES_DATA.find((s) => s.name.toLowerCase() === item.storeName.toLowerCase()) ||
        STORES_DATA[0];

      let matchingProductImage = matchingStore.image;
      const storeMenu = RESTAURANT_MENUS[matchingStore.id];
      if (storeMenu) {
        for (const cat of storeMenu) {
          const found = cat.items.find((p: Product) => p.name.toLowerCase().includes(item.name.toLowerCase()));
          if (found) {
            matchingProductImage = found.image;
            break;
          }
        }
      }

      directProduct = {
        id: `prod-${Date.now()}`,
        name: item.name,
        storeId: matchingStore.id,
        storeName: item.storeName,
        description: `${item.name} listo para entrega inmediata.`,
        price: item.price,
        image: matchingProductImage,
        category: 'hambre',
        prepTime: '15 min',
        rating: 4.8,
        ratingCount: 50,
      };
    }

    // Regla de Negocio: Restricción de Carrito Multi-Comercio
    if (cartItems.length > 0) {
      const currentStore = cartItems[0].product.storeName;
      const incomingStore = directProduct.storeName;
      if (
        currentStore &&
        incomingStore &&
        currentStore.trim().toLowerCase() !== incomingStore.trim().toLowerCase()
      ) {
        setStoreConflictModal({
          isOpen: true,
          currentStoreName: currentStore,
          incomingStoreName: incomingStore,
          pendingItem: {
            product: directProduct,
            quantity: 1,
            selectedExtras: [],
            totalPrice: directProduct.price,
          },
        });
        return;
      }
    }

    const existingIndex = cartItems.findIndex((it) => it.product.id === directProduct.id);
    if (existingIndex >= 0) {
      setCartItems((prev) =>
        prev.map((it, idx) =>
          idx === existingIndex
            ? {
                ...it,
                quantity: it.quantity + 1,
                totalPrice:
                  (it.product.price +
                    (it.selectedExtras?.reduce((s, e) => s + e.price, 0) || 0)) *
                  (it.quantity + 1),
              }
            : it
        )
      );
    } else {
      const newCartItem: CartItem = {
        product: directProduct,
        quantity: 1,
        selectedExtras: [],
        totalPrice: directProduct.price,
      };
      setCartItems((prev) => [...prev, newCartItem]);
    }

    showToast(`+1 ${directProduct.name} (S/ ${directProduct.price.toFixed(2)})`);
  };

  const handleResolveStoreConflict = (confirmClearAndAdd: boolean) => {
    if (!storeConflictModal) return;

    if (confirmClearAndAdd && storeConflictModal.pendingItem) {
      const pending = storeConflictModal.pendingItem;
      setCartItems([pending]);
      const newStore = STORES_DATA.find(
        (s) =>
          s.id === pending.product.storeId ||
          s.name.toLowerCase() === pending.product.storeName.toLowerCase()
      );
      if (newStore) {
        setSelectedStore(newStore);
      }
      showToast(`Carrito actualizado con productos de ${storeConflictModal.incomingStoreName}`);
      setStoreConflictModal(null);
    } else {
      setStoreConflictModal(null);
      showToast(`Mantuviste tu carrito con productos de ${storeConflictModal.currentStoreName}`);
    }
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          const unitPrice =
            item.product.price +
            (item.selectedExtras?.reduce((s, e) => s + e.price, 0) || 0);
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => {
      const removed = prev[index];
      if (removed) {
        showToast(`"${removed.product.name}" eliminado del carrito`);
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Carrito vaciado');
  };

  const handlePlaceOrder = (
    method: 'cash' | 'card' | 'yape',
    cashDetails?: { given: number; returned: number }
  ) => {
    const itemsToOrder =
      cartItems.length > 0 ? [...cartItems] : [...INITIAL_CHECKOUT_ITEMS];

    const storeFromItem = STORES_DATA.find(
      (s) =>
        s.id === itemsToOrder[0]?.product.storeId ||
        s.name.toLowerCase() === itemsToOrder[0]?.product.storeName?.toLowerCase()
    );
    const resolvedStore = storeFromItem || selectedStore || STORES_DATA[0];
    const resolvedStoreName =
      itemsToOrder[0]?.product.storeName || resolvedStore.name || 'AfterFood Store';
    const resolvedStoreImage =
      resolvedStore.image || itemsToOrder[0]?.product.image || STORES_DATA[0].image;

    const calculatedSubtotal = itemsToOrder.reduce((sum, it) => sum + it.totalPrice, 0);
    const deliveryFee = 4.5;
    const promoDiscount = 4.5;
    const total = Math.max(0, calculatedSubtotal + deliveryFee - promoDiscount);

    const orderId = `#AF-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: orderId,
      storeName: resolvedStoreName,
      storeImage: resolvedStoreImage,
      items: itemsToOrder,
      subtotal: calculatedSubtotal,
      deliveryFee: deliveryFee,
      discount: promoDiscount,
      total: total,
      paymentMethod: method,
      cashAmountGiven: cashDetails?.given,
      cashChangeReturned: cashDetails?.returned,
      address: currentAddress,
      step: 1,
      securityPin: `${Math.floor(1000 + Math.random() * 9000)}`,
      courier: MOCK_COURIER,
      estimatedArrivalMinutes: 20,
      timeWindow: 'En 20–30 min',
      createdAt: `Hoy, ${timeStr}`,
    };

    setActiveOrder(newOrder);
    setUserOrders((prev) => [newOrder, ...prev]);
    // Limpieza automática del carrito post-compra
    setCartItems([]);
    navigateToScreen('order_confirmed');
    showToast(`¡Pedido confirmado en ${newOrder.storeName}!`);
  };

  const handleFinalizeOrder = (orderId?: string) => {
    const targetId = orderId || activeOrder?.id;
    if (!targetId) return;

    setUserOrders((prev) => {
      const existing = prev.find((ord) => ord.id === targetId);
      if (existing && existing.step >= 4) {
        return prev;
      }
      return prev.map((ord) => (ord.id === targetId ? { ...ord, step: 4 } : ord));
    });
    if (activeOrder && activeOrder.id === targetId && activeOrder.step < 4) {
      setActiveOrder((prev) => (prev ? { ...prev, step: 4 } : null));
    }
  };

  const handleFinalizeRating = (data: {
    driverRating: number;
    restaurantRating: number;
    driverComment: string;
    restaurantComment: string;
    tipAmount: number;
    tipPaid: boolean;
  }) => {
    const targetId = activeOrder?.id || (userOrders.length > 0 ? userOrders[0].id : '#AF-89241');
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    setUserOrders((prev) =>
      prev.map((ord) =>
        ord.id === targetId
          ? {
              ...ord,
              step: 4,
              rating: {
                driverRating: data.driverRating || 5,
                restaurantRating: data.restaurantRating || 5,
                driverComment: data.driverComment,
                restaurantComment: data.restaurantComment,
                tipAmount: data.tipAmount,
                tipPaid: data.tipPaid,
                ratedAt: `Hoy, ${timeStr}`,
              },
            }
          : ord
      )
    );

    if (activeOrder && activeOrder.id === targetId) {
      setActiveOrder((prev) =>
        prev
          ? {
              ...prev,
              step: 4,
              rating: {
                driverRating: data.driverRating || 5,
                restaurantRating: data.restaurantRating || 5,
                driverComment: data.driverComment,
                restaurantComment: data.restaurantComment,
                tipAmount: data.tipAmount,
                tipPaid: data.tipPaid,
                ratedAt: `Hoy, ${timeStr}`,
              },
            }
          : null
      );
    }

    setRatingFormData({
      driverRating: 0,
      restaurantRating: 0,
      driverComment: '',
      restaurantComment: '',
      selectedTip: null,
    });
    setTipPaid(false);
    setTipModeActive(false);
    setCartItems([]);

    showToast('¡Calificación y propina registradas con éxito!');
    navigateToScreen('home');
  };

  const handleRepeatOrder = (order: Order) => {
    setCartItems([...order.items]);
    showToast(`¡Pedido de ${order.storeName} agregado al carrito!`);
    navigateToScreen('cart');
  };

  return (
    <AppContext.Provider
      value={{
        navigateToScreen,
        currentScreen,
        activeModal,
        setActiveModal,
        currentAddress,
        setCurrentAddress,
        selectedStore,
        setSelectedStore,
        selectedProduct,
        setSelectedProduct,
        cartItems,
        setCartItems,
        cartCount,
        cartTotal,
        handleAddToCart,
        handleAddToCartDirect,
        handleUpdateCartQuantity,
        handleRemoveCartItem,
        handleClearCart,
        storeConflictModal,
        handleResolveStoreConflict,
        activeOrder,
        setActiveOrder,
        userOrders,
        setUserOrders,
        handlePlaceOrder,
        handleFinalizeOrder,
        handleRepeatOrder,
        paymentMethod,
        setPaymentMethod,
        savedCard,
        setSavedCard,
        cashAmountGiven,
        setCashAmountGiven,
        cashChangeReturned,
        setCashChangeReturned,
        tipAmount,
        setTipAmount,
        tipPaid,
        setTipPaid,
        tipModeActive,
        setTipModeActive,
        ratingFormData,
        setRatingFormData,
        handleFinalizeRating,
        activeCategoryFilter,
        setActiveCategoryFilter,
        addressReturnScreen,
        setAddressReturnScreen,
        toastMessage,
        showToast,
        isLightMode,
        setIsLightMode,
        merchantProducts,
        setMerchantProducts,
        merchantIsOpen,
        setMerchantIsOpen,
        merchantProfile,
        setMerchantProfile,
        handleToggleProductStatus,
        handleAddMerchantProduct,
        handleUpdateMerchantProduct,
        merchantKitchenOrders,
        setMerchantKitchenOrders,
        merchantSalesOrders,
        setMerchantSalesOrders,
        handleCancelKitchenOrder,
        handleCompleteKitchenOrder,
        userProfile,
        setUserProfile,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        isOnboardingSequence,
        setIsOnboardingSequence,
        courierIsGoogleAuth,
        setCourierIsGoogleAuth,
        courierRegistrationData,
        setCourierRegistrationData,
        merchantAuthCredentials,
        setMerchantAuthCredentials,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
