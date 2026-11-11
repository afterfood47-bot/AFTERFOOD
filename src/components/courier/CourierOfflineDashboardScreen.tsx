import React from 'react';
import { AppScreen } from '../../types';

interface CourierOfflineDashboardScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onConnect: () => void;
}

export const CourierOfflineDashboardScreen: React.FC<CourierOfflineDashboardScreenProps> = ({
  onNavigate,
  onConnect,
}) => {
  return (
    <div className="light flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] p-4 bg-[#f8f9fa] text-[#1a1d20]">
      <div className="w-32 h-32 mb-6 rounded-full bg-slate-200 border-[4px] border-slate-300 flex items-center justify-center shadow-inner relative">
         <div className="absolute inset-2 rounded-full bg-slate-100 flex items-center justify-center shadow-lg">
             <span className="material-symbols-outlined text-[48px] text-[#64748b]">power_settings_new</span>
         </div>
      </div>
      <h1 className="text-2xl font-black mb-2 text-[#1a1d20]">Estás Desconectado</h1>
      <p className="text-center text-xs text-[#64748b] mb-8 px-4">
        Conéctate para empezar a recibir pedidos y ver el mapa de zonas con alta demanda (Heatmap).
      </p>
      
      <button 
        onClick={onConnect}
        className="w-full max-w-xs h-14 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E44] text-white font-extrabold text-base shadow-[0_8px_30px_-4px_rgba(255,122,0,0.6)] flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[24px]">power</span>
        <span>Conectarme Ahora</span>
      </button>

      <button 
        onClick={() => onNavigate('courier_profile')}
        className="mt-6 text-sm font-bold text-[#6C5CE7] hover:underline cursor-pointer"
      >
        Ir a Mi Perfil
      </button>
    </div>
  );
};
