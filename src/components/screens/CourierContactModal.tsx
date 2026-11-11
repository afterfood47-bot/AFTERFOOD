import React, { useState } from 'react';
import { Courier } from '../../types';

interface CourierContactModalProps {
  type: 'call' | 'chat';
  courier: Courier;
  onClose: () => void;
}

export const CourierContactModal: React.FC<CourierContactModalProps> = ({
  type,
  courier,
  onClose,
}) => {
  const [messages, setMessages] = useState<
    { sender: 'me' | 'courier'; text: string; time: string }[]
  >([
    {
      sender: 'courier',
      text: '¡Hola! Ya recogí tu pedido en Midnight Smash Burgers, voy en camino por Av. Larco.',
      time: '11:32 PM',
    },
    {
      sender: 'courier',
      text: 'Llego en aprox. 15 minutos en la moto Honda placa 4821-B.',
      time: '11:34 PM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      sender: 'me' as const,
      text: inputText.trim(),
      time: '11:36 PM',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'courier',
          text: '¡Entendido! Te aviso apenas esté en la puerta / timbre 402 👍',
          time: '11:37 PM',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 shadow-2xl flex flex-col my-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={courier.avatar}
                alt={courier.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-title-md text-sm text-gray-900 font-bold">
                  {courier.name}
                </h3>
                <span className="material-symbols-outlined text-[14px] text-orange-500">
                  verified
                </span>
              </div>
              <p className="font-body-sm text-[11px] text-gray-500">
                {courier.vehicle} • {courier.plate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {type === 'call' ? (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3 animate-pulse">
              <span className="material-symbols-outlined text-[36px]">call</span>
            </div>
            <h4 className="font-headline-sm text-gray-900 mb-1 font-bold">
              Llamar a {courier.name}
            </h4>
            <p className="font-body-sm text-gray-600 mb-6">
              Número seguro: <strong className="text-gray-900">{courier.phone}</strong>
            </p>
            <div className="flex items-center gap-3 w-full">
              <a
                href={`tel:${courier.phone}`}
                className="flex-1 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span>Llamar ahora</span>
              </a>
              <button
                onClick={onClose}
                className="h-12 px-5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-[300px] pt-3">
            {/* Messages box */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[340px] text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.sender === 'me' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                      m.sender === 'me'
                        ? 'bg-purple-600 text-white rounded-br-xs'
                        : 'bg-gray-100 text-gray-800 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Quick suggestion pills (stacked / wrapped vertically) */}
            <div className="flex flex-wrap gap-1.5 py-2">
              {['Ya estoy abajo', 'Toca el timbre 402', 'Llegas en 5 min?'].map((txt) => (
                <button
                  key={txt}
                  type="button"
                  onClick={() => setInputText(txt)}
                  className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] hover:bg-orange-100 hover:text-orange-600 transition-colors"
                >
                  {txt}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe un mensaje al repartidor..."
                className="flex-1 h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-xs outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-orange-500 disabled:opacity-40 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
