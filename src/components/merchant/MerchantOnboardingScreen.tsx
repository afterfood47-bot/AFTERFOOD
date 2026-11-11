import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface MerchantOnboardingScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onGoogleLogin: () => void;
  onManualRegister?: (data: { email: string; pass: string }) => void;
}

type AuthMode = 'options' | 'register' | 'login';

export const MerchantOnboardingScreen: React.FC<MerchantOnboardingScreenProps> = ({
  onNavigate,
  onGoogleLogin,
  onManualRegister,
}) => {
  const [mode, setMode] = useState<AuthMode>('options');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal de recuperación de contraseña (flujo idéntico al cliente)
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<'email' | 'pin' | 'new_password'>('email');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPasswordState, setConfirmPasswordState] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [isSavingNewPassword, setIsSavingNewPassword] = useState(false);

  // Apertura del modal de recuperación
  const handleOpenForgotModal = () => {
    setRecoveryEmail(email || '');
    setRecoveryStep('email');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPasswordState('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setRecoveryError(null);
    setShowForgotModal(true);
  };

  // Paso 1: Enviar código
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    if (!recoveryEmail || !recoveryEmail.includes('@')) {
      setRecoveryError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setIsSendingCode(true);
    setTimeout(() => {
      setIsSendingCode(false);
      setRecoveryStep('pin');
    }, 600);
  };

  // Paso 2: Verificar código
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    if (!verificationCode || verificationCode.trim().length < 4) {
      setRecoveryError('Ingresa el código de verificación recibido.');
      return;
    }

    setRecoveryStep('new_password');
  };

  // Paso 3: Guardar nueva contraseña y entrar al dashboard del comercio
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    if (!newPassword || newPassword.length < 6) {
      setRecoveryError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPasswordState) {
      setRecoveryError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    setIsSavingNewPassword(true);
    setTimeout(() => {
      setIsSavingNewPassword(false);
      setShowForgotModal(false);
      try {
        localStorage.setItem('afterfood_merchant_email', recoveryEmail);
      } catch {}
      onNavigate('merchant_dashboard');
    }, 600);
  };

  // Handle Google Login Flow: Redirects directly to "Configuración del Comercio"
  const handleGoogleClick = () => {
    onGoogleLogin();
  };

  // Handle Manual Registration Flow: Requires Email & Password, then navigates to "Configuración del Comercio"
  const handleManualRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico comercial válido.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem('afterfood_merchant_email', email);
      } catch {}
      if (onManualRegister) {
        onManualRegister({ email, pass: password });
      }
      // Avanza a la pantalla de "Configuración del Comercio"
      onNavigate('merchant_register');
    }, 500);
  };

  // Handle Login Flow: Requires Email & Password, then signs in to Dashboard
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa tu correo electrónico registrado.');
      return;
    }

    if (!password) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem('afterfood_merchant_email', email);
      } catch {}
      onNavigate('merchant_dashboard');
    }, 500);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-20 pt-2 bg-[#f8f9fa] text-[#1a1d20] transition-colors duration-200 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-black text-[#1a1d20] tracking-tight">
          Iniciar sesión
        </h1>
        <span className="px-2.5 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] text-[10px] font-bold uppercase tracking-wider">
          Portal Comercios
        </span>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xl transition-colors">
        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-600 text-xs">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* =========================================================================
            VISTA 1: OPCIONES DE ACCESO PRINCIPAL (GOOGLE, REGISTRAR, INICIAR SESIÓN)
           ========================================================================= */}
        {mode === 'options' && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-150">
            {/* BOTÓN 1: Continuar con Google */}
            <button
              type="button"
              onClick={handleGoogleClick}
              className="w-full h-12 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all rounded-full flex items-center justify-center gap-2.5 group shadow-xs active:scale-[0.99] cursor-pointer text-xs font-bold text-[#1a1d20]"
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
              <span>Continuar con Google</span>
            </button>

            {/* BOTÓN 2: Registrar tu cuenta (Registro manual) */}
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className="w-full h-12 rounded-full bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-[#FF7A00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>Registrar tu cuenta</span>
            </button>

            {/* Divider */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200" />
              <span className="absolute bg-white px-2.5 text-[10px] text-[#64748b] font-semibold">
                o accede si ya tienes cuenta
              </span>
            </div>

            {/* BOTÓN 3: Iniciar sesión */}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className="w-full h-11 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1a1d20] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FF7A00]">
                login
              </span>
              <span>Iniciar sesión</span>
            </button>
          </div>
        )}

        {/* =========================================================================
            VISTA 2: REGISTRO MANUAL ("Registrar tu cuenta") -> Correo y Contraseña
           ========================================================================= */}
        {mode === 'register' && (
          <form onSubmit={handleManualRegisterSubmit} className="flex flex-col gap-3 animate-in fade-in duration-150">
            <div className="pb-1 border-b border-slate-100">
              <span className="text-xs font-black text-[#1a1d20] uppercase tracking-wider">
                Crea tus credenciales de acceso
              </span>
            </div>

            {/* Correo Electrónico Comercial */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-merchant-email" className="text-xs font-bold text-[#1a1d20]">
                Correo electrónico comercial
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b] text-[18px] pointer-events-none">
                  mail
                </span>
                <input
                  id="reg-merchant-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="ejemplo@negocio.com"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-[#64748b] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Creación de Contraseña */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-merchant-pass" className="text-xs font-bold text-[#1a1d20]">
                Crear contraseña
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b] text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  id="reg-merchant-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full h-11 pl-9 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-[#64748b] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#64748b] hover:text-[#1a1d20]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-merchant-pass-confirm" className="text-xs font-bold text-[#1a1d20]">
                Confirmar contraseña
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b] text-[18px] pointer-events-none">
                  lock_reset
                </span>
                <input
                  id="reg-merchant-pass-confirm"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Repite tu contraseña"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-[#64748b] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Botón para avanzar a la pantalla de Configuración del Comercio */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-1 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Continuar a Configuración del Comercio</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-xs text-[#64748b] hover:text-[#FF7A00] transition-colors mt-1 cursor-pointer"
            >
              ¿Ya tienes cuenta? <span className="font-bold underline text-[#FF7A00]">Iniciar sesión</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            VISTA 3: INICIAR SESIÓN CON CREDENCIALES EXISTENTES ("Iniciar sesión")
           ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-xs font-black text-[#1a1d20] uppercase tracking-wider">
                Ingresa con tu correo y contraseña
              </span>
              <button
                type="button"
                onClick={() => setMode('options')}
                className="text-[11px] text-[#FF7A00] hover:underline font-bold cursor-pointer"
              >
                Volver
              </button>
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col gap-1">
              <label htmlFor="login-merchant-email" className="text-xs font-bold text-[#1a1d20]">
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b] text-[18px] pointer-events-none">
                  mail
                </span>
                <input
                  id="login-merchant-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="ejemplo@negocio.com"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-[#64748b] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="login-merchant-pass" className="text-xs font-bold text-[#1a1d20]">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={handleOpenForgotModal}
                  className="text-[11px] text-[#FF7A00] hover:underline font-semibold cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b] text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  id="login-merchant-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-9 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-[#64748b] outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#64748b] hover:text-[#1a1d20]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-1 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Ingresar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode('register')}
              className="w-full text-center text-xs text-[#64748b] hover:text-[#FF7A00] transition-colors mt-1 cursor-pointer"
            >
              ¿No tienes cuenta? <span className="font-bold underline text-[#FF7A00]">Regístrate aquí</span>
            </button>
          </form>
        )}
      </div>

      {/* Modal / Pop-up de Recuperación de Contraseña (Flujo idéntico al Cliente) */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 shadow-2xl flex flex-col gap-3.5 relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Ambient subtle glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF7A00] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {recoveryStep === 'new_password'
                      ? 'lock_reset'
                      : recoveryStep === 'pin'
                      ? 'pin'
                      : 'lock_reset'}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-tight">
                    {recoveryStep === 'new_password'
                      ? 'Registrar nueva contraseña'
                      : recoveryStep === 'pin'
                      ? 'Código de verificación'
                      : 'Recuperar Contraseña'}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {recoveryStep === 'new_password'
                      ? 'Establece tu nueva clave de acceso'
                      : recoveryStep === 'pin'
                      ? `Enviado a ${recoveryEmail}`
                      : 'Restablece el acceso a tu cuenta'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                aria-label="Cerrar modal"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Error Message */}
            {recoveryError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0">warning</span>
                <span>{recoveryError}</span>
              </div>
            )}

            {/* STEP 1: Solicitar correo y enviar código */}
            {recoveryStep === 'email' && (
              <form onSubmit={handleSendCode} className="flex flex-col gap-3">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ingresa el correo electrónico comercial asociado a tu cuenta de AfterFood para enviarte un código de verificación.
                </p>

                <div className="flex flex-col gap-1">
                  <label htmlFor="recovery-merchant-email-input" className="text-xs text-gray-800 font-bold">
                    Correo electrónico
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      mail
                    </span>
                    <input
                      id="recovery-merchant-email-input"
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(e) => {
                        setRecoveryEmail(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="ejemplo@negocio.com"
                      className="w-full h-11 pl-10 pr-3 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#FF7A00] border border-gray-300 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Regresar
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingCode}
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#e06c00] hover:from-[#e06c00] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSendingCode ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar código</span>
                        <span className="material-symbols-outlined text-[16px]">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Ingresar código de verificación (PIN) */}
            {recoveryStep === 'pin' && (
              <form onSubmit={handleVerifyCode} className="flex flex-col gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                    mark_email_read
                  </span>
                  <div className="text-[11px] text-emerald-800 leading-snug">
                    Código enviado a <strong>{recoveryEmail}</strong>. Revisa tu bandeja de entrada o spam.
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="recovery-merchant-verification-code-input" className="text-xs text-gray-800 font-bold">
                    Código de verificación
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      pin
                    </span>
                    <input
                      id="recovery-merchant-verification-code-input"
                      type="text"
                      maxLength={6}
                      required
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="123456"
                      className="w-full h-11 pl-10 pr-3 bg-white text-gray-900 placeholder:text-gray-400 text-sm tracking-widest font-mono rounded-xl outline-none focus:ring-2 focus:ring-[#FF7A00] border border-gray-300 font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">¿No recibiste el código?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSendingCode(true);
                      setTimeout(() => setIsSendingCode(false), 500);
                    }}
                    className="text-[#FF7A00] hover:underline font-bold cursor-pointer"
                  >
                    Reenviar código
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setRecoveryStep('email')}
                    className="flex-1 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Cambiar correo
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Continuar</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Registrar nueva contraseña */}
            {recoveryStep === 'new_password' && (
              <form onSubmit={handleSaveNewPassword} className="flex flex-col gap-3">
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-[11px] leading-relaxed">
                  Ingresa tu nueva clave de acceso para actualizar tu cuenta de comercio e ingresar directamente.
                </div>

                {/* Campo 1: Email Bloqueado / Prefill */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-700 font-bold flex items-center justify-between">
                    <span>Correo electrónico</span>
                    <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px] text-gray-500">lock</span>
                      Confirmado
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      mail
                    </span>
                    <input
                      type="email"
                      value={recoveryEmail}
                      readOnly
                      disabled
                      className="w-full h-11 pl-10 pr-3 bg-gray-100 text-gray-600 font-bold text-xs rounded-xl border border-gray-200 cursor-not-allowed select-none outline-none"
                    />
                  </div>
                </div>

                {/* Campo 2: Nueva Contraseña */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="recovery-merchant-new-password" className="text-xs text-gray-800 font-bold">
                    Nueva contraseña
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      lock
                    </span>
                    <input
                      id="recovery-merchant-new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#FF7A00] border border-gray-300 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label="Mostrar u ocultar contraseña"
                      className="absolute right-2.5 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showNewPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Campo 3: Confirmar Contraseña */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="recovery-merchant-confirm-password" className="text-xs text-gray-800 font-bold">
                    Confirmar contraseña
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      lock_clock
                    </span>
                    <input
                      id="recovery-merchant-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={confirmPasswordState}
                      onChange={(e) => {
                        setConfirmPasswordState(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="Repite tu nueva contraseña"
                      className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-[#FF7A00] border border-gray-300 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label="Mostrar u ocultar confirmación de contraseña"
                      className="absolute right-2.5 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setRecoveryStep('pin')}
                    className="flex-1 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingNewPassword}
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#e06c00] hover:from-[#e06c00] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSavingNewPassword ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmar y Entrar</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
