import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Smartphone, Mail, Share2, BarChart3, ShieldCheck } from 'lucide-react';

// ─── Datos ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    Icon:  MessageCircle,
    title: 'Protección WhatsApp',
    desc:  'Blindaje completo para tu cuenta de WhatsApp contra hackeos, clonaciones y accesos no autorizados.',
    price: 'Desde $10',
    period: '/mes',
  },
  {
    Icon:  Smartphone,
    title: 'Protección Dispositivo Móvil',
    desc:  'Cifrado de nueva generación para tu smartphone. Protege tus datos, fotos y aplicaciones.',
    price: 'Desde $10',
    period: '/mes',
  },
  {
    Icon:  Mail,
    title: 'Protección Google & Gmail',
    desc:  'Asegura tu cuenta de Google, Gmail y todos los servicios asociados contra intrusiones.',
    price: 'Desde $10',
    period: '/mes',
  },
  {
    Icon:  Share2,
    title: 'Protección Redes Sociales',
    desc:  'Protege Instagram, Facebook, TikTok y todas tus redes sociales de accesos maliciosos.',
    price: 'Desde $10',
    period: '/mes',
  },
  {
    Icon:  BarChart3,
    title: 'Protección Cuenta Publicitaria',
    desc:  'Resguarda tus cuentas de Meta Ads y Google Ads contra robos que pueden costarte miles de dólares.',
    price: 'Desde $10',
    period: '/mes',
  },
  {
    Icon:     ShieldCheck,
    title:    'Protección Total Elite',
    desc:     'Cobertura completa para todos tus dispositivos, cuentas y redes sociales en un solo plan.',
    price:    '$90',
    period:   '/año',
    featured: true,
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ServicesSection({ onScrollToForm }) {
  return (
    <section id="servicios" className="py-20">

      {/* ── Encabezado ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: '#00d4ff' }} />
          Nuestros servicios
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Protección a la medida de tu vida digital
        </h2>
        <p className="text-slate-400 text-lg">
          Elige el blindaje que necesitas — o protégelo todo con un solo plan.
        </p>
      </motion.div>

      {/* ── Grid de servicios ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(({ Icon, title, desc, price, period, featured }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            className="relative flex flex-col p-8 rounded-3xl transition-all"
            style={featured
              ? { background: 'linear-gradient(160deg,#10172e 0%,#0a0a1a 60%,#15082b 100%)', border: '1px solid rgba(180,79,255,0.4)', boxShadow: '0 0 32px rgba(180,79,255,0.12)' }
              : { background: '#111827', border: '1px solid rgba(0,212,255,0.15)' }
            }
            onMouseEnter={e => {
              if (featured) return;
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.12)';
            }}
            onMouseLeave={e => {
              if (featured) return;
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
              e.currentTarget.style.boxShadow = '0 0 0 rgba(0,212,255,0)';
            }}
          >
            {featured && (
              <span
                className="absolute top-5 right-5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{ background: 'rgba(180,79,255,0.15)', border: '1px solid rgba(180,79,255,0.35)', color: '#d8b4fe' }}
              >
                Recomendado
              </span>
            )}

            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={featured
                ? { background: 'rgba(180,79,255,0.1)', border: '1px solid rgba(180,79,255,0.3)', color: '#c084fc' }
                : { background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }
              }
            >
              <Icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-slate-400 leading-relaxed mb-6 flex-grow">{desc}</p>

            <div className="flex items-end justify-between pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black" style={{ color: featured ? '#c084fc' : '#00d4ff' }}>{price}</span>
                <span className="text-sm text-slate-500">{period}</span>
              </div>
              <button
                onClick={onScrollToForm}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={featured
                  ? { background: 'linear-gradient(135deg,#00d4ff 0%,#b44fff 100%)', color: '#fff', boxShadow: '0 0 18px rgba(180,79,255,0.35)' }
                  : { background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }
                }
              >
                Contratar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
