import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MAKE_WEBHOOKS, submitToMakeWebhook } from '../../services/makeWebhooks';

interface CourierVehicleDocsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSubmitVerification?: (vehicleData: any) => void;
  personalData?: Record<string, unknown> | null;
}

export const CourierVehicleDocsScreen: React.FC<CourierVehicleDocsScreenProps> = ({
  onNavigate,
  onSubmitVerification,
  personalData,
}) => {
  const [vehicle, setVehicle] = useState<'bike' | 'moto' | 'auto'>('moto');
  const [vehicleModel, setVehicleModel] = useState('');
  const [plate, setPlate] = useState('');
  const [bicycleDescription, setBicycleDescription] = useState('');

  // File upload states: Brevete, SOAT, Tarjeta Propiedad (Opcional), and Certificado Único Laboral (CUL - Obligatorio)
  const [breveteFile, setBreveteFile] = useState<string | null>(null);
  const [soatFile, setSoatFile] = useState<string | null>(null);
  const [propertyCardFile, setPropertyCardFile] = useState<string | null>(null); // Opcional
  const [culFile, setCulFile] = useState<string | null>(null); // Obligatorio CUL
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isMotorized = vehicle === 'moto' || vehicle === 'auto';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (vehicle === 'bike' && !bicycleDescription.trim()) {
      setError('Por favor ingresa una descripción de la bicicleta (ej: color, marca, modelo).');
      return;
    }
    if (isMotorized && !vehicleModel.trim()) {
      setError('Por favor ingresa la marca y modelo de tu vehículo.');
      return;
    }
    if (isMotorized && (!breveteFile || !soatFile)) {
      setError('Para vehículos motorizados se requiere adjuntar Brevete y SOAT vigente.');
      return;
    }
    if (!culFile) {
      setError('El Certificado Único Laboral (CUL) es obligatorio para verificar tu cuenta de repartidor.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const payload = {
      role: 'repartidor',
      ...(personalData || {}),
      vehicle,
      vehicleModel: isMotorized ? vehicleModel.trim() : null,
      plate: isMotorized ? plate.trim() : null,
      bicycleDescription: vehicle === 'bike' ? bicycleDescription.trim() : null,
      breveteFile: isMotorized ? breveteFile : null,
      soatFile: isMotorized ? soatFile : null,
      propertyCardFile: isMotorized ? propertyCardFile : null,
      culFile,
      submittedAt: new Date().toISOString(),
    };

    try {
      await submitToMakeWebhook(MAKE_WEBHOOKS.COURIER_REGISTER, payload);

      setIsSubmitting(false);
      setSuccessMessage('¡Registro enviado con éxito! Tu expediente de repartidor pasó a verificación.');

      setTimeout(() => {
        if (onSubmitVerification) {
          onSubmitVerification(payload);
        }
        onNavigate('courier_verification');
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error && err.message
          ? `Error al enviar el registro: ${err.message}`
          : 'No se pudo enviar tu registro. Verifica tu conexión e inténtalo de nuevo.'
      );
    }
  };

  const simulateUpload = (type: 'brevete' | 'soat' | 'propertyCard' | 'cul') => {
    const rand = Date.now().toString().slice(-4);
    if (type === 'brevete') setBreveteFile(`licencia_conducir_${rand}.pdf`);
    if (type === 'soat') setSoatFile(`certificado_soat_${rand}.pdf`);
    if (type === 'propertyCard') setPropertyCardFile(`tarjeta_propiedad_${rand}.pdf`);
    if (type === 'cul') setCulFile(`certificado_unico_laboral_cul_${rand}.pdf`);
    setError(null);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-24 pt-3 animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20] ">
      {/* Header & Back */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => onNavigate('courier_register')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-[#64748b]  hover:text-[#1a1d20]  active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 bg-white  px-3.5 py-1 rounded-full border border-slate-200  shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
          <span className="text-[11px] font-bold text-[#FF7A00]">Paso 2 de 2: Vehículo y CUL</span>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-black text-[#1a1d20]  tracking-tight">
          Vehículo y Documentación
        </h1>
        <p className="text-xs text-[#64748b]  mt-0.5 leading-relaxed">
          Selecciona tu medio de transporte e ingresa tu Certificado Único Laboral (CUL) y documentos vehiculares.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-600  text-xs flex items-center gap-2 animate-in fade-in shadow-sm">
          <span className="material-symbols-outlined text-[18px] shrink-0">warning</span>
          <span className="font-semibold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Interactive Vehicle Selector */}
        <div className="bg-white  border border-slate-200  rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm">
          <h2 className="text-xs font-black text-[#FF7A00] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">commute</span>
            <span>Tipo de Vehículo</span>
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Bicicleta */}
            <button
              type="button"
              onClick={() => setVehicle('bike')}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                vehicle === 'bike'
                  ? 'border-[#6C5CE7] bg-[#6C5CE7]/15 text-[#1a1d20]  shadow-md ring-1 ring-[#6C5CE7]/50'
                  : 'border-slate-200  bg-slate-50  text-[#64748b]  hover:border-[#6C5CE7]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white  border border-slate-200  flex items-center justify-center text-[#6C5CE7] shadow-xs">
                <span className="material-symbols-outlined text-[24px]">pedal_bike</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-black leading-tight text-[#1a1d20] ">Bicicleta</p>
                <span className="text-[9px] text-[#64748b] ">Sin SOAT</span>
              </div>
            </button>

            {/* Motocicleta (Top) */}
            <button
              type="button"
              onClick={() => setVehicle('moto')}
              className={`p-3 rounded-2xl border relative flex flex-col items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                vehicle === 'moto'
                  ? 'border-[#FF7A00] bg-[#FF7A00]/15 text-[#1a1d20]  shadow-md ring-2 ring-[#FF7A00]/50'
                  : 'border-slate-200  bg-slate-50  text-[#64748b]  hover:border-[#FF7A00]/50'
              }`}
            >
              <span className="absolute -top-2 px-2 py-0.5 rounded-full bg-[#FF7A00] text-white text-[8px] font-black uppercase shadow-xs">
                Más elegido
              </span>
              <div className="w-10 h-10 rounded-xl bg-white  border border-slate-200  flex items-center justify-center text-[#FF7A00] shadow-xs">
                <span className="material-symbols-outlined text-[24px]">two_wheeler</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-black leading-tight text-[#1a1d20] ">Motocicleta</p>
                <span className="text-[9px] text-[#64748b] ">Mayor ganancia</span>
              </div>
            </button>

            {/* Automóvil */}
            <button
              type="button"
              onClick={() => setVehicle('auto')}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                vehicle === 'auto'
                  ? 'border-[#6C5CE7] bg-[#6C5CE7]/15 text-[#1a1d20]  shadow-md ring-1 ring-[#6C5CE7]/50'
                  : 'border-slate-200  bg-slate-50  text-[#64748b]  hover:border-[#6C5CE7]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white  border border-slate-200  flex items-center justify-center text-[#6C5CE7] shadow-xs">
                <span className="material-symbols-outlined text-[24px]">directions_car</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-black leading-tight text-[#1a1d20] ">Automóvil</p>
                <span className="text-[9px] text-[#64748b] ">Pedidos grandes</span>
              </div>
            </button>
          </div>

          {/* Datos de la Bicicleta si es seleccionado */}
          {vehicle === 'bike' && (
            <div className="flex flex-col gap-3 mt-1 pt-3 border-t border-slate-200">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1a1d20]">
                  Descripción de la Bicicleta <span className="text-[#FF7A00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bicycleDescription}
                  onChange={(e) => setBicycleDescription(e.target.value)}
                  placeholder="Ej: Color negro mate, marca Trek, aro 29, montañera"
                  className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs text-[#1a1d20] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                />
                <span className="text-[10px] text-slate-400 leading-tight">
                  Campo obligatorio. Indica características visuales de tu bicicleta (color, marca, modelo).
                </span>
              </div>
            </div>
          )}

          {/* Datos del Vehículo si es motorizado */}
          {isMotorized && (
            <div className="flex flex-col gap-3 mt-1 pt-3 border-t border-slate-200 ">
              {/* Marca y Modelo del vehículo */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1a1d20] ">
                  Marca y Modelo del Vehículo <span className="text-[#FF7A00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="Ej. Honda CB 125, Yamaha FZ 150, Pulsar NS 200"
                  className="w-full h-11 px-3 bg-white  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                />
              </div>

              {/* Número de Placa */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1a1d20] ">
                  Número de Placa ({vehicle === 'moto' ? 'Motocicleta' : 'Auto'}) <span className="text-[#FF7A00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  placeholder="Ej. 4821-B o T3B-120"
                  className="w-full h-11 px-3 bg-white  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  font-black tracking-wider uppercase placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Cajas de upload: CUL (Obligatorio), Brevete, SOAT, Tarjeta Propiedad (Opcional) */}
        <div className="bg-white  border border-slate-200  rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black text-[#FF7A00] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Documentación Obligatoria</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-600  bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Verificación 24H
            </span>
          </div>

          {/* DOCUMENTO REQUERIDO 1: CERTIFICADO ÚNICO LABORAL (CUL) */}
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-amber-500/5  border border-amber-500/30">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#1a1d20] ">
                  Certificado Único Laboral (CUL) <span className="text-[#FF7A00]">*</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] font-black uppercase">
                  MTPE Oficial
                </span>
              </div>
              {culFile ? (
                <span className="text-[10px] text-emerald-600  font-bold flex items-center gap-1 animate-in fade-in">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Adjunto
                </span>
              ) : (
                <span className="text-[10px] text-[#FF7A00] font-bold">Obligatorio</span>
              )}
            </div>

            <p className="text-[11px] text-[#64748b]  leading-snug">
              Documento oficial gratuito emitido por el Ministerio de Trabajo (MTPE). Puedes descargarlo en minutos en <strong>empleosperu.gob.pe</strong>. Contiene identidad y trayectoria validada.
            </p>

            <div
              onClick={() => simulateUpload('cul')}
              className={`p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-between mt-1 ${
                culFile
                  ? 'border-emerald-500/70 bg-emerald-500/10'
                  : 'border-slate-300  bg-white  hover:border-[#FF7A00]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    culFile
                      ? 'bg-emerald-500/20 text-emerald-600 '
                      : 'bg-slate-200  text-[#64748b] '
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {culFile ? 'check' : 'assignment'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate ${culFile ? 'text-[#1a1d20] ' : 'text-[#64748b] '}`}>
                    {culFile || 'Subir Certificado Único Laboral (CUL) en PDF'}
                  </p>
                  <p className="text-[10px] text-[#64748b] ">PDF oficial con código QR o firma digital</p>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                  culFile
                    ? 'bg-emerald-500/20 text-emerald-700  border border-emerald-500/40'
                    : 'bg-slate-200  text-[#1a1d20]  hover:bg-[#FF7A00] hover:text-white'
                }`}
              >
                {culFile ? 'Cambiar' : 'Subir CUL'}
              </span>
            </div>
          </div>

          {/* Documentos de Tránsito para motorizados */}
          {isMotorized && (
            <>
              {/* Brevete */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1a1d20] ">
                    Brevete / Licencia de Conducir <span className="text-[#FF7A00]">*</span>
                  </span>
                  {breveteFile ? (
                    <span className="text-[10px] text-emerald-600  font-bold flex items-center gap-1 animate-in fade-in">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Adjunto
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#64748b] ">Obligatorio</span>
                  )}
                </div>
                <div
                  onClick={() => simulateUpload('brevete')}
                  className={`p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-between ${
                    breveteFile
                      ? 'border-emerald-500/70 bg-emerald-500/10'
                      : 'border-slate-300  bg-slate-50/60  hover:border-[#6C5CE7]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        breveteFile ? 'bg-emerald-500/20 text-emerald-600 ' : 'bg-slate-200  text-[#64748b] '
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {breveteFile ? 'check' : 'badge'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${breveteFile ? 'text-[#1a1d20] ' : 'text-[#64748b] '}`}>
                        {breveteFile || 'Subir foto o PDF del Brevete'}
                      </p>
                      <p className="text-[10px] text-[#64748b] ">Clase B-IIb (Moto) o A-I (Auto)</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                      breveteFile
                        ? 'bg-emerald-500/20 text-emerald-700  border border-emerald-500/40'
                        : 'bg-slate-200  text-[#1a1d20]  hover:bg-[#6C5CE7] hover:text-white'
                    }`}
                  >
                    {breveteFile ? 'Cambiar' : 'Subir archivo'}
                  </span>
                </div>
              </div>

              {/* SOAT vigente */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1a1d20] ">
                    SOAT Vigente <span className="text-[#FF7A00]">*</span>
                  </span>
                  {soatFile ? (
                    <span className="text-[10px] text-emerald-600  font-bold flex items-center gap-1 animate-in fade-in">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Adjunto
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#64748b] ">Obligatorio</span>
                  )}
                </div>
                <div
                  onClick={() => simulateUpload('soat')}
                  className={`p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-between ${
                    soatFile
                      ? 'border-emerald-500/70 bg-emerald-500/10'
                      : 'border-slate-300  bg-slate-50/60  hover:border-[#FF7A00]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        soatFile ? 'bg-emerald-500/20 text-emerald-600 ' : 'bg-slate-200  text-[#64748b] '
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {soatFile ? 'check' : 'verified_user'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${soatFile ? 'text-[#1a1d20] ' : 'text-[#64748b] '}`}>
                        {soatFile || 'Subir certificado SOAT vigente'}
                      </p>
                      <p className="text-[10px] text-[#64748b] ">Digital o físico con vigencia al día</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                      soatFile
                        ? 'bg-emerald-500/20 text-emerald-700  border border-emerald-500/40'
                        : 'bg-slate-200  text-[#1a1d20]  hover:bg-[#FF7A00] hover:text-white'
                    }`}
                  >
                    {soatFile ? 'Cambiar' : 'Subir archivo'}
                  </span>
                </div>
              </div>

              {/* Tarjeta de propiedad (Opcional) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#1a1d20] ">Tarjeta de Propiedad</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200  text-[#64748b]  font-bold uppercase">
                      Opcional
                    </span>
                  </div>
                  {propertyCardFile && (
                    <span className="text-[10px] text-emerald-600  font-bold flex items-center gap-1 animate-in fade-in">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Adjunto
                    </span>
                  )}
                </div>
                <div
                  onClick={() => simulateUpload('propertyCard')}
                  className={`p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-between ${
                    propertyCardFile
                      ? 'border-emerald-500/70 bg-emerald-500/10'
                      : 'border-slate-300  bg-slate-50/60  hover:border-[#6C5CE7]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        propertyCardFile ? 'bg-emerald-500/20 text-emerald-600 ' : 'bg-slate-200  text-[#64748b] '
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {propertyCardFile ? 'check' : 'fact_check'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${propertyCardFile ? 'text-[#1a1d20] ' : 'text-[#64748b] '}`}>
                        {propertyCardFile || 'Subir Tarjeta de Propiedad'}
                      </p>
                      <p className="text-[10px] text-[#64748b] ">Documento SUNARP (Acelera la validación)</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                      propertyCardFile
                        ? 'bg-emerald-500/20 text-emerald-700  border border-emerald-500/40'
                        : 'bg-slate-200  text-[#1a1d20]  hover:bg-[#6C5CE7] hover:text-white'
                    }`}
                  >
                    {propertyCardFile ? 'Cambiar' : 'Subir archivo'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {successMessage && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">check_circle</span>
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || Boolean(successMessage)}
          className="w-full h-13 mt-2 rounded-full bg-[#FF7A00] hover:bg-[#e66e00] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] text-white font-extrabold text-sm shadow-[0_8px_24px_-4px_rgba(255,122,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              <span>Enviando verificación...</span>
            </>
          ) : successMessage ? (
            <>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>¡Registro confirmado!</span>
            </>
          ) : (
            <>
              <span>Enviar para verificación</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

