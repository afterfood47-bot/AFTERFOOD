import React, { useState } from 'react';
import { APP_LOGO } from '../../data/mockData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow?: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onAllow,
}) => {
  const [status, setStatus] = useState<'idle' | 'enabling' | 'enabled'>('idle');

  if (!isOpen) return null;

  const handleAllow = () => {
    setStatus('enabling');
    setTimeout(() => {
      setStatus('enabled');
      if (onAllow) onAllow();
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center shadow-2xl overflow-hidden my-auto">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-14 -left-14 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-3 z-10">
          <div className="flex items-center gap-2 cursor-default select-none pointer-events-none">
            <img src={APP_LOGO} alt="AfterFood" className="w-7 h-7 rounded-lg object-contain cursor-default select-none pointer-events-none" />
            <span className="font-headline-sm text-gray-900 tracking-tight font-bold">
              After<span className="text-orange-500">Food</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Bell Graphic */}
        <div className="relative w-full flex items-center justify-center my-2 z-10">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-purple-500/15 blur-lg" />
            <svg
              className="w-full h-full relative z-10"
              fill="none"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bellGrad" x1="45" x2="115" y1="35" y2="125" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="60%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="glowOrange" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFA14A" />
                  <stop offset="100%" stopColor="#FF7A00" />
                </linearGradient>
              </defs>
              <path d="M26 65C23 74 23 86 26 95" opacity="0.4" stroke="#7C3AED" strokeLinecap="round" strokeWidth="3" />
              <path d="M134 65C137 74 137 86 134 95" opacity="0.75" stroke="#FF7A00" strokeLinecap="round" strokeWidth="3" />
              <circle cx="80" cy="30" fill="none" opacity="0.9" r="7" stroke="url(#glowOrange)" strokeWidth="3" />
              <path
                d="M80 34C60 34 52 50 50 74C48 94 40 101 37 104C36 105 37 107 39 107H121C123 107 124 105 123 104C120 101 112 94 110 74C108 50 100 34 80 34Z"
                fill="url(#bellGrad)"
              />
              <ellipse cx="80" cy="107" fill="#6D28D9" rx="42" ry="5" />
              <ellipse cx="80" cy="113" fill="url(#glowOrange)" rx="14" ry="11" />
              <circle cx="76" cy="110" fill="#FFE2C9" opacity="0.8" r="3" />
              <circle cx="112" cy="46" fill="url(#glowOrange)" r="13" />
              <path d="M112 39V47M112 51V53" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.2" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="text-center z-10 mt-1 mb-3">
          <h1 className="font-headline-md text-base sm:text-lg text-gray-900 tracking-tight font-bold">
            Notificaciones en tiempo real
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Mantente al tanto del estado de tus pedidos y promociones exclusivas.
          </p>
        </div>

        {/* Bullet points */}
        <div className="w-full bg-gray-50 rounded-xl p-3 flex flex-col gap-2.5 mb-5 z-10 border border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
              <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
            </div>
            <p className="text-xs text-gray-800 font-semibold">Rastreo de tu pedido en vivo</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-700">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <p className="text-xs text-gray-800 font-semibold">Ofertas y descuentos flash</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
              <span className="material-symbols-outlined text-[18px]">pin</span>
            </div>
            <p className="text-xs text-gray-800 font-semibold">Código PIN de entrega seguro</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2 z-10">
          <button
            onClick={handleAllow}
            disabled={status !== 'idle'}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:opacity-95"
          >
            {status === 'enabling' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                <span>Activando...</span>
              </>
            ) : status === 'enabled' ? (
              <>
                <span className="material-symbols-outlined text-xl">check_circle</span>
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">notifications_active</span>
                <span>Permitir notificaciones</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full h-9 rounded-xl text-gray-500 hover:text-gray-800 text-xs transition-colors flex items-center justify-center font-medium"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};
