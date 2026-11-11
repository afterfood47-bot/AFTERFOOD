// Source: Google Maps Platform Code Assist
import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  GOOGLE_MAPS_DARK_STYLE,
  GOOGLE_MAPS_LIGHT_STYLE,
  TRUJILLO_COORDINATES,
  TRUJILLO_HAZARD_ZONES,
  HazardZoneAlert,
} from './mapStyles';

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  'AIzaSyCXnALfKN_g57novA6qUVdzQkm8PCuOo-o';

// Polyline component using Google Maps JS SDK via React hooks
export const safeExtractLatLng = (source: any): { lat: number; lng: number } | null => {
  try {
    if (!source) return null;
    const candidate =
      source.latLng ||
      source.detail?.latLng ||
      source.position ||
      source.detail?.position ||
      source.target?.position ||
      source;

    let lat: number | undefined;
    let lng: number | undefined;

    if (typeof candidate.lat === 'function') {
      lat = candidate.lat();
    } else if (typeof candidate.lat === 'number') {
      lat = candidate.lat;
    } else if (typeof candidate.latitude === 'number') {
      lat = candidate.latitude;
    }

    if (typeof candidate.lng === 'function') {
      lng = candidate.lng();
    } else if (typeof candidate.lng === 'number') {
      lng = candidate.lng;
    } else if (typeof candidate.longitude === 'number') {
      lng = candidate.longitude;
    }

    if (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      isFinite(lat) &&
      isFinite(lng)
    ) {
      return { lat, lng };
    }
  } catch (err) {
    console.warn('safeExtractLatLng handled error:', err);
  }
  return null;
};
export const GoogleMapPolyline: React.FC<{
  path: { lat: number; lng: number }[];
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
}> = ({
  path,
  strokeColor = '#FF7A00',
  strokeWeight = 5,
  strokeOpacity = 0.9,
}) => {
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');

  useEffect(() => {
    if (!map || !mapsLib || path.length < 2) return;

    const polyline = new mapsLib.Polyline({
      path,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      map,
    });

    return () => {
      polyline.setMap(null);
    };
  }, [map, mapsLib, path, strokeColor, strokeOpacity, strokeWeight]);

  return null;
};

// Map Recenter & Zoom Controller Hook Component
const MapControls: React.FC<{
  center: { lat: number; lng: number };
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.panTo(center);
    map.setZoom(zoom);
  }, [map, center, zoom]);

  return null;
};

export interface MapMarkerItem {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  subtitle?: string;
  type: 'store' | 'courier' | 'client' | 'address';
  draggable?: boolean;
}

interface AfterFoodGoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarkerItem[];
  routePath?: { lat: number; lng: number }[];
  routeColor?: string;
  isLightMode?: boolean;
  className?: string;
  height?: string;
  onCenterChange?: (center: { lat: number; lng: number }) => void;
  onMapClick?: (coords: { lat: number; lng: number }) => void;
  onMarkerDragEnd?: (coords: { lat: number; lng: number }, markerId: string) => void;
  interactive?: boolean;
  showRecenterButton?: boolean;
  hazardAlerts?: HazardZoneAlert[];
  showHazardLayer?: boolean;
  onHazardClick?: (hazard: HazardZoneAlert) => void;
}

export const AfterFoodGoogleMap: React.FC<AfterFoodGoogleMapProps> = ({
  center = TRUJILLO_COORDINATES.defaultDelivery,
  zoom = 15,
  markers = [],
  routePath,
  routeColor = '#FF7A00',
  isLightMode = false,
  className = '',
  height = '100%',
  onCenterChange,
  onMapClick,
  onMarkerDragEnd,
  interactive = true,
  showRecenterButton = true,
  hazardAlerts = TRUJILLO_HAZARD_ZONES,
  showHazardLayer = false,
  onHazardClick,
}) => {
  const [currentCenter, setCurrentCenter] = useState(center);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [isHazardLayerActive, setIsHazardLayerActive] = useState<boolean>(showHazardLayer);
  const [selectedHazard, setSelectedHazard] = useState<HazardZoneAlert | null>(null);

  // Sync if prop changes
  useEffect(() => {
    setCurrentCenter(center);
    setCurrentZoom(zoom);
  }, [center.lat, center.lng, zoom]);

  useEffect(() => {
    setIsHazardLayerActive(showHazardLayer);
  }, [showHazardLayer]);

  const activeStyles = isLightMode
    ? GOOGLE_MAPS_LIGHT_STYLE
    : GOOGLE_MAPS_DARK_STYLE;

  const handleRecenter = () => {
    setCurrentCenter(center);
    setCurrentZoom(zoom);
  };

  const handleZoomIn = () => {
    setCurrentZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setCurrentZoom((prev) => Math.max(prev - 1, 10));
  };

  const handleSelectHazard = (hazard: HazardZoneAlert) => {
    setSelectedHazard(hazard);
    if (onHazardClick) {
      onHazardClick(hazard);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ height }}
    >
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['marker', 'maps']}>
        <Map
          center={currentCenter}
          zoom={currentZoom}
          mapId="DEMO_MAP_ID"
          styles={activeStyles}
          gestureHandling={interactive ? 'greedy' : 'none'}
          disableDefaultUI={true}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          onCenterChanged={(e) => {
            const newCenter = e.detail.center;
            if (newCenter && onCenterChange) {
              onCenterChange({ lat: newCenter.lat, lng: newCenter.lng });
            }
          }}
          onClick={(e) => {
            try {
              const coords = safeExtractLatLng(e);
              if (coords && onMapClick) {
                onMapClick(coords);
              }
            } catch (err) {
              console.warn('Map onClick error:', err);
            }
          }}
          className="w-full h-full"
        >
          <MapControls center={currentCenter} zoom={currentZoom} />

          {/* Polyline Route between Waypoints if provided */}
          {routePath && routePath.length > 1 && (
            <GoogleMapPolyline
              path={routePath}
              strokeColor={routeColor}
              strokeWeight={5}
              strokeOpacity={0.9}
            />
          )}

          {/* Corporate Markers */}
          {markers.map((marker) => {
            if (marker.type === 'store') {
              return (
                <AdvancedMarker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                >
                  <div className="flex flex-col items-center group -translate-y-1/2">
                    <div className="px-2 py-0.5 rounded-md bg-[#12131A]/90 text-white border border-[#FF7A00] shadow-md mb-1 text-[10px] font-black uppercase tracking-wider whitespace-nowrap pointer-events-none">
                      {marker.title}
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#FF7A00]/25 animate-ping absolute" />
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#e06c00] to-[#FF7A00] border-2 border-white flex items-center justify-center shadow-[0_4px_16px_rgba(255,122,0,0.5)]">
                        <span className="material-symbols-outlined text-white text-[18px]">
                          storefront
                        </span>
                      </div>
                    </div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#FF7A00] -mt-0.5" />
                  </div>
                </AdvancedMarker>
              );
            }

            if (marker.type === 'courier') {
              return (
                <AdvancedMarker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                >
                  <div className="flex flex-col items-center group -translate-y-1/2">
                    <div className="px-2 py-0.5 rounded-md bg-[#6C5CE7]/90 text-white shadow-md mb-1 text-[10px] font-black uppercase tracking-wider whitespace-nowrap pointer-events-none">
                      {marker.title}
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-[#6C5CE7]/30 animate-pulse absolute" />
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5343d6] to-[#6C5CE7] border-2 border-white flex items-center justify-center shadow-[0_4px_16px_rgba(108,92,231,0.55)]">
                        <span className="material-symbols-outlined text-white text-[18px]">
                          directions_bike
                        </span>
                      </div>
                    </div>
                  </div>
                </AdvancedMarker>
              );
            }

            if (marker.type === 'client') {
              return (
                <AdvancedMarker
                  key={marker.id}
                  position={marker.position}
                  title={marker.title}
                >
                  <div className="flex flex-col items-center group -translate-y-1/2">
                    <div className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white shadow-md mb-1 text-[10px] font-black uppercase tracking-wider whitespace-nowrap pointer-events-none">
                      {marker.title}
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/25 animate-ping absolute" />
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 border-2 border-white flex items-center justify-center shadow-[0_4px_16px_rgba(16,185,129,0.5)]">
                        <span className="material-symbols-outlined text-white text-[18px]">
                          home_pin
                        </span>
                      </div>
                    </div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-emerald-500 -mt-0.5" />
                  </div>
                </AdvancedMarker>
              );
            }

            // Default Address Selection Pin (Arrastrable / Draggable e Interactivo)
            const isDraggable = marker.draggable ?? (marker.type === 'address');
            return (
              <AdvancedMarker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                draggable={isDraggable}
                onDragEnd={(e) => {
                  try {
                    const coords = safeExtractLatLng(e);
                    if (coords && onMarkerDragEnd) {
                      onMarkerDragEnd(coords, marker.id);
                    }
                  } catch (err) {
                    console.warn('Marker onDragEnd handled error:', err);
                  }
                }}
              >
                <div
                  className={`relative flex flex-col items-center -translate-y-full transition-transform select-none ${
                    isDraggable ? 'cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95' : 'pointer-events-none'
                  }`}
                  title={isDraggable ? 'Arrastra este pin para ajustar la ubicación exacta' : marker.title}
                >
                  {isDraggable && (
                    <div className="px-2 py-0.5 rounded-full bg-slate-900/90 text-white text-[9px] font-bold shadow-md border border-orange-500/50 mb-1 pointer-events-none whitespace-nowrap animate-bounce">
                      Arrastrar pin
                    </div>
                  )}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF7A00] via-[#ff9433] to-[#ffc58d] flex items-center justify-center shadow-[0_6px_20px_rgba(255,122,0,0.55)] border-2 border-white">
                    <span className="material-symbols-outlined text-[#321200] text-[20px] font-bold">
                      location_on
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FF7A00] -mt-0.5" />
                  <div className="w-2.5 h-1 rounded-full bg-black/40 blur-[1px] mt-0.5" />
                </div>
              </AdvancedMarker>
            );
          })}

          {/* CAMADA DE ZONAS PERIGOSAS E ALERTAS PARA ENTREGADORES */}
          {showHazardLayer &&
            isHazardLayerActive &&
            hazardAlerts.map((hazard) => {
              const isSelected = selectedHazard?.id === hazard.id;
              const isBlackout = hazard.type === 'blackout';
              const isTraffic = hazard.type === 'traffic';

              return (
                <AdvancedMarker
                  key={hazard.id}
                  position={hazard.position}
                  title={`${hazard.title} - ${hazard.subtitle}`}
                  onClick={() => handleSelectHazard(hazard)}
                >
                  <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 -translate-y-1/2 group">
                    {/* Floating Pill Tag with Hazard Name */}
                    <div
                      className={`px-2 py-0.5 rounded-full text-white text-[10px] font-extrabold flex items-center gap-1 shadow-lg border mb-1 tracking-tight whitespace-nowrap transition-all ${
                        isBlackout
                          ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                          : isTraffic
                          ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                          : 'bg-red-950/90 border-red-500 text-red-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">{hazard.icon}</span>
                      <span>{hazard.title}</span>
                    </div>

                    {/* Animated Pulsing Ring & Distinctive Pin */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`w-12 h-12 rounded-full absolute animate-ping opacity-60 ${
                          isBlackout
                            ? 'bg-rose-600'
                            : isTraffic
                            ? 'bg-amber-500'
                            : 'bg-red-600'
                        }`}
                      />
                      <div
                        className={`w-9 h-9 rounded-2xl border-2 border-white flex items-center justify-center shadow-lg transition-transform ${
                          isBlackout
                            ? 'bg-gradient-to-tr from-gray-900 via-rose-700 to-rose-600 text-white'
                            : isTraffic
                            ? 'bg-gradient-to-tr from-amber-600 to-orange-500 text-white'
                            : 'bg-gradient-to-tr from-red-700 to-rose-600 text-white'
                        } ${isSelected ? 'ring-3 ring-orange-400 scale-110' : ''}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {hazard.icon}
                        </span>
                      </div>
                    </div>

                    {/* Pin tail */}
                    <div
                      className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] -mt-0.5 ${
                        isBlackout
                          ? 'border-t-rose-600'
                          : isTraffic
                          ? 'border-t-amber-500'
                          : 'border-t-red-600'
                      }`}
                    />
                  </div>
                </AdvancedMarker>
              );
            })}
        </Map>
      </APIProvider>

      {/* Floating Toggle: Camada de Zonas de Perigo (Controle no Mapa) */}
      {showHazardLayer && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 max-w-[85%]">
          <button
            type="button"
            onClick={() => setIsHazardLayerActive(!isHazardLayerActive)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1.5 transition-all border ${
              isHazardLayerActive
                ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-rose-500/10'
                : 'bg-white/95 text-gray-600 border-gray-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-rose-500">
              {isHazardLayerActive ? 'warning' : 'security'}
            </span>
            <span>
              {isHazardLayerActive
                ? `Alertas Ativos (${hazardAlerts.length})`
                : 'Ativar Alertas de Rota'}
            </span>
          </button>
        </div>
      )}

      {/* Floating Modal / Popover when clicking a Hazard Zone */}
      {showHazardLayer && selectedHazard && (
        <div className="absolute bottom-14 left-3 right-3 z-20 animate-in slide-in-from-bottom duration-200">
          <div className="bg-white/95 backdrop-blur-md border-2 border-rose-400 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{selectedHazard.icon}</span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 leading-tight">
                    {selectedHazard.title}
                  </h4>
                  <p className="text-[10px] text-gray-500">{selectedHazard.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHazard(null)}
                className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              {selectedHazard.description}
            </p>

            <div className="flex items-center justify-between pt-1 text-[10px] text-gray-500">
              <span className="bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                Aviso para Motoboys
              </span>
              <span>{selectedHazard.reportedAt}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Controls (Zoom & Recenter) */}
      {interactive && (
        <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-1.5 items-center">
          <div className="flex flex-col rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white/90 backdrop-blur-md">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Acercar mapa"
              className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
            <div className="w-full h-px bg-slate-200" />
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Alejar mapa"
              className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
          </div>

          {showRecenterButton && (
            <button
              type="button"
              onClick={handleRecenter}
              aria-label="Re-centrar mapa"
              className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-[#FF7A00] flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
              title="Re-centrar"
            >
              <span className="material-symbols-outlined text-[16px]">my_location</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
