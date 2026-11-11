import React, { useRef, useState } from 'react';
import { AppScreen } from '../../types';

interface CourierDeliveryPinScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onDeliveryConfirmed: () => void;
}

export const CourierDeliveryPinScreen: React.FC<CourierDeliveryPinScreenProps> = ({
  onNavigate,
  onDeliveryConfirmed,
}) => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [deliveryPhoto, setDeliveryPhoto] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = clean;
    setPin(newPin);
    setErrorMsg(null);

    // Auto focus next input
    if (clean && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleFillDemoPin = () => {
    setPin(['4', '8', '2', '1']);
    setErrorMsg(null);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDeliveryPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Simulate taking a photo of the food bag on doorstep
      setDeliveryPhoto(
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80'
      );
    }
  };

  const handleSimulateDefaultPhoto = () => {
    setDeliveryPhoto(
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80'
    );
  };

  const handleSubmitDelivery = () => {
    const fullPin = pin.join('');
    if (fullPin.length < 4) {
      setErrorMsg('Por favor ingresa los 4 dígitos del PIN de entrega.');
      return;
    }
    onDeliveryConfirmed();
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between p-5 bg-[#f8f9fa]  text-[#1a1d20]  select-none animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 flex items-center justify-center text-[#6C5CE7] ">
              <span className="material-symbols-outlined text-[22px]">pin</span>
            </div>
            <div>
              <h2 className="font-title-lg font-black text-[#1a1d20]  text-lg leading-tight">
                Validación de Entrega
              </h2>
              <p className="text-xs text-[#64748b] ">Pedido #AF-3092 • Juan Pérez</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-600  border border-emerald-500/30">
            En Destino
          </span>
        </div>

        {/* Security Explanation Banner */}
        <div className="bg-white  border border-slate-200  rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <span className="material-symbols-outlined text-[#FF7A00] text-[20px] shrink-0">
            lock
          </span>
          <p className="text-xs font-semibold text-[#1a1d20]  leading-snug">
            Solicita al cliente su PIN de 4 dígitos
          </p>
        </div>
      </div>

      {/* Center PIN Entry Section */}
      <div className="my-auto flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase font-extrabold text-[#64748b]  tracking-wider">
            Ingresa el PIN del Cliente
          </span>
          
          {/* 4 Digit Inputs */}
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={pin[index]}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-16 rounded-2xl text-center text-2xl font-black bg-white  border-2 text-[#1a1d20]  outline-none transition-all shadow-xs ${
                  pin[index]
                    ? 'border-[#6C5CE7] shadow-[0_0_15px_rgba(108,92,231,0.4)]'
                    : 'border-slate-200  focus:border-[#FF7A00]'
                }`}
              />
            ))}
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-bold animate-shake">{errorMsg}</p>
          )}

          {/* Quick Demo Fill Helper */}
          <button
            type="button"
            onClick={handleFillDemoPin}
            className="text-[11px] text-[#6C5CE7]  hover:underline font-bold mt-1 cursor-pointer"
          >
            Usar PIN de prueba: <strong>4821</strong>
          </button>
        </div>

        {/* Photo Capture Section (Opcional) */}
        <div className="w-full max-w-sm bg-white  border border-slate-200  rounded-2xl p-4 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#FF7A00]">
                photo_camera
              </span>
              <span className="text-xs font-bold text-[#1a1d20] ">
                Foto de entrega (Opcional)
              </span>
            </div>
            <span className="text-[10px] text-[#64748b] ">Respaldo seguro</span>
          </div>

          {deliveryPhoto ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-200  group">
              <img
                src={deliveryPhoto}
                alt="Foto de entrega"
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => setDeliveryPhoto(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors cursor-pointer"
                title="Eliminar foto"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
              </button>
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                <span>Foto adjunta</span>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-3 px-3 rounded-xl border border-dashed border-slate-300  hover:border-[#6C5CE7] bg-slate-50  text-xs font-bold text-[#64748b]  hover:text-[#1a1d20]  flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                <span>Subir foto</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateDefaultPhoto}
                className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200   text-xs font-bold text-[#1a1d20]  flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer border border-transparent "
                title="Simular foto de entrega"
              >
                <span className="material-symbols-outlined text-[18px] text-[#6C5CE7]">auto_fix_high</span>
                <span>Simular</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Submit Action */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={handleSubmitDelivery}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#FF7A00] hover:opacity-95 active:scale-95 text-white font-extrabold text-base transition-all shadow-[0_8px_30px_rgba(108,92,231,0.5)] flex items-center justify-center gap-2 border border-white/20"
        >
          <span className="material-symbols-outlined text-[22px]">verified</span>
          <span>Marcar como Entregado</span>
        </button>
      </div>
    </div>
  );
};
