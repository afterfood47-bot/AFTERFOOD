import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface CourierSupportScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

interface ChatMessage {
  id: string;
  sender: 'driver' | 'support';
  text: string;
  time: string;
}

export const CourierSupportScreen: React.FC<CourierSupportScreenProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'chat'>('topics');
  const [expandedTopic, setExpandedTopic] = useState<string | null>('sos');
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosSent, setSosSent] = useState<boolean>(false);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'support',
      text: '¡Hola Carlos! Soy Andrea de Soporte en Vivo para Repartidores AfterFood. ¿En qué te puedo ayudar con tu ruta actual?',
      time: 'Ahora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ticketToast, setTicketToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setTicketToast(msg);
    setTimeout(() => setTicketToast(null), 3000);
  };

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'driver',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate Agent response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = 'Entendido Carlos. Estamos revisando tu solicitud en el sistema de despacho en vivo.';
      if (text.toLowerCase().includes('pin') || text.toLowerCase().includes('cliente')) {
        reply = 'Si el cliente no contesta, por favor espera el temporizador de 10 minutos reglamentario. Si no baja, te autorizamos cancelar sin penalización y cobrar la tarifa completa.';
      } else if (text.toLowerCase().includes('averi') || text.toLowerCase().includes('moto') || text.toLowerCase().includes('llanta')) {
        reply = 'Lamentamos el inconveniente vial. Acabamos de reasignar el pedido a un conductor cercano a tu ubicación. Tu turno ha sido pausado sin penalización.';
      } else if (text.toLowerCase().includes('pago') || text.toLowerCase().includes('tarifa') || text.toLowerCase().includes('dinamica')) {
        reply = 'Verificamos que el pedido #AF-3092 califica para bono por Tarifa Dinámica Nocturna (+S/ 3.50). El saldo se reflejará en tu billetera en breve.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `m-rep-${Date.now()}`,
          sender: 'support',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleTriggerSos = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosSent(false);
      setShowSosModal(false);
      showNotification('¡Alerta SOS enviada a Central AfterFood y SAMU 106!');
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-2 animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20]  min-h-[calc(100vh-4rem)] select-none">
      {/* Top Header with Back Button (consistently routes back to courier_profile) */}
      <div className="w-full flex items-center justify-between py-2 border-b border-[#e2e8f0]  mb-3">
        <button
          type="button"
          onClick={() => onNavigate('courier_profile')}
          aria-label="Volver a Mi Perfil"
          className="w-9 h-9 rounded-full bg-white  border border-[#e2e8f0]  flex items-center justify-center text-[#64748b]  hover:text-[#1a1d20] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="font-title-lg font-black text-sm sm:text-base text-[#1a1d20]  leading-tight">
            Centro de Ayuda Conductor
          </h1>
          <span className="text-[10px] text-emerald-600  font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Central de Soporte en Vivo 24/7
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowSosModal(true)}
          className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
          title="Botón de Emergencia SOS"
        >
          <span className="material-symbols-outlined text-[18px] animate-pulse">sos</span>
        </button>
      </div>

      {/* Toast Notification */}
      {ticketToast && (
        <div className="mb-3 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700  text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <span className="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span>
          <span>{ticketToast}</span>
        </div>
      )}

      {/* Tabs Switcher: Guía & Preguntas vs Chat en Vivo */}
      <div className="flex bg-slate-200/70  p-1 rounded-2xl mb-4 border border-[#e2e8f0] ">
        <button
          type="button"
          onClick={() => setActiveTab('topics')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'topics'
              ? 'bg-white  text-[#1a1d20]  shadow-xs'
              : 'text-[#64748b]  hover:text-[#1a1d20] '
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">menu_book</span>
          <span>Temas de Ayuda</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-[#6C5CE7] text-white shadow-xs'
              : 'text-[#64748b]  hover:text-[#1a1d20] '
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">support_agent</span>
          <span>Soporte en Vivo (Chat)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </button>
      </div>

      {activeTab === 'topics' ? (
        <div className="flex flex-col gap-3">
          {/* Tarjeta de Emergencia SOS Destacada */}
          <div className="bg-gradient-to-r from-rose-500/15 via-rose-500/5 to-transparent border-2 border-rose-500/40 rounded-3xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shrink-0">
                <span className="material-symbols-outlined text-[26px]">emergency</span>
              </div>
              <div>
                <h3 className="font-title-lg font-black text-sm sm:text-base text-rose-600  leading-tight">
                  ¿Emergencia en Ruta?
                </h3>
                <p className="text-xs text-[#64748b]  mt-0.5">
                  Línea directa con central de auxilio vial y ambulancia
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSosModal(true)}
              className="px-3.5 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>SOS</span>
            </button>
          </div>

          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]  mt-1">
            Temas Específicos para Repartidores
          </span>

          {/* 1. Problemas con el pago/tarifa */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-3xl p-4 shadow-xs">
            <div
              onClick={() => setExpandedTopic(expandedTopic === 'pago' ? null : 'pago')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="font-title-md font-black text-xs sm:text-sm text-[#1a1d20] ">
                    Problemas con el pago / tarifa
                  </h3>
                  <p className="text-[10px] text-[#64748b] ">
                    Tarifa dinámica, demoras de retiro BCP/Yape o propinas
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#94a3b8]">
                {expandedTopic === 'pago' ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {expandedTopic === 'pago' && (
              <div className="mt-3 pt-3 border-t border-[#e2e8f0]  flex flex-col gap-2.5 text-xs text-[#475569]  animate-in fade-in">
                <p>
                  <strong>1. Retiros a BCP / Yape:</strong> Las transferencias solicitadas se procesan de forma inmediata en horario 24/7. Si tu saldo no se refleja en 15 minutos, revisa tu CCI registrado.
                </p>
                <p>
                  <strong>2. Tarifa Dinámica Nocturna:</strong> Si estuviste en zona caliente y no se aplicó el multiplicador (ej. 1.4x), nuestro sistema audita los GPS cada 1 hora y abona la diferencia de forma retroactiva.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendChat('Tengo una duda con la tarifa del pedido #AF-3092');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FF7A00]/15 hover:bg-[#FF7A00]/25 text-[#FF7A00] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">report_problem</span>
                  <span>Solicitar revisión de tarifa de un pedido</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Accidentes o emergencias en ruta */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-3xl p-4 shadow-xs">
            <div
              onClick={() => setExpandedTopic(expandedTopic === 'sos' ? null : 'sos')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">car_crash</span>
                </div>
                <div>
                  <h3 className="font-title-md font-black text-xs sm:text-sm text-[#1a1d20] ">
                    Accidentes o emergencias en ruta
                  </h3>
                  <p className="text-[10px] text-[#64748b] ">
                    Protocolo de auxilio vial, cobertura SOAT y reporte
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#94a3b8]">
                {expandedTopic === 'sos' ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {expandedTopic === 'sos' && (
              <div className="mt-3 pt-3 border-t border-[#e2e8f0]  flex flex-col gap-2.5 text-xs text-[#475569]  animate-in fade-in">
                <p>
                  <strong>Prioridad absoluta:</strong> Tu integridad física es lo primero. En caso de incidente de tránsito, no te preocupes por el pedido: la plataforma cancela el viaje sin costo ni sanción.
                </p>
                <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-700 ">
                  <p className="font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">health_and_safety</span>
                    <span>Cobertura SOAT AfterFood</span>
                  </p>
                  <p className="text-[11px] mt-0.5">
                    Todos los viajes activos cuentan con cobertura de seguro contra accidentes para ti y terceros.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSosModal(true)}
                  className="w-full py-2.5 rounded-xl bg-rose-500 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Activar Botón de Emergencia SOS</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Vehículo averiado */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-3xl p-4 shadow-xs">
            <div
              onClick={() => setExpandedTopic(expandedTopic === 'averia' ? null : 'averia')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">build</span>
                </div>
                <div>
                  <h3 className="font-title-md font-black text-xs sm:text-sm text-[#1a1d20] ">
                    Vehículo averiado
                  </h3>
                  <p className="text-[10px] text-[#64748b] ">
                    Llanta baja, falla de motor y reasignación de pedido
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#94a3b8]">
                {expandedTopic === 'averia' ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {expandedTopic === 'averia' && (
              <div className="mt-3 pt-3 border-t border-[#e2e8f0]  flex flex-col gap-2.5 text-xs text-[#475569]  animate-in fade-in">
                <p>
                  Si tu vehículo sufre una ponchadura o avería mecánica con un pedido activo:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Estaciona en una zona segura e ilumina tus luces de advertencia.</li>
                  <li>Informa al operador de soporte para reasignar el pedido a otro repartidor cercano.</li>
                  <li>No serás penalizado en tu tasa de aceptación por falla mecánica fortuita.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendChat('Se me averió la moto y tengo un pedido en curso');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#6C5CE7]/15 hover:bg-[#6C5CE7]/25 text-[#6C5CE7] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                  <span>Solicitar reasignación por avería</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Cliente no responde al PIN */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-3xl p-4 shadow-xs">
            <div
              onClick={() => setExpandedTopic(expandedTopic === 'pin' ? null : 'pin')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">pin</span>
                </div>
                <div>
                  <h3 className="font-title-md font-black text-xs sm:text-sm text-[#1a1d20] ">
                    Cliente no responde al PIN
                  </h3>
                  <p className="text-[10px] text-[#64748b] ">
                    Protocolo de espera de 10 min y entrega en conserjería
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#94a3b8]">
                {expandedTopic === 'pin' ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {expandedTopic === 'pin' && (
              <div className="mt-3 pt-3 border-t border-[#e2e8f0]  flex flex-col gap-2.5 text-xs text-[#475569]  animate-in fade-in">
                <p>
                  <strong>Protocolo Oficial AfterFood de 3 Pasos:</strong>
                </p>
                <div className="flex flex-col gap-1.5 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-50  border border-[#e2e8f0] ">
                    <strong>Paso 1:</strong> Llama 2 veces al cliente por teléfono e interactúa por el chat de la entrega.
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50  border border-[#e2e8f0] ">
                    <strong>Paso 2:</strong> Inicia el temporizador de espera de 10 minutos en la pantalla de entrega.
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50  border border-[#e2e8f0] ">
                    <strong>Paso 3:</strong> Si no contesta, puedes dejar el pedido en recepción/conserjería tomando foto de evidencia o retornar al local. Cobrarás el 100% de la tarifa.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendChat('Estoy en la puerta del cliente y no responde ni da el PIN');
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-600  font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>Notificar a soporte que el cliente no baja</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Pantalla 5: Soporte en Vivo para Repartidores (Simulación de Chat) */
        <div className="flex flex-col flex-1 bg-white  border border-[#e2e8f0]  rounded-3xl p-4 shadow-sm h-[520px]">
          {/* Header del Chat */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] ">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-black text-sm">
                  AF
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white " />
              </div>
              <div>
                <p className="font-title-md font-black text-xs text-[#1a1d20] ">
                  Central de Despacho AfterFood
                </p>
                <p className="text-[10px] text-emerald-600  font-bold">
                  Operador en línea • Tiempo de respuesta &lt; 1 min
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSosModal(true)}
              className="px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-500 font-bold text-[10px] border border-rose-500/30 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>Llamar</span>
            </button>
          </div>

          {/* Quick Query Chips */}
          <div className="flex flex-wrap items-center gap-1.5 py-2">
            <button
              type="button"
              onClick={() => handleSendChat('El cliente no responde a la puerta')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-50 text-[10px] font-bold text-gray-700 hover:text-orange-600 border border-gray-200 transition-colors cursor-pointer"
            >
              🚪 Cliente no contesta
            </button>
            <button
              type="button"
              onClick={() => handleSendChat('Mi vehículo se averió')}
              className="px-2.5 py-1 rounded-full bg-slate-100  hover:bg-[#6C5CE7]/15 text-[10px] font-bold text-[#64748b]  hover:text-[#6C5CE7] whitespace-nowrap border border-[#e2e8f0]  transition-colors cursor-pointer"
            >
              🛠️ Moto averiada
            </button>
            <button
              type="button"
              onClick={() => handleSendChat('Duda con tarifa dinámica de mi viaje')}
              className="px-2.5 py-1 rounded-full bg-slate-100  hover:bg-[#6C5CE7]/15 text-[10px] font-bold text-[#64748b]  hover:text-[#6C5CE7] whitespace-nowrap border border-[#e2e8f0]  transition-colors cursor-pointer"
            >
              💰 Ajuste de tarifa
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 py-2 pr-1">
            {chatMessages.map((msg) => {
              const isMe = msg.sender === 'driver';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${
                    isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      isMe
                        ? 'bg-[#6C5CE7] text-white rounded-br-xs'
                        : 'bg-slate-100  text-[#1a1d20]  rounded-bl-xs border border-[#e2e8f0] '
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-[#94a3b8] mt-0.5 px-1">{msg.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="mr-auto flex items-center gap-1.5 p-2 rounded-xl bg-slate-100  text-xs text-[#64748b]  border border-transparent ">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1">Operador escribiendo...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChat();
            }}
            className="flex items-center gap-2 pt-2 border-t border-[#e2e8f0] "
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje a soporte..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-3 bg-[#f8f9fa]  border border-[#e2e8f0]  rounded-xl text-xs text-[#1a1d20]  outline-none focus:border-[#6C5CE7]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4cdb] disabled:opacity-50 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}

      {/* Modal de Emergencia SOS */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xs bg-white  border-2 border-rose-500 rounded-3xl p-5 text-center flex flex-col items-center gap-3 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-[32px]">emergency</span>
            </div>
            <h3 className="font-title-md font-black text-base text-rose-600 ">
              Protocolo de Emergencia SOS
            </h3>
            <p className="text-xs text-[#64748b] ">
              Transmitirá tu posición GPS exacta a la central de auxilio AfterFood y solicitará llamada prioritaria al SAMU 106.
            </p>

            <div className="w-full p-2.5 rounded-xl bg-slate-50  border border-[#e2e8f0]  text-[11px] text-[#475569]  text-left">
              <span className="font-bold block text-rose-500">📍 Ubicación en ruta:</span>
              <span>Av. Larco 840, Trujillo (-8.1159, -79.0305)</span>
            </div>

            {sosSent ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-700  text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>¡Alerta enviada! Un operador se está comunicando.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full mt-1">
                <button
                  type="button"
                  onClick={handleTriggerSos}
                  className="w-full h-11 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-xs transition-all shadow-[0_4px_16px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Confirmar y Enviar Alerta SOS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSosModal(false)}
                  className="w-full h-10 rounded-xl bg-slate-100  text-[#64748b]  font-bold text-xs cursor-pointer border border-transparent "
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
