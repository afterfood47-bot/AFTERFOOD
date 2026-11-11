import React, { useState } from 'react';
import { AppScreen, Order } from '../../types';

interface HelpCenterScreenProps {
  orders: Order[];
  activeOrder: Order | null;
  onNavigate: (screen: AppScreen) => void;
  onBack: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS_BY_CATEGORY: Record<string, { label: string; icon: string; items: FaqItem[] }> = {
  pedidos: {
    label: 'Problemas con un pedido',
    icon: 'shopping_bag',
    items: [
      {
        question: '¿Qué hago si mi pedido tarda más del tiempo estimado?',
        answer:
          'Nuestros repartidores nocturnos cuentan con monitoreo GPS en vivo. Si el tiempo de entrega supera la ventana estimada, puedes contactar al repartidor directamente desde la pantalla de seguimiento o pulsar en "Chat en Vivo con Soporte" para que prioricemos tu orden de inmediato.',
      },
      {
        question: '¿Puedo cancelar o modificar mi pedido después de enviado?',
        answer:
          'Si el local aún no ha iniciado la preparación en cocina, puedes solicitar la cancelación a través de Soporte. Una vez que el comercio marca el pedido en cocina o el repartidor ya retiró el paquete, no es posible cancelar debido a la naturaleza perecible de los alimentos nocturnos.',
      },
      {
        question: '¿Qué pasa si faltó un producto o recibí un ítem equivocado?',
        answer:
          'Lamentamos el inconveniente. Selecciona tu pedido en la sección "Seleccionar un Pedido" arriba y presiona "Reportar un Problema". Te reembolsaremos el importe del producto faltante o coordinaremos el reenvío express sin costo adicional.',
      },
    ],
  },
  pagos: {
    label: 'Pagos y cobros',
    icon: 'payments',
    items: [
      {
        question: '¿Cómo solicito mi vuelto si pago en efectivo?',
        answer:
          'En la pantalla de "Revisar Pedido", al elegir Efectivo puedes especificar el monto exacto con el que vas a pagar (ej. billete de S/ 50 o S/ 100). El repartidor llevará el cambio exacto reportado en tu ticket de entrega contraentrega.',
      },
      {
        question: '¿Cómo funciona el pago con Yape o Plin de madrugada?',
        answer:
          'El pago mediante código QR o número de celular oficial de AfterFood se valida automáticamente las 24 horas del día. Solo debes colocar el código de operación o comprobante y la confirmación es instantánea.',
      },
      {
        question: '¿Cuándo se realiza el cobro a mi tarjeta de crédito o débito?',
        answer:
          'El cobro se procesa de forma segura y encriptada únicamente tras presionar "Confirmar Pedido". Si hay algún error de pasarela bancaria, el saldo se desbloquea de inmediato sin retenciones.',
      },
    ],
  },
  cuenta: {
    label: 'Cuenta y dirección',
    icon: 'person_pin_circle',
    items: [
      {
        question: '¿Cómo cambio mi dirección de entrega en Trujillo?',
        answer:
          'Puedes gestionar tus ubicaciones guardadas ("Casa", "Trabajo", "Depto") desde el selector de ubicación en el encabezado superior o desde "Mi Perfil". Además puedes añadir notas de referencia como piso o timbre.',
      },
      {
        question: '¿Para qué sirve el Código PIN de Seguridad de 4 dígitos?',
        answer:
          'El PIN de 4 dígitos garantiza que tu pedido de medianoche sea entregado únicamente a ti. Al llegar el repartidor, muéstrale tu código para validar la entrega segura.',
      },
      {
        question: '¿AfterFood atiende 24 horas todos los días?',
        answer:
          'Sí, AfterFood opera 24/7 en Trujillo, especializándose en bajones nocturnos, pizzas al horno, farmacia de emergencia y bebidas de medianoche.',
      },
    ],
  },
};

export const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({
  orders,
  activeOrder,
  onNavigate,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'pedidos' | 'pagos' | 'cuenta'>('pedidos');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    activeOrder?.id || (orders.length > 0 ? orders[0].id : '')
  );
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Pedido demorado');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Chat messages state
  const [chatMessages, setChatMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text: '¡Hola! Soy Sofía de Soporte 24/7 AfterFood. ¿En qué podemos ayudarte con tu pedido esta noche?',
      time: 'Ahora',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Consolidate unique orders
  const allOrders = [
    ...(activeOrder ? [activeOrder] : []),
    ...orders.filter((o) => o.id !== activeOrder?.id),
  ];

  const currentSelectedOrder = allOrders.find((o) => o.id === selectedOrderId) || activeOrder || orders[0] || null;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const now = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: now },
    ]);
    setInputMsg('');

    setTimeout(() => {
      let botReply = 'Gracias por comunicarte. Hemos asignado a un agente de guardia para revisar tu caso de inmediato.';
      const lower = userText.toLowerCase();
      if (lower.includes('tarda') || lower.includes('demora') || lower.includes('repartidor')) {
        botReply = `Hemos contactado al repartidor de tu pedido ${selectedOrderId || '#AF-89241'}. La moto se encuentra en ruta acelerada y llegará en pocos minutos.`;
      } else if (lower.includes('vuelto') || lower.includes('efectivo') || lower.includes('pago')) {
        botReply = 'Hemos verificado el detalle de tu pago. El repartidor tiene el cambio exacto registrado en tu comprobante digital.';
      } else if (lower.includes('falta') || lower.includes('cancelar')) {
        botReply = 'Hemos abierto el ticket #TK-9402 para coordinar la reposición o cancelación prioritaria con el comercio aliado.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
      setReportNotes('');
    }, 2200);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-1 animate-in fade-in duration-200">
      {/* 1. Header del Centro de Ayuda */}
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            aria-label="Volver"
            className="w-8 h-8 rounded-full bg-card hover:bg-muted border border-border flex items-center justify-center text-foreground transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-foreground leading-tight flex items-center gap-1.5">
              <span>Centro de Ayuda</span>
              <span className="text-secondary text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-secondary-container/15 border border-secondary-container/30">
                24/7
              </span>
            </h1>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              Respuestas rápidas, reportes y atención en tiempo real
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLiveChat(true)}
          className="h-8 px-2.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E02644] text-white text-[11px] font-black flex items-center gap-1 shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[15px]">chat</span>
          <span>Chat 24H</span>
        </button>
      </div>

      {/* 2. Seleccionar un Pedido para Reporte Rápido */}
      <section className="mb-3.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-foreground flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">
              receipt_long
            </span>
            <span>Seleccionar un Pedido Reciente</span>
          </h2>
          <span className="text-[10px] text-muted-foreground font-semibold">
            {allOrders.length} disponible{allOrders.length === 1 ? '' : 's'}
          </span>
        </div>

        {allOrders.length === 0 ? (
          <div className="p-3 bg-card border border-border rounded-xl text-center text-xs text-muted-foreground">
            No tienes pedidos recientes registrados para reportar.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 pb-1">
            {allOrders.map((ord) => {
              const isSelected = ord.id === selectedOrderId;
              const isEnRuta = ord.step < 4;
              return (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => setSelectedOrderId(ord.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all active:scale-[0.99] flex items-center gap-2.5 shadow-xs ${
                    isSelected
                      ? 'bg-orange-50/50 border-orange-500 ring-1 ring-orange-500/40 shadow-sm'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={ord.storeImage}
                    alt={ord.storeName}
                    className="w-10 h-10 rounded-lg object-cover bg-muted border border-border flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-primary font-bold">
                        {ord.id}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          isEnRuta
                            ? 'bg-secondary-container/20 text-secondary'
                            : 'bg-emerald-500/15 text-emerald-400'
                        }`}
                      >
                        {isEnRuta ? 'En curso' : 'Entregado'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-foreground truncate leading-tight mt-0.5">
                      {ord.storeName}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                      S/ {ord.total.toFixed(2)} • {ord.createdAt || 'Hoy'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Resumen de orden seleccionada con acción de reporte */}
        {currentSelectedOrder && (
          <div className="p-2.5 rounded-xl bg-card border border-border flex items-center justify-between gap-2 shadow-xs mt-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-secondary flex-shrink-0">
                help_outline
              </span>
              <span className="text-xs text-foreground truncate">
                ¿Problemas con tu orden <strong className="font-bold">{currentSelectedOrder.id}</strong> en <strong className="font-bold">{currentSelectedOrder.storeName}</strong>?
              </span>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="px-2.5 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-[10px] font-bold flex-shrink-0 transition-colors"
            >
              Reportar Pedido
            </button>
          </div>
        )}
      </section>

      {/* 3. Opciones de Contacto Directo */}
      <section className="mb-4 flex flex-col gap-1.5">
        <h2 className="text-xs font-bold text-foreground flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            contact_support
          </span>
          <span>Opciones de Contacto Directo</span>
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {/* Opción A: Chat en Vivo */}
          <button
            type="button"
            onClick={() => setShowLiveChat(true)}
            className="p-3 rounded-xl bg-card hover:bg-muted border border-border shadow-sm flex flex-col items-start gap-1.5 text-left transition-all active:scale-[0.98] group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block leading-tight">
                Chat en Vivo
              </span>
              <span className="text-[10px] text-muted-foreground block leading-snug mt-0.5">
                Respuesta en menos de 2 min con soporte 24/7
              </span>
            </div>
          </button>

          {/* Opción B: Reportar un Problema */}
          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="p-3 rounded-xl bg-card hover:bg-muted border border-border shadow-sm flex flex-col items-start gap-1.5 text-left transition-all active:scale-[0.98] group"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block leading-tight">
                Reportar Problema
              </span>
              <span className="text-[10px] text-muted-foreground block leading-snug mt-0.5">
                Reembolsos, cobros o comida incompleta
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* 4. Preguntas Frecuentes (FAQ) estilo PedidosYa / iFood */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-foreground flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">
              quiz
            </span>
            <span>Preguntas Frecuentes (FAQ)</span>
          </h2>
        </div>

        {/* Categorías de FAQ */}
        <div className="flex gap-1.5 p-1 bg-card rounded-xl border border-border">
          {(Object.keys(FAQS_BY_CATEGORY) as Array<'pedidos' | 'pagos' | 'cuenta'>).map((catKey) => {
            const cat = FAQS_BY_CATEGORY[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => {
                  setSelectedCategory(catKey);
                  setOpenFaqIndex(0);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-primary-container text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                <span className="truncate">{cat.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Lista de Acordeones de Preguntas y Respuestas */}
        <div className="flex flex-col gap-1.5">
          {FAQS_BY_CATEGORY[selectedCategory].items.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-3 text-left flex items-center justify-between gap-2"
                >
                  <span className="text-xs font-bold text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-muted-foreground flex-shrink-0 transition-transform">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-0 text-[11px] text-muted-foreground leading-relaxed border-t border-border/50 mt-1 pt-2 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. MODAL: CHAT EN VIVO CON SOPORTE 24/7 */}
      {showLiveChat && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in"
        >
          <div
            className="w-full max-w-md h-[88vh] sm:h-[600px] bg-card text-foreground rounded-t-3xl sm:rounded-2xl border-t sm:border border-border flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Chat */}
            <div className="p-3.5 bg-card border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground flex items-center gap-1 leading-tight">
                    <span>Sofía • Soporte AfterFood</span>
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold leading-none">
                    En línea • Turno nocturno
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowLiveChat(false)}
                className="w-7 h-7 rounded-full bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Mensajes del Chat */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 text-xs">
              <div className="text-center my-1">
                <span className="text-[9px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  Conversación encriptada • Ticket activo {selectedOrderId ? `para ${selectedOrderId}` : ''}
                </span>
              </div>

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[82%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-secondary-container text-white rounded-tr-xs shadow-xs'
                        : 'bg-muted text-foreground border border-border rounded-tl-xs'
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-0.5 px-1 font-medium">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input de Envío */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-card border-t border-border flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Escribe tu mensaje a soporte..."
                className="flex-1 h-10 px-3 bg-input border border-border rounded-full text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center hover:brightness-110 active:scale-95 disabled:opacity-40 transition-all flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: REPORTAR UN PROBLEMA CON TICKET */}
      {showReportModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="w-full max-w-md bg-card text-foreground rounded-2xl border border-border p-4 shadow-2xl flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  report_problem
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-foreground">
                  Reportar Problema con el Pedido
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-7 h-7 rounded-full bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">check_circle</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">¡Reporte Enviado con Éxito!</h4>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Generamos el ticket de soporte <strong className="text-primary font-bold">#TK-9402</strong> para tu pedido {selectedOrderId}. Te contactaremos al instante.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendReport} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                    Selecciona el motivo:
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-input border border-border text-foreground outline-none focus:border-primary font-medium"
                  >
                    <option value="Pedido demorado">Pedido demorado o fuera de tiempo</option>
                    <option value="Faltó un producto">Faltó un producto o ingrediente</option>
                    <option value="Comida fría o empaque dañado">Comida fría o empaque dañado</option>
                    <option value="Cobro o vuelto incorrecto">Problema con cobro o vuelto en efectivo</option>
                    <option value="Problema con el repartidor">Observación sobre el repartidor</option>
                    <option value="Otro motivo">Otro inconveniente nocturno</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                    Cuéntanos qué sucedió (opcional):
                  </label>
                  <textarea
                    rows={3}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Describe el inconveniente para darle solución prioritaria..."
                    className="w-full p-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="p-2 rounded-lg bg-muted text-[10px] text-muted-foreground flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                  <span>Garantía AfterFood: Solución o reembolso en menos de 15 minutos.</span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E02644] text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Enviar Reporte</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="h-10 px-4 rounded-full bg-muted text-muted-foreground hover:text-foreground font-bold text-xs"
                  >
                    Cancelar
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
