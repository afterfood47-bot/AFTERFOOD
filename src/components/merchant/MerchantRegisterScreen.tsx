import React, { useRef, useState } from 'react';
import { AppScreen } from '../../types';
import { MAKE_WEBHOOKS, submitToMakeWebhook } from '../../services/makeWebhooks';

interface MerchantRegisterScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSaveData?: (data: any) => void;
  merchantAuth?: { email: string; password?: string; authType: 'google' | 'manual' } | null;
}

export const MerchantRegisterScreen: React.FC<MerchantRegisterScreenProps> = ({
  onNavigate,
  onSaveData,
  merchantAuth,
}) => {
  const [activeModule, setActiveModule] = useState<'datos' | 'ubicacion' | 'archivos'>('datos');

  // Fields initialized completely empty (NO prefilled mock/dummy data)
  const [businessName, setBusinessName] = useState('');
  const [ruc, setRuc] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nightHours, setNightHours] = useState('');
  const [operatingDays, setOperatingDays] = useState<string[]>([
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ]);

  // File uploads initialized as PENDING / NOT LOADED (null)
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [photosFile, setPhotosFile] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const categories = [
    'Comida Rápida',
    'Restaurante',
    'Pastelería & Postres',
    'Bebidas & Tragos',
    'Minimarket / Tienda',
    'Pizzería Nocturna',
    'Farmacia',
    'Otros',
  ];

  const validate = () => {
    if (!businessName.trim()) {
      setError('Inserta el nombre de tu comercio para continuar.');
      setActiveModule('datos');
      return false;
    }
    if (!ruc.trim() || ruc.trim().length !== 11 || !/^\d+$/.test(ruc.trim())) {
      setError('Ingresa los 11 dígitos numéricos válidos del RUC.');
      setActiveModule('datos');
      return false;
    }
    if (!category.trim()) {
      setError('Selecciona la categoría de tu comercio.');
      setActiveModule('datos');
      return false;
    }
    if (!phone.trim()) {
      setError('Ingresa el teléfono de contacto del comercio.');
      setActiveModule('datos');
      return false;
    }
    if (!address.trim()) {
      setError('Ingresa la dirección exacta del local.');
      setActiveModule('ubicacion');
      return false;
    }
    if (!nightHours.trim()) {
      setError('Ingresa el horario de atención nocturno.');
      setActiveModule('ubicacion');
      return false;
    }
    if (operatingDays.length === 0) {
      setError('Selecciona al menos un día operativo de atención.');
      setActiveModule('ubicacion');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSaveAndReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    const storedEmail = (() => {
      try {
        return localStorage.getItem('afterfood_merchant_email') || undefined;
      } catch {
        return undefined;
      }
    })();

    const payload = {
      role: 'comercio',
      email: merchantAuth?.email || storedEmail || null,
      password: merchantAuth?.password || null,
      authType: merchantAuth?.authType || null,
      businessName: businessName.trim(),
      ruc: ruc.trim(),
      category: category.trim(),
      phone: phone.trim(),
      address: address.trim(),
      nightHours: nightHours.trim(),
      operatingDays,
      logoFile,
      photosFile,
      submittedAt: new Date().toISOString(),
    };

    try {
      await submitToMakeWebhook(MAKE_WEBHOOKS.MERCHANT_REGISTER, payload);

      setIsSubmitting(false);
      setSuccessMessage('¡Comercio registrado con éxito! Tus datos se enviaron correctamente.');

      setTimeout(() => {
        if (onSaveData) {
          onSaveData(payload);
        }
        onNavigate('merchant_review');
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error && err.message
          ? `Error al enviar el registro: ${err.message}`
          : 'No se pudo enviar el registro del comercio. Verifica tu conexión e inténtalo de nuevo.'
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'photos') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'logo') {
        setLogoFile(file.name);
      } else {
        setPhotosFile(file.name);
      }
      setError(null);
    }
  };

  const handleSimulateUpload = (type: 'logo' | 'photos') => {
    const rand = Date.now().toString().slice(-4);
    if (type === 'logo') {
      setLogoFile(`logo_comercio_${rand}.png`);
    } else {
      setPhotosFile(`fachada_local_${rand}.jpg`);
    }
    setError(null);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-24 pt-2 bg-[#f8f9fa]  text-[#1a1d20]  transition-colors duration-200 animate-in fade-in duration-200">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={logoInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, 'logo')}
      />
      <input
        type="file"
        ref={photosInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, 'photos')}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onNavigate('merchant_onboarding')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-[#64748b]  hover:text-[#1a1d20]  transition-colors shadow-xs cursor-pointer"
          title="Volver"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 bg-white  px-3 py-1 rounded-full border border-slate-200  shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
          <span className="text-[11px] font-bold text-[#FF7A00]  uppercase tracking-wider">
            Paso 2: Datos del Local
          </span>
        </div>
        <div className="w-9" />
      </div>

      {/* Minimalist Title */}
      <div className="mb-3">
        <h1 className="text-xl sm:text-2xl font-black text-[#1a1d20]  tracking-tight">
          Configuración del Comercio
        </h1>
      </div>

      {error && (
        <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-600  text-xs animate-shake">
          <span className="material-symbols-outlined text-base shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Selector Modular Unificado: 3 Secciones Claras */}
      <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-200/80  border border-slate-200  mb-3">
        <button
          type="button"
          onClick={() => setActiveModule('datos')}
          className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeModule === 'datos'
              ? 'bg-white  text-[#1a1d20]  shadow-xs'
              : 'text-[#64748b]  hover:text-[#1a1d20] '
          }`}
        >
          <span className="material-symbols-outlined text-sm">store</span>
          <span>1. Negocio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule('ubicacion')}
          className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeModule === 'ubicacion'
              ? 'bg-white  text-[#1a1d20]  shadow-xs'
              : 'text-[#64748b]  hover:text-[#1a1d20] '
          }`}
        >
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>2. Horario</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule('archivos')}
          className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeModule === 'archivos'
              ? 'bg-white  text-[#1a1d20]  shadow-xs'
              : 'text-[#64748b]  hover:text-[#1a1d20] '
          }`}
        >
          <span className="material-symbols-outlined text-sm">photo_camera</span>
          <span>3. Fotos</span>
          {(!logoFile || !photosFile) ? (
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          )}
        </button>
      </div>

      <form onSubmit={handleSaveAndReview} className="flex flex-col gap-3">
        {/* =========================================================================
            MÓDULO 1: DATOS FISCALES Y COMERCIALES (COMPLETAMENTE LIMPIOS)
           ========================================================================= */}
        {activeModule === 'datos' && (
          <div className="flex flex-col gap-3 bg-white  p-4 sm:p-5 rounded-2xl border border-slate-200  shadow-xl animate-in fade-in duration-150">
            {/* Nombre del establecimiento */}
            <div className="flex flex-col gap-1">
              <label htmlFor="input-business-name" className="text-xs font-bold text-[#1a1d20] ">
                Nombre del establecimiento
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  store
                </span>
                <input
                  id="input-business-name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Inserta el nombre de tu comercio aquí"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#94a3b8]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* RUC (11 dígitos) */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="input-business-ruc" className="text-xs font-bold text-[#1a1d20] ">
                  RUC (11 dígitos)
                </label>
                <span className="text-[10px] text-emerald-600  font-bold">
                  SUNAT Trujillo
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  receipt_long
                </span>
                <input
                  id="input-business-ruc"
                  type="text"
                  maxLength={11}
                  required
                  value={ruc}
                  onChange={(e) => {
                    setRuc(e.target.value.replace(/\D/g, ''));
                    setError(null);
                  }}
                  placeholder="Ingresa los 11 dígitos del RUC"
                  className="w-full h-11 pl-9 pr-14 bg-slate-50  border border-slate-200  rounded-xl text-xs font-mono font-bold text-[#1a1d20]  placeholder:text-[#94a3b8]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
                <span className="absolute right-3 text-[10px] text-[#64748b]  font-mono">
                  {ruc.length}/11
                </span>
              </div>
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-1">
              <label htmlFor="input-business-category" className="text-xs font-bold text-[#1a1d20] ">
                Categoría principal
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  category
                </span>
                <select
                  id="input-business-category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setError(null);
                  }}
                  className={`w-full h-11 pl-9 pr-8 bg-slate-50  border border-slate-200  rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#FF7A00] appearance-none ${
                    !category ? 'text-[#94a3b8] ' : 'text-[#1a1d20] '
                  }`}
                >
                  <option value="" disabled>
                    Selecciona la categoría del local
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white  text-[#1a1d20] ">
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#64748b] text-lg pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Teléfono de contacto */}
            <div className="flex flex-col gap-1">
              <label htmlFor="input-business-phone" className="text-xs font-bold text-[#1a1d20]">
                Teléfono de contacto <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b] text-[18px] pointer-events-none">
                  call
                </span>
                <input
                  id="input-business-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(null);
                  }}
                  placeholder="Ej: +51 944 812 390"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-[#94a3b8] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModule('ubicacion')}
              className="mt-1 w-full h-11 rounded-xl bg-slate-100  hover:bg-slate-200  text-[#1a1d20]  text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Continuar a Ubicación y Horario</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* =========================================================================
            MÓDULO 2: UBICACIÓN Y HORARIOS NOCTURNOS (COMPLETAMENTE LIMPIOS)
           ========================================================================= */}
        {activeModule === 'ubicacion' && (
          <div className="flex flex-col gap-3 bg-white  p-4 sm:p-5 rounded-2xl border border-slate-200  shadow-xl animate-in fade-in duration-150">
            {/* Dirección física */}
            <div className="flex flex-col gap-1">
              <label htmlFor="input-business-address" className="text-xs font-bold text-[#1a1d20] ">
                Dirección física en Trujillo
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  location_on
                </span>
                <input
                  id="input-business-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setError(null);
                  }}
                  placeholder="Ingresa la dirección exacta del local"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#94a3b8]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Horario nocturno */}
            <div className="flex flex-col gap-1">
              <label htmlFor="input-business-hours" className="text-xs font-bold text-[#1a1d20] ">
                Horario de atención nocturno
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  schedule
                </span>
                <input
                  id="input-business-hours"
                  type="text"
                  required
                  value={nightHours}
                  onChange={(e) => {
                    setNightHours(e.target.value);
                    setError(null);
                  }}
                  placeholder="Ingresa el horario de atención (ej. 8:00 PM - 4:00 AM)"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#94a3b8]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Presets rápidos */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-[#64748b]  w-full">Opciones rápidas de turno:</span>
              {['8:00 PM - 4:00 AM', '9:00 PM - 3:00 AM', '10:00 PM - 5:00 AM', '24 Horas'].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => {
                    setNightHours(h);
                    setError(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                    nightHours === h
                      ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-[#FF7A00]'
                      : 'bg-slate-50 border-slate-200 text-[#64748b]'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Días Operativos (Lunes a Domingo interactivo) */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1a1d20]">
                  Días operativos <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-[#FF7A00] font-bold">
                  {operatingDays.length} {operatingDays.length === 1 ? 'día' : 'días'} seleccionado{operatingDays.length === 1 ? '' : 's'}
                </span>
              </div>
              <p className="text-[11px] text-[#64748b]">
                Toca cada día para seleccionarlo o deseleccionarlo interactivamente:
              </p>
              <div className="grid grid-cols-7 gap-1 mt-1">
                {[
                  { key: 'Lunes', label: 'Lun' },
                  { key: 'Martes', label: 'Mar' },
                  { key: 'Miércoles', label: 'Mié' },
                  { key: 'Jueves', label: 'Jue' },
                  { key: 'Viernes', label: 'Vie' },
                  { key: 'Sábado', label: 'Sáb' },
                  { key: 'Domingo', label: 'Dom' },
                ].map(({ key, label }) => {
                  const isSelected = operatingDays.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setOperatingDays((prev) =>
                          isSelected ? prev.filter((d) => d !== key) : [...prev, key]
                        );
                        setError(null);
                      }}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#FF7A00] border-[#FF7A00] text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-[#64748b] hover:border-slate-300'
                      }`}
                      title={key}
                    >
                      <span className="leading-tight">{label}</span>
                      <span className="text-[8px] leading-tight opacity-80">{isSelected ? '✓' : '—'}</span>
                    </button>
                  );
                })}
              </div>

              {/* Botones de selección rápida */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOperatingDays(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']);
                    setError(null);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1a1d20] font-semibold cursor-pointer"
                >
                  Todos los días
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOperatingDays(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']);
                    setError(null);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1a1d20] font-semibold cursor-pointer"
                >
                  Lun a Vie
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOperatingDays(['Viernes', 'Sábado', 'Domingo']);
                    setError(null);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1a1d20] font-semibold cursor-pointer"
                >
                  Fines de semana
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => setActiveModule('datos')}
                className="flex-1 h-11 rounded-xl bg-slate-100  hover:bg-slate-200  text-[#1a1d20]  text-xs font-bold cursor-pointer"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => setActiveModule('archivos')}
                className="flex-1 h-11 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4bc4] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Fotos del Local</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            MÓDULO 3: FOTOS Y DOCUMENTOS (ESTADOS ROJO / VERDE CONTEXTUALES)
           ========================================================================= */}
        {activeModule === 'archivos' && (
          <div className="flex flex-col gap-3 bg-white  p-4 sm:p-5 rounded-2xl border border-slate-200  shadow-xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 ">
              <span className="text-xs font-black text-[#1a1d20]  uppercase tracking-wider">
                Fotos e Identidad Visual
              </span>
              <span className="text-[10px] text-[#64748b] ">
                {logoFile && photosFile ? '2/2 archivos listos' : `${(logoFile ? 1 : 0) + (photosFile ? 1 : 0)}/2 cargados`}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* CARD 1: Logo del Negocio */}
              <div
                onClick={() => logoInputRef.current?.click()}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative group ${
                  logoFile
                    ? 'border-emerald-500/70 bg-emerald-500/10  text-emerald-800 '
                    : 'border-rose-500/60 bg-rose-500/5  text-rose-700 '
                }`}
              >
                {/* State Tag: VERDE cuando cargado, ROJO cuando pendiente */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 ${
                      logoFile
                        ? 'bg-emerald-500/20 text-emerald-700  border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-700  border border-rose-500/40'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{logoFile ? 'Cargado' : 'Pendiente'}</span>
                  </span>
                </div>

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 transition-colors mt-2 ${
                    logoFile
                      ? 'bg-emerald-500/20 text-emerald-600 '
                      : 'bg-rose-500/15 text-rose-600 '
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {logoFile ? 'check_circle' : 'add_photo_alternate'}
                  </span>
                </div>

                <span className="text-xs font-bold block truncate max-w-full text-[#1a1d20] ">
                  Logo del Negocio
                </span>

                <span
                  className={`text-[10px] mt-1 font-semibold truncate max-w-full block ${
                    logoFile ? 'text-emerald-700 ' : 'text-rose-600 '
                  }`}
                >
                  {logoFile ? logoFile : 'No cargado • Toca para subir'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSimulateUpload('logo');
                  }}
                  className="mt-2 text-[10px] text-[#6C5CE7]  hover:underline font-bold"
                >
                  {logoFile ? 'Cambiar archivo' : 'Simular subida rápida'}
                </button>
              </div>

              {/* CARD 2: Foto de Fachada */}
              <div
                onClick={() => photosInputRef.current?.click()}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative group ${
                  photosFile
                    ? 'border-emerald-500/70 bg-emerald-500/10  text-emerald-800 '
                    : 'border-rose-500/60 bg-rose-500/5  text-rose-700 '
                }`}
              >
                {/* State Tag: VERDE cuando cargado, ROJO cuando pendiente */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 ${
                      photosFile
                        ? 'bg-emerald-500/20 text-emerald-700  border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-700  border border-rose-500/40'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{photosFile ? 'Cargado' : 'Pendiente'}</span>
                  </span>
                </div>

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 transition-colors mt-2 ${
                    photosFile
                      ? 'bg-emerald-500/20 text-emerald-600 '
                      : 'bg-rose-500/15 text-rose-600 '
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {photosFile ? 'check_circle' : 'storefront'}
                  </span>
                </div>

                <span className="text-xs font-bold block truncate max-w-full text-[#1a1d20] ">
                  Foto de Fachada
                </span>

                <span
                  className={`text-[10px] mt-1 font-semibold truncate max-w-full block ${
                    photosFile ? 'text-emerald-700 ' : 'text-rose-600 '
                  }`}
                >
                  {photosFile ? photosFile : 'No cargado • Toca para subir'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSimulateUpload('photos');
                  }}
                  className="mt-2 text-[10px] text-[#6C5CE7]  hover:underline font-bold"
                >
                  {photosFile ? 'Cambiar archivo' : 'Simular subida rápida'}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModule('ubicacion')}
              className="w-full h-11 rounded-xl bg-slate-100  hover:bg-slate-200  text-[#1a1d20]  text-xs font-bold cursor-pointer mt-1"
            >
              Volver a Horario
            </button>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
            <span className="material-symbols-outlined text-base text-emerald-600 shrink-0">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Botón de Acción Principal Destacado */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || Boolean(successMessage)}
            className="w-full h-12 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A00]/30 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                <span>Enviando registro...</span>
              </>
            ) : successMessage ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>¡Registro confirmado!</span>
              </>
            ) : (
              <>
                <span>Guardar y enviar</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
