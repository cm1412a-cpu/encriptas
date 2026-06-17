import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Star, Shield } from 'lucide-react';

// ─── Datos de planes ──────────────────────────────────────────────────────────

export const PLANS = [
  {
    id:       'basico',
    badge:    'PLAN MENSUAL',
    BadgeIcon: Zap,
    name:     'Básico',
    price:    '$10',
    period:   '/ mes',
    savings:  null,
    amount:   1000,
    highlight: false,
    btnLabel: 'Empezar ahora',
    includes: [
      '1 cuenta a elegir: WhatsApp, Instagram, Facebook, TikTok o Gmail',
      '1 dispositivo móvil (Android o iPhone)',
      'Análisis de vulnerabilidad básico',
      'Terminal de cifrado en vivo',
      'Correo de confirmación y comprobante',
      'Verificación de protección activa',
    ],
    excludes: [
      'Cuentas publicitarias Meta / Google',
      'Billeteras digitales',
      'Soporte prioritario',
    ],
  },
  {
    id:       'pro',
    badge:    'MÁS POPULAR',
    BadgeIcon: Star,
    name:     'Pro',
    price:    '$45',
    period:   '/ 6 meses',
    savings:  'Equivale a $7.50/mes — ahorras $15',
    amount:   4500,
    highlight: true,
    btnLabel: 'Elegir Pro',
    includes: [
      'Hasta 5 cuentas simultáneas protegidas',
      'WhatsApp + todas las redes sociales',
      'Gmail + Google Drive + Google Fotos',
      'Billeteras digitales (Yape, Plin, etc.)',
      'Apps bancarias móviles',
      '2 dispositivos móviles',
      'Recordatorio de renovación automático',
      'Soporte prioritario por WhatsApp',
    ],
    excludes: [
      'Cuentas publicitarias Meta / Google',
      'CRM empresarial',
    ],
  },
  {
    id:       'elite',
    badge:    'PLAN ANUAL',
    BadgeIcon: Shield,
    name:     'Elite',
    price:    '$90',
    period:   '/ año',
    savings:  'Equivale a $7.50/mes — ahorras $30',
    amount:   9000,
    highlight: false,
    btnLabel: 'Elegir Elite',
    includes: [
      'Cuentas ilimitadas protegidas',
      'Meta Ads y Google Ads incluidos',
      'CRM y herramientas empresariales',
      'OnlyFans y plataformas de contenido',
      'Dispositivos ilimitados',
      'Análisis avanzado — 23 vectores de ataque',
      'Certificado digital de protección descargable',
      'Soporte 24/7 por WhatsApp directo',
      'Alerta inmediata si detecta amenaza activa',
    ],
    excludes: [],
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function PricingPlans({ onSelectPlan }) {
  return (
    <section id="planes" className="py-20">

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: '#00d4ff' }} />
          Protección garantizada
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Elige tu nivel de protección
        </h2>
        <p className="text-slate-400 text-lg">
          Sin contratos. Cancela cuando quieras.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} index={i} onSelectPlan={onSelectPlan} />
        ))}
      </div>

    </section>
  );
}

// ─── Card individual ──────────────────────────────────────────────────────────

function PlanCard({ plan, index, onSelectPlan }) {
  const { BadgeIcon } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={plan.highlight ? {
        background: 'linear-gradient(160deg,#12102a 0%,#0d1128 100%)',
        border: '1.5px solid rgba(180,79,255,0.55)',
        boxShadow: '0 0 40px rgba(180,79,255,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
      } : {
        background: '#111827',
        border: '1px solid rgba(0,212,255,0.15)',
      }}
      onMouseEnter={!plan.highlight ? e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)'; } : undefined}
      onMouseLeave={!plan.highlight ? e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; } : undefined}
    >
      {/* Glow top para el plan destacado */}
      {plan.highlight && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(180,79,255,0.9),rgba(0,212,255,0.6),transparent)' }} />
      )}

      <div className="p-7 flex flex-col flex-1">

        {/* Badge */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em]"
            style={plan.highlight ? {
              background: 'rgba(180,79,255,0.15)',
              border: '1px solid rgba(180,79,255,0.45)',
              color: '#d88fff',
            } : {
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: '#00d4ff',
            }}
          >
            <BadgeIcon className="w-2.5 h-2.5" />
            {plan.badge}
          </span>
        </div>

        {/* Nombre + precio */}
        <h3 className="text-2xl font-black text-white mb-1">{plan.name}</h3>
        <div className="flex items-end gap-1.5 mb-1">
          <span className="text-4xl font-black"
            style={{ color: plan.highlight ? '#b44fff' : '#e2e8f0' }}>
            {plan.price}
          </span>
          <span className="text-slate-500 text-sm mb-1.5">{plan.period}</span>
        </div>
        {plan.savings && (
          <p className="text-[11px] font-semibold mb-5"
            style={{ color: plan.highlight ? '#b44fff' : '#6b7280' }}>
            {plan.savings}
          </p>
        )}
        {!plan.savings && <div className="mb-5" />}

        {/* Separador */}
        <div className="h-px mb-5"
          style={{ background: plan.highlight ? 'rgba(180,79,255,0.2)' : 'rgba(0,212,255,0.08)' }} />

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {plan.includes.map(feat => (
            <li key={feat} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.25)' }}>
                <Check className="w-2.5 h-2.5" style={{ color: '#00ff88' }} strokeWidth={3} />
              </span>
              <span className="text-[13px] text-slate-300 leading-snug">{feat}</span>
            </li>
          ))}
          {plan.excludes.map(feat => (
            <li key={feat} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                <X className="w-2.5 h-2.5 text-red-500" strokeWidth={3} />
              </span>
              <span className="text-[13px] text-slate-600 leading-snug line-through decoration-slate-700">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Botón */}
        <button
          onClick={() => onSelectPlan(plan)}
          className="w-full py-3.5 rounded-2xl font-black text-sm transition-all duration-200 active:scale-[0.97]"
          style={plan.highlight ? {
            background: 'linear-gradient(135deg,#00d4ff 0%,#b44fff 100%)',
            color: '#fff',
            boxShadow: '0 0 28px rgba(0,212,255,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
            transition: 'box-shadow 0.2s',
          } : {
            background: 'rgba(0,212,255,0.06)',
            color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.3)',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            if (plan.highlight) {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.6), 0 0 20px rgba(180,79,255,0.4)';
            } else {
              e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
              e.currentTarget.style.boxShadow = '0 0 18px rgba(0,212,255,0.25)';
            }
          }}
          onMouseLeave={e => {
            if (plan.highlight) {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(0,212,255,0.45), inset 0 1px 0 rgba(255,255,255,0.15)';
            } else {
              e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {plan.btnLabel}
        </button>

      </div>
    </motion.div>
  );
}
