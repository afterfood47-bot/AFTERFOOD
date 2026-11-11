import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Ilustración estilo PedidosYa: Bolsa de compras/delivery colorida con destello y corazón amigable
 */
export const ClientIllustration: React.FC<IllustrationProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_6px_12px_rgba(255,90,0,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="bagGrad" x1="12" y1="16" x2="52" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF7A00" />
        <stop offset="50%" stopColor="#FF4500" />
        <stop offset="100%" stopColor="#E02644" />
      </linearGradient>
      <linearGradient id="handleGrad" x1="24" y1="6" x2="40" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>
      <linearGradient id="heartGrad" x1="26" y1="28" x2="38" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFE2E6" />
      </linearGradient>
      <linearGradient id="sparkleGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="100%" stopColor="#FFD54F" />
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Asa de la bolsa */}
    <path
      d="M23 20V14C23 9.02944 27.0294 5 32 5C36.9706 5 41 9.02944 41 14V20"
      stroke="url(#handleGrad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    {/* Cuerpo de la bolsa de delivery (forma redondeada 3D amigable) */}
    <path
      d="M13 20C13 18.3431 14.3431 17 16 17H48C49.6569 17 51 18.3431 51 20L47.5 54C47.25 56.5 45.2 58.5 42.6 58.5H21.4C18.8 58.5 16.75 56.5 16.5 54L13 20Z"
      fill="url(#bagGrad)"
      filter="url(#softShadow)"
    />

    {/* Brillo especular superior / lateral */}
    <path
      d="M18 20L19.8 48C19.8 48 22 23 45 20H18Z"
      fill="white"
      fillOpacity="0.22"
    />

    {/* Pliegue decorativo superior */}
    <path
      d="M14.5 22C20 25 44 25 49.5 22"
      stroke="#FFB074"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* Corazón / Carita amigable en el centro de la bolsa */}
    <path
      d="M32 44C32 44 24 38.5 24 33C24 29.8 26.5 28 29.2 28C30.9 28 32 29.2 32 29.2C32 29.2 33.1 28 34.8 28C37.5 28 40 29.8 40 33C40 38.5 32 44 32 44Z"
      fill="url(#heartGrad)"
      filter="url(#softShadow)"
    />

    {/* Teléfono / Smartphone saliendo o destello PedidosYa */}
    <circle cx="48" cy="15" r="5" fill="#FFE600" />
    <path
      d="M48 11.5L49 14.2L51.8 15L49 15.8L48 18.5L47 15.8L44.2 15L47 14.2L48 11.5Z"
      fill="#FF4500"
    />

    {/* Pequeña estrella / chispa */}
    <circle cx="12" cy="30" r="2.5" fill="#FFE082" />
  </svg>
);

/**
 * Ilustración estilo PedidosYa: Repartidor en Scooter / Moto brillante con mochila de delivery
 */
export const CourierIllustration: React.FC<IllustrationProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_6px_12px_rgba(108,92,231,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="scooterBody" x1="16" y1="20" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8E44AD" />
        <stop offset="50%" stopColor="#6C5CE7" />
        <stop offset="100%" stopColor="#4834D4" />
      </linearGradient>
      <linearGradient id="backpackGrad" x1="12" y1="16" x2="28" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF7A00" />
        <stop offset="100%" stopColor="#FF3838" />
      </linearGradient>
      <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2D3436" />
        <stop offset="100%" stopColor="#1E272E" />
      </linearGradient>
      <linearGradient id="helmetGrad" x1="20" y1="6" x2="36" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD32A" />
        <stop offset="100%" stopColor="#FFA801" />
      </linearGradient>
    </defs>

    {/* Suelo / Sombra dinámica */}
    <ellipse cx="32" cy="56" rx="24" ry="4" fill="#000" fillOpacity="0.3" />

    {/* Rueda trasera */}
    <circle cx="16" cy="46" r="8" fill="url(#wheelGrad)" stroke="#636E72" strokeWidth="2.5" />
    <circle cx="16" cy="46" r="3" fill="#DFE6E9" />

    {/* Rueda delantera */}
    <circle cx="48" cy="46" r="8" fill="url(#wheelGrad)" stroke="#636E72" strokeWidth="2.5" />
    <circle cx="48" cy="46" r="3" fill="#DFE6E9" />

    {/* Chasis y piso del scooter */}
    <path
      d="M18 45H32L36 38L46 43"
      stroke="#B2BEC3"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Carrocería frontal del scooter con faro */}
    <path
      d="M42 45L46 30C46.5 28.5 48 27 50 27H51"
      stroke="url(#scooterBody)"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Luz delantera brillante */}
    <circle cx="51" cy="27" r="3.5" fill="#FFEAA7" />
    <path d="M54 25L59 23L59 31L54 29Z" fill="#FFF" fillOpacity="0.4" />

    {/* Mochila de delivery icónica térmica */}
    <rect
      x="12"
      y="22"
      width="15"
      height="18"
      rx="4"
      fill="url(#backpackGrad)"
      stroke="#FF9F43"
      strokeWidth="1.5"
    />
    <line x1="12" y1="27" x2="27" y2="27" stroke="#FFF" strokeWidth="2" strokeOpacity="0.8" />
    <circle cx="19.5" cy="33" r="3" fill="#FFF" fillOpacity="0.9" />

    {/* Casco del repartidor con visor */}
    <circle cx="28" cy="14" r="8" fill="url(#helmetGrad)" />
    <path
      d="M26 13C26 11 29 11 34 13L32 17H26V13Z"
      fill="#2C3E50"
    />
    <path d="M29 13.5L33 14" stroke="#00D2D3" strokeWidth="1.5" strokeLinecap="round" />

    {/* Cuerpo del conductor */}
    <path
      d="M24 22L28 34H33L36 28L31 22"
      fill="url(#scooterBody)"
    />
  </svg>
);

/**
 * Ilustración estilo PedidosYa: Comercio / Restaurante con fachada acogedora, toldo rayado y plato de comida humeante
 */
export const MerchantIllustration: React.FC<IllustrationProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_6px_12px_rgba(16,185,129,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="roofGreen" x1="12" y1="12" x2="52" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="wallGrad" x1="14" y1="26" x2="50" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E272E" />
        <stop offset="100%" stopColor="#12181F" />
      </linearGradient>
      <linearGradient id="dishGrad" x1="22" y1="36" x2="42" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF9F43" />
        <stop offset="100%" stopColor="#EE5253" />
      </linearGradient>
    </defs>

    {/* Base sombra */}
    <ellipse cx="32" cy="56" rx="22" ry="4" fill="#000" fillOpacity="0.3" />

    {/* Paredes de la tienda */}
    <rect x="14" y="24" width="36" height="30" rx="4" fill="url(#wallGrad)" stroke="#34343C" strokeWidth="1.5" />

    {/* Ventanal cálido iluminado */}
    <rect x="18" y="32" width="28" height="20" rx="3" fill="#2D3436" />
    <rect x="20" y="34" width="24" height="16" rx="2" fill="#FFEAA7" fillOpacity="0.2" />

    {/* Plato humeante / Cloche de restaurante dentro de la tienda */}
    <ellipse cx="32" cy="45" rx="8" ry="3" fill="#DFE6E9" />
    <path
      d="M26 44C26 40 28.5 38 32 38C35.5 38 38 40 38 44H26Z"
      fill="url(#dishGrad)"
    />
    <circle cx="32" cy="37" r="1.5" fill="#FFEAA7" />

    {/* Humo aromático animado en espiral */}
    <path
      d="M29 34C28 32 30 30 29 28"
      stroke="#FFB074"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M34 33C35 31 33 29 34 27"
      stroke="#FFB074"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Toldo festivo / Awnings (rayas verde esmeralda y blanco/amarillo) */}
    <path
      d="M10 24L13 14H51L54 24H10Z"
      fill="url(#roofGreen)"
    />
    {/* Rayas del toldo */}
    <path d="M17 14L15.5 24H21.5L22 14H17Z" fill="#FFFFFF" fillOpacity="0.85" />
    <path d="M29 14L28.5 24H35.5L35 14H29Z" fill="#FFFFFF" fillOpacity="0.85" />
    <path d="M42 14L42.5 24H48.5L47 14H42Z" fill="#FFFFFF" fillOpacity="0.85" />

    {/* Flecos festivos ondulados en la base del toldo */}
    <path
      d="M10 24C12 26 15 26 17 24C19 26 22 26 24 24C26 26 29 26 31 24C33 26 36 26 38 24C40 26 43 26 45 24C47 26 50 26 52 24C53 25 54 24.5 54 24"
      stroke="#059669"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Letrero superior "OPEN" estilo neón */}
    <rect x="25" y="8" width="14" height="6" rx="2" fill="#10B981" />
    <circle cx="32" cy="11" r="1.5" fill="#FFFFFF" />
  </svg>
);

/**
 * Categoría 1: TENGO HAMBRE (Hamburguesa jugosa con queso derretido, tomate, lechuga y papas fritas crujientes)
 */
export const BurgerFriesIllustration: React.FC<IllustrationProps> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_10px_rgba(255,107,0,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="bunTop" x1="10" y1="14" x2="38" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA000" />
        <stop offset="100%" stopColor="#E65100" />
      </linearGradient>
      <linearGradient id="patty" x1="10" y1="33" x2="38" y2="39" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6D4C41" />
        <stop offset="100%" stopColor="#3E2723" />
      </linearGradient>
      <linearGradient id="cheese" x1="10" y1="29" x2="38" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFEE58" />
        <stop offset="100%" stopColor="#FDD835" />
      </linearGradient>
      <linearGradient id="friesBox" x1="34" y1="20" x2="52" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF3838" />
        <stop offset="100%" stopColor="#C0392B" />
      </linearGradient>
      <linearGradient id="fryGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
    </defs>

    {/* Sombra base 3D de apoyo */}
    <ellipse cx="28" cy="51" rx="22" ry="3" fill="#000000" fillOpacity="0.14" />

    {/* --- PAPAS FRITAS AL FONDO A LA DERECHA --- */}
    {/* Papas individuales saliendo */}
    <rect x="37" y="10" width="3" height="18" rx="1.5" fill="url(#fryGold)" transform="rotate(-10 37 10)" />
    <rect x="42" y="8" width="3.2" height="20" rx="1.6" fill="url(#fryGold)" />
    <rect x="46" y="11" width="3" height="17" rx="1.5" fill="url(#fryGold)" transform="rotate(12 46 11)" />
    <rect x="39" y="14" width="2.5" height="12" rx="1.2" fill="#FFE082" />

    {/* Caja roja de papas fritas */}
    <path
      d="M34 26L36.5 47C36.8 48.5 38 49.5 39.5 49.5H48C49.5 49.5 50.7 48.5 51 47L53.5 26C53.7 24.8 52.8 23.8 51.6 24L44 26L35.8 24C34.7 23.8 33.7 24.8 34 26Z"
      fill="url(#friesBox)"
      stroke="#FF7675"
      strokeWidth="0.8"
    />
    <circle cx="44" cy="38" r="4" fill="#FFD200" />
    <path d="M42 38H46" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />

    {/* --- HAMBURGUESA PRINCIPAL AL FRENTE --- */}
    {/* Pan inferior */}
    <path
      d="M7 41C7 44.5 10 47 14 47H32C36 47 39 44.5 39 41C39 39.5 37.8 38.5 36.5 38.5H9.5C8.2 38.5 7 39.5 7 41Z"
      fill="url(#bunTop)"
    />

    {/* Carne a la parrilla jugosa */}
    <rect x="6" y="34.5" width="34" height="5.5" rx="2.75" fill="url(#patty)" />

    {/* Queso cheddar derretido cayendo en puntas */}
    <path
      d="M6 32H40L37 37L32 33L26 38L21 33L15 37L10 33L6 35V32Z"
      fill="url(#cheese)"
    />

    {/* Rodaja de tomate rojo fresco */}
    <rect x="8" y="29" width="30" height="3.5" rx="1.75" fill="#E74C3C" />
    <line x1="12" y1="30.7" x2="34" y2="30.7" stroke="#FF7675" strokeWidth="1" strokeLinecap="round" />

    {/* Lechuga rizada fresca verde */}
    <path
      d="M6 28C8 26.5 10 29 13 28C16 27 18 29.5 21 28C24 26.5 26 29 29 28C32 27 35 29 38 27.5L40 29H6V28Z"
      fill="#2ECC71"
    />

    {/* Pan superior abovedado con semillas de sésamo */}
    <path
      d="M6 25C6 16.5 12.5 11 23 11C33.5 11 40 16.5 40 25C40 26 39.2 26.8 38.2 26.8H7.8C6.8 26.8 6 26 6 25Z"
      fill="url(#bunTop)"
    />

    {/* Brillo especular en el pan */}
    <path
      d="M12 17C15 13.5 20 12.5 25 12.5C28 12.5 30 13 32 14"
      stroke="#FFE082"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* Semillas de sésamo */}
    <ellipse cx="16" cy="18" rx="1.2" ry="0.8" fill="#FFFDE7" transform="rotate(-15 16 18)" />
    <ellipse cx="23" cy="15" rx="1.2" ry="0.8" fill="#FFFDE7" />
    <ellipse cx="30" cy="17" rx="1.2" ry="0.8" fill="#FFFDE7" transform="rotate(20 30 17)" />
    <ellipse cx="26" cy="20" rx="1.2" ry="0.8" fill="#FFFDE7" transform="rotate(-10 26 20)" />
    <ellipse cx="19" cy="22" rx="1.2" ry="0.8" fill="#FFFDE7" transform="rotate(15 19 22)" />
  </svg>
);

/**
 * Categoría 2: TENGO SED (Vaso de bebida helada con tonos vibrantes, cubos de hielo, burbujas y sorbete inclinado)
 */
export const ColdDrinkIllustration: React.FC<IllustrationProps> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_10px_rgba(0,196,255,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="cupLiquid" x1="16" y1="16" x2="40" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00C4FF" />
        <stop offset="50%" stopColor="#0072FF" />
        <stop offset="100%" stopColor="#7B2CBF" />
      </linearGradient>
      <linearGradient id="iceCube" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#80DEEA" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="lemonSlice" x1="32" y1="8" x2="46" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFEE58" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
    </defs>

    {/* Sombra base 3D de apoyo */}
    <ellipse cx="28" cy="51" rx="18" ry="3" fill="#000000" fillOpacity="0.14" />

    {/* Sorbete (pajita) rayado inclinado */}
    <path
      d="M26 4L34 26"
      stroke="#FF3838"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M26 4L34 26"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeDasharray="3 3"
      strokeLinecap="round"
    />

    {/* Rodaja de limón/naranja en el borde */}
    <circle cx="39" cy="16" r="9" fill="url(#lemonSlice)" stroke="#F57F17" strokeWidth="1.2" />
    <circle cx="39" cy="16" r="6.8" fill="#FFF9C4" />
    <path d="M39 10V22M33 16H45M34.8 11.8L43.2 20.2M43.2 11.8L34.8 20.2" stroke="#FBC02D" strokeWidth="1" />

    {/* Vaso de bebida con fondo redondeado */}
    <path
      d="M15 18H41L37 47C36.7 49.5 34.6 51 32 51H24C21.4 51 19.3 49.5 19 47L15 18Z"
      fill="url(#cupLiquid)"
      stroke="#81D4FA"
      strokeWidth="1.5"
    />

    {/* Nivel de bebida y espuma refrescante */}
    <ellipse cx="28" cy="22" rx="11" ry="3" fill="#B3E5FC" fillOpacity="0.6" />

    {/* Cubos de hielo flotando */}
    <rect x="20" y="24" width="7" height="7" rx="1.8" fill="url(#iceCube)" stroke="#E0F7FA" strokeWidth="0.8" transform="rotate(12 20 24)" />
    <rect x="29" y="27" width="6.5" height="6.5" rx="1.8" fill="url(#iceCube)" stroke="#E0F7FA" strokeWidth="0.8" transform="rotate(-15 29 27)" />

    {/* Burbujas de gas efervescentes */}
    <circle cx="23" cy="38" r="1.5" fill="#FFF" fillOpacity="0.8" />
    <circle cx="32" cy="41" r="1.8" fill="#FFF" fillOpacity="0.8" />
    <circle cx="27" cy="44" r="1.2" fill="#FFF" fillOpacity="0.7" />
    <circle cx="31" cy="35" r="1.2" fill="#FFF" fillOpacity="0.8" />

    {/* Brillo de condensación / reflejo lateral */}
    <path
      d="M17.5 22L20.8 46"
      stroke="#FFF"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />

    {/* Gotitas de condensación fría */}
    <circle cx="14" cy="34" r="1.2" fill="#00E5FF" />
    <circle cx="43" cy="37" r="1.2" fill="#00E5FF" />
  </svg>
);

/**
 * Categoría 3: FARMACIA (Cápsula médica brillante bicolor con cruz de salud y botiquín de emergencia 24h)
 */
export const PharmacyIllustration: React.FC<IllustrationProps> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_10px_rgba(16,185,129,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="medRed" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF4757" />
        <stop offset="100%" stopColor="#FF1E38" />
      </linearGradient>
      <linearGradient id="medGreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="boxGrad" x1="8" y1="16" x2="48" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2ED573" />
        <stop offset="100%" stopColor="#10AC84" />
      </linearGradient>
    </defs>

    {/* Sombra base 3D de apoyo */}
    <ellipse cx="28" cy="50" rx="20" ry="3.5" fill="#000000" fillOpacity="0.13" />

    {/* Maletín / Botiquín base */}
    <rect x="10" y="18" width="36" height="28" rx="6" fill="url(#boxGrad)" stroke="#55E6C1" strokeWidth="1.5" />

    {/* Asa del maletín */}
    <path
      d="M21 18V13C21 11.5 22.5 10 24 10H32C33.5 10 35 11.5 35 13V18"
      stroke="#A3CB38"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Insignia circular blanca central */}
    <circle cx="28" cy="32" r="9" fill="#FFFFFF" />

    {/* Cruz médica verde esmeralda */}
    <path
      d="M26 27H30V30H33V34H30V37H26V34H23V30H26V27Z"
      fill="#10B981"
    />

    {/* Cápsula flotante vibrante en la esquina superior derecha con redondeo completo 3D */}
    <g transform="rotate(32 42 15)">
      {/* Mitad superior roja */}
      <path d="M37 16V12C37 9.8 38.8 8 41 8C43.2 8 45 9.8 45 12V16H37Z" fill="url(#medRed)" />
      {/* Mitad inferior blanca */}
      <path d="M37 16V20C37 22.2 38.8 24 41 24C43.2 24 45 22.2 45 20V16H37Z" fill="#FFFFFF" />
      <line x1="37" y1="16" x2="45" y2="16" stroke="#E2E8F0" strokeWidth="0.8" />
      {/* Brillo especular de la cápsula */}
      <path d="M38.5 10V14" stroke="#FFA8A8" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      <path d="M38.5 17V21" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* Destello de emergencia 24h */}
    <circle cx="12" cy="14" r="3" fill="#FFEAA7" />
    <path d="M12 9L12.7 12.3L16 13L12.7 13.7L12 17L11.3 13.7L8 13L11.3 12.3L12 9Z" fill="#FFA502" />
  </svg>
);

/**
 * Categoría 4: QUIERO TRAGOS (Chopp cervecero espumante o coctel festivo con burbujas y lima)
 */
export const DrinksBarIllustration: React.FC<IllustrationProps> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_10px_rgba(245,158,11,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="beerGold" x1="12" y1="18" x2="38" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="cocktailGrad" x1="28" y1="12" x2="48" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    {/* Sombra base 3D de apoyo */}
    <ellipse cx="28" cy="51" rx="22" ry="3.5" fill="#000000" fillOpacity="0.14" />

    {/* Asa del chopp */}
    <path
      d="M12 24H7C5.3 24 4 25.3 4 27V37C4 38.7 5.3 40 7 40H12"
      stroke="#FDE68A"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Jarra / Chopp de cerveza dorada */}
    <rect x="11" y="20" width="22" height="28" rx="4" fill="url(#beerGold)" stroke="#FDE68A" strokeWidth="1.5" />

    {/* Líneas de relieve del chopp de vidrio */}
    <line x1="17" y1="23" x2="17" y2="45" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
    <line x1="22" y1="23" x2="22" y2="45" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
    <line x1="27" y1="23" x2="27" y2="45" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />

    {/* Espuma blanca cremosa desbordante */}
    <ellipse cx="22" cy="19" rx="13" ry="4" fill="#FFFFFF" />
    <circle cx="14" cy="18" r="4.5" fill="#FFFFFF" />
    <circle cx="21" cy="16" r="5" fill="#FFFFFF" />
    <circle cx="28" cy="17" r="4.5" fill="#FFFFFF" />
    {/* Gota de espuma cayendo */}
    <path d="M12 21C12 24 13.5 25 13.5 25C13.5 25 15 24 15 21" fill="#FFFFFF" />

    {/* Copa de cóctel festiva al lado derecho */}
    <path
      d="M34 18L43 32V45M43 32L52 18H34ZM37 45H49"
      stroke="#E9D5FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polygon points="36,20 50,20 43,30" fill="url(#cocktailGrad)" />

    {/* Rodaja de lima en la copa */}
    <circle cx="51" cy="16" r="4.5" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1" />
    <circle cx="51" cy="16" r="3" fill="#D9F99D" />

    {/* Burbujitas festivas */}
    <circle cx="16" cy="38" r="1.5" fill="#FFF" fillOpacity="0.7" />
    <circle cx="24" cy="33" r="1.2" fill="#FFF" fillOpacity="0.7" />
  </svg>
);

/**
 * Categoría 5: TIENDAS ABIERTAS 24/7 (Canasta de compras llena de productos frescos, snacks y distintivo 24H)
 */
export const StoreMarketIllustration: React.FC<IllustrationProps> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_10px_rgba(255,122,0,0.35)] ${className}`}
  >
    <defs>
      <linearGradient id="basketGrad" x1="8" y1="24" x2="48" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF7A00" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="bottleGrad" x1="14" y1="8" x2="22" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>

    {/* Sombra base 3D de apoyo */}
    <ellipse cx="28" cy="52" rx="22" ry="3.5" fill="#000000" fillOpacity="0.14" />

    {/* Botella de bebida / leche saliendo de la canasta */}
    <rect x="15" y="10" width="7" height="18" rx="2" fill="url(#bottleGrad)" stroke="#BAE6FD" strokeWidth="1" />
    <rect x="16.5" y="6" width="4" height="4" rx="1" fill="#FFFFFF" />

    {/* Fruta roja brillante (Manzana / Tomate) */}
    <circle cx="28" cy="20" r="7.5" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
    <path d="M28 13C29 11 31 11 32 11" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />

    {/* Paquete de snack / galletas */}
    <rect x="33" y="14" width="10" height="16" rx="2" fill="#FACC15" stroke="#EAB308" strokeWidth="1" transform="rotate(12 33 14)" />
    <circle cx="39" cy="22" r="2.5" fill="#DC2626" />

    {/* Canasta de compras estilizada */}
    <path
      d="M7 26H49L44.5 47C44.2 49 42.5 50.5 40.5 50.5H15.5C13.5 50.5 11.8 49 11.5 47L7 26Z"
      fill="url(#basketGrad)"
      stroke="#FFB074"
      strokeWidth="1.5"
    />

    {/* Asas de la canasta */}
    <path
      d="M17 26C17 17 21 13 28 13C35 13 39 17 39 26"
      stroke="#FED7AA"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="4 2"
    />

    {/* Entramado de la cesta */}
    <line x1="16" y1="34" x2="40" y2="34" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="18" y1="42" x2="38" y2="42" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />

    {/* Sello redondo brillante 24H */}
    <circle cx="43" cy="41" r="7.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
    <text
      x="43"
      y="44"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="7"
      fontWeight="900"
      fontFamily="sans-serif"
    >
      24H
    </text>
  </svg>
);

/**
 * Pin de Ubicación estilo PedidosYa: Naranja brillante, llamativo y con destello
 */
export const VibrantLocationPin: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_2px_8px_rgba(255,122,0,0.5)] ${className}`}
  >
    <defs>
      <linearGradient id="pinGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF9F43" />
        <stop offset="60%" stopColor="#FF7A00" />
        <stop offset="100%" stopColor="#EE5253" />
      </linearGradient>
    </defs>
    <path
      d="M12 2C7.58172 2 4 5.58172 4 10C4 15.25 10.25 21.35 11.45 22.48C11.75 22.77 12.25 22.77 12.55 22.48C13.75 21.35 20 15.25 20 10C20 5.58172 16.4183 2 12 2Z"
      fill="url(#pinGrad)"
    />
    <circle cx="12" cy="9.5" r="3.5" fill="#FFFFFF" />
  </svg>
);

/**
 * Carrito de Compras estilo PedidosYa: Colorido, nítido y reconocible
 */
export const VibrantCartIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 4H5.5L7.8 14.5C7.95 15.2 8.58 15.7 9.3 15.7H18.2C18.9 15.7 19.5 15.2 19.68 14.5L21.2 8H6.5"
      stroke="#FF7A00"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9.5" cy="19.5" r="1.8" fill="#FF7A00" />
    <circle cx="17.5" cy="19.5" r="1.8" fill="#FF7A00" />
    <path
      d="M10 11H17.5"
      stroke="#FFA8A8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
