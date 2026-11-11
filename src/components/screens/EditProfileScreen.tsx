import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface EditProfileScreenProps {
  initialName?: string;
  initialPhone?: string;
  initialEmail?: string;
  initialAddress?: string;
  onSave: (data: {
    name: string;
    phone: string;
    email: string;
    defaultAddress: string;
  }) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  initialName = 'Lucas Cabral Mendoza',
  initialPhone = '+51 944 892 410',
  initialEmail = 'lcabralm1@upao.edu.pe',
  initialAddress = 'Av. Larco 845, Dpto 402, Trujillo',
  onSave,
  onNavigate,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [defaultAddress, setDefaultAddress] = useState(initialAddress);
  const [isSaved, setIsSaved] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);

  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  ];

  const handleAvatarChange = () => {
    setAvatarIndex((prev) => (prev + 1) % avatars.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      phone,
      email,
      defaultAddress,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2400);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-1 animate-in fade-in duration-200">
      {/* 1. Encabezado de Usuario en Light Mode */}
      <div className="flex flex-col items-center justify-center pt-2 pb-3 text-center">
        {/* Avatar interactivo con botón de cámara */}
        <div className="relative mb-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500 p-0.5 shadow-md bg-white">
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
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform border-2 border-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">
              photo_camera
            </span>
          </button>
        </div>

        <h1 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
          {name || 'Mi Perfil'}
        </h1>
        <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          Cuenta Verificada AfterFood
        </span>
      </div>

      {/* Mensaje de confirmación de guardado */}
      {isSaved && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[18px] text-emerald-600">
            check_circle
          </span>
          <span>¡Tus datos personales se han guardado con éxito!</span>
        </div>
      )}

      {/* 2. Formulario de Datos Personales */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        {/* Campo 1: Nombre Completo */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-orange-600">
              person
            </span>
            <span>Nombre Completo</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-medium"
          />
        </div>

        {/* Campo 2: Teléfono Móvil */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-purple-700">
              call
            </span>
            <span>Teléfono Móvil</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+51 900 000 000"
            className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-mono"
          />
        </div>

        {/* Campo 3: Correo Electrónico */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-orange-600">
              mail
            </span>
            <span>Correo Electrónico</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-medium"
          />
        </div>

        {/* Campo 4: Dirección Predeterminada */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">
                location_on
              </span>
              <span>Dirección Predeterminada</span>
            </label>
            <button
              type="button"
              onClick={() => onNavigate('address_selector')}
              className="text-[11px] text-[#c2410c] hover:underline font-bold cursor-pointer"
            >
              Cambiar ubicación →
            </button>
          </div>
          <input
            type="text"
            required
            value={defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.value)}
            placeholder="Calle, número, departamento y distrito"
            className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition-colors font-medium"
          />
        </div>

        {/* Botón Principal: Guardar Cambios con Alto Contraste */}
        <button
          type="submit"
          className="w-full h-11 mt-2 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-orange-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            save
          </span>
          <span>Guardar Cambios</span>
        </button>
      </form>

      {/* 3. Accesos y Configuración de Cuenta */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col gap-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          Configuración de Cuenta
        </span>

        {/* Cerrar Sesión (Redirige a selección de rol) */}
        <button
          type="button"
          onClick={() => onNavigate('role_selector')}
          className="w-full p-3 rounded-xl bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 flex items-center justify-between text-left transition-colors shadow-xs group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
            </div>
            <span className="text-xs font-bold text-red-600 leading-tight">
              Cerrar Sesión
            </span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-red-400 group-hover:text-red-600">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};
