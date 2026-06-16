import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Share2, Video, DollarSign, MessageCircle } from 'lucide-react';

const PROBLEMS = [
  {
    title: 'Perdió 380,000 seguidores de un día para otro',
    desc:  'Un influencer de fitness recibió un link de una supuesta marca para colaboración. Era phishing. Accedieron a su Instagram, cambiaron el email y contraseña y lo vendieron en el mercado negro. Tardó 4 meses en recuperar la cuenta y perdió el 60% de sus seguidores.',
  },
  {
    title: 'Le robaron su contenido de OnlyFans',
    desc:  'Hackearon su cuenta y descargaron todo el contenido exclusivo antes de que pudiera reaccionar. Lo distribuyeron gratis en foros y sus suscripciones cayeron 80% en dos semanas. El daño económico fue de más de $15,000 al mes.',
  },
  {
    title: 'Suplantaron su identidad en TikTok',
    desc:  'Crearon una cuenta falsa idéntica a la suya y empezaron a hacer lives pidiendo donaciones a sus seguidores. Varios fans cayeron antes de que TikTok actuara. Su reputación quedó dañada aunque él no tuvo culpa.',
  },
];

const PROTECTIONS = [
  {
    Icon:  Share2,
    title: 'Instagram y TikTok',
    desc:  'Tu cuenta, tus seguidores y tu contenido blindados. Nadie puede acceder aunque tengan tu contraseña desde un dispositivo no reconocido.',
  },
  {
    Icon:  Video,
    title: 'Contenido exclusivo y OnlyFans',
    desc:  'Tu contenido de pago protegido con cifrado de extremo a extremo. Nadie puede descargar ni distribuir tu material sin autorización.',
  },
  {
    Icon:  DollarSign,
    title: 'Ingresos y monetización',
    desc:  'Tus cuentas de AdSense, pagos de marcas y plataformas de monetización protegidas. Sin desvíos de pagos ni fraudes de facturación.',
  },
  {
    Icon:  MessageCircle,
    title: 'DMs y colaboraciones',
    desc:  'Tus mensajes directos con marcas, agencias y seguidores cifrados. Nadie puede espiar tus negociaciones ni suplantar tu identidad en DMs.',
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

export default function InfluencersSection({ onScrollToForm }) {
  const { ref: counterRef, count } = useAnimatedCounter(33);

  return (
    <section id="influencers" className="py-24">

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
          Para influencers &amp; creadores
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          ¿Eres influencer o creador de contenido?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Tu cuenta es tu negocio. Perderla significa perderlo todo —
          seguidores, ingresos y años de trabajo de un día para otro.
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
            Tu cuenta vale más de lo que crees. ¿La estás protegiendo?
          </p>

          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="text-sm font-bold text-slate-400 self-start mt-8 mr-1">1 de cada</span>
            <span className="font-black leading-none"
              style={{ fontSize: 'clamp(5rem,14vw,9rem)', color: '#c4b5fd', lineHeight: 1 }}>
              {count === 33 ? '3' : count < 11 ? '1' : count < 22 ? '2' : '3'}
            </span>
          </div>

          <p className="text-slate-300 text-lg md:text-xl font-medium mb-2 max-w-xl mx-auto">
            influencers con más de 50k seguidores ha sufrido un intento de hackeo en el último año
          </p>
          <p className="text-slate-500 text-sm mb-10">
            Fuente: Social Media Security Benchmark 2024
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
            <Share2 className="w-5 h-5" />
            Proteger mi cuenta ahora
          </button>

          <p className="text-slate-600 text-xs mt-5">
            Plan Elite recomendado para creadores · Sin contratos · Cancela cuando quieras
          </p>
        </div>
      </motion.div>

    </section>
  );
}
