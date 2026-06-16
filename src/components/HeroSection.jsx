import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// ─── Static data (outside component to avoid re-renders) ─────────────

const CHARS = '01アカサABCD0123≥∑';
const MAT_COLS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  text: Array.from({ length: 20 }, (_, j) => CHARS[(i * 5 + j * 11) % CHARS.length]).join('\n'),
  left: `${(i / 20) * 94 + 3}%`,
  dur: `${(3.5 + (i * 0.41) % 3.5).toFixed(1)}s`,
  del: `-${((i * 0.73) % 5).toFixed(1)}s`,
  op: (0.45 + (i % 3) * 0.12).toFixed(2),
}));

const PARTS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  text: [
    '0x7f3a9c', 'AES-256', 'SHA-512', 'RSA-4096',
    'TLS 1.3', 'ECDH', 'HKDF', 'AES-GCM',
    'IV=rand()', 'HASH:', 'HMAC', 'VAULT',
    '0b1101', 'Kyber',
  ][i],
  left: `${5 + ((i * 93) / 13) | 0}%`,
  top:  `${12 + ((i * 77) % 78)}%`,
  dur:  `${(6 + (i * 0.8) % 5).toFixed(1)}s`,
  del:  `${((i * 0.6) % 3.5).toFixed(1)}s`,
  fs:   `${10 + (i % 3)}px`,
  op:   (0.12 + (i % 5) * 0.06).toFixed(2),
}));

const NN_N = [
  { id: 0, x: 12, y: 18 }, { id: 1, x: 32, y: 42 }, { id: 2, x: 55, y: 12 },
  { id: 3, x: 72, y: 48 }, { id: 4, x: 18, y: 72 }, { id: 5, x: 48, y: 78 },
  { id: 6, x: 83, y: 25 }, { id: 7, x: 43, y: 35 }, { id: 8, x: 65, y: 65 },
];
const NN_L = [
  [0, 1], [1, 7], [7, 2], [2, 6], [6, 3], [3, 8],
  [8, 5], [5, 4], [4, 1], [7, 3], [1, 5], [0, 4],
];

// ─── Slide background components ─────────────────────────────────────

function SlideParticles() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 40% 40%, #0d0520 0%, #05030d 70%)' }}
    >
      {PARTS.map(p => (
        <span
          key={p.id}
          className="absolute font-mono text-green-400 select-none pointer-events-none"
          style={{
            left: p.left, top: p.top, fontSize: p.fs, opacity: p.op,
            animation: `hero-float ${p.dur} ${p.del} ease-in-out infinite`,
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}

function SlideNeural() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #0d0120 0%, #1a0535 50%, #0f0a2e 100%)' }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {NN_L.map(([a, b], i) => (
          <line
            key={i}
            x1={NN_N[a].x} y1={NN_N[a].y}
            x2={NN_N[b].x} y2={NN_N[b].y}
            stroke="rgba(139,92,246,0.3)"
            strokeWidth="0.3"
            style={{
              animation: `nn-fade ${(2.5 + (i * 0.4) % 2).toFixed(1)}s ease-in-out ${((i * 0.3) % 2).toFixed(1)}s infinite alternate`,
            }}
          />
        ))}
        {NN_N.map(({ id, x, y }) => (
          <circle
            key={id}
            cx={x} cy={y} r="0.85"
            fill="rgba(167,139,250,0.75)"
            style={{
              animation: `nn-node-pulse ${(2 + (id * 0.5) % 2).toFixed(1)}s ease-in-out ${((id * 0.35) % 2).toFixed(1)}s infinite alternate`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function SlideMatrix() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#000007' }}>
      {MAT_COLS.map(col => (
        <span
          key={col.id}
          className="absolute top-0 font-mono text-green-400 whitespace-pre select-none pointer-events-none"
          style={{
            left: col.left,
            fontSize: '11px',
            lineHeight: '1.6',
            opacity: col.op,
            animation: `hero-matrix-fall ${col.dur} ${col.del} linear infinite`,
          }}
        >
          {col.text}
        </span>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────

export default function HeroSection({ onScrollToForm }) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % 3), 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goTo = useCallback((idx) => {
    setSlide(idx);
    startTimer();
  }, [startTimer]);

  const prev = () => goTo((slide + 2) % 3);
  const next = () => goTo((slide + 1) % 3);

  return (
    <section className="relative overflow-hidden" style={{ height: '100vh' }}>

      {/* ─── Animated background slides ─── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {slide === 0 && <SlideParticles />}
          {slide === 1 && <SlideNeural />}
          {slide === 2 && <SlideMatrix />}
        </motion.div>
      </AnimatePresence>

      {/* ─── Dark overlay for text legibility ─── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.55)', zIndex: 2 }}
      />

      {/* ─── Person image slot (right side) ─── */}
      {/* AGREGAR IMAGEN DE PERSONA AQUÍ */}
      <div
        className="hero-person-image absolute bottom-0 right-0 hidden lg:block"
        style={{ width: '40%', height: '85%', zIndex: 4, pointerEvents: 'none' }}
      >
        {/*
          Descomenta y ajusta cuando tengas la imagen:
          <img src="/hero-person.webp" alt="" className="w-full h-full object-contain object-bottom" />
        */}
        <div
          className="w-full h-full"
          style={{ borderTop: '1px dashed rgba(139,92,246,0.12)', borderLeft: '1px dashed rgba(139,92,246,0.12)' }}
        />
      </div>

      {/* ─── Hero text content ─── */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 10, paddingTop: '80px' }}
      >
        <div className="w-full px-6 lg:pl-[8%] lg:pr-0">
          <div className="max-w-full lg:max-w-[52%] text-center lg:text-left mx-auto lg:mx-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8"
              style={{
                background: 'rgba(124,58,237,0.18)',
                border: '1px solid rgba(139,92,246,0.4)',
                color: '#c4b5fd',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
              Cifrado de Nueva Generación
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-extrabold leading-[1.05] text-white mb-5"
              style={{
                fontSize: 'clamp(48px, 7vw, 96px)',
                textShadow: '0 2px 40px rgba(0,0,0,0.7)',
              }}
            >
              Cifra tu mundo<br />digital.
            </motion.h1>

            {/* Subtitle italic */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-light italic mb-5"
              style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: '#a78bfa' }}
            >
              Invisible para todos, menos para ti.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-300 mb-10 max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: '18px', lineHeight: 1.7 }}
            >
              Protección de nueva generación para tus cuentas, dispositivos y redes sociales.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onScrollToForm}
                className="px-8 py-4 rounded-2xl font-black text-base active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg,#7c3aed 0%,#9333ea 100%)',
                  color: '#fff',
                  boxShadow: '0 0 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
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
                Analizar vulnerabilidad
              </button>

              <button
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-8 py-4 rounded-2xl font-black text-base active:scale-[0.97]"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.28)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Ver planes
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ─── Left arrow ─── */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden lg:flex"
        style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', zIndex: 20, transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.35)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; }}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* ─── Right arrow ─── */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden lg:flex"
        style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', zIndex: 20, transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.35)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; }}
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ─── Bottom: dots + scroll indicator ─── */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3"
        style={{ zIndex: 20 }}
      >
        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full"
              style={{
                width:      i === slide ? '22px' : '8px',
                height:     '8px',
                background: i === slide ? '#fff' : 'rgba(255,255,255,0.28)',
                transition: 'width 0.3s, background 0.3s',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-0.5" style={{ opacity: 0.45 }}>
          <span className="text-[10px] uppercase tracking-widest text-white font-semibold">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white hero-scroll-bounce" />
        </div>
      </div>

    </section>
  );
}
