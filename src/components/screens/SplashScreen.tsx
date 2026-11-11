import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onEnterApp: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnterApp }) => {
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    { pct: 28, text: 'Verificando restaurantes abiertos...' },
    { pct: 64, text: 'Encendiendo motores de reparto...' },
    { pct: 92, text: 'Sincronizando menú nocturno...' },
    { pct: 100, text: '¡Todo listo para pedir!' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 650);

    return () => clearInterval(timer);
  }, [stages.length]);

  const currentStage = stages[stageIndex];

  return (
    <div className="relative w-full min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-between items-center text-center p-6 overflow-hidden select-none">
      {/* Dynamic Ambient Glow Gradients for Light Theme */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-orange-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />

      {/* Top micro pill */}
      <div className="z-10 pt-4 cursor-default select-none pointer-events-none">
        <span className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-purple-700 font-label-sm text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm cursor-default select-none pointer-events-none">
          <img src="/logo-simbolo.png" alt="AfterFood Logo" className="w-4 h-4 object-contain cursor-default select-none pointer-events-none" />
          <span>Trujillo • Delivery 24/7</span>
        </span>
      </div>

      {/* Centerpiece: Logo Completo / Principal (Isologotipo) */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-xs z-10 animate-in zoom-in-95 duration-500 cursor-default select-none pointer-events-none">
        <img
          src="/logo-completo.png"
          alt="AfterFood Logo"
          className="w-56 sm:w-64 h-auto object-contain cursor-default select-none pointer-events-none"
          onError={(e) => {
            if (!e.currentTarget.src.includes('/assets/')) {
              e.currentTarget.src = '/assets/logo-completo.png';
            }
          }}
        />

        {/* Slogan */}
        <p className="text-xs sm:text-sm text-gray-600 mt-3 px-2 max-w-xs leading-relaxed">
          Tu solución completa 24/7, <br />
          <span className="text-gray-900 font-bold">de día y de noche.</span>
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-5">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-xs">
            <span
              className="material-symbols-outlined text-orange-600 text-[18px] fill-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span>Rapidez Total</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-xs">
            <span
              className="material-symbols-outlined text-purple-700 text-[18px] fill-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bedtime
            </span>
            <span>Servicio 24/7</span>
          </div>
        </div>

        {/* Loading status indicator */}
        <div className="mt-6 flex flex-col items-center gap-1.5 w-full px-4">
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${currentStage.pct}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            {currentStage.text}
          </span>
        </div>
      </div>

      {/* Entry Button: High contrast, accessible orange gradient with crisp white text */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 pb-8 z-10">
        <button
          onClick={onEnterApp}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-700/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Ingresar a la aplicación</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
