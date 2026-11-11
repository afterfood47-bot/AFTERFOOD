import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface CourierProfileScreenProps {
  onNavigate: (screen: AppScreen) => void;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
}

export const CourierProfileScreen: React.FC<CourierProfileScreenProps> = ({
  onNavigate,
}) => {
  const [name, setName] = useState('Carlos Mendoza Paredes');
  const [phone, setPhone] = useState('+51 944 892 410');
  const [email, setEmail] = useState('carlos.mendoza@afterfood.pe');
  const [isSaved, setIsSaved] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  ];

  const handleAvatarChange = () => {
    setAvatarIndex((prev) => (prev + 1) % avatars.length);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2400);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-1 animate-in fade-in duration-200 bg-[#f8f9fa] text-[#1a1d20] min-h-[calc(100vh-4rem)]">
      {/* Top Navigation Bar: Back arrow and Title (removed 'Cambiar rol' button) */}
      <div className="w-full flex items-center justify-between py-2">
        <button
          type="button"
          onClick={() => onNavigate('courier_dashboard')}
          className="w-9 h-9 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#1a1d20] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <span className="px-3 py-1 rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 text-[#6C5CE7] text-[11px] font-black uppercase tracking-wider">
          Mi Perfil Conductor
        </span>
        <div className="w-9 h-9" />
      </div>

      {/* 1. Encabezado de Usuario Estilo PedidosYa / Rappi Driver */}
      <div className="flex flex-col items-center justify-center pt-2 pb-3 text-center">
        {/* Avatar interactivo con botón de cámara */}
        <div className="relative mb-2">
          <div className="w-22 h-22 rounded-full overflow-hidden border-3 border-[#6C5CE7] p-0.5 shadow-lg bg-white">
            <img
              src={avatars[avatarIndex]}
              alt={name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button
            type="button"
            onClick={handleAvatarChange}
            aria-label="Cambiar foto de perfil"
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#6C5CE7] hover:bg-[#5b4cdb] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform border-2 border-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">
              photo_camera
            </span>
          </button>
        </div>

        <h1 className="text-base sm:text-lg font-black text-[#1a1d20] leading-tight">
          {name}
        </h1>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Conductor Activo • Trujillo
          </span>
          <span className="text-[11px] text-[#6C5CE7] font-bold bg-[#6C5CE7]/15 px-2 py-0.5 rounded-full">
            Nivel Oro
          </span>
        </div>
      </div>

      {/* Quick Operational Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* 1. Calificación */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-2.5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
            <span className="material-symbols-outlined text-[16px]">star</span>
            <span className="text-sm font-black text-[#1a1d20]">4.9</span>
          </div>
          <span className="text-[10px] text-[#64748b] font-semibold block">
            38 Reseñas
          </span>
        </div>

        {/* 2. Entregas */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-2.5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1 text-[#6C5CE7] mb-0.5">
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            <span className="text-sm font-black text-[#1a1d20]">142</span>
          </div>
          <span className="text-[10px] text-[#64748b] font-semibold block">
            Entregas
          </span>
        </div>

        {/* 3. Ganancias */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-2.5 text-center shadow-xs cursor-pointer hover:border-[#6C5CE7] transition-colors">
          <div className="flex items-center justify-center gap-1 text-[#FF7A00] mb-0.5">
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span className="text-sm font-black text-[#1a1d20]">S/ 482</span>
          </div>
          <span className="text-[10px] text-[#64748b] font-semibold block">
            Semana
          </span>
        </div>
      </div>

      {/* Confirmation Toast */}
      {isSaved && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[18px] text-emerald-500">
            check_circle
          </span>
          <span>¡Datos actualizados con éxito!</span>
        </div>
      )}

      {/* 2. Sección: Información del Conductor */}
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        {/* Bloque de Información del Vehículo: Bloqueado para edición directa */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#64748b] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#1a1d20]">
                  Honda GL-125 Cargo (4812-3T)
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#94a3b8]" title="Edición directa bloqueada en el perfil">
                  lock
                </span>
              </div>
              <p className="text-[10px] text-[#64748b]">
                Vehículo activo • Administrar en Gestionar Vehículos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('courier_manage_vehicles')}
            className="px-3 py-1.5 rounded-xl bg-[#6C5CE7]/10 hover:bg-[#6C5CE7]/20 text-[#6C5CE7] text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Gestionar
          </button>
        </div>

        {/* Datos Personales del Conductor */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-3.5 shadow-xs flex flex-col gap-3">
          <span className="text-[11px] font-black uppercase text-[#6C5CE7] tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">person</span>
            <span>Datos Personales</span>
          </span>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#64748b]">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl text-xs text-[#1a1d20] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#64748b]">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 px-3 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl text-xs text-[#1a1d20] font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#64748b]">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl text-xs text-[#1a1d20]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 mt-1 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-[0.98] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Guardar Cambios</span>
          </button>
        </div>
      </form>

      {/* 3. Accesos y Navegación del Perfil */}
      <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex flex-col gap-2">
        <span className="text-[10px] font-black text-[#64748b] uppercase tracking-wider">
          Opciones del Conductor
        </span>

        {/* Cerrar Sesión -> Redirige al selector de roles */}
        <button
          type="button"
          onClick={() => onNavigate('role_selector')}
          className="w-full p-3 rounded-2xl bg-white hover:bg-rose-500/10 border border-[#e2e8f0] hover:border-rose-500/30 flex items-center justify-between text-left transition-colors shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-rose-500 leading-tight">
                Cerrar sesión
              </span>
              <span className="text-[10px] text-[#64748b] leading-tight mt-0.5">
                Volver a la selección de perfil
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-rose-500">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};