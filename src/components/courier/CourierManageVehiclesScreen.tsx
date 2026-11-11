import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface CourierManageVehiclesScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export interface RegisteredVehicle {
  id: string;
  type: 'moto' | 'bici' | 'auto';
  make: string;
  model: string;
  plate: string;
  year: string;
  color: string;
  soatStatus: string;
  isActive: boolean;
}

const INITIAL_VEHICLES: RegisteredVehicle[] = [
  {
    id: 'veh-1',
    type: 'moto',
    make: 'Honda',
    model: 'GL-125 Cargo',
    plate: '4812-3T',
    year: '2023',
    color: 'Rojo Brillante',
    soatStatus: 'SOAT Vigente hasta Nov 2026',
    isActive: true,
  },
  {
    id: 'veh-2',
    type: 'moto',
    make: 'Yamaha',
    model: 'FZ-25 Urban',
    plate: '5931-4B',
    year: '2022',
    color: 'Azul Metálico',
    soatStatus: 'SOAT Vigente hasta Ago 2026',
    isActive: false,
  },
  {
    id: 'veh-3',
    type: 'bici',
    make: 'Trek',
    model: 'Marlin 7 Pro',
    plate: 'Sin Placa (Ciclo)',
    year: '2024',
    color: 'Negro Mate',
    soatStatus: 'No requiere SOAT (Ciclo)',
    isActive: false,
  },
];

export const CourierManageVehiclesScreen: React.FC<CourierManageVehiclesScreenProps> = ({
  onNavigate,
}) => {
  const [vehicles, setVehicles] = useState<RegisteredVehicle[]>(INITIAL_VEHICLES);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<RegisteredVehicle | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // New vehicle form state
  const [newType, setNewType] = useState<'moto' | 'bici' | 'auto'>('moto');
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newPlate, setNewPlate] = useState('');
  const [newYear, setNewYear] = useState('2023');
  const [newColor, setNewColor] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const handleSetActive = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        isActive: v.id === id,
      }))
    );
    const selected = vehicles.find((v) => v.id === id);
    showToast(`Vehículo activo: ${selected?.make} ${selected?.model}`);
  };

  const handleDeleteConfirm = () => {
    if (!vehicleToDelete) return;
    if (vehicles.length <= 1) {
      showToast('Debes mantener al menos un vehículo registrado.');
      setVehicleToDelete(null);
      return;
    }
    const wasActive = vehicleToDelete.isActive;
    const remaining = vehicles.filter((v) => v.id !== vehicleToDelete.id);
    if (wasActive && remaining.length > 0) {
      remaining[0].isActive = true;
    }
    setVehicles(remaining);
    showToast(`Vehículo ${vehicleToDelete.make} ${vehicleToDelete.model} eliminado.`);
    setVehicleToDelete(null);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMake.trim() || !newModel.trim()) {
      setFormError('Por favor ingresa la marca y el modelo.');
      return;
    }
    if (newType !== 'bici' && !newPlate.trim()) {
      setFormError('La placa de rodaje es obligatoria para vehículos motorizados.');
      return;
    }

    const newVehicle: RegisteredVehicle = {
      id: `veh-${Date.now()}`,
      type: newType,
      make: newMake.trim(),
      model: newModel.trim(),
      plate: newType === 'bici' ? (newPlate.trim() || 'Sin Placa (Ciclo)') : newPlate.trim().toUpperCase(),
      year: newYear,
      color: newColor.trim() || 'Estándar',
      soatStatus: newType === 'bici' ? 'No requiere SOAT (Ciclo)' : 'Pendiente de verificación SOAT',
      isActive: false,
    };

    setVehicles((prev) => [...prev, newVehicle]);
    setShowAddModal(false);
    // Reset form
    setNewMake('');
    setNewModel('');
    setNewPlate('');
    setNewColor('');
    setFormError(null);
    showToast(`¡Nuevo vehículo ${newVehicle.make} registrado con éxito!`);
  };

  const activeVehicle = vehicles.find((v) => v.isActive) || vehicles[0];

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-2 animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20]  min-h-[calc(100vh-4rem)]">
      {/* Top Header with Back Navigation */}
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
            Gestionar Vehículos
          </h1>
          <span className="text-[10px] text-[#64748b] ">
            {vehicles.length} vehículo{vehicles.length !== 1 ? 's' : ''} registrado{vehicles.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="w-9 h-9" />
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="mb-3 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700  text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <span className="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Banner del Vehículo de Uso Actual (Activo) */}
      {activeVehicle && (
        <div className="mb-4 bg-gradient-to-br from-[#6C5CE7]/10 via-[#FF7A00]/10 to-transparent border-2 border-[#6C5CE7] rounded-3xl p-4 shadow-sm flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[26px]">
                {activeVehicle.type === 'moto' ? 'two_wheeler' : activeVehicle.type === 'bici' ? 'pedal_bike' : 'directions_car'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#6C5CE7] text-white text-[9px] font-black uppercase tracking-wider">
                  En Uso Actualmente
                </span>
                <span className="text-xs font-mono font-bold text-[#FF7A00]">
                  {activeVehicle.plate}
                </span>
              </div>
              <h2 className="text-base font-black text-[#1a1d20]  mt-0.5">
                {activeVehicle.make} {activeVehicle.model}
              </h2>
              <p className="text-[11px] text-[#64748b] ">
                {activeVehicle.color} • {activeVehicle.year} • {activeVehicle.soatStatus}
              </p>
            </div>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
        </div>
      )}

      {/* Lista de Vehículos Registrados */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b] ">
            Mis Vehículos Registrados
          </span>
        </div>

        {vehicles.map((v) => {
          const isCurrent = v.isActive;
          return (
            <div
              key={v.id}
              className={`p-4 rounded-3xl border transition-all shadow-xs flex flex-col gap-3 ${
                isCurrent
                  ? 'bg-white  border-2 border-[#6C5CE7] shadow-sm'
                  : 'bg-white  border-[#e2e8f0] '
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? 'bg-[#6C5CE7]/15 text-[#6C5CE7]'
                        : 'bg-slate-100  text-[#64748b] '
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {v.type === 'moto' ? 'two_wheeler' : v.type === 'bici' ? 'pedal_bike' : 'directions_car'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md font-black text-sm text-[#1a1d20] ">
                        {v.make} {v.model}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700  border border-emerald-500/30 text-[9px] font-black uppercase">
                          Activo
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-bold text-[#FF7A00] bg-[#FF7A00]/10 px-1.5 py-0.2 rounded">
                        {v.plate}
                      </span>
                      <span className="text-[11px] text-[#64748b] ">
                        {v.year} • {v.color}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#64748b]  mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-emerald-500">verified</span>
                      <span>{v.soatStatus}</span>
                    </p>
                  </div>
                </div>

                {/* Acciones: Eliminar */}
                <button
                  type="button"
                  onClick={() => setVehicleToDelete(v)}
                  aria-label="Eliminar vehículo"
                  className="w-8 h-8 rounded-xl bg-slate-50  hover:bg-rose-500/10 hover:text-rose-600 text-[#94a3b8] flex items-center justify-center transition-colors cursor-pointer"
                  title="Eliminar vehículo"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              {/* Botón de Selección como Activo */}
              <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0] ">
                <button
                  type="button"
                  onClick={() => onNavigate('courier_vehicle_docs_detail')}
                  className="text-[11px] font-bold text-[#64748b]  hover:text-[#6C5CE7] flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">description</span>
                  <span>Ver documentos</span>
                </button>

                {isCurrent ? (
                  <span className="text-xs font-extrabold text-emerald-600  flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Vehículo de uso actual</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetActive(v.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-95 text-white font-extrabold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">radio_button_checked</span>
                    <span>Usar este vehículo</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón Flotante para Agregar Nuevo Vehículo */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="w-full h-12 rounded-2xl bg-white  hover:bg-slate-50  active:scale-[0.99] border-2 border-dashed border-[#6C5CE7] text-[#6C5CE7] font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Registrar Otro Vehículo (Moto, Bici o Auto)</span>
        </button>
      </div>

      {/* Modal: Agregar Nuevo Vehículo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white  border border-[#e2e8f0]  rounded-3xl p-5 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] ">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
                </div>
                <h3 className="font-title-md font-black text-sm text-[#1a1d20] ">
                  Agregar Nuevo Vehículo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#64748b] hover:text-[#1a1d20]   cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="flex flex-col gap-3">
              {formError && (
                <p className="text-xs text-red-500 font-bold bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                  {formError}
                </p>
              )}

              {/* Selector de Tipo */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748b] ">
                  Tipo de Transporte
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('moto')}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      newType === 'moto'
                        ? 'border-[#6C5CE7] bg-[#6C5CE7]/15 text-[#6C5CE7] font-bold'
                        : 'border-[#e2e8f0]  text-[#64748b]  bg-white '
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                    <span className="text-[10px]">Moto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewType('bici')}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      newType === 'bici'
                        ? 'border-[#6C5CE7] bg-[#6C5CE7]/15 text-[#6C5CE7] font-bold'
                        : 'border-[#e2e8f0]  text-[#64748b]  bg-white '
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">pedal_bike</span>
                    <span className="text-[10px]">Bicicleta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewType('auto')}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      newType === 'auto'
                        ? 'border-[#6C5CE7] bg-[#6C5CE7]/15 text-[#6C5CE7] font-bold'
                        : 'border-[#e2e8f0]  text-[#64748b]  bg-white '
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">directions_car</span>
                    <span className="text-[10px]">Auto / Torito</span>
                  </button>
                </div>
              </div>

              {/* Marca & Modelo */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#64748b] ">
                    Marca
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Honda, Bajaj, Trek"
                    value={newMake}
                    onChange={(e) => setNewMake(e.target.value)}
                    className="w-full h-10 px-3 bg-[#f8f9fa]  border border-[#e2e8f0]  rounded-xl text-xs text-[#1a1d20]  font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#64748b] ">
                    Modelo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Wave 110, Pulsar"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full h-10 px-3 bg-[#f8f9fa]  border border-[#e2e8f0]  rounded-xl text-xs text-[#1a1d20]  font-medium"
                  />
                </div>
              </div>

              {/* Placa & Año */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#64748b] ">
                    Placa de Rodaje {newType === 'bici' && '(Opcional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 1234-5B"
                    value={newPlate}
                    onChange={(e) => setNewPlate(e.target.value)}
                    className="w-full h-10 px-3 bg-[#f8f9fa]  border border-[#e2e8f0]  rounded-xl text-xs text-[#1a1d20]  font-mono uppercase font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#64748b] ">
                    Año de Fabricación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 2023"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full h-10 px-3 bg-[#f8f9fa]  border border-[#e2e8f0]  rounded-xl text-xs text-[#1a1d20] "
                  />
                </div>
              </div>

              {/* Color */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#64748b] ">
                  Color Predominante
                </label>
                <input
                  type="text"
                  placeholder="Ej. Negro Mate, Rojo, Blanco"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f8f9fa]  border border-[#e2e8f0]  rounded-xl text-xs text-[#1a1d20] "
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 h-11 rounded-xl bg-slate-100 hover:bg-slate-200  text-[#64748b]  font-bold text-xs cursor-pointer transition-colors border border-transparent "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-95 text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Registrar Vehículo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Eliminación */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xs bg-white  border border-[#e2e8f0]  rounded-3xl p-5 text-center flex flex-col items-center gap-3 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">delete_forever</span>
            </div>
            <h3 className="font-title-md font-black text-sm text-[#1a1d20] ">
              ¿Eliminar Vehículo?
            </h3>
            <p className="text-xs text-[#64748b] ">
              ¿Estás seguro de que deseas eliminar <strong>{vehicleToDelete.make} {vehicleToDelete.model}</strong> ({vehicleToDelete.plate}) de tu cuenta?
            </p>

            <div className="flex gap-2 w-full mt-1">
              <button
                type="button"
                onClick={() => setVehicleToDelete(null)}
                className="flex-1 h-10 rounded-xl bg-slate-100  text-[#64748b]  font-bold text-xs cursor-pointer border border-transparent "
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 h-10 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
