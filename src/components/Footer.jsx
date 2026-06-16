import React, { useState } from 'react';
import { Mail, Clock, HelpCircle, MessageCircle, Lock } from 'lucide-react';
import logo from '../assets/logo.svg';

// ─── Datos ────────────────────────────────────────────────────────────────────

const LEGAL_LINKS = [
  'Términos y condiciones',
  'Políticas de privacidad',
  'Política de cookies',
  'Política de uso aceptable',
  'Reglamento',
];

const CERT_LOGOS = [
  {
    src: 'https://stnohaysinsuerteprod.blob.core.windows.net/home/NHSS-iqnet-certification.webp',
    alt: 'IQNet',
  },
  {
    src: 'https://stnohaysinsuerteprod.blob.core.windows.net/home/NHSS-aenor-certification.webp',
    alt: 'AENOR Gestión de Calidad',
  },
  {
    src: 'https://stnohaysinsuerteprod.blob.core.windows.net/home/NHSS-aenor-certification-37001.webp',
    alt: 'AENOR Antisoborno',
  },
];

// ─── Brand SVGs (lucide-react v1.x no incluye iconos de marcas) ───────────────

const IconWhatsApp = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const IconFacebook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IconYouTube = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SOCIAL = [
  { Icon: IconWhatsApp,  label: 'WhatsApp'  },
  { Icon: IconInstagram, label: 'Instagram' },
  { Icon: IconFacebook,  label: 'Facebook'  },
  { Icon: IconYouTube,   label: 'YouTube'   },
];

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function ColTitle({ children }) {
  return (
    <h4 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4"
      style={{ color: '#a78bfa' }}>
      {children}
    </h4>
  );
}

function FooterLink({ href = '#', children }) {
  return (
    <a href={href}
      className="block text-sm text-slate-400 hover:text-violet-300 transition-colors duration-200 py-0.5">
      {children}
    </a>
  );
}

function SocialBtn({ Icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center justify-center rounded-xl transition-all duration-200"
      style={{
        width: 54,
        height: 54,
        background: hov ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? 'rgba(167,139,250,0.55)' : 'rgba(255,255,255,0.08)'}`,
        color: hov ? '#fff' : '#475569',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
        boxShadow: hov ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
      }}
    >
      <Icon />
    </a>
  );
}

function CertLogo({ src, alt }) {
  const [err, setErr] = useState(false);
  return (
    <div className="flex items-center justify-center rounded-lg p-2.5 flex-1"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        minHeight: 76,
      }}
    >
      {err ? (
        <span className="text-[10px] text-slate-500 text-center font-mono leading-tight">{alt}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          style={{ height: 60, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
        />
      )}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer style={{ background: '#0d0118', borderTop: '1px solid rgba(139,92,246,0.18)' }}>

      {/* Disclaimer */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            Incripta no almacena datos personales de tus cuentas.
            {' '}El cifrado es procesado de forma segura y encriptada.
          </p>
        </div>
      </div>

      {/* ── Bloque superior: Contáctanos + Legal ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contáctanos */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <img src={logo} alt="Incripta" className="w-9 h-9 rounded-xl"
                style={{ boxShadow: '0 0 16px rgba(124,58,237,0.35)' }} />
              <span className="text-lg font-black text-white tracking-tight">Incripta</span>
            </div>

            <ColTitle>Contáctanos</ColTitle>

            <div className="space-y-4">
              <a href="#" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <MessageCircle className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-violet-200 transition-colors">Escríbenos a @incripta</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Respuesta en menos de 24 h</p>
                </div>
              </a>

              <a href="mailto:soporte@incripta.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <Mail className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-violet-200 transition-colors">soporte@incripta.com</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Soporte técnico</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)' }}>
                  <Clock className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-[12px] text-slate-500 leading-relaxed pt-1">
                  L-V de 9am a 6pm<br />Sáb. de 9am a 2pm
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <p className="text-[12px] text-slate-500">
                  ¿Dudas? Revisa nuestras{' '}
                  <a href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
                    Preguntas Frecuentes
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <ColTitle>Información legal</ColTitle>
            <div className="space-y-1">
              {LEGAL_LINKS.map(link => (
                <FooterLink key={link}>{link}</FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Separador ── */}
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.12)', marginInline: 0 }} />

      {/* ── Bloque inferior: Certificaciones | Libro | Redes ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* COL 1 — Certificados por */}
          <div>
            <ColTitle>Certificados por</ColTitle>
            <div className="flex gap-3">
              {CERT_LOGOS.map(c => (
                <CertLogo key={c.alt} src={c.src} alt={c.alt} />
              ))}
            </div>
          </div>

          {/* COL 2 — Libro de Reclamaciones */}
          <div className="flex flex-col items-center">
            <div
              className="rounded-xl p-4 flex items-center justify-center w-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                minHeight: 108,
              }}
            >
              <LibroImg />
            </div>
          </div>

          {/* COL 3 — Redes sociales */}
          <div>
            <ColTitle>Síguenos</ColTitle>
            <div className="grid grid-cols-2 gap-3" style={{ width: 'fit-content' }}>
              {SOCIAL.map(({ Icon, label }) => (
                <SocialBtn key={label} Icon={Icon} label={label} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © 2025 Incripta — Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] text-slate-600 font-mono">Sistemas operativos — 99.9% uptime</p>
          </div>
        </div>
      </div>

    </footer>
  );
}

// Componente separado para manejar el error de carga del libro
function LibroImg() {
  const [err, setErr] = useState(false);
  return err ? (
    <span className="text-xs text-slate-500 font-semibold text-center">Libro de Reclamaciones</span>
  ) : (
    <img
      src="https://stnohaysinsuerteprod.blob.core.windows.net/home/libro-de-reclamaciones.webp"
      alt="Libro de Reclamaciones"
      onError={() => setErr(true)}
      style={{ height: 80, width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
    />
  );
}
