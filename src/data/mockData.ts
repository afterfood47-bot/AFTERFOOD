import { Address, Courier, Order, Product, Store } from '../types';

export const APP_LOGO = '/logo-horizontal.png';
export const APP_LOGO_HORIZONTAL = '/logo-horizontal.png';
export const APP_LOGO_COMPLETO = '/logo-completo.png';
export const APP_LOGO_SIMBOLO = '/logo-simbolo.png';
export const APP_LOGO_VECTOR = '/logo-horizontal.png';

export const DEFAULT_ADDRESS: Address = {
  id: 'addr-1',
  tag: 'Casa',
  street: '',
  reference: '',
  city: 'Trujillo, La Libertad',
  estimatedDeliveryTime: '20-30 min',
};

export const SAVED_ADDRESSES: Address[] = [
  DEFAULT_ADDRESS,
  {
    id: 'addr-2',
    tag: 'Trabajo',
    street: 'Av. Larco 840, Miraflores',
    reference: 'Piso 7, Coworking Tech',
    city: 'Trujillo',
    estimatedDeliveryTime: '15-25 min',
  },
  {
    id: 'addr-3',
    tag: 'Depto',
    street: 'Jr. San Martín 230',
    reference: 'Edificio Aurora - Timbre 3A',
    city: 'Trujillo',
    estimatedDeliveryTime: '25-35 min',
  },
];

export const MOCK_COURIER: Courier = {
  name: 'Carlos Mendoza',
  vehicle: 'Honda CB125F',
  plate: '4821-B',
  rating: 4.9,
  deliveriesCount: 850,
  avatar:
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
  isVerified: true,
  phone: '+51 944 892 410',
};

export type StoreCategory = 'Restaurantes' | 'Market' | 'Farmácia' | 'Licorería';

export const STORE_CATEGORIES: {
  id: StoreCategory;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  badge: string;
}[] = [
  {
    id: 'Restaurantes',
    name: 'Restaurantes',
    subtitle: 'Hamburguesas, pizzas y comida 24/7',
    icon: 'restaurant',
    color: '#FF7A00',
    badge: 'Comida',
  },
  {
    id: 'Market',
    name: 'Market',
    subtitle: 'Abarrotes, snacks y despensa',
    icon: 'storefront',
    color: '#10B981',
    badge: 'Super',
  },
  {
    id: 'Farmácia',
    name: 'Farmacias',
    subtitle: 'Medicamentos 24H y botiquín',
    icon: 'local_pharmacy',
    color: '#06B6D4',
    badge: 'Salud',
  },
  {
    id: 'Licorería',
    name: 'Licorerías',
    subtitle: 'Cervezas frías, licores y hielo',
    icon: 'liquor',
    color: '#8B5CF6',
    badge: 'Bebidas',
  },
];

export const STORES_DATA: Store[] = [
  // ==============================
  // 1. RESTAURANTES
  // ==============================
  {
    id: 'store-1',
    name: 'Midnight Smash Burgers',
    category: 'Restaurantes',
    categoryTag: 'Hamburguesería & Bajón',
    badgeTag: 'Abierto 24H',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7fKBjIMKE3qYt3KgzI0zV08KVgajfMRV-biX2l-0wFMuns6asyho2xAmbNOcWfzO24Eh0M2IGyPMu2ujc5nhi0B8ArzmdlnENd1x_yHjo8mngqgXr0xYVMSes-O0jUlQYFedXbGW0W7vCKkbFMvDID8vLViYdgZEv-Xqz_lSF65TVJ7DGdJ_3P1T5TyYxrpryJOKTyZf2MqzzkYNiv-dW5UD_OayjCe3gC09-h_zVeYwcJzHVoNyZrg',
    rating: 4.9,
    ratingCount: 140,
    deliveryTime: '15-25 min',
    deliveryFee: 3.5,
    isOpen24: true,
    distanceKm: 1.2,
    tags: ['Hamburguesas artesanales', 'Papas rústicas', 'Combos'],
    featuredItems: [
      { name: 'Doble Cheeseburger con Bacon', price: 24.9 },
      { name: 'Papas Rústicas Trufadas', price: 12.0 },
    ],
  },
  {
    id: 'store-2',
    name: 'Pizza Nocturna & Co.',
    category: 'Restaurantes',
    categoryTag: 'Pizzas al Horno de Leña',
    badgeTag: 'Horno 24/7',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6TLDL_VHBx9RUs9hHTFKWx6Q8b84G1nfmuFcRNz7B8eq1znstc8-ETAeP5v-yuXIFx3NMMWvxWK8AkQcFSj9_KPTUXowasnn49Zxy8MezxA-G0aUtDJfBxxu0o5Mxj1bT7oyYrMw5z_6sUgSS0A3zsplyBjC8g7LaG6ZLYGQvPAQU3gF-2GOp-TmJ6cmHOcHt5-oMC-PP0tPhcucj5H8YtM88GxBafpCwtC5irjmV06KtJLszFSEbw',
    rating: 4.8,
    ratingCount: 95,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
    isFreeDelivery: true,
    isOpen24: true,
    distanceKm: 0.8,
    tags: ['Pizzas artesanales', 'Masa madre', 'Calzones'],
    featuredItems: [
      { name: 'Pizza Pepperoni Especial Mediana', price: 32.0 },
      { name: 'Bebida Energizante 500ml', price: 7.5 },
    ],
  },
  {
    id: 'store-5',
    name: 'Sanguchería El Chinito Nocturno',
    category: 'Restaurantes',
    categoryTag: 'Sánguches Criollos',
    badgeTag: 'Tradición 24H',
    image:
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    ratingCount: 168,
    deliveryTime: '15-25 min',
    deliveryFee: 3.0,
    isOpen24: true,
    distanceKm: 1.5,
    tags: ['Sánguche de Chicharrón', 'Tamal Norteño', 'Sarza Criolla'],
    featuredItems: [
      { name: 'Sánguche de Chicharrón Criollo', price: 18.0 },
      { name: 'Tamal Norteño Artesanal', price: 8.5 },
    ],
  },

  // ==============================
  // 2. MARKET
  // ==============================
  {
    id: 'store-3',
    name: 'Minimarket 24 Siete',
    category: 'Market',
    categoryTag: 'Supermercado & Conveniencia',
    badgeTag: 'Express 24H',
    image:
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    ratingCount: 215,
    deliveryTime: '10-20 min',
    deliveryFee: 2.5,
    isOpen24: true,
    distanceKm: 0.5,
    tags: ['Abarrotes', 'Lácteos', 'Snacks', 'Panadería'],
    featuredItems: [
      { name: 'Leche Gloria Entera 1L', price: 5.5 },
      { name: 'Papas Lays Clásicas Familiares', price: 8.5 },
      { name: 'Pan de Molde Bimbo Blanco', price: 7.9 },
    ],
  },
  {
    id: 'store-6',
    name: 'Tambo+ Express Nocturno',
    category: 'Market',
    categoryTag: 'Tienda de Conveniencia',
    badgeTag: 'Envío en 15m',
    image:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    ratingCount: 180,
    deliveryTime: '12-18 min',
    deliveryFee: 2.0,
    isOpen24: true,
    distanceKm: 0.9,
    tags: ['Empanada de carne', 'Galletas Oreo', 'Pan Bimbo', 'Tambo+'],
    featuredItems: [
      { name: 'Empanada de carne tradicional', price: 6.0 },
      { name: 'Pack de galletas Oreo', price: 4.5 },
      { name: 'Pan de molde Bimbo', price: 7.9 },
    ],
  },

  // ==============================
  // 3. FARMÁCIA
  // ==============================
  {
    id: 'store-4',
    name: 'Farmacia San Rafael 24H',
    category: 'Farmácia',
    categoryTag: 'Farmacia & Bienestar',
    badgeTag: 'Guardia 24H',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBV7KrLoHoaBU0jqknEWVtZTSnDrKsNsgeGWMLBKzq0D7F5fm8OAEQ0RQNtbXrPp2F5xaMuM7atWe7B-aV6Y-_ti6rZjceUnOrX0revqgIAcasiRbpvX6x75aI6kKW8mk67mjdrt69ym8SZnR5qA-Xzpe7LEdtrXHV7fASRtTjoZbNdP66JTKcrEeIPPy1sg9I86attkD17n7G_nRJlNqgrri83kqArsa8ydLmHZ86ASKW9ITDxgquiUw',
    rating: 4.9,
    ratingCount: 120,
    deliveryTime: '10-20 min',
    deliveryFee: 3.0,
    isOpen24: true,
    distanceKm: 0.6,
    tags: ['Medicamentos de guardia', 'Primeros auxilios', 'Cuidado personal'],
    featuredItems: [
      { name: 'Kit Anti-resaca & Hidratación', price: 16.5 },
      { name: 'Paracetamol + Vitamina C Efervescente', price: 9.0 },
    ],
  },
  {
    id: 'store-7',
    name: 'InkaFarma Express 24/7',
    category: 'Farmácia',
    categoryTag: 'Salud & Medicinas',
    badgeTag: 'Farmacia de Turno',
    image:
      'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    ratingCount: 94,
    deliveryTime: '12-22 min',
    deliveryFee: 2.8,
    isOpen24: true,
    distanceKm: 1.1,
    tags: ['Vitamina C Redoxon', 'Ibuprofeno 400mg', 'Farmacia 24H', 'Botiquín'],
    featuredItems: [
      { name: 'Vitamina C Efervescente Redoxon', price: 12.0 },
      { name: 'Ibuprofeno 400mg Forte', price: 7.5 },
    ],
  },

  // ==============================
  // 4. LICORERÍA
  // ==============================
  {
    id: 'store-8',
    name: 'Licorería La Previa 24H',
    category: 'Licorería',
    categoryTag: 'Licores & Cervezas Heladas',
    badgeTag: 'Hielo Gratis',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    ratingCount: 240,
    deliveryTime: '10-18 min',
    deliveryFee: 2.5,
    isOpen24: true,
    distanceKm: 0.4,
    tags: ['Cervezas frías', 'Whiskies', 'Pisco', 'Hielo'],
    featuredItems: [
      { name: 'Pack 6 Cervezas Corona Heladas', price: 28.0 },
      { name: 'Bolsa de Hielo Purificado 3kg', price: 8.0 },
    ],
  },
  {
    id: 'store-9',
    name: 'Bodega & Licorería El After',
    category: 'Licorería',
    categoryTag: 'Destilados & Combos After',
    badgeTag: 'Combos Nocturnos',
    image:
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    ratingCount: 155,
    deliveryTime: '15-25 min',
    deliveryFee: 3.0,
    isOpen24: true,
    distanceKm: 1.3,
    tags: ['Combo Chilcano', 'Vodka Smirnoff', 'Licores 24H', 'Hielo Gratis'],
    featuredItems: [
      { name: 'Combo Chilcano (Pisco + Evervess)', price: 45.0 },
      { name: 'Vodka Smirnoff 700ml', price: 34.0 },
    ],
  },
];

export const MAIN_PRODUCT: Product = {
  id: 'prod-1',
  name: 'Doble Cheeseburger con Bacon',
  storeId: 'store-1',
  storeName: 'Midnight Smash Burgers',
  description:
    'Dos jugosas carnes de res smash 100% angus (90g c/u), doble queso cheddar fundido, tiras de tocino ahumado crocante, cebolla morada caramelizada y nuestra salsa especial de la casa en pan brioche artesanal tostado con mantequilla clarificada.',
  price: 24.9,
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAkajGs9PTYRlFVbv6SyNOTXWa4iDs4ZGqQDINmvtGoF2vDvMPMJzGGMLJbbUGnNV-ERppn9wD7JzKN5j75hn9jjwPJuZCPexi3gLAafe0VoZvK50PAayShcDqNPKpXxhU881E1PmMR80twgCi28tr_0SnwOi7rcsxTYZRx6gsT6jCyZY0wNgA3Aymh6_nRNiy8mt_OWy0IntIqCkideQh8DxsLoayKjFH7iTvZ2Z29LwbEG1psTcQung',
  category: 'hambre',
  isPopular: true,
  isBestSeller: true,
  isNightExclusive: true,
  prepTime: '15–25 min',
  rating: 4.9,
  ratingCount: 140,
  availableExtras: [
    {
      id: 'ext-1',
      name: 'Papas Rústicas Trufadas',
      description: 'Con dip de alioli y sal marina',
      price: 12.0,
      selected: false,
    },
    {
      id: 'ext-2',
      name: 'Queso Cheddar Extra',
      description: 'Doble shot de queso derretido',
      price: 4.0,
      selected: false,
    },
    {
      id: 'ext-3',
      name: 'Gaseosa o Bebida Helada',
      description: 'Lata 355ml a elección bien fría',
      price: 6.5,
      selected: false,
    },
  ],
};

export const INITIAL_CHECKOUT_ITEMS = [
  {
    product: {
      ...MAIN_PRODUCT,
      price: 28.9,
      name: 'Doble Cheeseburger con Bacon',
      image: MAIN_PRODUCT.image,
    },
    quantity: 1,
    selectedExtras: [
      {
        id: 'opt-c',
        name: 'Extra queso cheddar',
        description: 'sin cebolla',
        price: 4.0,
      },
    ],
    specialInstructions: 'Extra queso cheddar, sin cebolla',
    totalPrice: 28.9,
  },
  {
    product: {
      id: 'prod-fries',
      name: 'Papas Rústicas Trufadas',
      storeId: 'store-1',
      storeName: 'Midnight Smash Burgers',
      description: 'Papas doradas crocantes con sal marina y trufa.',
      price: 12.0,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCfiUcyuotgGwv5q8pHTW77Od8fZvSml4LTtj6d3BuqAGitEOY22f8g8ErGtY2BkW-Um0m7zxdXEQKRiqzMW_1W6FhUOFAdwEObYX8Wae56H0BZ9YDRcr1HNCP4oK_KYerOJTEuu2qFeRhBG4kMoBRUCB5qrM5EOjW-rDYvHBulY0lLvjJDLNnHfufbh9BEHk4zCRcT_nqz_1dr92LIz1Xj6hObcPcyw20kK77NE7UtJcLU4Pe6VB_SVg',
      category: 'hambre' as const,
      prepTime: '10 min',
      rating: 4.9,
      ratingCount: 88,
    },
    quantity: 1,
    selectedExtras: [
      {
        id: 'opt-dip',
        name: 'Dip de alioli casero',
        description: '',
        price: 0,
      },
    ],
    specialInstructions: 'Dip de alioli casero',
    totalPrice: 12.0,
  },
  {
    product: {
      id: 'prod-soda',
      name: 'Bebida Helada (Coca-Cola 355ml)',
      storeId: 'store-1',
      storeName: 'Midnight Smash Burgers',
      description: 'Gaseosa en lata 355ml bien fría.',
      price: 6.5,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCEzF9oh7XTXekWAInJTQPwpIbmrRbWsK0x8LsFMlvqrpa2JuilroK2X9iHPNCT5P7XVAoZ6xiCP2O72sExG4OWryPVFn3LkYj3bEoIxYSnEo8nWiIahy407NjQqNDwy7cRBmAEK9bUMM066H8oEFDqYEwBJh3X54eE-XOIiXVKxttC6fMKpdxVflY35EqAgKcg4_9SidJk-ZO9Crgn8U11IaM14afN_-KH-npV9lXikroLFiBPmLA0yQ',
      category: 'sed' as const,
      prepTime: '2 min',
      rating: 4.8,
      ratingCount: 110,
    },
    quantity: 1,
    selectedExtras: [],
    specialInstructions: 'Helada de lata',
    totalPrice: 6.5,
  },
];

export const INITIAL_ORDER: Order = {
  id: '#AF-89241',
  storeName: 'Midnight Smash Burgers',
  storeImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDx0ByqVky_xiQRrTFojXsayWdxROF2v0zaDf4KnzCIgR7m0GvSGNWGZ5cPoG8QTgguN_Z5dA2Umhpv9MaJQ-u4Ejgbk40CeIMcNhXk71DOVEo5jR90HQ6He6Wvt3_IcjI0dZTHmSin2apUWDMma-e5CUu4MK14SBbcdLbHjjBKrl0-weCNiCv_jLUdfztXGoHPWGKffWNZJDOe64qAxASFXXPuGTeqRNTXNqHPvV8ut6g9QHrOk55FiQ',
  items: INITIAL_CHECKOUT_ITEMS,
  subtotal: 47.4,
  deliveryFee: 4.5,
  discount: 4.5,
  total: 47.4,
  paymentMethod: 'cash',
  cashAmountGiven: 50.0,
  cashChangeReturned: 2.6,
  address: DEFAULT_ADDRESS,
  step: 3,
  securityPin: '4829',
  courier: MOCK_COURIER,
  estimatedArrivalMinutes: 18,
  timeWindow: '11:42 PM – 11:50 PM',
  createdAt: 'Hoy, 11:20 PM',
};

export const RESTAURANT_MENUS: Record<string, { category: string; icon: string; items: Product[] }[]> = {
  'store-1': [
    {
      category: 'Promos',
      icon: 'local_offer',
      items: [
        {
          id: 'combo-1',
          name: 'Combo Bajón Nocturno Smash',
          storeId: 'store-1',
          storeName: 'Midnight Smash Burgers',
          description: 'Doble Smash Burger + Papas rústicas trufadas + Coca-Cola 355ml helada.',
          price: 34.9,
          originalPrice: 43.4,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
          category: 'hambre',
          isPopular: true,
          prepTime: '15-20 min',
          rating: 4.9,
          ratingCount: 180,
          availableExtras: MAIN_PRODUCT.availableExtras,
        },
      ],
    },
    {
      category: 'Hamburguesas',
      icon: 'lunch_dining',
      items: [
        MAIN_PRODUCT,
        {
          id: 'prod-classic',
          name: 'Classic Smash Single',
          storeId: 'store-1',
          storeName: 'Midnight Smash Burgers',
          description: 'Carne smash 100g angus, queso cheddar derretido, lechuga y tomate.',
          price: 18.5,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=500&q=80',
          category: 'hambre',
          prepTime: '12-18 min',
          rating: 4.8,
          ratingCount: 112,
          availableExtras: MAIN_PRODUCT.availableExtras,
        },
      ],
    },
  ],
  'store-2': [
    {
      category: 'Pizzas al Horno',
      icon: 'local_pizza',
      items: [
        {
          id: 'p-pizza-pep',
          name: 'Pizza Pepperoni Especial Mediana',
          storeId: 'store-2',
          storeName: 'Pizza Nocturna & Co.',
          description: 'Masa madre crocante, salsa pomodoro italiana, abundante mozzarella y pepperoni.',
          price: 32.0,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6TLDL_VHBx9RUs9hHTFKWx6Q8b84G1nfmuFcRNz7B8eq1znstc8-ETAeP5v-yuXIFx3NMMWvxWK8AkQcFSj9_KPTUXowasnn49Zxy8MezxA-G0aUtDJfBxxu0o5Mxj1bT7oyYrMw5z_6sUgSS0A3zsplyBjC8g7LaG6ZLYGQvPAQU3gF-2GOp-TmJ6cmHOcHt5-oMC-PP0tPhcucj5H8YtM88GxBafpCwtC5irjmV06KtJLszFSEbw',
          category: 'hambre',
          prepTime: '20 min',
          rating: 4.8,
          ratingCount: 95,
        },
      ],
    },
  ],
  'store-3': [
    {
      category: 'Abarrotes & Esenciales',
      icon: 'shopping_bag',
      items: [
        {
          id: 'm-leche',
          name: 'Leche Gloria Entera 1L',
          storeId: 'store-3',
          storeName: 'Minimarket 24 Siete',
          description: 'Caja de leche entera fresca 1 litro.',
          price: 5.5,
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80',
          category: 'tienda',
          prepTime: '5 min',
          rating: 4.9,
          ratingCount: 120,
        },
        {
          id: 'm-lays',
          name: 'Papas Lays Clásicas Familiares 150g',
          storeId: 'store-3',
          storeName: 'Minimarket 24 Siete',
          description: 'Papas fritas saladas crujientes formato para compartir.',
          price: 8.5,
          image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80',
          category: 'tienda',
          prepTime: '3 min',
          rating: 4.8,
          ratingCount: 90,
        },
      ],
    },
  ],
  'store-4': [
    {
      category: 'Guardia & Emergencia',
      icon: 'medical_services',
      items: [
        {
          id: 'farm-resaca',
          name: 'Kit Anti-resaca & Rehidratación Flash',
          storeId: 'store-4',
          storeName: 'Farmacia San Rafael 24H',
          description: 'Gatorade 500ml + Paracetamol 500mg + Sal de Andrews efervescente.',
          price: 16.5,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
          category: 'farmacia',
          prepTime: '5 min',
          rating: 4.9,
          ratingCount: 80,
        },
        {
          id: 'farm-alivio',
          name: 'Paracetamol 500mg + Vitamina C Efervescente',
          storeId: 'store-4',
          storeName: 'Farmacia San Rafael 24H',
          description: 'Caja con 10 sobres efervescentes para alivio rápido de malestar nocturno.',
          price: 9.0,
          image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
          category: 'farmacia',
          prepTime: '5 min',
          rating: 4.8,
          ratingCount: 65,
        },
      ],
    },
  ],
  'store-8': [
    {
      category: 'Cervezas & Licores',
      icon: 'liquor',
      items: [
        {
          id: 'm-cerveza-pack',
          name: 'Pack 6 Cervezas Corona Heladas',
          storeId: 'store-8',
          storeName: 'Licorería La Previa 24H',
          description: 'Pack de 6 botellas 355ml listas para destapar.',
          price: 28.0,
          image: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=500&q=80',
          category: 'tragos',
          prepTime: '5 min',
          rating: 4.9,
          ratingCount: 210,
        },
        {
          id: 'm-hielo',
          name: 'Bolsa de Hielo Purificado 3kg',
          storeId: 'store-8',
          storeName: 'Licorería La Previa 24H',
          description: 'Cubos de hielo limpios y compactos para enfriar tus bebidas.',
          price: 8.0,
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
          category: 'sed',
          prepTime: '2 min',
          rating: 4.9,
          ratingCount: 95,
        },
      ],
    },
  ],
  'store-5': [
    {
      category: 'Sánguches & Tradición Criolla',
      icon: 'lunch_dining',
      items: [
        {
          id: 'chin-chicharron',
          name: 'Sánguche de Chicharrón Criollo',
          storeId: 'store-5',
          storeName: 'Sanguchería El Chinito Nocturno',
          description:
            'Generosa porción de panceta de cerdo crocante y dorada servida en pan francés artesanal con camote frito en rodajas y sarza criolla norteña fresca con ají limo.',
          price: 18.0,
          image:
            'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=500&q=80',
          category: 'hambre',
          isPopular: true,
          isBestSeller: true,
          isNightExclusive: true,
          prepTime: '15-20 min',
          rating: 4.9,
          ratingCount: 215,
          availableExtras: [
            {
              id: 'ext-camote',
              name: 'Porción extra de camote frito',
              description: 'Rodajas doradas crocantes',
              price: 3.5,
              selected: false,
            },
            {
              id: 'ext-sarza',
              name: 'Sarza criolla extra',
              description: 'Cebolla pluma con ají limo y limón sutil',
              price: 2.0,
              selected: false,
            },
          ],
        },
        {
          id: 'chin-tamal',
          name: 'Tamal Norteño Artesanal',
          storeId: 'store-5',
          storeName: 'Sanguchería El Chinito Nocturno',
          description:
            'Tamal norteño artesanal envuelto en hoja de plátano, masa suave de maíz criollo relleno con cerdo sazonado, huevo duro y aceituna botija, servido con sarza criolla fresca.',
          price: 8.5,
          image:
            'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80',
          category: 'hambre',
          isPopular: true,
          prepTime: '10-15 min',
          rating: 4.8,
          ratingCount: 140,
          availableExtras: [
            {
              id: 'ext-tamal-sarza',
              name: 'Sarza criolla extra',
              description: 'Con limón sutil y ají limo',
              price: 2.0,
              selected: false,
            },
          ],
        },
      ],
    },
  ],
  'store-6': [
    {
      category: 'Productos Oficiales Tambo+',
      icon: 'storefront',
      items: [
        {
          id: 'tambo-empanada',
          name: 'Empanada de carne tradicional',
          storeId: 'store-6',
          storeName: 'Tambo+ Express Nocturno',
          description:
            'Clásica empanada horneada de Tambo+, masa dorada crocante rellena de abundante carne molida sazonada, huevo duro, aceituna y toque de cebollita. Servida calientita.',
          price: 6.0,
          image:
            'https://images.unsplash.com/photo-1628106235973-f655af576e97?auto=format&fit=crop&w=500&q=80',
          category: 'tienda',
          isPopular: true,
          isBestSeller: true,
          prepTime: '5-10 min',
          rating: 4.8,
          ratingCount: 195,
          availableExtras: [],
        },
        {
          id: 'tambo-oreo',
          name: 'Pack de galletas Oreo',
          storeId: 'store-6',
          storeName: 'Tambo+ Express Nocturno',
          description:
            'Pack familiar de galletas de chocolate Oreo rellenas con crema dulce sabor vainilla original. El antojo dulce perfecto para cualquier hora.',
          price: 4.5,
          image:
            'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80',
          category: 'tienda',
          isPopular: true,
          isBestSeller: true,
          prepTime: '3-5 min',
          rating: 4.9,
          ratingCount: 170,
          availableExtras: [],
        },
        {
          id: 'tambo-bimbo',
          name: 'Pan de molde Bimbo',
          storeId: 'store-6',
          storeName: 'Tambo+ Express Nocturno',
          description:
            'Bolsa de Pan de Molde Blanco Bimbo Grande 650g, enriquecido con vitaminas y minerales. Rebanadas suaves y esponjosas para tostadas o sándwiches.',
          price: 7.9,
          image:
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
          category: 'tienda',
          prepTime: '3-5 min',
          rating: 4.7,
          ratingCount: 115,
          availableExtras: [],
        },
      ],
    },
  ],
  'store-7': [
    {
      category: 'Farmacia & Medicinas',
      icon: 'medical_services',
      items: [
        {
          id: 'inka-redoxon',
          name: 'Vitamina C Efervescente Redoxon',
          storeId: 'store-7',
          storeName: 'InkaFarma Express 24/7',
          description:
            'Tubo con 10 tabletas efervescentes sabor naranja de Vitamina C (Ácido Ascórbico 1g) + Zinc. Refuerza las defensas del sistema inmunológico y aporta vitalidad.',
          price: 12.0,
          image:
            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80',
          category: 'farmacia',
          isPopular: true,
          isBestSeller: true,
          prepTime: '5-10 min',
          rating: 4.9,
          ratingCount: 118,
          availableExtras: [],
        },
        {
          id: 'inka-ibuprofeno',
          name: 'Ibuprofeno 400mg Forte',
          storeId: 'store-7',
          storeName: 'InkaFarma Express 24/7',
          description:
            'Caja con 10 cápsulas blandas de acción rápida de Ibuprofeno 400mg. Alivio eficaz del dolor de cabeza, dolor muscular, fiebre e inflamación.',
          price: 7.5,
          image:
            'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
          category: 'farmacia',
          isPopular: true,
          isBestSeller: true,
          prepTime: '5-10 min',
          rating: 4.8,
          ratingCount: 92,
          availableExtras: [],
        },
      ],
    },
  ],
  'store-9': [
    {
      category: 'Licores & Combos Nocturnos',
      icon: 'liquor',
      items: [
        {
          id: 'after-chilcano',
          name: 'Combo Chilcano (Pisco + Evervess)',
          storeId: 'store-9',
          storeName: 'Bodega & Licorería El After',
          description:
            'Combo completo para preparar chilcanos al instante: 1 botella de Pisco Quebranta 750ml + 2 botellas de Evervess Ginger Ale 1.5L + limones frescos y bolsa de hielo 2kg de cortesía.',
          price: 45.0,
          image:
            'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
          category: 'tragos',
          isPopular: true,
          isBestSeller: true,
          isNightExclusive: true,
          prepTime: '10-15 min',
          rating: 4.9,
          ratingCount: 185,
          availableExtras: [
            {
              id: 'ext-hielo-extra',
              name: 'Bolsa de hielo purificado 2kg extra',
              description: 'Cubos sólidos cristalinos',
              price: 5.0,
              selected: false,
            },
            {
              id: 'ext-evervess-extra',
              name: 'Evervess Ginger Ale 1.5L adicional',
              description: 'Bien helada',
              price: 6.5,
              selected: false,
            },
          ],
        },
        {
          id: 'after-vodka',
          name: 'Vodka Smirnoff 700ml',
          storeId: 'store-9',
          storeName: 'Bodega & Licorería El After',
          description:
            'Botella original sellada de Vodka Smirnoff No. 21 Red de 700ml (37.5% Vol.), triple destilación y diez veces filtrado. Incluye bolsa de hielo en cubos de cortesía.',
          price: 34.0,
          image:
            'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=500&q=80',
          category: 'tragos',
          isPopular: true,
          isBestSeller: true,
          prepTime: '10-15 min',
          rating: 4.8,
          ratingCount: 140,
          availableExtras: [
            {
              id: 'ext-citrus',
              name: 'Jugo Citrus / Naranja 1L',
              description: 'Para combinar con el vodka',
              price: 6.0,
              selected: false,
            },
          ],
        },
      ],
    },
  ],
};
