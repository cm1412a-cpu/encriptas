import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// ─── Matrix rain data (slide 2) ───────────────────────────────────────────────
const CHARS = '01アカサABCD0123≥∑';
const MAT_COLS = Array.from({ length: 20 }, (_, i) => ({
  id:   i,
  text: Array.from({ length: 20 }, (_, j) => CHARS[(i * 5 + j * 11) % CHARS.length]).join('\n'),
  left: `${(i / 20) * 94 + 3}%`,
  dur:  `${(3.5 + (i * 0.41) % 3.5).toFixed(1)}s`,
  del:  `-${((i * 0.73) % 5).toFixed(1)}s`,
  op:   (0.45 + (i % 3) * 0.12).toFixed(2),
}));

// ─── Neural network data (slide 1) ───────────────────────────────────────────
const NN_N = [
  { id: 0, x: 12, y: 18 }, { id: 1, x: 32, y: 42 }, { id: 2, x: 55, y: 12 },
  { id: 3, x: 72, y: 48 }, { id: 4, x: 18, y: 72 }, { id: 5, x: 48, y: 78 },
  { id: 6, x: 83, y: 25 }, { id: 7, x: 43, y: 35 }, { id: 8, x: 65, y: 65 },
];
const NN_L = [
  [0, 1], [1, 7], [7, 2], [2, 6], [6, 3], [3, 8],
  [8, 5], [5, 4], [4, 1], [7, 3], [1, 5], [0, 4],
];

// ─── Galaxy stars — deterministic positions, 3 depth layers ──────────────────
// Layer 1: small/fast  (80 stars)
const STARS_S = Array.from({ length: 80 }, (_, i) => ({
  id:  i,
  l:   `${((i * 73.1 + 11.7) % 100).toFixed(2)}%`,
  t:   `${((i * 53.7 + 7.3)  % 100).toFixed(2)}%`,
  dur: `${(2.2 + (i * 0.37) % 2.5).toFixed(1)}s`,
  del: `${((i * 0.61) % 4.2).toFixed(1)}s`,
}));

// Layer 2: medium, some colored  (50 stars)
const STARS_M = Array.from({ length: 50 }, (_, i) => ({
  id:    i,
  l:     `${((i * 61.3 + 23.1) % 100).toFixed(2)}%`,
  t:     `${((i * 41.7 + 15.9) % 100).toFixed(2)}%`,
  dur:   `${(3.5 + (i * 0.51) % 3.5).toFixed(1)}s`,
  del:   `${((i * 0.79) % 5.3).toFixed(1)}s`,
  color: i % 5 === 0 ? '#b44fff' : i % 7 === 0 ? '#00d4ff' : '#ffffff',
}));

// Layer 3: large, glowing  (25 stars)
const STARS_L = Array.from({ length: 25 }, (_, i) => ({
  id:    i,
  l:     `${((i * 83.7 + 5.1)  % 100).toFixed(2)}%`,
  t:     `${((i * 29.3 + 31.3) % 100).toFixed(2)}%`,
  dur:   `${(5.5 + (i * 0.7) % 5).toFixed(1)}s`,
  del:   `${((i * 1.13) % 6.5).toFixed(1)}s`,
  color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#b44fff' : '#ffffff',
}));

// ─── CAPA 1: Galaxy background ────────────────────────────────────────────────
function GalaxyBackground() {
  return (
    <div className="absolute inset-0" style={{ background: '#030008' }}>

      {/* Nebula 1 — purple, slow clockwise rotation */}
      <div className="absolute pointer-events-none" style={{
        width: '65%', height: '70%',
        left: '5%', top: '-20%',
        background: 'radial-gradient(ellipse at center, rgba(74,0,128,0.55) 0%, rgba(30,0,60,0.2) 55%, transparent 72%)',
        filter: 'blur(55px)',
        animation: 'nebula-rotate 30s linear infinite',
        transformOrigin: 'center center',
      }} />

      {/* Nebula 2 — deep blue, counter-clockwise */}
      <div className="absolute pointer-events-none" style={{
        width: '60%', height: '60%',
        right: '-12%', bottom: '-15%',
        background: 'radial-gradient(ellipse at center, rgba(0,13,74,0.65) 0%, rgba(0,5,40,0.25) 55%, transparent 72%)',
        filter: 'blur(65px)',
        animation: 'nebula-rotate 40s linear infinite reverse',
        transformOrigin: 'center center',
      }} />

      {/* Nebula 3 — accent center, breathing */}
      <div className="absolute pointer-events-none" style={{
        width: '40%', height: '45%',
        left: '35%', top: '28%',
        background: 'radial-gradient(ellipse at center, rgba(74,0,128,0.18) 0%, transparent 68%)',
        filter: 'blur(45px)',
        animation: 'nebula-breathe 20s ease-in-out infinite',
        transformOrigin: 'center center',
      }} />

      {/* Stars layer 1 — small, fast blink */}
      {STARS_S.map(s => (
        <div key={`ss${s.id}`} className="absolute rounded-full pointer-events-none"
          style={{ left: s.l, top: s.t, width: '1px', height: '1px', background: '#fff',
            animation: `star-twinkle ${s.dur} ${s.del} ease-in-out infinite alternate` }}
        />
      ))}

      {/* Stars layer 2 — medium, colored */}
      {STARS_M.map(s => (
        <div key={`sm${s.id}`} className="absolute rounded-full pointer-events-none"
          style={{ left: s.l, top: s.t, width: '1.5px', height: '1.5px', background: s.color,
            animation: `star-twinkle ${s.dur} ${s.del} ease-in-out infinite alternate` }}
        />
      ))}

      {/* Stars layer 3 — large, glowing */}
      {STARS_L.map(s => (
        <div key={`sl${s.id}`} className="absolute rounded-full pointer-events-none"
          style={{ left: s.l, top: s.t, width: '2px', height: '2px', background: s.color,
            boxShadow: `0 0 4px ${s.color}, 0 0 10px ${s.color}`,
            animation: `star-glow ${s.dur} ${s.del} ease-in-out infinite alternate` }}
        />
      ))}
    </div>
  );
}

// ─── CAPA 2: Flame canvas (requestAnimationFrame) ─────────────────────────────
function FlameCanvas({ hovered }) {
  const canvasRef = useRef(null);
  const hovRef    = useRef(false);

  useEffect(() => { hovRef.current = hovered; }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      const w = canvas.parentElement?.offsetWidth  || window.innerWidth;
      const h = canvas.parentElement?.offsetHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
      }
    };
    resize();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resize);
    }

    // Color transition: 0 = bottom (cyan) → 1 = top (red)
    const flameColor = (t) => {
      const c = Math.min(1, Math.max(0, t));
      if (c < 0.33) {
        const s = c / 0.33;
        return `rgb(${Math.round(s * 255)},${Math.round(212 - s * 105)},${Math.round(255 - s * 202)})`;
      }
      if (c < 0.66) {
        const s = (c - 0.33) / 0.33;
        return `rgb(255,${Math.round(107 + s * 77)},${Math.round(53 - s * 53)})`;
      }
      const s = (c - 0.66) / 0.34;
      return `rgb(255,${Math.round(184 - s * 139)},${Math.round(s * 85)})`;
    };

    const mk = () => ({
      x:   canvas.width * (0.18 + Math.random() * 0.64),
      y:   canvas.height + 8,
      vx:  (Math.random() - 0.5) * 0.9,
      vy: -(1.4 + Math.random() * 2.2),
      sz:   2 + Math.random() * 3.5,
      sin:  Math.random() * Math.PI * 2,
    });

    const particles = Array.from({ length: 55 }, () => {
      const p = mk();
      p.y = canvas.height * Math.random(); // stagger initial positions
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sp = hovRef.current ? 1.75 : 1;

      for (const p of particles) {
        p.sin += 0.04 * sp;
        p.x   += (p.vx + Math.sin(p.sin) * 1.4) * sp;
        p.y   += p.vy * sp;

        if (p.y < -20 || p.x < -50 || p.x > canvas.width + 50) {
          Object.assign(p, mk()); continue;
        }

        const t      = Math.max(0, 1 - p.y / canvas.height);
        const normY  = p.y / canvas.height;
        const alpha  = normY > 0.88 ? (1 - normY) / 0.12
                     : normY < 0.10 ? normY / 0.10
                     : 1;
        const color  = flameColor(t);
        const sz     = p.sz * (0.5 + 0.5 * (1 - t));

        ctx.save();
        ctx.globalAlpha = alpha * 0.72;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 4.5);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 0.65, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
               pointerEvents: 'none', display: 'block' }}
    />
  );
}

// ─── Slide overlays (shown on top of the permanent galaxy+flame) ──────────────
function SlideNeural() {
  return (
    <div className="absolute inset-0" style={{ background: 'rgba(5,3,20,0.55)' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {NN_L.map(([a, b], i) => (
          <line key={i}
            x1={NN_N[a].x} y1={NN_N[a].y} x2={NN_N[b].x} y2={NN_N[b].y}
            stroke="rgba(0,212,255,0.3)" strokeWidth="0.3"
            style={{ animation: `nn-fade ${(2.5 + (i * 0.4) % 2).toFixed(1)}s ease-in-out ${((i * 0.3) % 2).toFixed(1)}s infinite alternate` }}
          />
        ))}
        {NN_N.map(({ id, x, y }) => (
          <circle key={id} cx={x} cy={y} r="0.85" fill="rgba(0,212,255,0.75)"
            style={{ animation: `nn-node-pulse ${(2 + (id * 0.5) % 2).toFixed(1)}s ease-in-out ${((id * 0.35) % 2).toFixed(1)}s infinite alternate` }}
          />
        ))}
      </svg>
    </div>
  );
}

function SlideMatrix() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: 'rgba(0,0,7,0.75)' }}>
      {MAT_COLS.map(col => (
        <span key={col.id}
          className="absolute top-0 font-mono text-green-400 whitespace-pre select-none pointer-events-none"
          style={{ left: col.left, fontSize: '11px', lineHeight: '1.6', opacity: col.op,
            animation: `hero-matrix-fall ${col.dur} ${col.del} linear infinite` }}
        >
          {col.text}
        </span>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection({ onScrollToForm }) {
  const [slide,   setSlide]   = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % 3), 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goTo = useCallback((idx) => { setSlide(idx); startTimer(); }, [startTimer]);
  const prev = () => goTo((slide + 2) % 3);
  const next = () => goTo((slide + 1) % 3);

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── CAPA 1: Galaxy (siempre visible) ── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <GalaxyBackground />
      </div>

      {/* ── Slide overlays sobre la galaxia (Neural / Matrix) ── */}
      <AnimatePresence mode="sync">
        <motion.div key={slide} className="absolute inset-0" style={{ zIndex: 2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {slide === 1 && <SlideNeural />}
          {slide === 2 && <SlideMatrix />}
          {/* slide 0: galaxia pura sin overlay adicional */}
        </motion.div>
      </AnimatePresence>

      {/* ── CAPA 2: Flame canvas (siempre visible) ── */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <FlameCanvas hovered={hovered} />
      </div>

      {/* ── Dark overlay para legibilidad del texto ── */}
      <div className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.45)', zIndex: 4 }}
      />

      {/* ── Slot de imagen (right side) ── */}
      <div className="hero-person-image absolute bottom-0 right-0 hidden lg:block"
        style={{ width: '40%', height: '85%', zIndex: 5, pointerEvents: 'none' }}
      >
        <div className="w-full h-full"
          style={{ borderTop: '1px dashed rgba(0,212,255,0.08)', borderLeft: '1px dashed rgba(0,212,255,0.08)' }}
        />
      </div>

      {/* ── Hero text content ── */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 10, paddingTop: '80px' }}>
        <div className="w-full px-6 lg:pl-[8%] lg:pr-0">
          <div className="max-w-full lg:max-w-[52%] text-center lg:text-left mx-auto lg:mx-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.4)',
                color: '#00d4ff', backdropFilter: 'blur(10px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: '#00d4ff' }} />
              Cifrado de Nueva Generación
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-extrabold leading-[1.05] text-white mb-5"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', textShadow: '0 2px 40px rgba(0,0,0,0.7)' }}
            >
              Cifra tu mundo<br />digital.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-light italic mb-5"
              style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: '#00d4ff' }}
            >
              Invisible para todos, menos para ti.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-300 mb-10 max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: '18px', lineHeight: 1.7 }}
            >
              Protección de nueva generación para tus cuentas, dispositivos y redes sociales.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onScrollToForm}
                className="px-8 py-4 rounded-2xl font-black text-base active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg,#00d4ff 0%,#b44fff 100%)', color: '#fff',
                  boxShadow: '0 0 32px rgba(0,212,255,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
                  transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.75), 0 0 20px rgba(180,79,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.5), inset 0 1px 0 rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Analizar vulnerabilidad
              </button>

              <button
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-8 py-4 rounded-2xl font-black text-base active:scale-[0.97]"
                style={{ background: 'rgba(0,212,255,0.06)', border: '1.5px solid rgba(0,212,255,0.45)',
                  color: '#00d4ff', backdropFilter: 'blur(10px)',
                  transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
                  e.currentTarget.style.boxShadow  = '0 0 20px rgba(0,212,255,0.3)';
                  e.currentTarget.style.transform  = 'scale(1.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                  e.currentTarget.style.boxShadow  = 'none';
                  e.currentTarget.style.transform  = 'scale(1)';
                }}
              >
                Ver planes
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Left arrow ── */}
      <button onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden lg:flex"
        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', zIndex: 20, transition: 'background 0.2s, border-color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* ── Right arrow ── */}
      <button onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden lg:flex"
        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', zIndex: 20, transition: 'background 0.2s, border-color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Dots + scroll indicator ── */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3" style={{ zIndex: 20 }}>
        <div className="flex items-center gap-2.5">
          {[0, 1, 2].map(i => (
            <button key={i} onClick={() => goTo(i)} className="rounded-full"
              style={{ width: i === slide ? '22px' : '8px', height: '8px',
                background: i === slide ? '#fff' : 'rgba(255,255,255,0.28)',
                transition: 'width 0.3s, background 0.3s' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-0.5" style={{ opacity: 0.45 }}>
          <span className="text-[10px] uppercase tracking-widest text-white font-semibold">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white hero-scroll-bounce" />
        </div>
      </div>

    </section>
  );
}
