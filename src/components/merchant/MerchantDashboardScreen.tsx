import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MerchantBottomNav } from './MerchantBottomNav';

interface MerchantDashboardScreenProps {
  onNavigate: (screen: AppScreen) => void;
  businessName?: string;
  businessLogo?: string;
  businessAddress?: string;
  businessRuc?: string;
  nightHours?: string;
  isOpen?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
  activeKitchenOrdersCount?: number;
  todaySalesAmount?: string;
  onSimulateOrder?: () => void;
}

export const MerchantDashboardScreen: React.FC<MerchantDashboardScreenProps> = ({
  onNavigate,
  businessName = 'Burger Night UPAO',
  businessLogo = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
  businessAddress = 'Av. América Sur 1234, Trujillo',
  nightHours = '20:00 - 04:00 (Turno Noturno)',
  isOpen: initialIsOpen = true,
  todaySalesAmount = 'S/ 385.50',
}) => {
  // Estado do pedido principal no caminho crítico
  // 'novo' -> 'preparando' -> 'despachado'
  const [orderStatus, setOrderStatus] = useState<'novo' | 'preparando' | 'despachado'>('novo');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'pedidos' | 'menu'>('pedidos');

  // Função padrão para botões secundários
  const handleSecondaryAction = () => {
    alert('Funcionalidade em desenvolvimento');
  };

  // 1. Botão Essencial: Visualizar Pedido
  const handleViewOrder = () => {
    setShowOrderModal(true);
  };

  // 2. Botão Essencial: Preparar
  const handlePrepareOrder = () => {
    setOrderStatus('preparando');
  };

  // 3. Botão Essencial: Despachar
  const handleDispatchOrder = () => {
    setOrderStatus('despachado');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 px-4 pt-3 pb-28 relative select-none animate-in fade-in duration-200">
      {/* Barra de Status e Cabeçalho do Comércio */}
      <div className="flex items-center justify-between mb-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2.5">
          <img
            src={businessLogo}
            alt={businessName}
            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-gray-900">{businessName}</h1>
              <span className="material-symbols-outlined text-orange-500 text-[15px]">verified</span>
            </div>
            <span className="text-[11px] text-gray-500">{businessAddress}</span>
          </div>
        </div>

        {/* Botão Secundário: Configurações da Loja */}
        <button
          type="button"
          onClick={handleSecondaryAction}
          title="Configurações da Loja"
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>

      {/* Resumo Rápido da Loja */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Status Loja</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Aberta (24h)
            </span>
          </div>
          <button
            type="button"
            onClick={handleSecondaryAction}
            className="text-[11px] text-gray-500 hover:text-gray-800 font-semibold"
          >
            Alterar
          </button>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Vendas Hoje</span>
            <span className="text-xs font-black text-purple-700 mt-0.5 block">{todaySalesAmount}</span>
          </div>
          <button
            type="button"
            onClick={handleSecondaryAction}
            className="text-[11px] text-purple-600 hover:text-purple-700 font-semibold"
          >
            Ver
          </button>
        </div>
      </div>

      {/* Seção Principal: Pedidos em Tempo Real (Caminho Crítico da Cozinha) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-orange-500 text-[18px]">skillet</span>
            <span>Gestão de Pedidos da Cozinha</span>
          </h2>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
            {orderStatus === 'despachado' ? '0 pendentes' : '1 em andamento'}
          </span>
        </div>

        {/* Card do Pedido Principal com os 3 botões essenciais */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-gray-900">#AF-1023</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    orderStatus === 'novo'
                      ? 'bg-amber-100 text-amber-800'
                      : orderStatus === 'preparando'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {orderStatus === 'novo'
                    ? 'Novo Pedido'
                    : orderStatus === 'preparando'
                    ? 'Na Cozinha (Preparando)'
                    : 'Despachado ao Entregador'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Cliente: <strong>Juan Pérez</strong> • Entrega: Trujillo Centro
              </p>
            </div>
            <span className="text-sm font-black text-purple-700">S/ 42.50</span>
          </div>

          {/* Itens do Pedido */}
          <div className="bg-gray-50 rounded-lg p-2.5 text-xs text-gray-700 flex flex-col gap-1">
            <div className="flex justify-between font-semibold">
              <span>• 2x Combo Smash Burger Especial</span>
              <span className="text-gray-500">S/ 32.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>• 1x Batata Rústica com Cheddar</span>
              <span className="text-gray-500">S/ 10.50</span>
            </div>
          </div>

          {/* Repartidor Associado */}
          <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50/70 p-2 rounded-md">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-purple-600">two_wheeler</span>
              <span>Entregador: Carlos Mendoza (Honda CB 125)</span>
            </span>
            <span className="font-bold text-orange-600">Chegada em ~5 min</span>
          </div>

          {/* OS 3 BOTÕES ESSENCIAIS DO COMÉRCIO */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* 1. Visualizar Pedido */}
            <button
              type="button"
              onClick={handleViewOrder}
              className="h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Visualizar</span>
            </button>

            {/* 2. Preparar */}
            <button
              type="button"
              onClick={handlePrepareOrder}
              disabled={orderStatus === 'preparando' || orderStatus === 'despachado'}
              className={`h-10 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95 ${
                orderStatus === 'preparando'
                  ? 'bg-purple-100 text-purple-800 border border-purple-300 cursor-default'
                  : orderStatus === 'despachado'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">soup_kitchen</span>
              <span>{orderStatus === 'preparando' ? 'Em Preparo' : 'Preparar'}</span>
            </button>

            {/* 3. Despachar */}
            <button
              type="button"
              onClick={handleDispatchOrder}
              disabled={orderStatus === 'despachado'}
              className={`h-10 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95 ${
                orderStatus === 'despachado'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>{orderStatus === 'despachado' ? 'Despachado' : 'Despachar'}</span>
            </button>
          </div>
        </div>

        {/* Botões Secundários adicionais com alert('Funcionalidade em desenvolvimento') */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={handleSecondaryAction}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-orange-500">add_box</span>
            <span>Novo Produto no Cardápio</span>
          </button>

          <button
            type="button"
            onClick={handleSecondaryAction}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-purple-600">bar_chart</span>
            <span>Relatório Financeiro</span>
          </button>

          <button
            type="button"
            onClick={handleSecondaryAction}
            className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-gray-500">schedule</span>
            <span>Ajustar Horários Noturnos</span>
          </button>
        </div>
      </div>

      {/* Modal de Visualização Completa do Pedido (Aberto pelo botão "Visualizar") */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-gray-900 font-mono">Comanda #AF-1023</span>
                <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">
                  Delivery 24h
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 text-xs text-gray-700">
              <p><strong>Cliente:</strong> Juan Pérez (+51 948 112 309)</p>
              <p><strong>Endereço:</strong> Calle Los Pinos 456, Urb. El Recreo</p>
              <p><strong>Observações:</strong> "Sem cebola e mandar sachês extras de maionese caseira."</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
              <span className="font-bold text-gray-900 block mb-1">Itens Solicitados:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
                <li>2x Combo Hamburguesa Clásica Nocturna (Batata Grande + Tártara)</li>
                <li>1x Porção Batatas Rústicas com Cheddar derretido</li>
                <li>1x Chicha Morada Artesanal 500ml gelada</li>
              </ul>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
              <span className="font-bold text-gray-900">Total da Comanda:</span>
              <span className="font-black text-base text-purple-700">S/ 42.50</span>
            </div>

            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="w-full h-10 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Fechar Visualização
            </button>
          </div>
        </div>
      )}

      {/* Navegação Inferior do Comércio */}
      <MerchantBottomNav
        currentScreen="merchant_dashboard"
        onNavigate={onNavigate}
        activeKitchenCount={orderStatus === 'despachado' ? 0 : 1}
      />
    </div>
  );
};
