import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Labels ──────────────────────────────────────────────────────────

const SOCIAL_LABELS = {
  instagram: 'Instagram',
  facebook:  'Facebook',
  tiktok:    'TikTok',
  onlyfans:  'OnlyFans',
};
const ADS_LABELS = {
  meta:   'Meta Ads',
  google: 'Google Ads',
  crm:    'CRM',
};
const SOCIAL_COVERAGE = {
  instagram: 'Fotos, DMs, Stories, Cuenta publicitaria vinculada',
  facebook:  'Perfil, Mensajes, Grupos, Marketplace',
  tiktok:    'Videos, DMs, Cuenta Pro',
  onlyfans:  'Contenido exclusivo, Mensajes, Ingresos',
};

// ─── Sequence builder ────────────────────────────────────────────────

function buildSequence(ud) {
  const {
    selectedType = null,
    deviceType   = 'iphone',
    deviceId     = '',
    countryCode  = '+51',
    phone        = '',
    googleMail   = '',
    socialTab    = 'instagram',
    socialUser   = '',
    adsPlatform  = 'meta',
    adsId        = '',
  } = ud || {};

  const G  = '#4ade80';   // green regular
  const OK = '#00ff88';   // neon green (success)
  const CY = '#00d4ff';   // cyan (process)
  const YE = '#ffd700';   // yellow (warning)
  const RE = '#ff6b6b';   // red (alert)

  const lines = [
    { text: '> Iniciando protocolo Incripta v3.7...',    delay: 0,   color: G  },
    { text: '> Estableciendo conexión cifrada...',        delay: 700, color: G  },
    { text: '> Verificando integridad del sistema... OK', delay: 800, color: OK },
  ];

  // ── User-specific lines ──
  switch (selectedType) {
    case 'whatsapp':
      lines.push(
        { text: '> Objetivo identificado: WhatsApp',                               delay: 600, color: G  },
        { text: '> Número objetivo: ', highlight: `${countryCode} ${phone || 'N/A'}`,          delay: 500, color: G  },
        { text: '> Cobertura: Chats privados, Fotos, Audios, Archivos, Grupos',    delay: 500, color: G  },
      );
      break;
    case 'mobile': {
      const dev = deviceType === 'iphone' ? 'iPhone' : 'Android';
      lines.push(
        { text: `> Objetivo identificado: Dispositivo ${dev}`,                     delay: 600, color: G  },
        { text: '> IMEI/ID: ', highlight: deviceId || 'N/A',                                   delay: 500, color: G  },
        { text: '> Cobertura: Apps bancarias, Billeteras digitales,',              delay: 500, color: G  },
        { text: '>   Galería, Mensajes, Contactos',                                delay: 200, color: G  },
      );
      break;
    }
    case 'google':
      lines.push(
        { text: '> Objetivo identificado: Cuenta Google',                          delay: 600, color: G  },
        { text: '> Email: ', highlight: googleMail || 'N/A',                                   delay: 500, color: G  },
        { text: '> Cobertura: Gmail, Google Drive, Google Fotos,',                 delay: 500, color: G  },
        { text: '>   Billetera Google',                                            delay: 200, color: G  },
      );
      break;
    case 'social': {
      const redName  = SOCIAL_LABELS[socialTab]  || socialTab;
      const coverage = SOCIAL_COVERAGE[socialTab] || '';
      lines.push(
        { text: `> Objetivo identificado: ${redName}`,                             delay: 600, color: G  },
        { text: '> Perfil: ', highlight: socialUser || 'N/A',                                  delay: 500, color: G  },
        { text: `> Cobertura: ${coverage}`,                                        delay: 500, color: G  },
      );
      break;
    }
    case 'ads': {
      const pName = ADS_LABELS[adsPlatform] || adsPlatform;
      lines.push(
        { text: `> Objetivo identificado: ${pName}`,                               delay: 600, color: G  },
        { text: '> ID/Dominio: ', highlight: adsId || 'N/A',                                   delay: 500, color: G  },
        { text: '> Cobertura: Presupuesto activo, Datos de clientes,',             delay: 500, color: G  },
        { text: '>   Píxeles, Accesos del equipo',                                 delay: 200, color: G  },
      );
      break;
    }
    case 'all':
      lines.push(
        { text: '> Objetivo identificado: Protección Completa',                    delay: 600, color: G  },
      );
      if (phone) lines.push({ text: '> WhatsApp: ', highlight: `${countryCode} ${phone}`, delay: 400, color: G });
      lines.push(
        { text: `> Dispositivo: ${deviceType === 'iphone' ? 'iPhone' : 'Android'}`, delay: 300, color: G },
        { text: '> Cobertura: Protección total activada',                          delay: 300, color: G  },
      );
      break;
    default:
      lines.push(
        { text: '> Objetivo identificado: Sistema digital',                        delay: 600, color: G  },
        { text: '> Escaneando exposición general...',                              delay: 500, color: G  },
      );
  }

  // ── Technical cipher sequence ──
  lines.push(
    { text: '> Analizando vectores de vulnerabilidad...',           delay: 600,  color: G  },
    { text: '> [####        ] 22% Escaneando exposición...',        delay: 900,  color: CY },
    { text: '> Generando clave AES-256-GCM...',                    delay: 700,  color: CY },
    { text: '> [########    ] 44% Aplicando cifrado capa 1...',     delay: 1000, color: CY },
    { text: '> Hash SHA-512: verificado OK',                        delay: 600,  color: OK },
    { text: '> [############] 55% Conectando nodos...',             delay: 900,  color: CY },
    { text: '> Nodo [Frankfurt] → Conectado',                       delay: 500,  color: OK },
    { text: '> Nodo [São Paulo] → Conectado',                       delay: 400,  color: OK },
    { text: '> [################] 72% Blindando aplicaciones...',   delay: 900,  color: CY },
    { text: '> openssl enc -aes-256-gcm: aplicado',                delay: 600,  color: CY },
    { text: '> TLS 1.3 handshake: 43ms OK',                        delay: 500,  color: OK },
    { text: '> mlock() success: memoria protegida',                 delay: 500,  color: OK },
    { text: '> [####################] 87% — ACTIVACIÓN REQUERIDA', delay: 1000, color: YE },
    { text: '> ADVERTENCIA: Membresía necesaria para completar',    delay: 400,  color: RE },
  );

  return lines;
}

const MAX_LINES = 18;

// ─── Component ───────────────────────────────────────────────────────

export default function AnalysisTerminal({ userData, onScrollToForm }) {
  const [lineas,       setLineas]       = useState([]);
  const [progreso,     setProgreso]     = useState(0);
  const [reachedLimit, setReachedLimit] = useState(false);

  const terminalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);

  // Auto-scroll to newest line
  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lineas]);

  // Start sequence once on mount
  useEffect(() => {
    const seq = buildSequence(userData);
    const totalDuration = seq.reduce((s, item) => s + item.delay, 0);
    let accumulated = 0;

    seq.forEach((item, idx) => {
      accumulated += item.delay;
      const t = setTimeout(() => {
        setLineas(prev => {
          const next = [...prev, { ...item, _key: idx }];
          return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
        });
        if (idx === seq.length - 1) {
          setTimeout(() => setReachedLimit(true), 600);
        }
      }, accumulated);
      timeoutsRef.current.push(t);
    });

    // Smooth progress 0 → 87 over totalDuration
    const TICK = 80;
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += TICK;
      const prog = Math.min((elapsed / totalDuration) * 87, 87);
      setProgreso(prog);
      if (prog >= 87) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }, TICK);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const barColor   = progreso >= 87
    ? 'linear-gradient(90deg,#7c3aed,#ffd700)'
    : 'linear-gradient(90deg,#00d4ff,#7c3aed)';
  const barGlow    = progreso >= 87
    ? '0 0 8px rgba(255,215,0,0.45)'
    : '0 0 8px rgba(0,212,255,0.4)';
  const countColor = progreso >= 87 ? '#ffd700' : '#00d4ff';
  const statusTxt  = reachedLimit ? 'ACTIVACIÓN REQUERIDA' : 'ANALIZANDO';
  const statusClr  = reachedLimit ? '#ffd700' : '#00d4ff';

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        border:     '1px solid rgba(0,212,255,0.15)',
        boxShadow:  '0 0 60px rgba(124,58,237,0.08)',
        background: 'linear-gradient(180deg,#05030d 0%,#080612 100%)',
        minHeight:  380,
      }}
    >
      {/* ─── Title bar ─── */}
      <div
        className="flex items-center gap-2 px-5 py-3 border-b border-white/5 flex-shrink-0"
        style={{ background: 'rgba(12,8,24,0.9)' }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-500 font-mono tracking-wide">
          incripta — análisis de vulnerabilidad
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono"
          style={{ color: statusClr }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: statusClr }} />
          {statusTxt}
        </span>
      </div>

      {/* ─── Log area ─── */}
      <div
        ref={terminalRef}
        className="p-5 font-mono text-sm space-y-1 overflow-y-hidden"
        style={{ minHeight: 300 }}
      >
        {lineas.map((item) => (
          <motion.div
            key={item._key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
            className="leading-relaxed"
          >
            {item.highlight !== undefined ? (
              <>
                <span style={{ color: item.color }}>{item.text}</span>
                <span
                  style={{
                    color:       '#ffffff',
                    fontWeight:  700,
                    background:  'rgba(124,58,237,0.28)',
                    padding:     '1px 8px',
                    borderRadius: '4px',
                    textShadow:  '0 0 10px rgba(255,255,255,0.35)',
                    border:      '1px solid rgba(139,92,246,0.35)',
                  }}
                >
                  {item.highlight}
                </span>
              </>
            ) : (
              <span style={{ color: item.color }}>{item.text}</span>
            )}
          </motion.div>
        ))}
        {!reachedLimit && lineas.length > 0 && (
          <span
            className="inline-block w-2 h-[1.1em] align-middle terminal-cursor"
            style={{ background: '#00d4ff' }}
          />
        )}
      </div>

      {/* ─── Progress bar ─── */}
      <div
        className="px-5 py-3 border-t border-white/5 flex-shrink-0"
        style={{ background: 'rgba(8,6,20,0.85)' }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-mono text-slate-500">Progreso de análisis</span>
          <span className="text-sm font-bold font-mono tabular-nums" style={{ color: countColor }}>
            {Math.floor(progreso)}%
          </span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width:      `${progreso}%`,
              background: barColor,
              boxShadow:  barGlow,
              transition: 'width 0.08s linear',
            }}
          />
        </div>
      </div>

      {/* ─── 87% overlay ─── */}
      <AnimatePresence>
        {reachedLimit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
            style={{
              background:    'rgba(5,3,13,0.88)',
              backdropFilter: 'blur(8px)',
              zIndex:         10,
            }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5"
              style={{
                background: 'rgba(255,215,0,0.1)',
                border:     '1px solid rgba(255,215,0,0.3)',
                color:      '#ffd700',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
              Activación requerida
            </div>

            <h3 className="text-xl font-black text-white mb-3">
              Análisis al 87% completado
            </h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed mb-6">
              Tu exposición ha sido mapeada. Para completar el cifrado y activar la
              protección se requiere una membresía activa.
            </p>

            {/* Mini-stats */}
            <div className="flex items-center gap-8 mb-8">
              {[
                { label: 'Vectores', value: '3',        color: '#f87171' },
                { label: 'Nivel',    value: 'ALTO',     color: '#fb923c' },
                { label: 'Estado',   value: 'EXPUESTO', color: '#fbbf24' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className="text-xs text-slate-600 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-black" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onScrollToForm}
              className="px-8 py-4 rounded-2xl font-black text-base active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg,#7c3aed 0%,#9333ea 100%)',
                color:      '#fff',
                boxShadow:  '0 0 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(124,58,237,0.8), inset 0 1px 0 rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Activar protección completa →
            </button>
            <p className="text-slate-600 text-xs mt-3">
              Sin contratos · Cancela cuando quieras
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
