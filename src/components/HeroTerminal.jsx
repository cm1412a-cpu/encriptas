import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const hex = (n = 12) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('');

const DEMO_TARGET = 'instagram.com/usuario_demo';

const construirSecuencia = () => [
  { text: '> Iniciando protocolo Incripta v3.7...',                             delay: 0    },
  { text: '> Estableciendo conexión cifrada con servidor central...',            delay: 800  },
  { text: '> Verificando integridad del sistema... OK',                          delay: 900  },
  { text: `> Identificando objetivo: ${DEMO_TARGET}`,                           delay: 700, objetivo: true },
  { text: '> [####                ] 18% Escaneando vulnerabilidades...',         delay: 900  },
  { text: '> ALERTA: 3 vectores de ataque detectados',                           delay: 700  },
  { text: '> Bloqueando vectores de ataque identificados...',                     delay: 600  },
  { text: '> [########            ] 35% Generando arquitectura de cifrado...',   delay: 900  },
  { text: `> IV generado: 7f3a9c2e-${hex(12)}`,                                 delay: 500  },
  { text: '> openssl enc -aes-256-gcm -in data.bin -out encrypted.bin',          delay: 600  },
  { text: '> Generating RSA key pair (4096 bits)... done',                       delay: 700  },
  { text: '> Aplicando AES-256-GCM... OK',                                       delay: 600  },
  { text: `> Hash SHA-512: ${hex(16)}...`,                                      delay: 400  },
  { text: '> Certificate signature: SHA256withRSA verified',                     delay: 600  },
  { text: '> [############        ] 55% Conectando red neural distribuida...',   delay: 900  },
  { text: '> Nodo [Frankfurt]   → Conectado',                                    delay: 500  },
  { text: '> Nodo [São Paulo]   → Conectado',                                    delay: 400  },
  { text: '> Nodo [Tokio]       → Conectado',                                    delay: 400  },
  { text: '> Nodo [Nueva York]  → Conectado',                                    delay: 400  },
  { text: '> TLS 1.3 handshake completed: 43ms',                                 delay: 500  },
  { text: '> ECDH key exchange: curve25519 OK',                                  delay: 500  },
  { text: '> HKDF key derivation: session keys ready',                           delay: 400  },
  { text: '> [################    ] 72% Blindando aplicaciones vinculadas...',   delay: 900  },
  { text: '> /dev/urandom entropy: sufficient (512 bits)',                        delay: 500  },
  { text: '> mlock() success: memory locked',                                    delay: 500  },
  { text: '> Stack canary 0x7f3a9c2e: verified',                                 delay: 500  },
  { text: '> ASLR base: 0x561f3a2b0000 active',                                  delay: 500  },
  { text: '> Aplicando escudo en capa de aplicación...',                          delay: 600  },
  { text: '> seccomp filter: 47 syscalls whitelisted',                            delay: 500  },
  { text: '> Test de penetración interno: SUPERADO',                              delay: 600  },
  { text: '> Vault integrity: SHA3-256 verified OK',                              delay: 500  },
  { text: '> Zero-knowledge proof: validated',                                    delay: 500  },
  { text: '> Homomorphic layer: initialized',                                     delay: 400  },
  { text: '> Quantum-resistant lattice: Kyber-1024 active',                       delay: 500  },
  { text: '> [####################] 100% — CIFRADO COMPLETADO',                 delay: 900  },
  { text: `> Clave maestra: nv-${hex(32)}`,                                     delay: 500  },
  { text: '> Estado: PROTEGIDO',                                                  delay: 600  },
  { text: '> Reiniciando protocolo en 3s...',                                     delay: 1800 },
];

function colorLinea(linea) {
  if (!linea) return { color: '#334155' };
  if (linea.includes('ALERTA') || linea.includes('ADVERTENCIA'))
    return { color: '#ff6b6b' };
  if (linea.startsWith('> ['))
    return { color: '#00d4ff', fontWeight: 'bold' };
  if (
    linea.endsWith('OK')          || linea.endsWith('done')       ||
    linea.endsWith('ready')       || linea.endsWith('active')     ||
    linea.endsWith('locked')      || linea.endsWith('validated')  ||
    linea.endsWith('initialized') || linea.endsWith('Conectado')  ||
    linea.endsWith('SUPERADO')    || linea.includes('COMPLETADO') ||
    linea.includes('PROTEGIDO')   || linea.includes('verified')   ||
    linea.includes('whitelisted')
  ) return { color: '#00ff88', textShadow: '0 0 8px #00ff88, 0 0 24px rgba(0,255,136,0.35)' };
  if (
    linea.includes('Generating')   || linea.includes('handshake')    ||
    linea.includes('derivation')   || linea.includes('entropy')      ||
    linea.includes('seccomp')      || linea.includes('Homomorphic')  ||
    linea.includes('lattice')      || linea.includes('Zero-knowledge') ||
    linea.includes('openssl')      || linea.includes('Certificate')  ||
    linea.includes('ECDH')         || linea.includes('HKDF')         ||
    linea.includes('mlock')        || linea.includes('canary')       ||
    linea.includes('ASLR')         || linea.includes('Vault integrity')
  ) return { color: '#00d4ff' };
  if (linea.startsWith('>'))
    return { color: '#4ade80' };
  return { color: '#475569' };
}

const MAX_LINES = 16;

export default function HeroTerminal() {
  const [lineas,   setLineas]   = useState([]);
  const [progreso, setProgreso] = useState(0);

  const timeoutsRef  = useRef([]);
  const intervaloRef = useRef(null);
  const terminalRef  = useRef(null);
  const batchRef     = useRef(0);

  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lineas]);

  const limpiar = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervaloRef.current) { clearInterval(intervaloRef.current); intervaloRef.current = null; }
  }, []);

  const iniciar = useCallback(() => {
    limpiar();
    batchRef.current += 1;
    const batch = batchRef.current;
    setLineas([]);
    setProgreso(0);

    const sec = construirSecuencia();
    let acumulado = 0;
    let lineIdx   = 0;

    sec.forEach((item) => {
      acumulado += item.delay;
      const idx = lineIdx++;
      const t = setTimeout(() => {
        setLineas(prev => {
          const newItem = { ...item, _key: `${batch}-${idx}` };
          const next = [...prev, newItem];
          return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
        });
      }, acumulado);
      timeoutsRef.current.push(t);
    });

    const restartT = setTimeout(() => iniciar(), acumulado + 1200);
    timeoutsRef.current.push(restartT);

    const TICK = 100;
    const incremento = (100 / acumulado) * TICK;
    intervaloRef.current = setInterval(() => {
      setProgreso(prev => {
        const sig = prev + incremento;
        if (sig >= 100) {
          clearInterval(intervaloRef.current);
          intervaloRef.current = null;
          return 100;
        }
        return sig;
      });
    }, TICK);
  }, [limpiar]);

  useEffect(() => {
    iniciar();
    return limpiar;
  }, [iniciar, limpiar]);

  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col h-full"
      style={{
        border:     '1px solid rgba(0,255,136,0.15)',
        boxShadow:  '0 0 50px rgba(0,255,136,0.07), inset 0 0 50px rgba(0,255,136,0.02)',
        minHeight:  560,
        background: 'linear-gradient(180deg,#05030d 0%,#080612 100%)',
      }}
    >
      {/* Barra de título */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 border-b border-white/5 flex-shrink-0">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-500 font-mono tracking-wide">
          incripta — cifrado activo
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-green-400 font-mono">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          EN PROCESO
        </span>
      </div>

      {/* Área de logs */}
      <div
        ref={terminalRef}
        className="p-5 font-mono text-sm space-y-1 overflow-y-hidden flex-1"
        style={{ minHeight: 440 }}
      >
        {lineas.map((item) => (
          <motion.div
            key={item._key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
            className="leading-relaxed"
            style={item.objetivo ? undefined : colorLinea(item.text)}
          >
            {item.objetivo ? (
              <>
                <span style={{ color: '#4ade80' }}>{'> Identificando objetivo: '}</span>
                <span style={{ color: '#fff', fontWeight: 700, textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>
                  {DEMO_TARGET}
                </span>
              </>
            ) : item.text}
          </motion.div>
        ))}
        <span className="inline-block w-2 h-[1.1em] bg-[#00ff88] align-middle terminal-cursor" />
      </div>

      {/* Barra de progreso */}
      <div className="px-5 py-3 bg-slate-900/70 border-t border-white/5 flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-mono text-slate-500">Progreso de cifrado</span>
          <span className="text-sm font-bold font-mono tabular-nums" style={{ color: '#00ff88' }}>
            {Math.floor(progreso)}%
          </span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width:      `${progreso}%`,
              background: 'linear-gradient(90deg,#00ff88,#7c3aed)',
              boxShadow:  '0 0 8px rgba(0,255,136,0.35)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
