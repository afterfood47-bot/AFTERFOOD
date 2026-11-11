export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: number;
  selected?: boolean;
}

export interface Product {
  id: string;
  name: string;
  storeId: string;
  storeName: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'hambre' | 'sed' | 'farmacia' | 'tragos' | 'tienda';
  isPopular?: boolean;
  isBestSeller?: boolean;
  isNightExclusive?: boolean;
  prepTime: string;
  rating: number;
  ratingCount: number;
  availableExtras?: ExtraOption[];
}

export interface Store {
  id: string;
  name: string;
  category: 'Restaurantes' | 'Market' | 'Farmácia' | 'Licorería';
  categoryTag: string;
  badgeTag: string;
  image: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  deliveryFee: number;
  isFreeDelivery?: boolean;
  isOpen24: boolean;
  distanceKm: number;
  tags: string[];
  featuredItems: {
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedExtras: ExtraOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Address {
  id: string;
  tag: 'Casa' | 'Trabajo' | 'Depto' | 'GPS' | 'Otro';
  street: string;
  reference: string;
  city: string;
  estimatedDeliveryTime: string;
}

export interface Courier {
  name: string;
  vehicle: string;
  plate: string;
  rating: number;
  deliveriesCount: number;
  avatar: string;
  isVerified: boolean;
  phone: string;
}

export interface Order {
  id: string;
  storeName: string;
  storeImage: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'card' | 'yape' | 'cash';
  cashAmountGiven?: number;
  cashChangeReturned?: number;
  address: Address;
  step: 1 | 2 | 3 | 4; // 1: Confirmado, 2: Cocina/Preparando, 3: Repartidor en camino, 4: Entregado
  securityPin: string;
  courier: Courier;
  estimatedArrivalMinutes: number;
  timeWindow: string;
  createdAt: string;
  rating?: {
    driverRating: number;
    restaurantRating: number;
    driverComment?: string;
    restaurantComment?: string;
    tipAmount?: number;
    tipPaid?: boolean;
    ratedAt?: string;
  };
}

export type AppScreen =
  | 'home'
  | 'explore'
  | 'product_detail'
  | 'checkout'
  | 'order_confirmed'
  | 'order_tracking'
  | 'rate_order'
  | 'address_selector'
  | 'role_selector'
  | 'role_selection'
  | 'login'
  | 'register'
  | 'splash'
  | 'restaurant_profile'
  | 'cart'
  | 'payment_card'
  | 'payment_yape'
  | 'tip_payment_select'
  | 'orders'
  | 'profile'
  | 'support'
  // Modo Repartidor screens (Telas 1 a 12)
  | 'courier_login'
  | 'courier_register'
  | 'courier_vehicle'
  | 'courier_verification'
  | 'courier_dashboard'
  | 'courier_heat_map'
  | 'courier_incoming_order'
  | 'courier_to_restaurant'
  | 'courier_to_client'
  | 'courier_delivery_pin'
  | 'courier_completed_summary'
  | 'courier_weekly_history'
  | 'courier_profile'
  | 'courier_manage_vehicles'
  | 'courier_vehicle_docs_detail'
  | 'courier_support'
  // Modo Comercio Aliado screens (Dashboard + Telas 1 a 10)
  | 'merchant_dashboard'
  | 'merchant_onboarding'
  | 'merchant_register'
  | 'merchant_review'
  | 'merchant_approved'
  | 'merchant_create_product'
  | 'merchant_catalog'
  | 'merchant_incoming_order'
  | 'merchant_incoming_orders'
  | 'merchant_kitchen_orders'
  | 'merchant_pickup_pin'
  | 'merchant_sales_metrics'
  | 'merchant_profile';

export type ActiveModal =
  | 'none'
  | 'cash_change'
  | 'welcome_promo'
  | 'push_notifications'
  | 'call_courier'
  | 'chat_courier';

export interface KitchenOrderItem {
  quantity: number;
  name: string;
  price: number;
}

export interface KitchenOrder {
  id: string;
  status: 'new' | 'preparing' | 'ready';
  statusLabel: string;
  customerName: string;
  address: string;
  total: number;
  items: KitchenOrderItem[];
  courierName?: string;
  courierVehicle?: string;
  courierEtaMin?: number;
}

export interface HistoryOrderItem {
  id: string;
  orderNumber: string;
  time: string;
  isToday: boolean;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
  paymentIcon: string;
  subtotal: number;
  deliveryFee: number;
  commission: number;
  netTotal: number;
  status: 'Entregado' | 'Cancelado';
}
