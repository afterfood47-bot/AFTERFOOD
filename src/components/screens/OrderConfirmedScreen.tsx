import React, { useEffect, useState } from 'react';
import { AppScreen, Order } from '../../types';

interface OrderConfirmedScreenProps {
  order: Order;
  onNavigate: (screen: AppScreen) => void;
}

export const OrderConfirmedScreen: React.FC<OrderConfirmedScreenProps> = ({
  onNavigate,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animação fluida da barra de progresso durante 1 segundo
    const startTime = Date.now();
    const duration = 1000; // 1 segundo exacto

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(calculatedProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        onNavigate('order_tracking');
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="light flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-full px-4 relative overflow-hidden bg-white text-slate-900">
      {/* Ambient Glow Minimalista */}
      <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Conteúdo Central: Ícone + Texto */}
      <div className="relative flex flex-col items-center justify-center z-10 gap-4">
        {/* Ícone de Confirmação Principal */}
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-emerald-400 via-teal-500 to-[#6C5CE7] shadow-xl flex items-center justify-center animate-in zoom-in-75 duration-300">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-inner">
              <span
                className="material-symbols-outlined text-[42px] text-white fill-1 animate-in zoom-in-50 duration-200"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
              >
                check
              </span>
            </div>
          </div>
        </div>

        {/* Texto "Pedido confirmado" */}
        <h1 className="text-lg sm:text-xl text-slate-900 font-black tracking-tight text-center animate-in fade-in duration-300">
          Pedido confirmado
        </h1>

        {/* Passador de tempo visual (Barra de carregamento temporário) */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#6C5CE7] rounded-full transition-all ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};