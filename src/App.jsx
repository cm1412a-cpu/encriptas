import React, { useState, useRef, useEffect, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, BarChart2, Building2, Award, Star } from 'lucide-react';
import SubscriptionForm from './SubscriptionForm';
import HeroSection from './components/HeroSection';
import AnalysisTerminal from './components/AnalysisTerminal';
import ClientCarousel from './components/ClientCarousel';
import VerifyProtection from './components/VerifyProtection';
import PricingPlans from './components/PricingPlans';
import MarketersSection from './components/MarketersSection';
import EmpresasSection from './components/EmpresasSection';
import InfluencersSection from './components/InfluencersSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import logo from './assets/logo.svg';
import './App.css';

localStorage.removeItem('subscriptionId');

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('Encriptas error:', error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#0a0a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Encriptas</h1>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Ocurrió un error inesperado. Por favor recarga la página.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '0.75rem 2rem', borderRadius: '9999px', background: '#7c3aed', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function loadRecords() {
  try { return JSON.parse(localStorage.getItem('encriptasRecords') || '[]'); }
  catch { return []; }
}

const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl transition-all group"
    style={{ background: '#111827', border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 0 rgba(0,212,255,0)' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.boxShadow = '0 0 0 rgba(0,212,255,0)'; }}
  >
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all"
      style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

function App() {
  const [records,         setRecords]         = useState(loadRecords);
  const [page,            setPage]            = useState(null);
  const [selectedPlan,    setSelectedPlan]    = useState({ plan: 'basico', amount: 1000, name: 'Básico', label: '$10 / mes', savings: null });
  const [formKey,         setFormKey]         = useState(0);
  const [formInitialStep, setFormInitialStep] = useState(1);
  // terminalState: { data: userData|null, key: number } — key forces AnalysisTerminal remount
  const [terminalState, setTerminalState] = useState({ data: null, key: 0 });

  const handleSubscriptionSuccess = (id, record) => {
    if (record) {
      setRecords(prev => {
        const updated = [...prev, { ...record, id }];
        localStorage.setItem('encriptasRecords', JSON.stringify(updated));
        return updated;
      });
    }
    setPage('verify');
  };

  const goVerify = () => setPage('verify');
  const goHome   = () => setPage(null);

  const handleStep1Submit = (userData) => {
    setTerminalState(prev => ({ data: userData, key: prev.key + 1 }));
  };

  const handleSelectPlan = (plan) => {
    setTerminalState(prev => ({ data: null, key: prev.key })); // reset terminal
    setSelectedPlan({ plan: plan.id, amount: plan.amount, name: plan.name, label: `${plan.price} ${plan.period}`, savings: plan.savings || null });
    setFormInitialStep(3);
    setFormKey(k => k + 1);
    if (page !== null) {
      setPage(null);
      setTimeout(() => {
        document.getElementById('formulario-principal')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 380);
    } else {
      document.getElementById('formulario-principal')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollFormulario = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (page !== null) {
      setPage(null);
      setTimeout(() => {
        document.getElementById('formulario-principal')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 380);
    } else {
      document.getElementById('formulario-principal')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-[#0a0a1a] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* ─── Navbar ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ background: 'rgba(10,10,26,0.92)', borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <button onClick={goHome} className="flex items-center space-x-3 focus:outline-none">
            <img src={logo} alt="Encriptas" className="w-10 h-10 shadow-lg shadow-indigo-500/20 rounded-xl" />
            <span className="text-xl font-bold tracking-tight">Encriptas</span>
          </button>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features"  onClick={goHome} className="hover:text-white transition-colors">Tecnología</a>
            <a href="#about"     onClick={goHome} className="hover:text-white transition-colors">Quienes Somos</a>
            <ParaDropdown onGoHome={goHome} />
            <a href="#planes"    onClick={goHome} className="hover:text-white transition-colors">Planes</a>
            <a href="#clients"   onClick={goHome} className="hover:text-white transition-colors">Clientes</a>
            <a href="#faq"       onClick={goHome} className="hover:text-white transition-colors">FAQ</a>

            <button
              onClick={goVerify}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all font-semibold text-sm"
              style={page === 'verify'
                ? { background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }
                : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }
              }
            >
              <ShieldCheck className="w-4 h-4" />
              Verificar Protección
            </button>

            <a
              href="#formulario-principal"
              onClick={scrollFormulario}
              className="px-5 py-2.5 rounded-full font-semibold transition-all"
              style={{ background: 'linear-gradient(135deg,#00d4ff 0%,#b44fff 100%)', color: '#fff', boxShadow: '0 0 18px rgba(0,212,255,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.6), 0 0 16px rgba(180,79,255,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(0,212,255,0.35)'; }}
            >
              Suscribirse
            </a>
          </div>

          {/* Móvil */}
          <button
            onClick={goVerify}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all"
            style={page === 'verify'
              ? { background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }
              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }
            }
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verificar
          </button>
        </div>
      </nav>

      {/* ─── Contenido principal ────────────────────────────────────── */}
      <main className="pt-0">
        <AnimatePresence mode="wait">

          {/* Verificar Protección */}
          {page === 'verify' && (
            <motion.div key="verify"
              className="pt-32 px-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-7xl mx-auto">
                <VerifyProtection records={records} onGoHome={goHome} />
              </div>
            </motion.div>
          )}

          {/* Landing */}
          {page !== 'verify' && (
            <motion.div key="home"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >

              {/* ─── Hero pantalla completa ────────────────────────── */}
              <HeroSection onScrollToForm={scrollFormulario} />

              {/* ─── Resto de secciones ───────────────────────────── */}
              <div className="px-6">
                <div className="max-w-7xl mx-auto space-y-32">

                  {/* ─── Formulario + Terminal de análisis ─────────── */}
                  <section className="pt-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5 }}
                      className="text-center mb-14"
                    >
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: '#00d4ff' }} />
                        Protección en minutos
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-3">Activa tu escudo ahora</h2>
                      <p className="text-slate-400 text-lg">3 simples pasos para blindar tus cuentas digitales</p>
                    </motion.div>

                    {/* Formulario — ancho completo */}
                    <motion.div
                      id="formulario-principal"
                      className="relative mb-8"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="absolute -inset-1 rounded-3xl blur-xl opacity-70 animate-pulse-slow gradient-border-anim" />
                      <div className="absolute -inset-[1px] rounded-3xl gradient-border-anim opacity-60" />
                      <div
                        className="relative rounded-3xl p-6 shadow-2xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(145deg,#0d1128 0%,#0a0a1a 60%,#111827 100%)',
                          boxShadow: '0 0 60px rgba(0,212,255,0.1),inset 0 1px 0 rgba(255,255,255,0.06)',
                        }}
                      >
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: 'radial-gradient(ellipse at 70% 0%,rgba(0,212,255,0.1) 0%,transparent 60%)' }} />
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: 'radial-gradient(ellipse at 20% 100%,rgba(180,79,255,0.07) 0%,transparent 50%)' }} />
                        <SubscriptionForm
                          key={formKey}
                          onSubscriptionSuccess={handleSubscriptionSuccess}
                          selectedPlan={selectedPlan}
                          initialStep={formInitialStep}
                          onStep1Submit={handleStep1Submit}
                        />
                      </div>
                    </motion.div>

                    {/* Terminal de análisis — oculta hasta que usuario completa paso 1 */}
                    <AnimatePresence>
                      {terminalState.data && (
                        <motion.div
                          key={terminalState.key}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <AnalysisTerminal
                            userData={terminalState.data}
                            onScrollToForm={scrollFormulario}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </section>

                  {/* ─── Tecnología ───────────────────────────────── */}
                  <section id="features" className="py-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <h2 className="text-4xl font-bold mb-6">Protección Multicapa Inteligente</h2>
                      <p className="text-slate-400 text-lg italic">
                        "La IA evoluciona, tus defensas también deben hacerlo."
                      </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                      <FeatureCard
                        title="Núcleo Neural"
                        description="Nuestros nodos de cifrado se adaptan en tiempo real para contrarrestar ataques de fuerza bruta asistidos por IA."
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
                      />
                      <FeatureCard
                        title="Zero Trust AI"
                        description="Verificación continua basada en patrones de comportamiento para asegurar que solo tú accedas a tu bóveda."
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                      />
                      <FeatureCard
                        title="Inmunidad Digital"
                        description="Cifrado post-cuántico que protege tus datos contra las amenazas del futuro, hoy mismo."
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>}
                      />
                    </div>
                  </section>

                  {/* ─── Quiénes Somos ────────────────────────────── */}
                  <section id="about" className="py-20 rounded-[4rem] px-8 md:px-12" style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)' }}>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      <div>
                        <h2 className="text-4xl font-bold mb-8">¿Quiénes Somos?</h2>
                        <p className="text-xl text-slate-300 leading-relaxed mb-6">
                          Somos Encriptas, pioneros en la convergencia de Inteligencia Artificial Sintética y criptografía avanzada.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-6 h-6 rounded-full flex-shrink-0 mt-1" style={{ background: 'linear-gradient(135deg,#00d4ff,#b44fff)' }} />
                            <div>
                              <h4 className="font-bold mb-1">Nuestra Misión AI</h4>
                              <p className="text-slate-400">
                                Desarrollar la primera red neural autónoma dedicada exclusivamente a la protección de la privacidad humana global.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                        <p className="text-2xl font-light italic leading-relaxed">
                          "La tecnología debe empoderar al individuo, no vigilarlo. Nuestra misión es devolverte el poder de tus datos."
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* ─── Marketeros ───────────────────────────────── */}
                  <MarketersSection onScrollToForm={scrollFormulario} />

                  {/* ─── Empresas ─────────────────────────────────── */}
                  <EmpresasSection onScrollToForm={scrollFormulario} />

                  {/* ─── Influencers ──────────────────────────────── */}
                  <InfluencersSection onScrollToForm={scrollFormulario} />

                  {/* ─── Planes ───────────────────────────────────── */}
                  <PricingPlans onSelectPlan={handleSelectPlan} />

                  {/* ─── Carrusel ─────────────────────────────────── */}
                  <ClientCarousel />

                  {/* ─── Testimonios ──────────────────────────────── */}
                  <Testimonials />

                  {/* ─── FAQ ──────────────────────────────────────── */}
                  <FAQ />

                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <div className="mt-32">
        <Footer />
      </div>

      {/* Blobs de fondo */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full -z-10 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle,rgba(0,212,255,0.12) 0%,transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full -z-10 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle,rgba(180,79,255,0.12) 0%,transparent 70%)', filter: 'blur(80px)', animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-0 w-[400px] h-[400px] rounded-full -z-10 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)', filter: 'blur(100px)', animationDelay: '4s' }} />
    </div>
    </ErrorBoundary>
  );
}

// ─── Dropdown "Para" del navbar ──────────────────────────────────────

const PARA_ITEMS = [
  { Icon: BarChart2, label: 'Marketeros',  desc: 'Protege tus cuentas publicitarias', href: '#marketeros' },
  { Icon: Building2, label: 'Empresas',    desc: 'Blindaje para tu negocio digital',  href: '#empresas'   },
  { Icon: Award,     label: 'Marcas',      desc: 'Protege tu reputación online',       href: '#empresas'   },
  { Icon: Star,      label: 'Influencers', desc: 'Tu cuenta es tu negocio',            href: '#influencers' },
];

function ParaDropdown({ onGoHome }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (href) => {
    setOpen(false);
    onGoHome();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none"
      >
        Para
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl overflow-hidden"
            style={{
              background: '#0d1128',
              border:     '1px solid rgba(0,212,255,0.2)',
              boxShadow:  '0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(0,212,255,0.08)',
            }}
          >
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
              style={{ background: '#0d1128', borderTop: '1px solid rgba(0,212,255,0.2)', borderLeft: '1px solid rgba(0,212,255,0.2)' }} />
            <div className="p-1.5">
              {PARA_ITEMS.map(({ Icon, label, desc, href }) => (
                <button
                  key={label}
                  onClick={() => handleSelect(href)}
                  className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                  style={{ background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: '#00d4ff' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{label}</p>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
