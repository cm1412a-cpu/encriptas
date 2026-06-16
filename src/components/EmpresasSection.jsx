import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Database, Globe, Lock } from 'lucide-react';

const PROBLEMS = [
  {
    title: 'Filtraron la base de datos de clientes',
    desc:  'Un competidor pagó para acceder al CRM de una empresa de retail. Exportaron 45,000 contactos con emails, teléfonos e historial de compras. Los vendieron a la competencia y los usaron para spam masivo. La empresa perdió el 30% de sus clientes en 3 meses.',
  },
  {
    title: 'Hackearon el email corporativo',
    desc:  'Accedieron al Gmail empresarial del CEO y enviaron facturas falsas a todos los clientes pidiendo pagos a otra cuenta bancaria. Tres clientes pagaron antes de detectar el fraude. Pérdida total: $24,000 más daño irreversible a la reputación.',
  },
  {
    title: 'Tomaron control del Google My Business',
    desc:  'Un competidor accedió al perfil de Google de un restaurante y cambió el número de teléfono, el horario y las fotos. Las reseñas negativas falsas que dejaron bajaron su calificación de 4.8 a 2.1 en una semana.',
  },
];

const PROTECTIONS = [
  {
    Icon:  Building2,
    title: 'Email y comunicaciones corporativas',
    desc:  'Gmail empresarial, Outlook y toda comunicación con clientes y proveedores cifrada y blindada contra suplantación.',
  },
  {
    Icon:  Database,
    title: 'CRM y base de datos de clientes',
    desc:  'Tus contactos, historial de compras y datos comerciales protegidos con cifrado militar. Nadie puede exportar tu base de datos.',
  },
  {
    Icon:  Globe,
    title: 'Presencia digital de la marca',
    desc:  'Google My Business, sitio web y perfiles oficiales blindados contra modificaciones no autorizadas.',
  },
  {
    Icon:  Lock,
    title: 'Accesos del equipo de trabajo',
    desc:  'Control total de quién accede a qué. Alerta inmediata si un empleado o externo intenta acceder a información restringida.',
  },
];

function useAnimatedCounter(target, duration = 1800) {
  const [count,   setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    const steps = 60;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(Math.round(target * (1 - Math.pow(1 - current / steps, 3))));
      if (current >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, started, target, duration]);

  return { ref, count };
}

export default function EmpresasSection({ onScrollToForm }) {
  const { ref: counterRef, count } = useAnimatedCounter(60);

  return (
    <section id="empresas" className="py-24">

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
          Para empresas &amp; marcas
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          ¿Tienes una empresa o marca?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Un solo ataque puede destruir años de reputación y datos de clientes.
          No es cuestión de si te atacarán, sino de cuándo.
        </p>
      </motion.div>

      {/* Bloque 1: El Problema */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-2xl p-6"
            style={{ background: 'rgba(127,29,29,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
            >
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Caso real
            </span>
            <h3 className="text-base font-bold text-white mb-3 leading-snug">{p.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bloque 2: Protección */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-center mb-8"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
          Protección Encriptas Elite cubre todo esto
        </p>
        <h3 className="text-2xl font-bold text-white">Lo que blindamos por ti</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {PROTECTIONS.map(({ Icon, title, desc }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(76,29,149,0.1)', border: '1px solid rgba(139,92,246,0.22)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">{title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bloque 3: CTA */}
      <motion.div
        ref={counterRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden px-8 py-14 text-center"
        style={{
          background: 'linear-gradient(160deg,#1a0535 0%,#0f0120 60%,#130325 100%)',
          border:     '1px solid rgba(139,92,246,0.25)',
          boxShadow:  '0 0 60px rgba(124,58,237,0.12)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.7),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.15) 0%,transparent 65%)' }} />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-6">
            Tu empresa es un objetivo. ¿Está protegida?
          </p>

          <div className="flex items-end justify-center gap-1 mb-4">
            <span className="font-black leading-none"
              style={{ fontSize: 'clamp(5rem,14vw,9rem)', color: '#c4b5fd', lineHeight: 1 }}>
              {count}
            </span>
            <span className="font-black pb-3"
              style={{ fontSize: 'clamp(3rem,8vw,5rem)', color: '#a78bfa' }}>
              %
            </span>
          </div>

          <p className="text-slate-300 text-lg md:text-xl font-medium mb-2 max-w-xl mx-auto">
            de las pequeñas empresas cierran dentro de 6 meses después de un ciberataque grave
          </p>
          <p className="text-slate-500 text-sm mb-10">
            Fuente: National Cyber Security Alliance Report
          </p>

          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-base transition-all duration-200 active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg,#7c3aed 0%,#9333ea 100%)',
              color:      '#fff',
              boxShadow:  '0 0 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 48px rgba(124,58,237,0.75), inset 0 1px 0 rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Building2 className="w-5 h-5" />
            Proteger mi empresa ahora
          </button>

          <p className="text-slate-600 text-xs mt-5">
            Plan Elite recomendado para empresas · Sin contratos · Cancela cuando quieras
          </p>
        </div>
      </motion.div>

    </section>
  );
}
