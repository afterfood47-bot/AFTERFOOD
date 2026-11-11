import React, { useState } from 'react';
import { AppScreen, Order } from '../../types';

interface SupportScreenProps {
  orders: Order[];
  activeOrder: Order | null;
  selectedOrderForSupport?: Order | null;
  onNavigate: (screen: AppScreen) => void;
}

interface FaqItem {
  id: string;
  category: 'order' | 'payment' | 'account';
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  // Problemas con un pedido
  {
    id: 'faq-1',
    category: 'order',
    question: '¿Mi pedido se demora más de lo esperado?',
    answer:
      'En AfterFood trabajamos 24/7 con repartidores flash y tiempos promedio de 20–30 min. En horarios de alta demanda nocturna o clima adverso, pueden sumarse entre 5 y 10 minutos. Puedes ver la ubicación GPS en tiempo real de tu repartidor o contactarlo directamente desde la pantalla de seguimiento.',
  },
  {
    id: 'faq-2',
    category: 'order',
    question: '¿Falta un producto o llegó en mal estado?',
    answer:
      'Lamentamos el inconveniente. Por favor pulsa el botón "Reportar un Problema" de abajo, selecciona el pedido afectado y adjunta el detalle. Te enviaremos un reemplazo express prioritario o un reembolso inmediato en saldo AfterFood.',
  },
  {
    id: 'faq-3',
    category: 'order',
    question: '¿El repartidor marcó como entregado pero no lo recibí?',
    answer:
      'Por tu seguridad, cada entrega requiere la verificación de un código PIN de 4 dígitos. Si el pedido figura entregado sin tu confirmación, abre de inmediato el "Chat en Vivo con Soporte" para congelar el pago y reasignar la entrega.',
  },
  {
    id: 'faq-4',
    category: 'order',
    question: '¿Puedo cancelar o modificar mi pedido después de confirmado?',
    answer:
      'Si el comercio aún no ha iniciado la preparación en cocina (dentro de los primeros 2 minutos), puedes solicitar la cancelación express desde el Chat en Vivo con reembolso al 100%.',
  },

  // Pagos y cobros
  {
    id: 'faq-5',
    category: 'payment',
    question: '¿Cómo funciona el vuelto en el pago en efectivo contraentrega?',
    answer:
      'Al seleccionar "Efectivo", indicas con cuánto dinero vas a pagar (ej. S/ 50.00 o S/ 100.00) en la pantalla de "Confirmar Vuelto". El sistema calcula automáticamente el vuelto exacto y se lo notifica al repartidor para que lleve el dinero listo al llegar a tu puerta.',
  },
  {
    id: 'faq-6',
    category: 'payment',
    question: '¿Qué hago si veo un cobro duplicado en mi tarjeta o Yape?',
    answer:
      'En pagos con tarjeta a veces se genera una reserva bancaria temporal que se libera en 24–48 horas. Si fue con Yape y transferiste dos veces el mismo monto, repórtalo en el formulario de reclamos con el código de aprobación para devolución en el día.',
  },
  {
    id: 'faq-7',
    category: 'payment',
    question: '¿Cómo se procesan las propinas al repartidor?',
    answer:
      'El 100% de la propina va directamente al repartidor asignado a tu orden. Puedes pagarla mediante Yape o Tarjeta de forma independiente al importe de los alimentos.',
  },
  {
    id: 'faq-8',
    category: 'payment',
    question: '¿Dónde consulto mis cupones y descuentos nocturnos?',
    answer:
      'El cupón de bienvenida "100% de descuento en el costo de envío" se aplica de forma automática en el resumen de compra (Revisar Pedido) para todos los usuarios.',
  },

  // Cuenta y dirección
  {
    id: 'faq-9',
    category: 'account',
    question: '¿Cómo cambio o agrego una nueva dirección de entrega?',
    answer:
      'Puedes tocar la barra superior de ubicación en cualquier momento para abrir el Selector de Ubicación y guardar direcciones frecuentes como "Casa", "Trabajo" o "Departamento" con sus respectivas referencias.',
  },
  {
    id: 'faq-10',
    category: 'account',
    question: '¿Cómo cambio entre Modo Cliente, Repartidor o Comercio?',
    answer:
      'Ve a la pestaña "Perfil" y selecciona la opción "Cambiar de Modo / Rol". Desde allí puedes registrarte como repartidor con moto/bici o registrar tu restaurante nocturno como comercio aliado.',
  },
  {
    id: 'faq-11',
    category: 'account',
    question: '¿Cómo protegen mis datos personales y medios de pago?',
    answer:
      'AfterFood cumple con estándares PCI-DSS y encriptación de 256 bits. Nunca almacenamos tu código CVV y tus datos solo se emplean para la gestión logística de tus pedidos en Trujillo.',
  },
];

export const SupportScreen: React.FC<SupportScreenProps> = ({
  orders,
  activeOrder,
  selectedOrderForSupport,
  onNavigate,
}) => {
  const allOrders = [
    ...(activeOrder ? [activeOrder] : []),
    ...orders.filter((o) => o.id !== activeOrder?.id),
  ];

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    selectedOrderForSupport || activeOrder || allOrders[0] || null
  );
  const [activeFaqTab, setActiveFaqTab] = useState<'order' | 'payment' | 'account'>('order');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  // Modales interactivos
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Estado del chat en vivo
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: 'bot' | 'agent' | 'user'; text: string; time: string }>
  >([
    {
      sender: 'agent',
      text: '¡Hola! Soy Sofía de Soporte AfterFood Trujillo 24/7. ¿En qué te puedo ayudar hoy con tu pedido?',
      time: 'Ahora',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Estado del formulario de reporte
  const [reportReason, setReportReason] = useState('Pedido retrasado');
  const [reportDetails, setReportDetails] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setChatInput('');

    // Respuesta inteligente automática del agente
    setTimeout(() => {
      let reply = 'Gracias por escribirnos. Estoy revisando el estado con el equipo de despacho para darte solución inmediata.';
      const lower = userText.toLowerCase();
      if (lower.includes('demora') || lower.includes('tarda') || lower.includes('tiempo')) {
        reply = `He verificado el pedido ${selectedOrder ? selectedOrder.id : 'en curso'}. El repartidor está en tránsito respetando la ruta más rápida. Te notificaremos si surge alguna eventualidad.`;
      } else if (lower.includes('vuelto') || lower.includes('efectivo') || lower.includes('cambio')) {
        reply = `En caso de requerir cambio con un billete distinto al registrado, te confirmamos que el repartidor lleva base de seguridad para darte el vuelto correcto.`;
      } else if (lower.includes('cancelar')) {
        reply = `Para cancelaciones, verificamos de inmediato con cocina para proceder según el estado de preparación.`;
      }
      setChatMessages((prev) => [...prev, { sender: 'agent', text: reply, time: timeStr }]);
    }, 900);
  };

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `#TK-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketSuccess(ticketId);
    setTimeout(() => {
      setTicketSuccess(null);
      setIsReportModalOpen(false);
      setReportDetails('');
    }, 2800);
  };

  const filteredFaqs = FAQS_DATA.filter((item) => {
    const matchesTab = searchQuery ? true : item.category === activeFaqTab;
    const matchesQuery =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="flex flex-col w-full pb-32 px-4 pt-1 animate-in fade-in duration-200">
      {/* 1. Header con Botón de Regreso y Título */}
      <div className="flex items-center justify-between py-2 border-b border-border mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            aria-label="Volver a perfil"
            className="w-8 h-8 rounded-full bg-card hover:bg-muted border border-border flex items-center justify-center text-foreground transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
              Centro de Ayuda & Soporte
            </h1>
            <span className="text-[10px] text-muted-foreground">
              Asistencia personalizada en Trujillo 24/7
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>En línea</span>
        </div>
      </div>

      {/* 2. Banner de Seguridad y Disponibilidad */}
      <div className="relative mb-3 p-3 rounded-2xl bg-gradient-to-r from-primary/10 via-primary-container/15 to-secondary-container/10 border border-primary/20 shadow-sm overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">
              support_agent
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground leading-tight">
              ¿Tienes un problema con tu pedido?
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              Tiempo de respuesta promedio: <strong className="text-secondary font-bold">&lt; 3 minutos</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Sección "Seleccionar un Pedido" */}
      <section className="mb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              receipt_long
            </span>
            <span>Seleccionar un Pedido</span>
          </span>
          {allOrders.length > 0 && (
            <span className="text-[10px] text-muted-foreground">
              {allOrders.length} {allOrders.length === 1 ? 'pedido reciente' : 'pedidos recientes'}
            </span>
          )}
        </div>

        {allOrders.length === 0 ? (
          <div className="p-3 rounded-xl bg-card border border-border text-center text-xs text-muted-foreground">
            No tienes pedidos recientes registrados para reportar.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 pb-1">
            {allOrders.map((ord) => {
              const isSelected = selectedOrder?.id === ord.id;
              return (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => setSelectedOrder(ord)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all active:scale-95 flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-card border-secondary-container ring-1 ring-secondary-container/50 shadow-sm'
                      : 'bg-card/70 border-border hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <img
                    src={ord.storeImage}
                    alt={ord.storeName}
                    className="w-9 h-9 rounded-lg object-cover border border-border shrink-0"
                  />
                  <div className="flex flex-col min-w-0 pr-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-foreground truncate max-w-[130px]">
                        {ord.storeName}
                      </span>
                      <span className="text-[9px] font-mono text-primary font-bold">
                        {ord.id}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      S/ {ord.total.toFixed(2)} • {ord.step === 4 ? 'Entregado' : 'En camino'}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[18px] text-secondary-container">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {selectedOrder && (
          <div className="px-3 py-1.5 rounded-lg bg-muted border border-border flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground truncate">
              Reportando sobre: <strong className="text-foreground">{selectedOrder.storeName}</strong> ({selectedOrder.id})
            </span>
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="text-[10px] text-primary hover:underline font-bold shrink-0 ml-2"
            >
              Cambiar
            </button>
          </div>
        )}
      </section>

      {/* 4. Opciones de Contacto Directo */}
      <section className="mb-4 flex flex-col gap-2">
        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">
            contact_support
          </span>
          <span>Opciones de Contacto Directo</span>
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* Botón 1: Chat en Vivo con Soporte */}
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="p-3 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm flex flex-col gap-2 text-left transition-all active:scale-95 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">
                  forum
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-foreground block leading-tight">
                Chat en Vivo
              </span>
              <span className="text-[10px] text-muted-foreground block leading-tight mt-0.5">
                Habla con un asesor 24/7 en tiempo real
              </span>
            </div>
            <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 mt-auto">
              <span>Iniciar chat</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </span>
          </button>

          {/* Botón 2: Reportar un Problema */}
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="p-3 rounded-2xl bg-card border border-border hover:border-secondary-container/50 shadow-sm flex flex-col gap-2 text-left transition-all active:scale-95 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-secondary-container/15 text-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">
                  report_problem
                </span>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-muted text-muted-foreground text-[8px] font-bold uppercase">
                Ticket
              </span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-foreground block leading-tight">
                Reportar Problema
              </span>
              <span className="text-[10px] text-muted-foreground block leading-tight mt-0.5">
                Envía reclamo por demora, cobro o pedido
              </span>
            </div>
            <span className="text-[10px] font-bold text-secondary-container flex items-center gap-0.5 mt-auto">
              <span>Crear reporte</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </span>
          </button>
        </div>
      </section>

      {/* 5. Preguntas Frecuentes (FAQ) Estilo PedidosYa */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              quiz
            </span>
            <span>Preguntas Frecuentes (FAQ)</span>
          </span>
          <span className="text-[10px] text-muted-foreground">
            {filteredFaqs.length} respuestas
          </span>
        </div>

        {/* Buscador de preguntas */}
        <div className="relative flex items-center mb-1">
          <span className="material-symbols-outlined text-[16px] text-muted-foreground absolute left-3 pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar respuesta o problema..."
            className="w-full h-9 pl-9 pr-8 bg-card border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-muted-foreground hover:text-foreground"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Categorías FAQ */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-1.5 pb-1">
            {[
              { id: 'order', label: 'Problemas con un pedido', icon: 'restaurant' },
              { id: 'payment', label: 'Pagos y cobros', icon: 'payments' },
              { id: 'account', label: 'Cuenta y dirección', icon: 'person' },
            ].map((tab) => {
              const active = activeFaqTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFaqTab(tab.id as any)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    active
                      ? 'bg-secondary-container text-white shadow-sm'
                      : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Lista de Acordeones FAQ */}
        <div className="flex flex-col gap-1.5 mt-1">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all shadow-xs ${
                  isOpen ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                  className="w-full p-3 flex items-center justify-between text-left gap-2"
                >
                  <span className="text-xs font-bold text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[18px] text-muted-foreground transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 pt-0 text-[11px] text-muted-foreground leading-relaxed border-t border-border/60">
                    <p className="pt-2">{faq.answer}</p>
                    <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        ¿Te sirvió esta información?
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(null)}
                          className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-[10px] font-bold text-foreground"
                        >
                          Sí, gracias
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsChatOpen(true)}
                          className="px-2 py-0.5 rounded bg-primary/15 hover:bg-primary/25 text-[10px] font-bold text-primary"
                        >
                          Hablar con asesor
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* MODAL 1: CHAT EN VIVO CON SOPORTE                         */}
      {/* ========================================================= */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md h-[85vh] sm:h-[600px] bg-card text-foreground rounded-t-3xl sm:rounded-2xl border-t sm:border border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Chat */}
            <div className="p-3.5 bg-card border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                    S
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-card" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground leading-tight">
                    Sofía • Asesora AfterFood
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold leading-tight mt-0.5">
                    En línea • Trujillo Centro
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Contexto del pedido en el chat */}
            {selectedOrder && (
              <div className="px-3 py-1.5 bg-muted/80 border-b border-border flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground truncate">
                  Conversando sobre orden <strong className="text-primary font-bold">{selectedOrder.id}</strong> ({selectedOrder.storeName})
                </span>
                <span className="text-secondary font-bold shrink-0">
                  S/ {selectedOrder.total.toFixed(2)}
                </span>
              </div>
            )}

            {/* Mensajes del Chat */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 text-xs">
              {chatMessages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${
                      isUser ? 'self-end' : 'self-start'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-2xl ${
                        isUser
                          ? 'bg-secondary-container text-white rounded-br-xs'
                          : 'bg-muted text-foreground rounded-bl-xs border border-border'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-0.5 px-1">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Respuestas rápidas */}
            <div className="px-3 py-2 border-t border-border flex flex-wrap gap-1.5">
              {[
                '¿Dónde está mi pedido?',
                'Necesito cambio con S/ 100',
                'Quiero cancelar mi orden',
                'El pedido demoró más de 30 min',
              ].map((quick, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setChatInput(quick);
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 text-[10px] font-bold text-foreground border border-border transition-colors"
                >
                  {quick}
                </button>
              ))}
            </div>

            {/* Input del Chat */}
            <form
              onSubmit={handleSendChatMessage}
              className="p-3 bg-card border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu mensaje a soporte..."
                className="flex-1 h-10 px-3 bg-input border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  chatInput.trim()
                    ? 'bg-secondary-container text-white shadow-md active:scale-95'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: REPORTAR UN PROBLEMA / CREAR TICKET              */}
      {/* ========================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-card text-foreground rounded-t-3xl sm:rounded-2xl border-t sm:border border-border p-4 shadow-2xl flex flex-col gap-3 overflow-hidden animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary-container">
                  report_problem
                </span>
                <h3 className="text-sm font-extrabold text-foreground">
                  Reportar un Problema
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="w-7 h-7 rounded-full bg-muted text-foreground flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[15px]">close</span>
              </button>
            </div>

            {ticketSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">task_alt</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">
                  ¡Reclamo Registrado con Éxito!
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Tu ticket <strong className="text-primary font-bold">{ticketSuccess}</strong> fue asignado a un supervisor. Te contactaremos vía correo y WhatsApp en menos de 5 minutos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleGenerateTicket} className="flex flex-col gap-2.5">
                {/* Pedido asociado */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-muted-foreground">
                    Pedido relacionado
                  </label>
                  <select
                    value={selectedOrder?.id || ''}
                    onChange={(e) => {
                      const found = allOrders.find((o) => o.id === e.target.value);
                      if (found) setSelectedOrder(found);
                    }}
                    className="w-full h-9 px-2.5 bg-input border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  >
                    {allOrders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.id} • {o.storeName} (S/ {o.total.toFixed(2)})
                      </option>
                    ))}
                    <option value="">Consulta general (Sin pedido específico)</option>
                  </select>
                </div>

                {/* Motivo del Reclamo */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-muted-foreground">
                    Motivo principal
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full h-9 px-2.5 bg-input border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  >
                    <option value="Pedido retrasado">Demora excesiva en entrega (&gt; 35 min)</option>
                    <option value="Producto faltante">Producto faltante o pedido equivocado</option>
                    <option value="Producto en mal estado">Comida derramada o en mal estado</option>
                    <option value="Problema con el vuelto">El repartidor no entregó el vuelto acordado</option>
                    <option value="Cobro duplicado">Cobro no reconocido en tarjeta o Yape</option>
                    <option value="Otro">Otro problema logístico</option>
                  </select>
                </div>

                {/* Detalle */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-muted-foreground">
                    Detalles u observaciones
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Describe lo ocurrido para proceder con la solución o reembolso inmediato..."
                    className="w-full p-2.5 bg-input border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-secondary-container hover:brightness-110 active:scale-95 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Enviar Reclamo</span>
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
