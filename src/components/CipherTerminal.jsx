import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Genera cadena hex aleatoria
const hex = (n = 16) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('');

// Secuencia completa con delays individuales (ms) entre líneas — total ~60s
const construirSecuencia = (objetivo) => [
  { text: '> Iniciando protocolo Incripta v3.7...',                         delay: 0    },
  { text: '> Estableciendo conexión cifrada con servidor central...',        delay: 1500 },
  { text: '> Verificando integridad del sistema... OK',                      delay: 2000 },
  { text: '> Cargando módulos de seguridad neural...',                       delay: 1500 },
  { text: '> [##                  ] 4% Escaneando red local...',             delay: 1800 },
  { text: '> Detectando puntos de vulnerabilidad activos...',                delay: 1500 },
  { text: '> Analizando tráfico entrante en puertos 443, 8080, 3306...',     delay: 1500 },
  { text: '> ALERTA: Se detectaron 3 intentos de acceso no autorizado',      delay: 1500 },
  { text: '> Bloqueando vectores de ataque identificados...',                delay: 1200 },
  { text: '> [####                ] 12% Analizando objetivo...',             delay: 1500 },
  { text: `> Identificando objetivo: ${objetivo || '—'}`,                   delay: 1200, objetivo: true },
  { text: '> Escaneando metadatos asociados...',                             delay: 1500 },
  { text: '> Verificando historial de exposición de datos...',               delay: 1800 },
  { text: '> Analizando conexiones activas vinculadas al objetivo...',       delay: 1800 },
  { text: '> [######              ] 22% Generando arquitectura de cifrado...', delay: 1500 },
  { text: '> Seleccionando algoritmo óptimo: AES-256-GCM',                  delay: 1200 },
  { text: '> Generando vector de inicialización aleatorio...',               delay: 1200 },
  { text: `> IV generado: 7f3a9c2e-b1d4-4e8f-a2c6-${hex(12)}`,             delay: 800  },
  { text: '> [########            ] 35% Construyendo capa de cifrado 1...', delay: 1500 },
  { text: '> Aplicando cifrado simétrico de capa base...',                   delay: 1200 },
  { text: `> Hash de verificación: SHA-512 → ${hex(16)}...`,                delay: 700  },
  { text: '> Capa 1 verificada: OK',                                         delay: 800  },
  { text: '> [##########          ] 44% Iniciando protocolo de red neural...', delay: 1500 },
  { text: '> Conectando con nodos de la red distribuida Incripta...',        delay: 1200 },
  { text: '> Nodo 1 [Frankfurt]   → Conectado',                             delay: 800  },
  { text: '> Nodo 2 [São Paulo]   → Conectado',                             delay: 700  },
  { text: '> Nodo 3 [Tokio]       → Conectado',                             delay: 700  },
  { text: '> Nodo 4 [Nueva York]  → Conectado',                             delay: 700  },
  { text: '> Red de 4 nodos activa — latencia promedio: 12ms',              delay: 1000 },
  { text: '> [############        ] 55% Aplicando cifrado de capa 2...',    delay: 1500 },
  { text: '> Generando clave RSA-4096 para intercambio seguro...',           delay: 1200 },
  { text: `> Clave pública: MIIBIjANBgkqhkiG9w0BAQEFAAOC${hex(8)}...`,     delay: 700  },
  { text: '> Protocolo de handshake completado con todos los nodos',         delay: 1000 },
  { text: '> Capa 2 verificada: OK',                                         delay: 800  },
  { text: '> [##############      ] 63% Cifrando metadatos de red...',      delay: 1500 },
  { text: '> Ofuscando dirección IP original...',                            delay: 1200 },
  { text: '> Enrutando tráfico a través de red privada neural...',           delay: 1200 },
  { text: '> Aplicando técnicas anti-fingerprinting...',                     delay: 1200 },
  { text: '> Metadatos protegidos: OK',                                      delay: 800  },
  { text: '> [################    ] 72% Blindando aplicaciones vinculadas...', delay: 1500 },
  { text: '> Escaneando aplicaciones conectadas al objetivo...',              delay: 1200 },
  { text: '> Aplicando escudo en capa de aplicación...',                     delay: 1200 },
  { text: '> Protocolo de protección activo en todas las capas',             delay: 1000 },
  { text: '> Verificando integridad del cifrado completo...',                delay: 1200 },
  { text: '> [##################  ] 82% Realizando auditoría final...',     delay: 1500 },
  { text: '> Comprobando ausencia de vulnerabilidades residuales...',        delay: 1200 },
  { text: '> Test de penetración interno: SUPERADO',                         delay: 900  },
  { text: '> Verificación de integridad: SUPERADA',                          delay: 900  },
  { text: '> [####################] 87% — ACTIVACIÓN REQUERIDA',            delay: 1000 },
  { text: '> ADVERTENCIA: Membresía necesaria para completar el proceso',    delay: 900  },
  { text: '> Cifrado detenido en 87% — active su membresía para continuar', delay: 800  },
];

// Colores según contenido de la línea
function colorLinea(linea) {
  if (!linea) return 'text-slate-700';
  if (linea.includes('ALERTA'))                              return 'text-red-400';
  if (linea.includes('ADVERTENCIA'))                         return 'text-orange-400';
  if (linea.startsWith('> ['))                               return 'text-cyan-400 font-bold';
  if (linea.endsWith('OK')     ||
      linea.endsWith('Conectado') ||
      linea.endsWith('SUPERADO') ||
      linea.endsWith('SUPERADA'))                            return 'neon-green';
  if (linea.startsWith('[✓]'))                               return 'neon-green';
  if (linea.startsWith('[⟳]'))                               return 'text-yellow-300';
  if (linea.startsWith('> ⚠'))                               return 'text-orange-400';
  if (linea.startsWith('>'))                                 return 'text-green-400';
  return 'text-slate-500';
}

// Renderiza la línea "Identificando objetivo" con el dato en blanco
function LineaObjetivo({ linea }) {
  const partes = linea.split(': ');
  const prefijo = partes[0] + ': ';
  const dato    = partes.slice(1).join(': ');
  return (
    <>
      <span className="text-green-400">{prefijo}</span>
      <span style={{ color: '#ffffff', fontWeight: 700, textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>{dato}</span>
    </>
  );
}

// Tabs de tipo de entrada
const TIPOS = [
  { id: 'social',    label: 'Red Social',  placeholder: 'instagram.com/usuario o facebook.com/perfil' },
  { id: 'whatsapp',  label: 'WhatsApp',    placeholder: '+51 987 654 321 (con código de país)'        },
  { id: 'device',    label: 'Dispositivo', placeholder: 'Android ID o UUID de iPhone'                 },
];

export default function CipherTerminal() {
  const [tipo,           setTipo]           = useState('social');
  const [inputVal,       setInputVal]       = useState('');
  const [fase,           setFase]           = useState('idle');   // 'idle' | 'running' | 'paused'
  const [progreso,       setProgreso]       = useState(0);
  const [lineas,         setLineas]         = useState([]);
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  const [mostrarModal,   setMostrarModal]   = useState(false);

  const terminalRef  = useRef(null);
  const timeoutsRef  = useRef([]);
  const intervaloRef = useRef(null);

  const limpiarTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervaloRef.current) { clearInterval(intervaloRef.current); intervaloRef.current = null; }
  }, []);

  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lineas]);

  useEffect(() => () => limpiarTimers(), [limpiarTimers]);

  const resetear = useCallback(() => {
    limpiarTimers();
    setFase('idle'); setProgreso(0); setLineas([]);
    setMostrarTerminal(false); setMostrarModal(false); setInputVal('');
  }, [limpiarTimers]);

  const iniciarCifrado = () => {
    if (!inputVal.trim() || fase !== 'idle') return;
    limpiarTimers();
    setLineas([]); setProgreso(0); setMostrarModal(false);
    setMostrarTerminal(true); setFase('running');

    const secuencia = construirSecuencia(inputVal.trim());

    // Calcular tiempos acumulados para cada línea
    let acumulado = 0;
    secuencia.forEach((item, i) => {
      acumulado += item.delay;
      const t = setTimeout(() => {
        setLineas(prev => [...prev, item]);
      }, acumulado);
      timeoutsRef.current.push(t);
    });

    // Progreso llega a 87% en el tiempo total de la secuencia
    const tiempoTotal = acumulado;
    const TICK        = 120;
    const incremento  = (87 / tiempoTotal) * TICK;

    intervaloRef.current = setInterval(() => {
      setProgreso(prev => {
        const sig = prev + incremento;
        if (sig >= 87) {
          clearInterval(intervaloRef.current); intervaloRef.current = null;
          setFase('paused'); setMostrarModal(true);
          return 87;
        }
        return sig;
      });
    }, TICK);
  };

  const tipoActual = TIPOS.find(t => t.id === tipo);

  return (
    <section id="engine" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            Motor de Cifrado en Vivo
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Prueba Nuestra Protección
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Ingresa un perfil, número o dispositivo y observa cómo Incripta lo protege en tiempo real.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-6 mb-4"
        >
          <div className="flex gap-2 mb-5">
            {TIPOS.map(t => (
              <button key={t.id}
                onClick={() => { if (t.id === tipo) return; resetear(); setTipo(t.id); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tipo === t.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text" value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && iniciarCifrado()}
              placeholder={tipoActual.placeholder}
              disabled={fase === 'running'}
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
            />
            <button
              onClick={fase === 'idle' ? iniciarCifrado : resetear}
              className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
                fase === 'idle'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white'
              }`}
            >
              {fase === 'idle' ? <><IconCandado /> Iniciar cifrado</> : <><IconReset /> Reiniciar</>}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mostrarTerminal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-3xl"
              style={{ border: '1px solid rgba(0,255,136,0.15)', boxShadow: '0 0 40px rgba(0,255,136,0.07), inset 0 0 40px rgba(0,255,136,0.02)' }}
            >
              {/* Barra de título */}
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/90 border-b border-white/5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono tracking-wide">incripta — cifrado activo</span>
                {fase === 'running' && (
                  <span className="ml-auto flex items-center gap-1.5 text-[10px] text-green-400 font-mono">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />EN PROCESO
                  </span>
                )}
                {fase === 'paused' && (
                  <span className="ml-auto text-[10px] text-orange-400 font-mono">⚠ PAUSADO — 87%</span>
                )}
              </div>

              {/* Área de logs */}
              <div ref={terminalRef}
                className="p-5 h-72 overflow-y-auto font-mono text-sm space-y-1 terminal-scroll"
                style={{ background: 'linear-gradient(180deg,#05030d 0%,#080612 100%)' }}
              >
                {lineas.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    className={`leading-relaxed ${item.objetivo ? '' : colorLinea(item.text)}`}
                  >
                    {item.objetivo
                      ? <LineaObjetivo linea={item.text} />
                      : item.text}
                  </motion.div>
                ))}
                {fase === 'running' && (
                  <span className="inline-block w-2 h-[1.1em] bg-[#00ff88] align-middle terminal-cursor" />
                )}
              </div>

              {/* Barra de progreso */}
              <div className="bg-slate-900/90 px-5 py-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-500">Progreso de cifrado</span>
                  <span className={`text-sm font-bold font-mono tabular-nums ${progreso >= 87 ? 'text-orange-400' : 'text-[#00ff88]'}`}>
                    {Math.floor(progreso)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-none ${progreso >= 87 ? 'bg-gradient-to-r from-orange-500 to-yellow-400' : 'bg-gradient-to-r from-[#00ff88] to-purple-500'}`}
                    style={{ width: `${progreso}%` }}
                  />
                </div>
                <AnimatePresence>
                  {progreso >= 87 && (
                    <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-orange-400 mt-2 font-mono"
                    >
                      ⚠ Capa de autenticación bloqueada — se requiere membresía activa para continuar
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal de conversión al 87% */}
              <AnimatePresence>
                {mostrarModal && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center rounded-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0.88, opacity: 0, y: 16 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.88, opacity: 0 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 24 }}
                      className="bg-slate-900 border border-purple-500/30 rounded-2xl p-8 mx-6 max-w-sm w-full text-center shadow-2xl shadow-purple-900/40"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="text-5xl font-black text-orange-400 mb-1">87%</div>
                      <h3 className="text-xl font-bold text-white mb-2">Cifrado Pausado</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        El proceso está al <strong className="text-white">87%</strong>. Activa tu membresía
                        para completar la protección total y mantenerla activa 24/7.
                      </p>
                      <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className={`flex-1 h-1.5 rounded-full ${i < 8 ? 'bg-purple-500' : i === 8 ? 'bg-purple-500/40' : 'bg-slate-700'}`} />
                        ))}
                      </div>
                      <a href="#subscribe"
                        className="block w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/25 mb-3"
                      >
                        Suscribirme Ahora — $10/mes
                      </a>
                      <a href="#plans"
                        className="block w-full py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      >
                        Ver planes
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const IconCandado = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconReset = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
