import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onLoginSuccess: (email: string, isGoogleOrNew?: boolean) => void;
  onOpenAddress?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onLoginSuccess,
  onOpenAddress,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<'email' | 'pin' | 'new_password'>('email');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [isSavingNewPassword, setIsSavingNewPassword] = useState(false);

  const handleOpenForgotModal = () => {
    setRecoveryEmail(email || '');
    setRecoveryStep('email');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setRecoveryError(null);
    setShowForgotModal(true);
  };

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

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    if (!verificationCode || verificationCode.trim().length < 4) {
      setRecoveryError('Ingresa el código de verificación recibido.');
      return;
    }

    setRecoveryStep('new_password');
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    if (!newPassword || newPassword.length < 6) {
      setRecoveryError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setRecoveryError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    setIsSavingNewPassword(true);
    setTimeout(() => {
      setIsSavingNewPassword(false);
      setShowForgotModal(false);
      onLoginSuccess(recoveryEmail, false);
      onNavigate('home');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email || 'usuario@email.com', false);
      onNavigate('home');
    }, 700);
  };

  const handleGoogleAuth = () => {
    setErrorMessage(null);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('usuario.google@gmail.com', true);
      if (onOpenAddress) {
        onOpenAddress();
      } else {
        onNavigate('address_selector');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 pt-2 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md mx-auto pt-2">
        {/* Soft Ambient Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-36 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Main Card Container */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-lg overflow-hidden">
          {/* Logo & Screen Title Group */}
          <div className="flex flex-col items-start gap-1 mb-4">
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
            <h1 className="text-lg sm:text-xl text-gray-900 tracking-tight font-extrabold leading-tight">
              Inicia sesión en AfterFood
            </h1>
            <p className="text-xs text-gray-500">
              Accede a tus restaurantes favoritos de día y de noche.
            </p>
          </div>

          {/* Social Auth: Google Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full h-11 px-4 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 transition-all rounded-full flex items-center justify-center gap-2.5 group shadow-xs active:scale-[0.99] cursor-pointer"
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
            <span className="text-xs text-gray-800 font-bold group-hover:text-gray-900 transition-colors">
              Continuar con Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full h-px bg-gray-200" />
            <span className="absolute bg-white px-3 text-[11px] text-gray-500 font-medium">
              o continúa con tu correo
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email-input"
                className="text-xs text-gray-800 flex items-center gap-1 font-bold leading-tight"
              >
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                  mail
                </span>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="tu@correo.com"
                  className="w-full h-11 pl-10 pr-3 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password-input"
                  className="text-xs text-gray-800 font-bold leading-tight"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={handleOpenForgotModal}
                  className="text-[11px] text-purple-700 hover:text-purple-900 hover:underline transition-all font-bold cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                  lock
                </span>
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar u ocultar contraseña"
                  className="w-8 h-8 absolute right-1.5 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Mensaje de Error Claro */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* High Contrast Primary CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-1 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-orange-700/20 cursor-pointer"
            >
              <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con correo'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-xs text-[#c2410c] hover:text-[#9a3412] hover:underline font-bold ml-1 cursor-pointer"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modal / Pop-up de Recuperación de Contraseña */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 shadow-2xl flex flex-col gap-3.5 relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Ambient subtle glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
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
                  Ingresa el correo electrónico asociado a tu cuenta de AfterFood para enviarte un código de verificación.
                </p>

                <div className="flex flex-col gap-1">
                  <label htmlFor="recovery-email-input" className="text-xs text-gray-800 font-bold">
                    Correo electrónico
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      mail
                    </span>
                    <input
                      id="recovery-email-input"
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(e) => {
                        setRecoveryEmail(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="tu@correo.com"
                      className="w-full h-11 pl-10 pr-3 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 font-medium"
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
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
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
                  <label htmlFor="verification-code-input" className="text-xs text-gray-800 font-bold">
                    Código de verificación
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      pin
                    </span>
                    <input
                      id="verification-code-input"
                      type="text"
                      maxLength={6}
                      required
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="123456"
                      className="w-full h-11 pl-10 pr-3 bg-white text-gray-900 placeholder:text-gray-400 text-sm tracking-widest font-mono rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 font-bold"
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
                    className="text-[#c2410c] hover:underline font-bold cursor-pointer"
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
                  Ingresa tu nueva clave de acceso para actualizar tu cuenta e ingresar directamente.
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
                  <label htmlFor="recovery-new-password" className="text-xs text-gray-800 font-bold">
                    Nueva contraseña
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      lock
                    </span>
                    <input
                      id="recovery-new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 font-medium"
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
                  <label htmlFor="recovery-confirm-password" className="text-xs text-gray-800 font-bold">
                    Confirmar contraseña
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                      lock_clock
                    </span>
                    <input
                      id="recovery-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setRecoveryError(null);
                      }}
                      placeholder="Repite tu nueva contraseña"
                      className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 font-medium"
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
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
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
