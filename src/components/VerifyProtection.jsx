import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Search, AlertTriangle, ChevronLeft, Zap } from 'lucide-react';

const ALARMS = [
  { level: 'CRITICO', text: 'Intentos de acceso no autorizado detectados' },
  { level: 'CRITICO', text: 'Alguien está intentando extraer tus contraseñas guardadas' },
  { level: 'ALTO',    text: 'Tus cuentas de Gmail vinculadas están expuestas' },
  { level: 'ALTO',    text: 'Información bancaria en riesgo de interceptación' },
  { level: 'ALTO',    text: 'Tus fotos y archivos privados son accesibles remotamente' },
  { level: 'ALTO',    text: 'Apps bancarias móviles sin protección activa' },
  { level: 'MEDIO',   text: 'Tus conversaciones de WhatsApp pueden ser interceptadas' },
  { level: 'MEDIO',   text: 'Metadatos de ubicación expuestos en tiempo real' },
  { level: 'MEDIO',   text: 'Cookies de sesión vulnerables a robo' },
  { level: 'MEDIO',   text: 'Tu dirección IP está siendo rastreada' },
  { level: 'MEDIO',   text: 'Historial de navegación expuesto' },
  { level: 'MEDIO',   text: 'Billeteras digitales sin cifrado activo' },
  { level: 'BAJO',    text: 'Tus contactos pueden ser extraídos' },
  { level: 'BAJO',    text: 'Archivos multimedia compartidos en riesgo' },
  { level: 'BAJO',    text: 'Notificaciones push interceptables' },
  { level: 'BAJO',    text: 'Datos de calendario y agenda expuestos' },
  { level: 'BAJO',    text: 'Acceso remoto a galería de fotos posible' },
  { level: 'BAJO',    text: 'Tokens de autenticación vulnerables' },
  { level: 'BAJO',    text: 'Riesgo de suplantación de identidad digital' },
  { level: 'BAJO',    text: 'Sincronización de nube sin cifrado detectada' },
  { level: 'INFO',    text: '3 dispositivos desconocidos intentaron acceder a tu red' },
  { level: 'INFO',    text: 'Se detectó escaneo de puertos en tu conexión actual' },
  { level: 'INFO',    text: 'Actividad sospechosa detectada en las últimas 24 horas' },
];

const LEVEL = {
  CRITICO: { bg: 'rgba(127,29,29,0.5)',  border: 'rgba(239,68,68,0.4)',   text: '#f87171' },
  ALTO:    { bg: 'rgba(120,53,15,0.5)',  border: 'rgba(249,115,22,0.35)', text: '#fb923c' },
  MEDIO:   { bg: 'rgba(113,63,18,0.4)', border: 'rgba(234,179,8,0.3)',   text: '#facc15' },
  BAJO:    { bg: 'rgba(30,58,138,0.4)', border: 'rgba(59,130,246,0.3)',  text: '#60a5fa' },
  INFO:    { bg: 'rgba(30,41,59,0.6)',  border: 'rgba(100,116,139,0.3)', text: '#94a3b8' },
};

const SCAN_MSGS = [
  'Buscando en base de datos de protecciones activas...',
  'Verificando registros de suscriptores...',
  'Comprobando estado de cobertura neural...',
  'Analizando vectores de exposición...',
];

export default function VerifyProtection({ records, onGoHome }) {
  const [query,         setQuery]         = useState('');
  const [scanning,      setScanning]      = useState(false);
  const [scanMsg,       setScanMsg]       = useState(0);
  const [result,        setResult]        = useState(null); // null | 'protected' | 'vulnerable'
  const [record,        setRecord]        = useState(null);
  const [flashRed,      setFlashRed]      = useState(false);
  const [visibleAlarms, setVisibleAlarms] = useState(0);
  const [threatCount,   setThreatCount]   = useState(0);
  const [riskLevel,     setRiskLevel]     = useState(0);

  const scanMsgRef = useRef(null);
  const alarmRef   = useRef(null);
  const counterRef = useRef(null);
  const riskRef    = useRef(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!query.trim() || scanning) return;
    setResult(null); setRecord(null); setFlashRed(false);
    setVisibleAlarms(0); setThreatCount(0); setRiskLevel(0);
    setScanMsg(0);
    setScanning(true);
  };

  // Animación de escaneo (2 s) → decide resultado
  useEffect(() => {
    if (!scanning) return;
    scanMsgRef.current = setInterval(() => setScanMsg(i => (i + 1) % SCAN_MSGS.length), 500);
    const timer = setTimeout(() => {
      clearInterval(scanMsgRef.current);
      setScanning(false);
      const q = query.trim().toLowerCase().replace(/[\s\-()]/g, '');
      const found = (records || []).find(r => {
        const key = (r.searchKey || '').toLowerCase().replace(/[\s\-()]/g, '');
        const mail = (r.email    || '').toLowerCase();
        return key.includes(q) || mail.includes(q) || q.includes(key.slice(-6));
      });
      if (found) { setRecord(found); setResult('protected'); }
      else        { setResult('vulnerable'); }
    }, 2000);
    return () => { clearInterval(scanMsgRef.current); clearTimeout(timer); };
  }, [scanning]);

  // Cascada de amenazas cuando el resultado es vulnerable
  useEffect(() => {
    if (result !== 'vulnerable') return;

    // Flash rojo × 2
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 900);

    // Contador 0 → 23
    let c = 0;
    counterRef.current = setInterval(() => {
      c += 1; setThreatCount(c);
      if (c >= 23) clearInterval(counterRef.current);
    }, 55);

    // Barra 0 → 94 %
    let r = 0;
    riskRef.current = setInterval(() => {
      r += 2; setRiskLevel(Math.min(r, 94));
      if (r >= 94) clearInterval(riskRef.current);
    }, 28);

    // Alarmas: una cada 300 ms
    let shown = 0;
    alarmRef.current = setInterval(() => {
      shown += 1; setVisibleAlarms(shown);
      if (shown >= ALARMS.length) clearInterval(alarmRef.current);
    }, 300);

    return () => {
      clearInterval(counterRef.current);
      clearInterval(riskRef.current);
      clearInterval(alarmRef.current);
    };
  }, [result]);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">

      {/* Overlay flash rojo */}
      <AnimatePresence>
        {flashRed && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, times: [0, 0.2, 0.45, 0.7, 1] }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ background: 'rgba(239,68,68,0.55)' }}
          />
        )}
      </AnimatePresence>

      {/* Encabezado */}
      <div className="mb-10">
        <button onClick={onGoHome}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm mb-6 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver al inicio
        </button>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-3"
        >
          Verificar estado de protección
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="text-slate-400"
        >
          Comprueba si un número, cuenta o dispositivo está bajo protección Encriptas.
        </motion.p>
      </div>

      {/* Campo de búsqueda */}
      <motion.form
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        onSubmit={handleVerify} className="flex gap-3 mb-8"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Número de WhatsApp, email, IMEI, usuario de red social..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={scanning || !query.trim()}
          className="px-6 py-4 rounded-2xl font-bold text-white transition-all disabled:opacity-40 whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#9333ea)', boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}
        >
          Verificar ahora
        </button>
      </motion.form>

      <AnimatePresence mode="wait">

        {/* Escaneando */}
        {scanning && (
          <motion.div key="scan"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
            <AnimatePresence mode="wait">
              <motion.p key={scanMsg}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-mono text-violet-300/80"
              >
                {SCAN_MSGS[scanMsg]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

        {/* RESULTADO: PROTEGIDO */}
        {result === 'protected' && record && (
          <motion.div key="protected"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8"
            style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.25)' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,255,136,0.1)', border: '2px solid rgba(0,255,136,0.35)' }}
              >
                <ShieldCheck className="w-8 h-8" style={{ color: '#00ff88' }} />
              </motion.div>
              <div>
                <p className="text-3xl font-black" style={{ color: '#00ff88' }}>PROTEGIDO</p>
                <p className="text-slate-400 text-sm mt-0.5">
                  Este número/cuenta está protegido por Encriptas
                </p>
              </div>
            </div>

            <div className="space-y-0 rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(0,255,136,0.1)' }}
            >
              <InfoRow label="Tipo de protección" value={record.protectionType} />
              <InfoRow label="Dato protegido"      value={record.searchKey} mono />
              <InfoRow label="Fecha de activación" value={record.activationDate} />
            </div>

            {record.coverage?.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Cobertura activa</p>
                <div className="flex flex-wrap gap-2">
                  {record.coverage.map(c => (
                    <span key={c}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.2)', color: '#6ee7b7' }}
                    >{c}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* RESULTADO: VULNERABLE */}
        {result === 'vulnerable' && (
          <motion.div key="vulnerable" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Cabecera de peligro */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-6 text-center"
              style={{ background: 'rgba(127,29,29,0.3)', border: '1px solid rgba(239,68,68,0.4)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="inline-block mb-3"
              >
                <ShieldAlert className="w-14 h-14 mx-auto text-red-400" />
              </motion.div>
              <p className="text-2xl font-black text-red-400 mb-1">VULNERABLE — PELIGRO DETECTADO</p>
              <p className="text-slate-400 text-sm">No encontramos protección activa para este identificador</p>
            </motion.div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-4">
              {/* Contador de amenazas */}
              <div className="rounded-2xl p-5 text-center"
                style={{ background: 'rgba(127,29,29,0.2)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <p className="text-5xl font-black text-red-400 mb-1 tabular-nums">{threatCount}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">amenazas activas</p>
              </div>

              {/* Barra de riesgo */}
              <div className="rounded-2xl p-5"
                style={{ background: 'rgba(127,29,29,0.2)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Nivel de riesgo</p>
                <div className="relative h-2.5 rounded-full overflow-hidden mb-2"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${riskLevel}%`,
                      background: 'linear-gradient(90deg,#ef4444,#dc2626)',
                      boxShadow: '0 0 10px rgba(239,68,68,0.8)',
                    }}
                  />
                </div>
                <p className="text-2xl font-black text-red-400 tabular-nums">{riskLevel}%</p>
              </div>
            </div>

            {/* Lista de alarmas */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
              {ALARMS.slice(0, visibleAlarms).map((alarm, i) => {
                const s = LEVEL[alarm.level];
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: s.text }} />
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded border shrink-0"
                      style={{ color: s.text, borderColor: s.border, background: 'rgba(0,0,0,0.25)' }}
                    >
                      {alarm.level}
                    </span>
                    <span className="text-sm text-slate-300 leading-tight">{alarm.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA pulsante — aparece cuando terminan las alarmas */}
            {visibleAlarms >= ALARMS.length && (
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onGoHome}
                className="w-full py-5 rounded-2xl font-black text-white text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg,#7c3aed,#9333ea)',
                  boxShadow: '0 0 35px rgba(124,58,237,0.65), 0 8px 40px rgba(124,58,237,0.3)',
                  animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                }}
              >
                <Zap className="w-5 h-5" />
                Protegerme ahora — $10/mes
              </motion.button>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex justify-between items-start px-4 py-3 border-b last:border-0"
      style={{ borderColor: 'rgba(0,255,136,0.08)', background: 'rgba(0,255,136,0.02)' }}
    >
      <span className="text-xs text-slate-500 uppercase tracking-widest shrink-0 mr-4">{label}</span>
      <span className={`text-sm text-white font-medium text-right ${mono ? 'font-mono text-slate-300' : ''}`}>
        {value || '—'}
      </span>
    </div>
  );
}
