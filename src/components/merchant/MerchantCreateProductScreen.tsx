import React, { useState } from 'react';
import { AppScreen } from '../../types';

export interface MerchantProductItem {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  quantity: number;
  pickupTime: string;
  isActive: boolean;
}

interface MerchantCreateProductScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onOrderSimulated?: (order: any) => void;
  onProductCreated?: (product: MerchantProductItem) => void;
}

export const MerchantCreateProductScreen: React.FC<MerchantCreateProductScreenProps> = ({
  onNavigate,
  onOrderSimulated,
  onProductCreated,
}) => {
  const [clientName, setClientName] = useState('Carlos Mendoza');
  const [productName, setProductName] = useState('Combo Sánguche de Chicharrón');
  const [amount, setAmount] = useState('32.00');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newSimulatedOrder = {
      id: `#AF-${Math.floor(10000 + Math.random() * 90000)}`,
      clientName: clientName.trim() || 'Cliente de Prueba',
      items: [
        {
          name: productName.trim() || 'Producto Simulado',
          quantity: 1,
          price: parseFloat(amount) || 25.0,
        },
      ],
      total: parseFloat(amount) || 25.0,
      status: 'PENDIENTE',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
    };

    if (onOrderSimulated) {
      onOrderSimulated(newSimulatedOrder);
    }

    setIsSuccess(true);
    setTimeout(() => {
      onNavigate('merchant_incoming_orders');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-24 pt-3 bg-slate-50 text-slate-900 transition-colors duration-200 animate-in fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('merchant_catalog')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
          title="Volver"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
          <span className="text-[11px] font-bold text-[#FF7A00] uppercase tracking-wider">
            Simulador de Pedidos
          </span>
        </div>
        <button
          onClick={() => onNavigate('merchant_catalog')}
          className="text-xs text-slate-500 font-bold hover:underline"
        >
          Cancelar
        </button>
      </div>

      {/* Titulo */}
      <div className="mb-4">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Simular Pedido Entrante ⚡
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Genera un pedido de prueba en tiempo real para visualizarlo inmediatamente en la pantalla En Vivo.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-600 text-xs font-bold animate-in fade-in">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>¡Pedido simulado creado con éxito! Redirigiendo a En Vivo...</span>
        </div>
      )}

      {/* Formulario de Simulación */}
      <form onSubmit={handleSimulateOrder} className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-700">Nombre del Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ej. Juan Pérez"
            className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#FF7A00] outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-700">Producto / Combo Solicitado</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Ej. Sánguche + Bebida"
            className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#FF7A00] outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-700">Monto Total (S/)</label>
          <input
            type="number"
            step="0.50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="00.00"
            className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:border-[#FF7A00] outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 mt-2 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">bolt</span>
          <span>Enviar Pedido de Prueba a En Vivo</span>
        </button>
      </form>
    </div>
  );
};