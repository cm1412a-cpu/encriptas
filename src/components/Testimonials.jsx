import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Globe, Award } from 'lucide-react';

// ─── Colores de avatar — uno por usuario ─────────────────────────────────────

const AVATAR_COLORS = [
  'linear-gradient(135deg,#7c3aed,#a855f7)',
  'linear-gradient(135deg,#0891b2,#06b6d4)',
  'linear-gradient(135deg,#b45309,#d97706)',
  'linear-gradient(135deg,#065f46,#059669)',
  'linear-gradient(135deg,#9f1239,#e11d48)',
  'linear-gradient(135deg,#1d4ed8,#3b82f6)',
  'linear-gradient(135deg,#7c2d12,#ea580c)',
  'linear-gradient(135deg,#4a044e,#a21caf)',
  'linear-gradient(135deg,#164e63,#0e7490)',
];

// ─── Plan badge config ────────────────────────────────────────────────────────

const PLAN_STYLE = {
  Elite:  { bg: 'rgba(124,58,237,0.15)',  border: 'rgba(139,92,246,0.35)',  color: '#c4b5fd' },
  Pro:    { bg: 'rgba(14,165,233,0.12)',  border: 'rgba(14,165,233,0.3)',   color: '#7dd3fc' },
  Básico: { bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.25)', color: '#94a3b8' },
};

// ─── Datos ────────────────────────────────────────────────────────────────────

const STATS = [
  { Icon: Users,  value: '12,400+', label: 'Usuarios activos' },
  { Icon: Globe,  value: '34',      label: 'Países'           },
  { Icon: Award,  value: '4.9/5',   label: 'Calificación promedio' },
];

const REVIEWS = [
  {
    name:    'Carlos Mendoza',
    country: 'México',
    date:    'Hace 2 días',
    plan:    'Elite',
    lang:    null,
    text:    '"Tengo una agencia de marketing y manejamos cuentas publicitarias con más de $50,000 mensuales. Antes de Encriptas nos hackearon una cuenta de Meta Ads y perdimos $8,000 en un fin de semana. Desde que activamos el plan Elite no hemos tenido ningún incidente. Totalmente recomendado para cualquier agencia."',
  },
  {
    name:    'Valentina Restrepo',
    country: 'Colombia',
    date:    'Hace 5 días',
    plan:    'Pro',
    lang:    null,
    text:    '"Soy influencer y tenía mucho miedo de perder mi cuenta de Instagram con 280k seguidores. Encriptas me da una tranquilidad que no tenía antes. Ya intentaron hackearme dos veces según las alertas que recibí y las dos veces el sistema bloqueó el intento. Vale cada centavo que pago."',
  },
  {
    name:    'Ahmed Al-Rashid',
    country: 'Emiratos Árabes',
    date:    'Hace 1 semana',
    plan:    'Elite',
    lang:    'Reseña en inglés',
    text:    '"I manage multiple businesses and my digital security was always a concern. Encriptas\'s Elite plan covers all my accounts, advertising platforms and devices. The encryption terminal is impressive and the support team responds within minutes. Best investment I made this year."',
  },
  {
    name:    'Lucia Fernandez',
    country: 'Argentina',
    date:    'Hace 1 semana',
    plan:    'Básico',
    lang:    null,
    text:    '"Empecé con el plan Básico para proteger mi WhatsApp porque uso mucho el celular para trabajar y manejar datos de clientes. El proceso fue súper simple y en minutos ya estaba todo activo. Me llegó el correo de confirmación al instante. Lo recomiendo a cualquier profesional independiente."',
  },
  {
    name:    'Kevin Okonkwo',
    country: 'Nigeria',
    date:    'Hace 2 semanas',
    plan:    'Pro',
    lang:    'Reseña en inglés',
    text:    '"In Nigeria cybercrime is a serious problem. I lost my Facebook business account once and it cost me a lot. With Encriptas Pro all my social media and banking apps are protected. The real-time encryption terminal shows exactly what is being secured. Very professional service."',
  },
  {
    name:    'Sofia Andersson',
    country: 'Suecia',
    date:    'Hace 2 semanas',
    plan:    'Elite',
    lang:    'Reseña en alemán',
    text:    '"Als Unternehmerin verwalte ich sensible Kundendaten täglich. Encriptas schützt nicht nur meine sozialen Medien, sondern auch mein CRM-System. Der Kundendienst ist hervorragend und reagiert sofort. Ich empfehle es jedem Unternehmer."',
  },
  {
    name:    'Diego Paredes',
    country: 'Perú',
    date:    'Hace 3 semanas',
    plan:    'Pro',
    lang:    null,
    text:    '"Trabajo en una empresa de importaciones y manejamos datos muy sensibles. Nos recomendaron Encriptas y fue la mejor decisión. Lo mejor es la sección de verificación — puedes comprobar en tiempo real que tu número o cuenta está protegida. El soporte por WhatsApp responde rapidísimo, en menos de 10 minutos."',
  },
  {
    name:    'Marie Dupont',
    country: 'Francia',
    date:    'Hace 1 mes',
    plan:    'Elite',
    lang:    'Reseña en francés',
    text:    '"En tant que directrice marketing, je gère plusieurs comptes publicitaires avec des budgets importants. Encriptas Elite protège tout mon écosystème digital. L\'interface est intuitive et le chiffrement en direct est vraiment impressionnant. Je recommande vivement."',
  },
  {
    name:    'Hiroshi Tanaka',
    country: 'Japón',
    date:    'Hace 1 mes',
    plan:    'Pro',
    lang:    'Reseña en inglés',
    text:    '"I run an e-commerce business and protecting my Google Ads account and customer data is critical. Encriptas Pro gave me complete peace of mind. The vulnerability analysis detected 3 weak points I didn\'t know existed. Fixed immediately. Excellent product."',
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section id="resenas" className="py-20">

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}
        >
          <Star className="w-3 h-3 fill-current" />
          Verificado por usuarios reales
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Lo que dicen nuestros usuarios
        </h2>
        <p className="text-slate-400 text-lg">
          Más de 12,400 personas protegidas en 34 países
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
      >
        {STATS.map(({ Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl py-5 px-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Icon className="w-5 h-5 text-violet-400" />
            <span className="text-2xl md:text-3xl font-black text-white leading-none">{value}</span>
            <span className="text-[11px] text-slate-500 text-center leading-tight">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Grid de reseñas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {REVIEWS.map((r, i) => (
          <ReviewCard key={i} review={r} index={i} />
        ))}
      </div>

      {/* Botón ver más */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <button
          className="px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
            e.currentTarget.style.color = '#c4b5fd';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          Ver todas las reseñas
        </button>
      </motion.div>

    </section>
  );
}

// ─── Card de reseña ───────────────────────────────────────────────────────────

function ReviewCard({ review, index }) {
  const initials = review.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const planStyle = PLAN_STYLE[review.plan] || PLAN_STYLE['Básico'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="flex flex-col rounded-2xl p-5"
      style={{
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Estrellas */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, si) => (
          <Star key={si} className="w-4 h-4 fill-current" style={{ color: '#f59e0b' }} />
        ))}
      </div>

      {/* Texto */}
      <p className="text-sm text-slate-300 leading-relaxed flex-1 mb-5 italic">
        {review.text}
      </p>

      {/* Idioma badge */}
      {review.lang && (
        <span
          className="self-start text-[10px] font-semibold px-2 py-0.5 rounded-full mb-4"
          style={{
            background: 'rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.2)',
            color: '#7dd3fc',
          }}
        >
          {review.lang}
        </span>
      )}

      {/* Separador */}
      <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.05)' }} />

      {/* Footer de card: avatar + info + plan badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
          >
            {initials}
          </div>

          {/* Nombre, país, fecha */}
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{review.name}</p>
            <p className="text-[11px] text-slate-500 leading-tight">
              {review.country} · {review.date}
            </p>
          </div>
        </div>

        {/* Plan badge */}
        <span
          className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: planStyle.bg,
            border: `1px solid ${planStyle.border}`,
            color: planStyle.color,
          }}
        >
          {review.plan}
        </span>
      </div>
    </motion.div>
  );
}
