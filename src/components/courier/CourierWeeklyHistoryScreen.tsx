import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface CourierWeeklyHistoryScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onReconnect: () => void;
}

interface DayBreakdown {
  day: string;
  date: string;
  earnings: number;
  orders: number;
  hours: string;
}

interface WeekBreakdown {
  week: string;
  period: string;
  earnings: number;
  orders: number;
  hours: string;
  isBest?: boolean;
  isCurrent?: boolean;
}

const WEEKLY_DAYS: DayBreakdown[] = [
  { day: 'Lunes', date: '29 Sep', earnings: 68.5, orders: 6, hours: '3.5h' },
  { day: 'Martes', date: '30 Sep', earnings: 74.0, orders: 7, hours: '4.0h' },
  { day: 'Miércoles', date: '01 Oct', earnings: 82.0, orders: 7, hours: '4.2h' },
  { day: 'Jueves', date: '02 Oct', earnings: 91.5, orders: 8, hours: '4.8h' },
  { day: 'Viernes', date: '03 Oct', earnings: 104.5, orders: 9, hours: '5.2h' },
  { day: 'Sábado', date: '04 Oct', earnings: 62.0, orders: 5, hours: '3.0h' },
  { day: 'Domingo (Hoy)', date: '05 Oct', earnings: 11.5, orders: 1, hours: '0.5h' },
];

const MONTHLY_WEEKS: WeekBreakdown[] = [
  { week: 'Semana 1', period: '08 Sep - 14 Sep', earnings: 498.2, orders: 44, hours: '24.5h' },
  { week: 'Semana 2', period: '15 Sep - 21 Sep', earnings: 542.1, orders: 48, hours: '26.0h' },
  { week: 'Semana 3', period: '22 Sep - 28 Sep', earnings: 623.0, orders: 52, hours: '28.5h', isBest: true },
  { week: 'Semana 4', period: '29 Sep - Hoy', earnings: 482.5, orders: 42, hours: '21.2h', isCurrent: true },
];

export const CourierWeeklyHistoryScreen: React.FC<CourierWeeklyHistoryScreenProps> = ({
  onNavigate,
  onReconnect,
}) => {
  const [showDaysModal, setShowDaysModal] = useState<boolean>(false);
  const [showMonthlyModal, setShowMonthlyModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState<boolean>(false);

  const handleWithdraw = () => {
    if (isWithdrawing || withdrawnSuccess) return;
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawnSuccess(true);
      setTimeout(() => {
        setWithdrawnSuccess(false);
        setShowWithdrawModal(false);
      }, 2000);
    }, 1400);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 bg-[#f8f9fa]  text-[#1a1d20]  select-none animate-in fade-in duration-200">
      {/* Top Header with Back Navigation and Performance Insights button */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Back Button routing reliably back to courier profile */}
            <button
              type="button"
              onClick={() => onNavigate('courier_profile')}
              aria-label="Volver a Mi Perfil"
              className="w-9 h-9 rounded-full bg-white  border border-[#e2e8f0]  flex items-center justify-center text-[#64748b]  hover:text-[#1a1d20]  shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div>
              <h2 className="font-title-lg font-black text-[#1a1d20]  text-lg leading-tight">
                Desempeño Semanal
              </h2>
              <p className="text-xs text-[#64748b] ">Trujillo Centro • Turno 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón con icono de gráfico: Análisis de desempeño mensual */}
            <button
              type="button"
              onClick={() => setShowMonthlyModal(true)}
              className="w-9 h-9 rounded-xl bg-white  border border-[#e2e8f0]  flex items-center justify-center text-[#6C5CE7] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Análisis de desempeño mensual"
            >
              <span className="material-symbols-outlined text-[20px]">insights</span>
            </button>

            {/* Insignia Nivel Oro con alto contraste en Modo Claro */}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300    shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-amber-600 ">military_tech</span>
              <span>Nivel Oro</span>
            </span>
          </div>
        </div>

        {/* Tarjeta Resumen: Acumulado Semanal (S/ 482.50) con alto contraste en Modo Claro */}
        <div className="bg-white  border-2 border-[#6C5CE7]/30  rounded-3xl p-5 shadow-sm  flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-[#64748b]  tracking-wider block">
                Acumulado Semanal
              </span>
              <span className="text-3xl font-black text-[#1a1d20]  tracking-tight mt-0.5 block">
                S/ 482.50
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700  font-bold border border-emerald-500/20">
                  +18.4% vs semana anterior
                </span>
              </div>
            </div>

            {/* Botón Retirar Dinero */}
            <button
              type="button"
              onClick={() => setShowWithdrawModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#FF7A00] hover:bg-[#ff891a] active:scale-95 text-white font-extrabold text-xs transition-all shadow-[0_6px_20px_rgba(255,122,0,0.35)] flex items-center gap-1.5 border border-[#ffa043] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              <span>Retirar Dinero</span>
            </button>
          </div>

          {/* Quick bar visualizer of week (fondo claro de alto contraste en Modo Claro) */}
          <div className="flex items-end justify-between gap-1 pt-2 h-14 border-t border-[#e2e8f0] ">
            {WEEKLY_DAYS.map((d, i) => {
              const heightPercent = Math.min(100, Math.round((d.earnings / 110) * 100));
              const isToday = i === 6;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#f1f5f9]  rounded-t-sm h-10 flex items-end justify-center p-0.5">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all ${
                        isToday ? 'bg-[#FF7A00]' : 'bg-[#6C5CE7]'
                      }`}
                    />
                  </div>
                  <span className="text-[9px] text-[#64748b]  font-bold">
                    {d.day.substring(0, 2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid de Métricas Operativas (Sin fondos oscuros en Modo Claro) */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Pedidos completados */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-[#6C5CE7] mb-1">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] ">
                Entregas
              </span>
            </div>
            <p className="text-xl font-black text-[#1a1d20] ">42</p>
            <p className="text-[10px] text-emerald-600  font-semibold">100% completadas</p>
          </div>

          {/* 2. Calificación */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-500 mb-1">
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] ">
                Calificación
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-xl font-black text-[#1a1d20] ">4.9</p>
              <span className="text-amber-500 text-xs">★</span>
            </div>
            <p className="text-[10px] text-[#64748b] ">Basado en 38 reseñas</p>
          </div>

          {/* 3. Tiempo medio de entrega */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-[#FF7A00] mb-1">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] ">
                Tiempo Medio
              </span>
            </div>
            <p className="text-xl font-black text-[#1a1d20] ">18 min</p>
            <p className="text-[10px] text-emerald-600  font-semibold">Top 5% más rápido</p>
          </div>

          {/* 4. Ganancia promedio */}
          <div className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-600  mb-1">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] ">
                Ganancia Prom.
              </span>
            </div>
            <p className="text-xl font-black text-[#1a1d20] ">S/ 11.48</p>
            <p className="text-[10px] text-[#64748b] ">Por viaje realizado</p>
          </div>
        </div>

        {/* 5. KM Recorridos (Full Width Strip) */}
        <div className="bg-white  border border-[#e2e8f0]  rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b]  block">
                Distancia Recorrida
              </span>
              <p className="text-base font-black text-[#1a1d20] ">112 km esta semana</p>
            </div>
          </div>
          <span className="text-xs text-[#475569]  bg-[#f8fafc]  px-2.5 py-1 rounded-lg border border-[#e2e8f0] ">
            Eficiencia: 2.6 km/pedido
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2.5 pt-4">
        {/* Botón "Ver detalles por día" */}
        <button
          type="button"
          onClick={() => setShowDaysModal(true)}
          className="w-full h-12 rounded-2xl bg-white  hover:bg-slate-50  active:scale-95 text-[#1a1d20]  hover:text-black  font-bold text-xs transition-all border border-[#e2e8f0]  flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-[#6C5CE7]">
            calendar_view_day
          </span>
          <span>Ver detalles por día</span>
        </button>

        {/* Botón "Volver a conectar" */}
        <button
          type="button"
          onClick={onReconnect}
          className="w-full h-13 rounded-2xl bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-95 text-white font-extrabold text-sm transition-all shadow-[0_6px_25px_rgba(108,92,231,0.4)] flex items-center justify-center gap-2 border border-[#8b7ded] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
          <span>Volver a Conectar (En Línea)</span>
        </button>
      </div>

      {/* Modal: Detalles por Día */}
      {showDaysModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-3 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white  border border-[#e2e8f0]  rounded-3xl p-5 flex flex-col gap-3.5 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] ">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6C5CE7]">calendar_month</span>
                <h3 className="font-title-md font-bold text-[#1a1d20]  text-sm">
                  Desglose Diario de Ganancias
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDaysModal(false)}
                className="text-[#64748b] hover:text-[#1a1d20]   cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {WEEKLY_DAYS.map((d) => (
                <div
                  key={d.day}
                  className="bg-[#f8fafc]  rounded-xl p-3 flex items-center justify-between text-xs border border-[#e2e8f0] "
                >
                  <div>
                    <p className="font-bold text-[#1a1d20] ">{d.day}</p>
                    <p className="text-[10px] text-[#64748b] ">{d.date} • {d.hours} conectados</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#FF7A00]">S/ {d.earnings.toFixed(2)}</p>
                    <p className="text-[10px] text-[#64748b] ">{d.orders} pedidos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Análisis de Desempeño Mensual (Weekly breakdown) */}
      {showMonthlyModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-3 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white  border border-[#e2e8f0]  rounded-3xl p-5 flex flex-col gap-3.5 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0] ">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#6C5CE7]/15 text-[#6C5CE7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">insights</span>
                </div>
                <div>
                  <h3 className="font-title-md font-black text-[#1a1d20]  text-sm">
                    Análisis de Desempeño Mensual
                  </h3>
                  <p className="text-[10px] text-[#64748b] ">Septiembre - Octubre 2026</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMonthlyModal(false)}
                className="text-[#64748b] hover:text-[#1a1d20]   cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Total Mensual Card */}
            <div className="bg-gradient-to-br from-[#6C5CE7]/10 via-[#FF7A00]/10 to-transparent p-4 rounded-2xl border border-[#6C5CE7]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b]  block">
                  Total Ingresos del Mes
                </span>
                <span className="text-2xl font-black text-[#1a1d20]  tracking-tight">
                  S/ 2,145.80
                </span>
                <span className="text-[10px] text-emerald-600  font-bold block mt-0.5">
                  186 pedidos completados • 100.2 hrs
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#64748b]  block">
                  Promedio / hora
                </span>
                <span className="text-sm font-black text-[#FF7A00]">
                  S/ 21.41/h
                </span>
              </div>
            </div>

            {/* Desglose de ingresos y entregas por semanas */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase text-[#64748b]  tracking-wider">
                Desglose por Semanas
              </span>

              {MONTHLY_WEEKS.map((w) => (
                <div
                  key={w.week}
                  className={`rounded-2xl p-3 border transition-all ${
                    w.isCurrent
                      ? 'bg-amber-500/5 border-amber-500/30'
                      : 'bg-[#f8fafc]  border-[#e2e8f0] '
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-xs text-[#1a1d20] ">{w.week}</span>
                      {w.isBest && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700  text-[8px] font-black uppercase">
                          🔥 Mejor semana
                        </span>
                      )}
                      {w.isCurrent && (
                        <span className="px-1.5 py-0.2 rounded bg-[#FF7A00]/20 text-[#FF7A00] text-[8px] font-black uppercase">
                          En curso
                        </span>
                      )}
                    </div>
                    <span className="font-black text-xs text-[#FF7A00]">
                      S/ {w.earnings.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#64748b] ">
                    <span>{w.period}</span>
                    <span>{w.orders} pedidos • {w.hours}</span>
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full bg-[#e2e8f0]  h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      style={{ width: `${(w.earnings / 650) * 100}%` }}
                      className={`h-full rounded-full ${
                        w.isBest ? 'bg-emerald-500' : w.isCurrent ? 'bg-[#FF7A00]' : 'bg-[#6C5CE7]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tips Box */}
            <div className="bg-[#f8fafc]  rounded-2xl p-3 border border-[#e2e8f0]  flex items-center gap-2.5 text-xs text-[#64748b] ">
              <span className="material-symbols-outlined text-[20px] text-amber-500 shrink-0">
                lightbulb
              </span>
              <p className="text-[11px] leading-snug">
                Tu turno más rentable es de <strong>20:00 a 02:00</strong> (Tarifa Nocturna) con un 35% más de ingresos por hora.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMonthlyModal(false)}
              className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200   text-[#1a1d20]  font-bold text-xs mt-1 cursor-pointer transition-colors border border-transparent "
            >
              Cerrar Análisis
            </button>
          </div>
        </div>
      )}

      {/* Modal: Retirar Dinero (Deshabilita botón inmediatamente al confirmar) */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xs bg-white  border border-[#e2e8f0]  rounded-3xl p-6 text-center flex flex-col items-center gap-3 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center">
              <span className="material-symbols-outlined text-[30px]">account_balance</span>
            </div>
            <h3 className="font-title-md font-bold text-[#1a1d20]  text-base">
              Retiro a Cuenta Bancaria
            </h3>
            <p className="text-xs text-[#64748b] ">
              Transferencia inmediata a BCP CCI: <strong>002-191-008234-91</strong>
            </p>

            <div className="bg-[#f8f9fa]  rounded-2xl p-3 w-full border border-[#e2e8f0]  my-1">
              <span className="text-[10px] text-[#64748b]  uppercase font-bold block">
                Monto disponible
              </span>
              <span className="text-2xl font-black text-[#1a1d20] ">S/ 482.50</span>
            </div>

            {withdrawnSuccess ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-700  font-bold text-xs flex items-center gap-1.5 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>¡Transferencia exitosa en camino!</span>
              </div>
            ) : (
              <div className="flex gap-2 w-full mt-1">
                <button
                  type="button"
                  disabled={isWithdrawing}
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 h-11 rounded-xl bg-slate-100 hover:bg-slate-200  text-[#64748b]  font-bold text-xs cursor-pointer transition-colors border border-transparent "
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isWithdrawing || withdrawnSuccess}
                  onClick={handleWithdraw}
                  className="flex-1 h-11 rounded-xl bg-[#FF7A00] hover:bg-[#ff891a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {isWithdrawing ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <span>Confirmar retiro de dinero</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
