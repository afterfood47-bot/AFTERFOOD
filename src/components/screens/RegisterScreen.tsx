import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MAKE_WEBHOOKS, submitToMakeWebhook } from '../../services/makeWebhooks';

interface RegisterScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onRegisterSuccess: (user: { name: string; email: string }) => void;
  onOpenAddress?: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onRegisterSuccess,
  onOpenAddress,
}) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const calculateAge = (dob: string): number => {
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return 0;
    const today = new Date();
    let calculated = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      calculated--;
    }
    return calculated;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!birthDate) {
      setErrorMessage('Por favor ingresa tu fecha de nacimiento.');
      return;
    }

    const calculatedAge = calculateAge(birthDate);
    if (calculatedAge < 18) {
      setErrorMessage('Debes tener al menos 18 años para registrarte en AfterFood.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitToMakeWebhook(MAKE_WEBHOOKS.CLIENT_REGISTER, {
        role: 'cliente',
        fullName: fullName.trim(),
        birthDate,
        age: calculatedAge,
        email: email.trim(),
        password,
        registrationType: 'manual',
        submittedAt: new Date().toISOString(),
      });

      setIsSubmitting(false);
      setSuccessMessage('¡Registro completado! Tus datos se enviaron con éxito.');

      setTimeout(() => {
        onRegisterSuccess({
          name: fullName.trim() || 'Usuario',
          email: email.trim() || 'usuario@email.com',
        });
        if (onOpenAddress) {
          onOpenAddress();
        } else {
          onNavigate('address_selector');
        }
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(
        err instanceof Error && err.message
          ? `Error al enviar el registro: ${err.message}`
          : 'No se pudo completar el registro. Inténtalo de nuevo.'
      );
    }
  };

  const handleGoogleSignup = () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess({ name: 'Usuario Google', email: 'usuario.google@gmail.com' });
      if (onOpenAddress) {
        onOpenAddress();
      } else {
        onNavigate('address_selector');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 pt-2 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md mx-auto">
        {/* Soft Ambient Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-36 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col gap-0.5 mb-3 pt-1">
          <img
            src="/logo-horizontal.png"
            alt="AfterFood Logo"
            className="h-7 w-auto object-contain mb-1 cursor-default select-none pointer-events-none"
            onError={(e) => {
              if (!e.currentTarget.src.includes('/assets/')) {
                e.currentTarget.src = '/assets/logo-horizontal.png';
              }
            }}
          />
          <h1 className="text-xl text-gray-900 tracking-tight font-extrabold leading-tight">
            Crear cuenta en AfterFood
          </h1>
          <p className="text-xs text-gray-500">
            Regístrate para recibir comida y bebidas 24/7 en Trujillo.
          </p>
        </div>

        {/* Quick Google Sign up Button with High Contrast */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full h-11 mb-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 transition-all rounded-full flex items-center justify-center gap-2.5 shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              fill="#4285F4"
            />
            <path
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              fill="#34A853"
            />
            <path
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.98 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-xs text-gray-800 font-bold">
            Registrarme con Google
          </span>
        </button>

        <div className="relative mb-3.5 flex items-center justify-center">
          <div className="w-full h-px bg-gray-200" />
          <span className="absolute bg-gray-50 px-3 text-[11px] text-gray-500 font-medium">
            o completa tus datos
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-lg"
        >
          {/* Nombre Completo */}
          <div className="flex flex-col gap-1">
            <label htmlFor="reg-full-name" className="text-xs text-gray-800 font-bold">
              Nombre completo
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[18px] pointer-events-none">
                person
              </span>
              <input
                id="reg-full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Ingresa tu nombre y apellido"
                className="w-full h-11 pl-10 pr-3 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="reg-birthdate" className="text-xs text-gray-800 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-orange-600">calendar_month</span>
                Fecha de nacimiento
              </label>
              <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Mínimo 18 años
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                id="reg-birthdate"
                type="date"
                required
                max={new Date().toISOString().split('T')[0]}
                value={birthDate}
                onChange={(e) => {
                  const val = e.target.value;
                  setBirthDate(val);
                  setErrorMessage(null);
                }}
                className="w-full h-11 px-3 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>
            {birthDate && (
              <p className="text-[11px] text-gray-600 mt-0.5">
                Edad calculada: <span className="font-bold text-gray-900">{calculateAge(birthDate)} años</span> {calculateAge(birthDate) >= 18 ? '✓ Mayor de edad' : '✗ Menor de 18 años'}
              </p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="flex flex-col gap-1">
            <label htmlFor="reg-email" className="text-xs text-gray-800 font-bold">
              Correo electrónico
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[18px] pointer-events-none">
                mail
              </span>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="ejemplo@email.com"
                className="w-full h-11 pl-10 pr-3 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div className="flex flex-col gap-1">
            <label htmlFor="reg-pass" className="text-xs text-gray-800 font-bold">
              Nueva contraseña
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[18px] pointer-events-none">
                lock
              </span>
              <input
                id="reg-pass"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
                className="absolute right-2.5 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Security Hint */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
            <span
              className="material-symbols-outlined text-[16px] text-orange-600 fill-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-[11px] font-medium">
              Usa al menos 8 caracteres combinando letras y números.
            </span>
          </div>

          {/* Mensaje de Error Claro */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-red-600">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mensaje de Confirmación de Éxito */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit CTA - High Contrast Deep Orange Button (#c2410c) with crisp white text */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || Boolean(successMessage)}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] disabled:opacity-70 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-orange-700/25 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Enviando registro...</span>
                </>
              ) : successMessage ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>¡Registro confirmado!</span>
                </>
              ) : (
                <>
                  <span>Crear cuenta y continuar</span>
                  <span className="material-symbols-outlined text-[18px] font-bold">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Login shortcut with High Contrast Orange Link */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-center">
          <span className="text-xs text-gray-600">
            ¿Ya tienes cuenta en AfterFood?
          </span>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-xs text-[#c2410c] hover:text-[#9a3412] font-bold hover:underline transition-all cursor-pointer"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
