import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, BarChart2, Users, CreditCard } from 'lucide-react';

// ─── Datos ────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    title: 'Te robaron la cuenta de Meta Ads',
    desc:  'Un cliente pagaba $3,000/mes en campañas. Alguien accedió a su Business Manager y gastó $11,000 en 36 horas. Meta tardó 2 semanas en investigar — sin reembolso.',
  },
  {
    title: 'Perdiste el Instagram de tu marca',
    desc:  'Agencia con cuenta de 220k seguidores comprometida vía phishing. El atacante cambió el correo, el 2FA y la contraseña. Recuperarla llevó 3 meses y perdieron el 40% de su audiencia.',
  },
  {
    title: 'Google Ads modificado sin aviso',
    desc:  'Acceso no autorizado cambió campañas activas para redirigir tráfico a páginas de la competencia. El cliente perdió $5,500 en clics sin conversiones durante 4 días.',
  },
];

const PROTECTIONS = [
  {
    Icon:  Shield,
    title: 'Cuentas publicitarias',
    desc:  'Meta Ads, Google Ads, TikTok Ads — protección activa 24/7 contra accesos no autorizados.',
  },
  {
    Icon:  BarChart2,
    title: 'Análisis de vulnerabilidades',
    desc:  '23 vectores de ataque analizados en tiempo real. Alertas instantáneas si detectamos actividad sospechosa.',
  },
  {
    Icon:  Users,
    title: 'Control de accesos de equipo',
    desc:  'Monitorea quién entra a tus cuentas, desde dónde y cuándo. Bloqueo automático de sesiones sospechosas.',
  },
  {
    Icon:  CreditCard,
    title: 'Protección de facturación',
    desc:  'Blindaje contra cargos no autorizados en tarjetas vinculadas a plataformas publicitarias.',
  },
];

// ─── Hook contador animado ────────────────────────────────────────────────────

function useAnimatedCounter(target, duration = 1800) {
  const [count, setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    const steps    = 60;
    const interval = duration / steps;
    let current    = 0;

    const timer = setInterval(() => {
      current += 1;
      const eased = Math.round(target * (1 - Math.pow(1 - current / steps, 3)));
      setCount(eased);
      if (current >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [inView, started, target, duration]);

  return { ref, count };
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function MarketersSection({ onScrollToForm }) {
  const { ref: counterRef, count } = useAnimatedCounter(73);

  return (
    <section id="marketeros" className="py-24">

      {/* ── Encabezado ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border:     '1px solid rgba(239,68,68,0.2)',
            color:      '#f87171',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
          Para agencias &amp; marketeros
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          ¿Manejas cuentas publicitarias?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Un solo hackeo puede costarte miles de dólares y semanas de trabajo.
          Así le ha pasado a cientos de agencias. No esperes a que te toque.
        </p>
      </motion.div>

      {/* ── Bloque 1: El Problema ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(127,29,29,0.12)',
              border:     '1px solid rgba(239,68,68,0.2)',
            }}
          >
            {/* Badge caso real */}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
              style={{
                background: 'rgba(239,68,68,0.15)',
                border:     '1px solid rgba(239,68,68,0.3)',
                color:      '#fca5a5',
              }}
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

      {/* ── Bloque 2: Lo que protege Incripta ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-center mb-8"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
          Protección Incripta Elite cubre todo esto
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
            style={{
              background: 'rgba(76,29,149,0.1)',
              border:     '1px solid rgba(139,92,246,0.22)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: 'rgba(139,92,246,0.15)',
                border:     '1px solid rgba(139,92,246,0.3)',
              }}
            >
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">{title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Bloque 3: CTA Urgente ────────────────────────────────────────── */}
      <motion.div
        ref={counterRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden px-8 py-14 text-center"
        style={{
          background:  'linear-gradient(160deg,#1a0535 0%,#0f0120 60%,#130325 100%)',
          border:      '1px solid rgba(139,92,246,0.25)',
          boxShadow:   '0 0 60px rgba(124,58,237,0.12)',
        }}
      >
        {/* Glow top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.7),transparent)' }}
        />

        {/* Radial bg accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.15) 0%,transparent 65%)' }}
        />

        <div className="relative">
          {/* Estadístico animado */}
          <div className="flex items-end justify-center gap-1 mb-4">
            <span
              className="font-black leading-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', color: '#c4b5fd', lineHeight: 1 }}
            >
              {count}
            </span>
            <span
              className="font-black pb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#a78bfa' }}
            >
              %
            </span>
          </div>

          <p className="text-slate-300 text-lg md:text-xl font-medium mb-2 max-w-xl mx-auto">
            de agencias digitales reportaron al menos una brecha de seguridad en el último año
          </p>
          <p className="text-slate-500 text-sm mb-10">
            Fuente: Digital Marketing Security Report 2024
          </p>

          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-base transition-all duration-200 active:scale-[0.97]"
            style={{
              background:  'linear-gradient(135deg,#7c3aed 0%,#9333ea 100%)',
              color:       '#fff',
              boxShadow:   '0 0 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
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
            <Shield className="w-5 h-5" />
            Protege tu agencia ahora
          </button>

          <p className="text-slate-600 text-xs mt-5">
            Plan Elite recomendado para agencias · Sin contratos · Cancela cuando quieras
          </p>
        </div>
      </motion.div>

    </section>
  );
}
