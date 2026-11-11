import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { serializeFileField } from '../../services/makeWebhooks';

interface CourierRegisterDataScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSaveData?: (data: any) => void;
  isGoogleAuth?: boolean;
}

export type CourierDocumentType = 'DNI' | 'CE' | 'Pasaporte';

export const CourierRegisterDataScreen: React.FC<CourierRegisterDataScreenProps> = ({
  onNavigate,
  onSaveData,
  isGoogleAuth = true,
}) => {
  // Form States (start empty, no filler example texts)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  // Manual auth credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [docType, setDocType] = useState<CourierDocumentType>('DNI');
  const [docNumber, setDocNumber] = useState('');

  // Dynamic File Uploads
  const [docFront, setDocFront] = useState<File | null>(null);
  const [docBack, setDocBack] = useState<File | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calculate maximum allowed date for 18+ years old
  const getMaxBirthDate = () => {
    const today = new Date();
    const maxYear = today.getFullYear() - 18;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${maxYear}-${month}-${day}`;
  };

  const isAtLeast18 = (dateString: string): boolean => {
    if (!dateString) return false;
    const birth = new Date(dateString);
    if (isNaN(birth.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!names.trim() || !surnames.trim() || !phone.trim() || !docNumber.trim()) {
      setErrorMsg('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    if (!isGoogleAuth) {
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Por favor ingresa un Correo Electrónico válido (*).');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg('La contraseña debe tener al menos 6 caracteres (*).');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Las contraseñas no coinciden. Por favor verifícalas.');
        return;
      }
    }

    if (!birthDate) {
      setErrorMsg('Por favor ingresa tu Fecha de Nacimiento (*).');
      return;
    }

    if (!isAtLeast18(birthDate)) {
      setErrorMsg('Debes ser mayor de 18 años para registrarte como repartidor.');
      return;
    }

    if (!bankAccount.trim()) {
      setErrorMsg('El campo "Cuenta Bancaria / CCI (Para Depósitos Diarios)" es obligatorio (*).');
      return;
    }

    if (!docFront) {
      setErrorMsg(
        docType === 'Pasaporte'
          ? 'Debes subir la foto de tu pasaporte.'
          : 'Debes subir la foto del frente de tu documento.'
      );
      return;
    }

    if (docType !== 'Pasaporte' && !docBack) {
      setErrorMsg('Debes subir la foto del reverso de tu documento.');
      return;
    }

    if (onSaveData) {
      onSaveData({
        names: names.trim(),
        surnames: surnames.trim(),
        isGoogleAuth,
        email: !isGoogleAuth ? email.trim() : undefined,
        password: !isGoogleAuth ? password : undefined,
        birthDate,
        phone: phone.trim(),
        bankAccount: bankAccount.trim(),
        docType,
        docNumber: docNumber.trim(),
        profilePhoto: serializeFileField(profilePhoto),
        docFront: serializeFileField(docFront),
        docBack: docType !== 'Pasaporte' ? serializeFileField(docBack) : null,
      });
    }

    onNavigate('courier_vehicle');
  };

  // Dynamic Document Labels
  const getFrontLabel = () => {
    switch (docType) {
      case 'DNI':
        return 'DNI (Frente / Principal) *';
      case 'CE':
        return 'Carnet de Extranjería (Frente / Principal) *';
      case 'Pasaporte':
        return 'Pasaporte (Página Principal con Foto) *';
      default:
        return 'Documento (Frente / Principal) *';
    }
  };

  const getBackLabel = () => {
    switch (docType) {
      case 'DNI':
        return 'DNI (Reverso / Códigos) *';
      case 'CE':
        return 'Carnet de Extranjería (Reverso / Códigos) *';
      default:
        return 'Documento (Reverso / Códigos) *';
    }
  };

  return (
    <div className="light flex flex-col w-full min-h-screen px-4 py-4 bg-[#f4f6fb] text-[#1a1d20]">
      <div className="flex flex-col w-full max-w-md mx-auto gap-4 pb-12">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between py-1">
          <button
            type="button"
            onClick={() => onNavigate('courier_login')}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#64748b] shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            <span className="text-[11px] font-bold text-[#6C5CE7]">
              Paso 1 de 2: Datos y Documentación
            </span>
          </div>

          <div className="w-9" />
        </div>

        <h1 className="text-xl font-extrabold text-[#1a1d20]">
          Registro del Repartidor
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* CARD 1: FOTO DE PERFIL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6C5CE7] font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                <span>FOTO DE PERFIL DEL REPARTIDOR</span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-[#6C5CE7]">
                Obligatorio
              </span>
            </div>

            <div className="border border-slate-100 rounded-xl p-3 flex items-center gap-3 bg-slate-50/70">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 shrink-0 bg-white">
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                <span className="text-[9px]">Sin foto</span>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <span className="text-xs font-bold text-[#1a1d20] leading-snug">
                  Foto de rostro de frente. Buena iluminación, sin gorra ni lentes oscuros.
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <label className="px-3 py-1.5 rounded-xl bg-[#6C5CE7] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#5b4cdb] active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-[14px]">upload</span>
                    <span>{profilePhoto ? 'Cambiar foto' : 'Subir foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setProfilePhoto)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: INFORMACIÓN DEL CONDUCTOR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#6C5CE7] font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>INFORMACIÓN DEL CONDUCTOR</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Nombres *
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tus nombres"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Apellidos *
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tus apellidos"
                  value={surnames}
                  onChange={(e) => setSurnames(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                />
              </div>
            </div>

            {/* Badge de Google Account si aplica */}
            {isGoogleAuth && (
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Cuenta vinculada con Google
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Correo y credenciales verificados automáticamente.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Verificado
                </span>
              </div>
            )}

            {/* Registro Manual: Correo Electrónico y Contraseñas */}
            {!isGoogleAuth && (
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#6C5CE7]">
                  <span className="material-symbols-outlined text-[17px]">lock_person</span>
                  <span>Credenciales de Acceso (Registro Manual)</span>
                </div>

                {/* Correo Electrónico */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700">
                    Correo Electrónico *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[17px] text-slate-400 pointer-events-none">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                    />
                  </div>
                </div>

                {/* Crear Contraseña y Confirmar Contraseña */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-700">
                      Crear Contraseña *
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="Mín. 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Mostrar u ocultar contraseña"
                        className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-700">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="Repite la contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Mostrar u ocultar confirmación de contraseña"
                        className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              {/* Fecha de Nacimiento con bloqueo a menores de 18 */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Fecha de Nacimiento * <span className="text-[10px] font-normal text-slate-400">+18 años</span>
                </label>
                <input
                  type="date"
                  max={getMaxBirthDate()}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="Número de celular"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                />
              </div>
            </div>

            {/* Cuenta Bancaria / CCI (Obligatorio) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700">
                Cuenta Bancaria / CCI (Para Depósitos Diarios) *
              </label>
              <input
                type="text"
                placeholder="Ingresa tu cuenta bancaria o código CCI"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
              />
              <span className="text-[10px] text-slate-400 leading-tight">
                Transferencias directas de tus ganancias cada turno en Trujillo.
              </span>
            </div>
          </div>

          {/* CARD 3: DOCUMENTO DE IDENTIDAD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6C5CE7] font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                <span>DOCUMENTO DE IDENTIDAD</span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                Nacionales y Extranjeros
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Tipo de Documento *
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as CourierDocumentType)}
                  className="w-full h-10 px-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                >
                  <option value="DNI">DNI (Documento Nacional)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  Número de Documento *
                </label>
                <input
                  type="text"
                  placeholder="Número de documento"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value.slice(0, 15))}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#6C5CE7] text-slate-800"
                />
              </div>
            </div>

            {/* Documento Frente (Siempre presente) */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {getFrontLabel()}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    docFront
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-amber-600 bg-amber-50'
                  }`}
                >
                  {docFront ? 'Cargado' : 'Pendiente'}
                </span>
              </div>
              <div className="border border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">
                    {docType === 'Pasaporte' ? 'menu_book' : 'badge'}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">
                      {docType === 'Pasaporte'
                        ? 'Subir foto de la página del pasaporte'
                        : 'Subir foto del frente de tu documento'}
                    </span>
                    <span className="text-[10px] text-slate-400">Foto nítida, sin reflejos ni cortes</span>
                  </div>
                </div>
                <label className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-300 transition-all">
                  <span>Subir archivo</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setDocFront)}
                  />
                </label>
              </div>
            </div>

            {/* Documento Reverso (Se oculta si es Pasaporte) */}
            {docType !== 'Pasaporte' && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {getBackLabel()}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      docBack
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-amber-600 bg-amber-50'
                    }`}
                  >
                    {docBack ? 'Cargado' : 'Pendiente'}
                  </span>
                </div>
                <div className="border border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-between bg-slate-50/70">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">
                      crop_free
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">
                        Subir foto del dorso de tu documento
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Código de barras o datos complementarios
                      </span>
                    </div>
                  </div>
                  <label className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-300 transition-all">
                    <span>Subir archivo</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setDocBack)}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Botón de Avanzar */}
          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-[0.99] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Continuar a Selección de Vehículo</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
};