/// <reference types="google.maps" />
// Source: Google Maps Platform Code Assist

export const TRUJILLO_COORDINATES = {
  center: { lat: -8.1116, lng: -79.0287 },
  restaurant: { lat: -8.1284, lng: -79.0336 }, // Burger Night UPAO / Av. América Sur
  client: { lat: -8.1189, lng: -79.0272 }, // Calle Los Pinos 456, Urb. El Recreo
  courierOnRouteToRestaurant: { lat: -8.1220, lng: -79.0310 },
  courierOnRouteToClient: { lat: -8.1245, lng: -79.0305 },
  defaultDelivery: { lat: -8.1250, lng: -79.0340 }, // Av. Larco 845
};

// Google Maps Night / Dark Mode Style aligned with AfterFood #12131A palette
export const GOOGLE_MAPS_DARK_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#12131A' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#12131A' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#a0a3bd' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FF7A00' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#928ea1' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#181a24' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#10B981' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#232536' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#181924' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a8d9e' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#383a54' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#25273b' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffd0a8' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1c1e2b' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6C5CE7' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0d0e14' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d4465' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#0d0e14' }],
  },
];

// Clean Light Style for AfterFood (#F8F9FA)
export const GOOGLE_MAPS_LIGHT_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f7' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#52525b' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ea580c' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5e7eb' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e5e7eb' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#fed7aa' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#fdba74' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#dbeafe' }],
  },
];

export interface HazardZoneAlert {
  id: string;
  type: 'blackout' | 'traffic' | 'danger' | 'caution';
  title: string;
  subtitle: string;
  description: string;
  position: { lat: number; lng: number };
  severity: 'high' | 'medium' | 'warning';
  reportedAt: string;
  icon: string;
  badgeColor: string;
}

export const TRUJILLO_HAZARD_ZONES: HazardZoneAlert[] = [
  {
    id: 'hz-1',
    type: 'blackout',
    title: 'Sem Luz / Apagão',
    subtitle: 'Av. América Sur cruzamento com Av. Larco',
    description: 'Postes apagados e sem iluminação pública reportados há 20 min. Atenção com pedestres e use farol alto.',
    position: { lat: -8.1255, lng: -79.0320 },
    severity: 'high',
    reportedAt: 'Há 20 min',
    icon: 'power_off',
    badgeColor: '#EF4444',
  },
  {
    id: 'hz-2',
    type: 'traffic',
    title: 'Trânsito Intenso / Obras',
    subtitle: 'Óvalo Papal e Av. España',
    description: 'Faixa interditada para reparos asfálticos. Lentidão estimada de 10 a 15 min.',
    position: { lat: -8.1150, lng: -79.0350 },
    severity: 'medium',
    reportedAt: 'Há 35 min',
    icon: 'traffic',
    badgeColor: '#F59E0B',
  },
  {
    id: 'hz-3',
    type: 'danger',
    title: 'Zona de Atenção Noturna',
    subtitle: 'Passagem Los Laureles (Via Férrea)',
    description: 'Área com baixa visibilidade e ocorrências reportadas por motoboys. Recomenda-se rota alternativa.',
    position: { lat: -8.1195, lng: -79.0235 },
    severity: 'high',
    reportedAt: 'Alerta comunitário 24/7',
    icon: 'warning',
    badgeColor: '#DC2626',
  },
  {
    id: 'hz-4',
    type: 'caution',
    title: 'Pista Escorregadia',
    subtitle: 'Baixada Buenos Aires',
    description: 'Acúmulo de areia e água na pista após garoa. Reduza a velocidade ao fazer curvas com moto.',
    position: { lat: -8.1310, lng: -79.0390 },
    severity: 'warning',
    reportedAt: 'Há 50 min',
    icon: 'water_damage',
    badgeColor: '#F59E0B',
  },
];

