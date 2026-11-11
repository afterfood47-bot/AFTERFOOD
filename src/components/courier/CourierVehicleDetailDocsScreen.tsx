import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface CourierVehicleDetailDocsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  vehicleName?: string;
  vehiclePlate?: string;
  vehicleType?: 'moto' | 'bici' | 'auto';
}

interface VehicleDocItem {
  id: string;
  title: string;
  code: string;
  fileName: string;
  status: 'aprobado' | 'en_evaluacion' | 'por_actualizar';
  expiryDate: string;
  required: boolean;
  notes: string;
}

const INITIAL_DOCS: VehicleDocItem[] = [
  {
    id: 'doc-soat',
    title: 'SOAT Digital Electrónico',
    code: 'Póliza N° 84920194-PACIFICO',
    fileName: 'soat_digital_pacifico_2026.pdf',
    status: 'aprobado',
    expiryDate: '15 de Noviembre de 2026',
    required: true,
    notes: 'Válido para transporte comercial y reparto en Trujillo.',
  },
  {
    id: 'doc-tarjeta',
    title: 'Tarjeta de Identificación Vehicular (TIV)',
    code: 'SUNARP Partida N° 11029482',
    fileName: 'tarjeta_propiedad_sunarp_honda.pdf',
    status: 'aprobado',
    expiryDate: 'Permanente',
    required: true,
    notes: 'Registrado a nombre del titular o autorización notarial.',
  },
  {
    id: 'doc-brevete',
    title: 'Licencia de Conducir (Brevete)',
    code: 'Categoría B-IIc (Motos / Motofurgones)',
    fileName: 'brevete_clase_b2c_carlos.pdf',
    status: 'aprobado',
    expiryDate: '28 de Febrero de 2028',
    required: true,
    notes: 'Aprobado por el MTC para conducción en vía pública.',
  },
  {
    id: 'doc-cul',
    title: 'Certificado Único Laboral (CUL)',
    code: 'MTPE Código Verificación #CUL-98412',
    fileName: 'certificado_unico_laboral_mtpe.pdf',
    status: 'aprobado',
    expiryDate: 'Vigente hasta Diciembre 2026',
    required: true,
    notes: 'Verificación policial, judicial y de antecedentes.',
  },
];

export const CourierVehicleDetailDocsScreen: React.FC<CourierVehicleDetailDocsScreenProps> = ({
  onNavigate,
  vehicleName = 'Honda GL-125 Cargo',
  vehiclePlate = '4812-3T',
  vehicleType = 'moto',
}) => {
  const [docs, setDocs] = useState<VehicleDocItem[]>(INITIAL_DOCS);
  const [submittedForReview, setSubmittedForReview] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const handleUpdateDoc = (docId: string) => {
    const timestamp = Date.now().toString().slice(-4);
    setDocs((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            fileName: `nuevo_${doc.id}_${timestamp}.pdf`,
            status: 'en_evaluacion',
          };
        }
        return doc;
      })
    );
    setUploadSuccessMsg('Documento actualizado listo para reenviar a evaluación');
    setTimeout(() => setUploadSuccessMsg(null), 3000);
  };

  const handleResubmit = () => {
    setDocs((prev) =>
      prev.map((doc) => ({
        ...doc,
        status: 'en_evaluacion',
      }))
    );
    setSubmittedForReview(true);
    setTimeout(() => {
      setSubmittedForReview(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-2 animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20]  min-h-[calc(100vh-4rem)]">
      {/* Top Header with Back Button directly to Courier Profile */}
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
            Documentos del Vehículo
          </h1>
          <span className="text-[10px] text-[#64748b] ">
            Expediente Digital Vehicular
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('courier_manage_vehicles')}
          className="text-xs font-bold text-[#6C5CE7] hover:underline"
        >
          Vehículos
        </button>
      </div>

      {/* Vehicle Info Card */}
      <div className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3.5 mb-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">
              {vehicleType === 'moto' ? 'two_wheeler' : vehicleType === 'bici' ? 'pedal_bike' : 'directions_car'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-[#1a1d20] ">
                {vehicleName}
              </h2>
              <span className="text-[10px] font-mono font-bold text-[#FF7A00] bg-[#FF7A00]/10 px-1.5 py-0.5 rounded">
                {vehiclePlate}
              </span>
            </div>
            <p className="text-[11px] text-[#64748b]  mt-0.5">
              Vehículo verificado para entregas en Trujillo
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700  border border-emerald-500/30 text-[10px] font-black uppercase">
          Habilitado
        </span>
      </div>

      {/* Toast Feedback */}
      {uploadSuccessMsg && (
        <div className="mb-3 p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-700  text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <span className="material-symbols-outlined text-[18px] text-blue-500">check_circle</span>
          <span>{uploadSuccessMsg}</span>
        </div>
      )}

      {submittedForReview && (
        <div className="mb-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-800  text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <span className="material-symbols-outlined text-[18px] text-amber-500 animate-spin">
            progress_activity
          </span>
          <span>¡Documentos actualizados y reenviados a evaluación! Nuestro equipo validará los cambios en breve.</span>
        </div>
      )}

      {/* Document List */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b] ">
          Documentos Cargados ({docs.length})
        </span>

        {docs.map((doc) => {
          const isApproved = doc.status === 'aprobado';
          const isPending = doc.status === 'en_evaluacion';

          return (
            <div
              key={doc.id}
              className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3.5 shadow-xs flex flex-col gap-2.5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100  flex items-center justify-center text-[#6C5CE7] shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#1a1d20]  leading-tight">
                      {doc.title}
                    </h3>
                    <p className="text-[10px] font-mono text-[#64748b]  mt-0.5">
                      {doc.code}
                    </p>
                    <p className="text-[10px] text-[#475569]  mt-1 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[13px] text-[#6C5CE7]">attachment</span>
                      <span className="truncate max-w-[190px]">{doc.fileName}</span>
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {isApproved ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700  border border-emerald-500/30 text-[9px] font-black uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      <span>Aprobado</span>
                    </span>
                  ) : isPending ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800  border border-amber-500/30 text-[9px] font-black uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] animate-spin">sync</span>
                      <span>En evaluación</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700  border border-rose-500/30 text-[9px] font-black uppercase">
                      Por actualizar
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0]  text-[10px]">
                <span className="text-[#64748b] ">
                  Vigencia: <strong className="text-[#1a1d20] ">{doc.expiryDate}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => handleUpdateDoc(doc.id)}
                  className="text-xs font-bold text-[#6C5CE7] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">file_upload</span>
                  <span>Cargar reemplazo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Action Button: Actualizar y reenviar a evaluación */}
      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleResubmit}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#FF7A00] hover:opacity-95 active:scale-[0.98] text-white font-extrabold text-xs transition-all shadow-[0_8px_20px_rgba(108,92,231,0.35)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          <span>Actualizar y reenviar a evaluación</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('courier_profile')}
          className="w-full h-11 rounded-2xl bg-white  border border-[#e2e8f0]  hover:bg-slate-50  text-[#64748b]  hover:text-[#1a1d20] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Volver al Perfil del Repartidor</span>
        </button>
      </div>
    </div>
  );
};
