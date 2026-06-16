import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, MessageCircle, Mail, Share2, BarChart2, Shield, Check, Lock } from 'lucide-react';

// ─── Configuración de cards de protección ────────────────────────────────────

const PROTECTION_CARDS = [
  { id: 'mobile',   Icon: Smartphone,   title: 'Dispositivo Móvil',     desc: 'iPhone o Android — apps de banco, galería, mensajes, billeteras' },
  { id: 'whatsapp', Icon: MessageCircle, title: 'WhatsApp',              desc: 'Chats, fotos, audios, archivos y documentos compartidos'         },
  { id: 'google',   Icon: Mail,          title: 'Cuenta Google',         desc: 'Gmail, Drive, Fotos, billeteras digitales vinculadas'            },
  { id: 'social',   Icon: Share2,        title: 'Redes Sociales',        desc: 'Instagram, Facebook, TikTok, OnlyFans — contenido y seguidores'  },
  { id: 'ads',      Icon: BarChart2,     title: 'Cuenta Publicitaria',   desc: 'Meta Ads, Google Ads, CRM — inversión publicitaria y datos'      },
  { id: 'all',      Icon: Shield,        title: 'Todo lo anterior',      desc: 'Protección neural completa — recomendado para empresas'          },
];

// ─── Países para selector de WhatsApp ────────────────────────────────────────

const COUNTRIES = [
  { code: 'PE', dial: '+51'  }, { code: 'CO', dial: '+57'  },
  { code: 'MX', dial: '+52'  }, { code: 'AR', dial: '+54'  },
  { code: 'ES', dial: '+34'  }, { code: 'US', dial: '+1'   },
  { code: 'BR', dial: '+55'  }, { code: 'CL', dial: '+56'  },
  { code: 'VE', dial: '+58'  }, { code: 'EC', dial: '+593' },
  { code: 'BO', dial: '+591' }, { code: 'PY', dial: '+595' },
  { code: 'UY', dial: '+598' }, { code: 'DE', dial: '+49'  },
  { code: 'FR', dial: '+33'  }, { code: 'GB', dial: '+44'  },
];

// ─── Chips de vulnerabilidad por tipo ────────────────────────────────────────

const CHIPS_MAP = {
  mobile:   ['Apps bancarias', 'Billeteras digitales', 'Galería', 'Mensajes', 'Contactos'],
  whatsapp: ['Chats privados', 'Fotos', 'Audios', 'Archivos', 'Grupos'],
  google:   ['Gmail', 'Google Drive', 'Google Fotos', 'Billetera Google', 'YouTube'],
  social: {
    instagram: ['Fotos', 'DMs', 'Stories', 'Cuenta Ads vinculada'],
    facebook:  ['Perfil', 'Mensajes', 'Grupos', 'Marketplace'],
    tiktok:    ['Videos', 'DMs', 'Cuenta Pro'],
    onlyfans:  ['Contenido exclusivo', 'Mensajes', 'Ingresos'],
  },
  ads: ['Presupuesto activo', 'Datos de clientes', 'Píxeles', 'Accesos del equipo'],
  all: ['Apps bancarias', 'Billeteras', 'Galería', 'Mensajes', 'Gmail', 'Google Drive', 'Redes sociales', 'Meta Ads', 'Google Ads', 'Datos de clientes'],
};

const SOCIAL_TABS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook',  label: 'Facebook'  },
  { id: 'tiktok',    label: 'TikTok'    },
  { id: 'onlyfans',  label: 'OnlyFans'  },
];

const ADS_TABS = [
  { id: 'meta',   label: 'Meta Ads'   },
  { id: 'google', label: 'Google Ads' },
  { id: 'crm',    label: 'CRM'        },
];

// ─── Paso 2 — datos del escaneo ───────────────────────────────────────────────

const MENSAJES_SCAN = [
  'Analizando dominio de correo...',
  'Verificando filtraciones en dark web...',
  'Detectando vectores de ataque activos...',
  'Compilando reporte de exposición...',
];

const VECTORES = [
  { label: 'Interceptación de datos en tránsito',   nivel: 'ALTO',  textColor: 'text-red-400',    bg: 'bg-red-950/60',    border: 'border-red-500/30',    glow: 'rgba(239,68,68,0.25)',  bar: 'bg-red-500'    },
  { label: 'Exposición de metadatos de dispositivo', nivel: 'MEDIO', textColor: 'text-orange-400', bg: 'bg-orange-950/50', border: 'border-orange-500/25', glow: 'rgba(249,115,22,0.2)', bar: 'bg-orange-500' },
  { label: 'Vulnerabilidad en autenticación 2FA',    nivel: 'MEDIO', textColor: 'text-orange-400', bg: 'bg-orange-950/50', border: 'border-orange-500/25', glow: 'rgba(249,115,22,0.2)', bar: 'bg-orange-500' },
];

const BILLING_COUNTRIES = [
  { code: 'PE', name: 'Perú'           }, { code: 'CO', name: 'Colombia'       },
  { code: 'MX', name: 'México'         }, { code: 'AR', name: 'Argentina'      },
  { code: 'CL', name: 'Chile'          }, { code: 'ES', name: 'España'         },
  { code: 'US', name: 'Estados Unidos' }, { code: 'BR', name: 'Brasil'         },
  { code: 'EC', name: 'Ecuador'        }, { code: 'VE', name: 'Venezuela'      },
  { code: 'BO', name: 'Bolivia'        }, { code: 'PY', name: 'Paraguay'       },
  { code: 'UY', name: 'Uruguay'        }, { code: 'DE', name: 'Alemania'       },
  { code: 'FR', name: 'Francia'        }, { code: 'GB', name: 'Reino Unido'    },
  { code: 'IT', name: 'Italia'         }, { code: 'CA', name: 'Canadá'         },
  { code: 'AU', name: 'Australia'      }, { code: 'JP', name: 'Japón'          },
];

// ─── Variante de animación entre pasos ───────────────────────────────────────

const slide = {
  enter:  { opacity: 0, y: 20, filter: 'blur(6px)'  },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)'  },
  exit:   { opacity: 0, y: -20, filter: 'blur(6px)' },
};

// ─── Componente principal ─────────────────────────────────────────────────────

const PLAN_BTN_PRICE = { basico: '$10/mes', pro: '$45', elite: '$90' };

export default function SubscriptionForm({ onSubscriptionSuccess, onStep1Submit, selectedPlan = { plan: 'basico', amount: 1000, name: 'Básico', label: '$10 / mes', savings: null }, initialStep = 1 }) {
  // Control de pasos
  const [paso, setPaso] = useState(initialStep);

  // Paso 1 — selección y campos dinámicos
  const [selectedType, setSelectedType] = useState(null);
  const [deviceType,   setDeviceType]   = useState('iphone');
  const [deviceId,     setDeviceId]     = useState('');
  const [countryCode,  setCountryCode]  = useState('+51');
  const [phone,        setPhone]        = useState('');
  const [googleMail,   setGoogleMail]   = useState('');
  const [socialTab,    setSocialTab]    = useState('instagram');
  const [socialUser,   setSocialUser]   = useState('');
  const [adsPlatform,  setAdsPlatform]  = useState('meta');
  const [adsId,        setAdsId]        = useState('');
  const [activeChips,  setActiveChips]  = useState([]);

  // Campo de email — siempre visible en paso 1, también usado en paso 3
  const [email, setEmail] = useState('');

  // Paso 2 — escaneo
  const [progreso,  setProgreso]  = useState(0);
  const [msgIdx,    setMsgIdx]    = useState(0);
  const [scanListo, setScanListo] = useState(false);

  // Paso 3 — pago
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [exito,      setExito]      = useState(false);
  const [culqiListo, setCulqiListo] = useState(false);

  // Paso 3 — sección 1: datos del titular
  const [nombre,       setNombre]       = useState('');
  const [apellido,     setApellido]     = useState('');
  const [telPago,      setTelPago]      = useState('');
  const [codPago,      setCodPago]      = useState('+51');
  const [codigoPostal, setCodigoPostal] = useState('');

  // Paso 3 — sección 2: dirección de facturación
  const [direccion, setDireccion] = useState('');
  const [pais,      setPais]      = useState('PE');
  const [ciudad,    setCiudad]    = useState('');

  // Estado de pantalla de éxito post-pago
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [activationKey,   setActivationKey]   = useState('');
  const [fechaActivacion, setFechaActivacion] = useState('');
  const [fechaRenovacion, setFechaRenovacion] = useState('');
  const [registroActivo,  setRegistroActivo]  = useState(null);

  const scanRef = useRef(null);
  const msgRef  = useRef(null);

  // Verificar variable de entorno de Culqi
  useEffect(() => {
    const culqiKey = import.meta.env.VITE_CULQI_PUBLIC_KEY;
    if (!culqiKey) console.error('Culqi key not found — define VITE_CULQI_PUBLIC_KEY en Vercel');
  }, []);

  // Detectar cuando Culqi está disponible
  useEffect(() => {
    const check = setInterval(() => {
      if (window.Culqi) { setCulqiListo(true); clearInterval(check); }
    }, 200);
    return () => clearInterval(check);
  }, []);

  // Ref para evitar stale closures en el callback global
  const procesarTokenRef = useRef();
  procesarTokenRef.current = async () => {
    if (window.Culqi?.token) {
      const token = window.Culqi.token.id;
      window.Culqi.close();
      await enviarCargo(token);
    } else if (window.Culqi?.error) {
      const msg = window.Culqi.error?.user_message;
      setError(typeof msg === 'string' ? msg : 'Error en el pago. Intenta de nuevo.');
      setLoading(false);
    }
  };

  // Registrar callback global de Culqi (se sobreescribe justo antes de open() también)
  useEffect(() => {
    window.culqi = () => procesarTokenRef.current();
    return () => { delete window.culqi; };
  }, []);

  // Resetea chips al cambiar tipo o subtab de social
  useEffect(() => { setActiveChips([]); }, [selectedType, socialTab]);

  // Escaneo simulado en paso 2
  useEffect(() => {
    if (paso !== 2) return;
    setScanListo(false); setProgreso(0); setMsgIdx(0);
    let p = 0;
    scanRef.current = setInterval(() => {
      p += 100 / 30;
      setProgreso(Math.min(p, 100));
      if (p >= 100) { clearInterval(scanRef.current); setTimeout(() => setScanListo(true), 250); }
    }, 100);
    msgRef.current = setInterval(() => setMsgIdx(i => (i + 1) % MENSAJES_SCAN.length), 750);
    return () => { clearInterval(scanRef.current); clearInterval(msgRef.current); };
  }, [paso]);

  // Chips activos según tipo y subtab
  const chips = selectedType === 'social'
    ? (CHIPS_MAP.social[socialTab] || [])
    : (CHIPS_MAP[selectedType] || []);

  const toggleChip = c => setActiveChips(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const irPaso2    = e => {
    e.preventDefault();
    if (!email.trim()) return;
    onStep1Submit?.({ selectedType, deviceType, deviceId, countryCode, phone, googleMail, socialTab, socialUser, adsPlatform, adsId });
    setPaso(2);
  };
  const irPaso3    = () => { clearInterval(msgRef.current); setError(null); setPaso(3); };

  // Lógica real de apertura de Culqi — siempre dentro de try/catch
  const iniciarPago = () => {
    try {
      if (!window.Culqi) throw new Error('Culqi no está cargado');
      // Garantizar callback registrado justo antes de open()
      window.culqi = () => procesarTokenRef.current();
      window.Culqi.publicKey = import.meta.env.VITE_CULQI_PUBLIC_KEY;
      window.Culqi.settings({
        title:       'Encriptas',
        currency:    'USD',
        description: `Plan ${selectedPlan.name} — ${selectedPlan.label}`,
        amount:      selectedPlan.amount || 1000,
      });
      window.Culqi.options({
        lang: 'es',
        modal: true,
        paymentMethods: { tarjeta: true, yape: false, bancaMovil: false, agente: false, cuotealo: false },
      });
      window.Culqi.open();
    } catch (err) {
      console.error('Error Culqi:', err);
      setError('Error al procesar el pago: ' + err.message);
    }
  };

  // Abrir modal de Culqi — carga el script dinámicamente si no llegó a tiempo
  const handlePago = (e) => {
    e.preventDefault();
    setError(null);
    if (typeof window.Culqi === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://checkout.culqi.com/js/v4';
      script.onload = () => { setCulqiListo(true); iniciarPago(); };
      script.onerror = () => setError('No se pudo cargar el procesador de pago. Verifica tu conexión.');
      document.head.appendChild(script);
    } else {
      iniciarPago();
    }
  };

  // Llamar serverless function con el token capturado por Culqi
  const enviarCargo = async (token) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/culqi-charge', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email,
          amount:   selectedPlan.amount,
          currency: 'USD',
          nombre:   `${nombre} ${apellido}`.trim(),
        }),
      });

      let data;
      try { data = await res.json(); }
      catch { throw new Error('Error de conexión con el servidor de pagos'); }

      if (!res.ok || !data.success) {
        throw new Error(typeof data?.error === 'string' ? data.error : 'Error procesando el pago');
      }

      const chars = 'abcdef0123456789';
      const key   = 'nv-' + Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const ahora   = new Date();
      const renovar = new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000);
      const fmt = d =>
        d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
        + ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

      const allChips = selectedType === 'social'
        ? (CHIPS_MAP.social[socialTab] || [])
        : (CHIPS_MAP[selectedType] || []);
      const coberturaEmail = activeChips.length > 0 ? activeChips : allChips;
      const datoEmail = getDatoProtegido();

      setPaymentIntentId(data.chargeId);
      setActivationKey(key);
      setFechaActivacion(fmt(ahora));
      setFechaRenovacion(fmt(renovar));
      setRegistroActivo({
        searchKey:      datoEmail,
        email,
        protectionType: PROTECTION_CARDS.find(c => c.id === selectedType)?.title || selectedType,
        activationDate: fmt(ahora),
        coverage:       coberturaEmail,
      });
      setExito(true);

      // Correo de confirmación — fire and forget
      fetch('/api/send-confirmation', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          paymentIntentId:  data.chargeId,
          protectionType:   PROTECTION_CARDS.find(c => c.id === selectedType)?.title || selectedType,
          protectedData:    datoEmail,
          coverage:         coberturaEmail,
          activationKey:    key,
          activationDate:   fmt(ahora),
          renewalDate:      fmt(renovar),
        }),
      }).catch(() => {});

    } catch (err) {
      console.error('Pago error:', err);
      setError(typeof err.message === 'string' ? err.message : 'Error procesando el pago. Inténtalo de nuevo.');
    }
    setLoading(false);
  };

  const getDatoProtegido = () =>
    selectedType === 'mobile'
      ? `${deviceType === 'iphone' ? 'iPhone' : 'Android'} — ${deviceId || 'N/A'}`
      : selectedType === 'whatsapp' ? `${countryCode} ${phone}`
      : selectedType === 'google'   ? googleMail
      : selectedType === 'social'   ? `${SOCIAL_TABS.find(t => t.id === socialTab)?.label} — ${socialUser}`
      : selectedType === 'ads'      ? `${ADS_TABS.find(t => t.id === adsPlatform)?.label} — ${adsId}`
      : selectedType === 'all'      ? `${countryCode} ${phone}`
      : 'N/A';

  // Valores derivados para la pantalla de éxito
  const tipoCard      = PROTECTION_CARDS.find(c => c.id === selectedType);
  const TipoIcon      = tipoCard?.Icon;
  const datoProtegido = getDatoProtegido();
  const cobertura     = activeChips.length > 0
    ? activeChips
    : (selectedType === 'social' ? (CHIPS_MAP.social[socialTab] || []) : (CHIPS_MAP[selectedType] || []));

  return (
    <div className="flex flex-col">
      <StepIndicador paso={paso} />
      <AnimatePresence mode="wait">

        {/* ════════════════════════════════════════
            PASO 1 — Selector de protección + campos
            ════════════════════════════════════════ */}
        {paso === 1 && (
          <motion.form key="p1" variants={slide} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={irPaso2} className="flex flex-col gap-4"
          >
            <div className="text-center">
              <h2 className="text-xl font-black mb-0.5 bg-gradient-to-br from-white via-purple-100 to-violet-300 bg-clip-text text-transparent">
                Analiza tu exposición de riesgo
              </h2>
              <p className="text-[11px] text-slate-500">Elige qué deseas proteger</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PROTECTION_CARDS.map(({ id, Icon, title, desc }) => {
                const sel = selectedType === id;
                return (
                  <button key={id} type="button"
                    onClick={() => setSelectedType(sel ? null : id)}
                    className="relative flex flex-col items-start p-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: sel ? 'rgba(109,40,217,0.12)' : 'rgba(255,255,255,0.02)',
                      border:     sel ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow:  sel ? '0 0 20px rgba(124,58,237,0.15), inset 0 0 15px rgba(124,58,237,0.05)' : 'none',
                    }}
                  >
                    <Icon className="w-4 h-4 mb-1.5" strokeWidth={1.8}
                      style={{ color: sel ? '#a78bfa' : '#64748b' }} />
                    <span className="text-[11px] font-bold block leading-tight mb-0.5"
                      style={{ color: sel ? '#fff' : '#cbd5e1' }}>
                      {title}
                    </span>
                    <span className="text-[9px] text-slate-500 leading-tight line-clamp-2">
                      {desc}
                    </span>
                    {sel && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 8px rgba(124,58,237,0.6)' }}
                      >
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedType && (
                <motion.div key={selectedType}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2.5 pt-1">

                    {selectedType === 'mobile' && <>
                      <TabToggle
                        options={[{ id: 'iphone', label: 'iPhone' }, { id: 'android', label: 'Android' }]}
                        selected={deviceType} onChange={setDeviceType}
                      />
                      <NvInput placeholder="IMEI o número de serie del dispositivo"
                        value={deviceId} onChange={setDeviceId} />
                      <p className="text-[10px] text-slate-600 pl-1">
                        Encuentra tu IMEI marcando *#06# en tu teléfono
                      </p>
                    </>}

                    {selectedType === 'whatsapp' &&
                      <div className="flex gap-2">
                        <CountrySelect value={countryCode} onChange={setCountryCode} />
                        <NvInput type="tel" placeholder="Número de WhatsApp"
                          value={phone} onChange={setPhone} className="flex-1" />
                      </div>
                    }

                    {selectedType === 'google' &&
                      <NvInput type="email" placeholder="usuario@gmail.com"
                        value={googleMail} onChange={setGoogleMail} />
                    }

                    {selectedType === 'social' && <>
                      <TabToggle options={SOCIAL_TABS} selected={socialTab}
                        onChange={t => setSocialTab(t)} size="sm" />
                      <NvInput
                        placeholder={`URL o usuario de ${SOCIAL_TABS.find(t => t.id === socialTab)?.label}`}
                        value={socialUser} onChange={setSocialUser}
                      />
                    </>}

                    {selectedType === 'ads' && <>
                      <TabToggle options={ADS_TABS} selected={adsPlatform}
                        onChange={setAdsPlatform} size="sm" />
                      <NvInput placeholder="ID de cuenta publicitaria o dominio"
                        value={adsId} onChange={setAdsId} />
                    </>}

                    {selectedType === 'all' && <>
                      <div className="flex gap-2">
                        <CountrySelect value={countryCode} onChange={setCountryCode} />
                        <NvInput type="tel" placeholder="Número de WhatsApp"
                          value={phone} onChange={setPhone} className="flex-1" />
                      </div>
                      <TabToggle
                        options={[{ id: 'iphone', label: 'iPhone' }, { id: 'android', label: 'Android' }]}
                        selected={deviceType} onChange={setDeviceType}
                      />
                    </>}

                    {chips.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-600 mb-2">
                          Vectores a proteger
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {chips.map(chip => (
                            <button key={chip} type="button" onClick={() => toggleChip(chip)}
                              className="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                              style={activeChips.includes(chip) ? {
                                background: 'rgba(127,29,29,0.3)',
                                border: '1px solid rgba(239,68,68,0.4)',
                                color: '#fca5a5',
                              } : {
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: '#64748b',
                              }}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

            <div className="space-y-3">
              <NvInput type="email" placeholder="tu@empresa.com"
                value={email} onChange={setEmail}
                label="Email para recibir el reporte" required
              />
              <button type="submit"
                className="btn-shimmer w-full font-black py-3.5 rounded-xl text-white transition-all active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #7c3aed 100%)',
                  boxShadow: '0 0 25px rgba(124,58,237,0.55), 0 8px 32px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                Analizar vulnerabilidad →
              </button>
              <p className="text-center text-[11px] text-slate-500">
                Sin tarjeta. Análisis en segundos. Resultado enviado a tu correo.
              </p>
            </div>
          </motion.form>
        )}

        {/* ════════════════════════════════════════
            PASO 2 — Escaneo + resultado de riesgo
            ════════════════════════════════════════ */}
        {paso === 2 && (
          <motion.div key="p2" variants={slide} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="wait">

              {!scanListo && (
                <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="text-center">
                    <h2 className="text-xl font-black mb-0.5 bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                      Analizando tu exposición…
                    </h2>
                    <p className="text-violet-400/60 text-xs font-mono">{email}</p>
                  </div>
                  <div className="space-y-2.5">
                    <div className="relative h-2.5 rounded-full overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
                    >
                      <motion.div className="absolute inset-y-0 left-0 rounded-full btn-shimmer"
                        style={{ width: `${progreso}%`, background: 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)', boxShadow: '0 0 12px rgba(139,92,246,0.8)' }}
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p key={msgIdx}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="text-[11px] font-mono text-center text-violet-300/80"
                      >
                        {MENSAJES_SCAN[msgIdx]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['Dominio', 'Dark web', 'Metadatos'].map((label, i) => (
                      <div key={i} className="relative overflow-hidden rounded-xl p-3 text-center"
                        style={{ background: 'rgba(12,8,28,0.8)', border: '1px solid rgba(139,92,246,0.15)', boxShadow: progreso > i * 34 ? '0 0 12px rgba(139,92,246,0.15)' : 'none' }}
                      >
                        {progreso > i * 34 && <div className="scan-line" />}
                        <div className="h-1 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <motion.div className="h-full rounded-full"
                            animate={{ width: progreso > i * 34 ? '100%' : '0%' }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)', boxShadow: '0 0 6px rgba(139,92,246,0.7)' }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {scanListo && (
                <motion.div key="resultado" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="text-center">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="inline-block mb-1"
                      style={{ filter: 'drop-shadow(0 0 12px rgba(239,68,68,0.7))' }}
                    >
                      <svg className="w-8 h-8 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </motion.div>
                    <h2 className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      Riesgo detectado en 3 vectores
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">Tu dispositivo puede estar expuesto a interceptación</p>
                  </div>
                  <div className="space-y-2">
                    {VECTORES.map((v, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.13 }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${v.bg} ${v.border}`}
                        style={{ boxShadow: `0 0 16px ${v.glow}, inset 0 1px 0 rgba(255,255,255,0.04)` }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-0.5 h-5 rounded-full ${v.bar}`} />
                          <span className="text-xs text-slate-300">▸ {v.label}</span>
                        </div>
                        <span className={`text-[10px] font-black tracking-wider ml-2 shrink-0 ${v.textColor}`}>
                          {v.nivel}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }} onClick={irPaso3}
                    className="btn-shimmer w-full font-black py-3.5 rounded-xl text-white transition-all active:scale-[0.97] mt-1"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea, #7c3aed)', boxShadow: '0 0 25px rgba(124,58,237,0.55), 0 8px 32px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' }}
                  >
                    Quiero protegerme ahora →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ════════════════════════════════════════
            PASO 3 — Formulario de pago con Culqi
            ════════════════════════════════════════ */}
        {paso === 3 && !exito && (
          <motion.form key="p3" variants={slide} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handlePago} className="flex flex-col gap-5"
          >
            <div className="text-center mb-1">
              <h2 className="text-xl font-black bg-gradient-to-br from-white to-violet-200 bg-clip-text text-transparent">
                Activa tu escudo neural
              </h2>
            </div>

            {/* Plan summary */}
            <div
              className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.22)' }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(167,139,250,0.7)' }}>
                  Plan seleccionado
                </p>
                <p className="text-sm font-bold text-white leading-tight">
                  {selectedPlan.name} — {selectedPlan.label}
                </p>
                {selectedPlan.savings && (
                  <p className="text-[11px] text-slate-500 mt-0.5">{selectedPlan.savings}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="text-[11px] font-semibold transition-colors flex-shrink-0 ml-4"
                style={{ color: '#a78bfa' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c4b5fd'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a78bfa'; }}
              >
                Cambiar plan
              </button>
            </div>

            {/* ── SECCIÓN 1: DATOS DEL TITULAR ── */}
            <div className="space-y-3">
              <SectionTitle>Datos del titular</SectionTitle>

              <div className="grid grid-cols-2 gap-3">
                <BField label="Nombre">
                  <BInput placeholder="Juan" value={nombre} onChange={setNombre} />
                </BField>
                <BField label="Apellido">
                  <BInput placeholder="García" value={apellido} onChange={setApellido} />
                </BField>
              </div>

              <BField label="Correo electrónico">
                <BInput type="email" placeholder="juan@correo.com" value={email}
                  onChange={() => {}} readOnly />
              </BField>

              <div className="grid grid-cols-2 gap-3">
                <BField label="Número de teléfono">
                  <div className="flex gap-1.5">
                    <CountrySelect value={codPago} onChange={setCodPago} compact />
                    <BInput type="tel" placeholder="987 654 321" value={telPago}
                      onChange={setTelPago} className="flex-1 min-w-0" />
                  </div>
                </BField>
                <BField label="Código postal">
                  <BInput placeholder="15001" value={codigoPostal} onChange={setCodigoPostal} />
                </BField>
              </div>
            </div>

            <Divider />

            {/* ── SECCIÓN 2: DIRECCIÓN DE FACTURACIÓN ── */}
            <div className="space-y-3">
              <SectionTitle>Dirección de facturación</SectionTitle>

              <BField label="Dirección">
                <BInput placeholder="Av. Principal 123, Dpto 4B" value={direccion} onChange={setDireccion} />
              </BField>

              <div className="grid grid-cols-2 gap-3">
                <BField label="País">
                  <BSelect value={pais} onChange={setPais}>
                    {BILLING_COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </BSelect>
                </BField>
                <BField label="Ciudad / Distrito">
                  <BInput placeholder="Lima" value={ciudad} onChange={setCiudad} />
                </BField>
              </div>
            </div>

            <Divider />

            {/* ── SECCIÓN 3: MÉTODO DE PAGO ── */}
            <div className="space-y-3">
              <SectionTitle>Método de pago</SectionTitle>
              <div className="rounded-xl p-4 flex items-center justify-between"
                style={{ background: '#0d0b1e', border: '1px solid #3a3a5c' }}>
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-violet-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Tarjeta de crédito / débito</p>
                    <p className="text-[11px] text-slate-500">Ingresa tus datos en la ventana segura de Culqi</p>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-500">VISA · MC · AMEX</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl text-red-400 text-xs flex items-start gap-2"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <svg className="w-4 h-4 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {error}
              </motion.div>
            )}

            {/* Botón — abre modal Culqi */}
            <button type="submit" disabled={loading}
              className="btn-shimmer w-full font-black py-4 rounded-xl text-white transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg,#7c3aed 0%,#9333ea 50%,#7c3aed 100%)', boxShadow: '0 0 30px rgba(124,58,237,0.55),0 8px 40px rgba(124,58,237,0.25),inset 0 1px 0 rgba(255,255,255,0.18)' }}
            >
              {loading
                ? <><Spinner /> Procesando…</>
                : <><Lock className="w-4 h-4" /> Activar protección — {PLAN_BTN_PRICE[selectedPlan.plan] || selectedPlan.label}</>}
            </button>

            <div className="flex flex-col items-center gap-1 -mt-2">
              <p className="text-[10px] text-slate-600 flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Pago seguro procesado por Culqi
              </p>
              <p className="text-[10px] text-slate-700 font-mono tracking-widest">
                VISA · MC · AMEX
              </p>
            </div>
          </motion.form>
        )}

        {/* ════════════════════════════════════════
            ÉXITO — Pantalla animada post-pago
            ════════════════════════════════════════ */}
        {paso === 3 && exito && (
          <motion.div key="exito" variants={slide} initial="enter" animate="center"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                style={{ filter: 'drop-shadow(0 0 18px rgba(124,58,237,0.9))' }}
              >
                <Shield className="w-11 h-11" style={{ color: '#a78bfa' }} />
              </motion.div>

              <div className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <motion.div className="h-full rounded-full"
                  initial={{ width: '87%', background: 'linear-gradient(90deg,#7c3aed,#a855f7)' }}
                  animate={{ width: '100%', background: 'linear-gradient(90deg,#7c3aed,#00ff88)' }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
                  style={{ boxShadow: '0 0 8px rgba(0,255,136,0.5)' }}
                />
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }} className="text-center"
              >
                <h2 className="text-lg font-black bg-gradient-to-r from-violet-300 to-emerald-300 bg-clip-text text-transparent mb-0.5">
                  Proteccion Neural Activa
                </h2>
                <p className="text-[11px] text-slate-500 mb-1.5">Tu información está blindada por Encriptas</p>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-black tracking-[0.2em]"
                  style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }}>
                  ACTIVO
                </span>
              </motion.div>
            </div>

            {/* Terminal */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl overflow-hidden text-[10px] font-mono leading-5"
              style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,255,136,0.12)' }}
            >
              <div className="px-3 py-1.5 flex items-center gap-1.5"
                style={{ background: 'rgba(0,255,136,0.04)', borderBottom: '1px solid rgba(0,255,136,0.07)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: '#eab308' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                <span className="ml-2 text-[9px] text-slate-600">encriptas — cifrado completado</span>
              </div>
              <div className="p-3 space-y-0.5">
                {[
                  { text: '> Retomando protocolo Encriptas...',                color: '#475569', delay: 0.6  },
                  { text: '> [####################] 100% Cifrado completado', color: '#00ff88', delay: 0.75 },
                  { text: `> Clave maestra generada: ${activationKey}`,        color: '#a78bfa', delay: 0.9  },
                  { text: `> Titular verificado:`,  color: '#475569', delay: 1.05, bold: `${nombre} ${apellido}`.trim() || 'N/A', boldColor: '#ffffff' },
                  { text: `> Email del titular:`,   color: '#475569', delay: 1.15, bold: email, boldColor: '#e2e8f0' },
                  { text: `> Dato protegido:`,      color: '#475569', delay: 1.25, bold: datoProtegido, boldColor: '#a78bfa' },
                  { text: `> Proteccion activa: ${fechaActivacion}`,           color: '#475569', delay: 1.35 },
                  { text: `> Proximo ciclo: ${fechaRenovacion}`,               color: '#475569', delay: 1.45 },
                  { text: '> Estado: PROTEGIDO',                               color: '#00ff88', delay: 1.55 },
                  { text: `> Enviando comprobante a: ${email}`,                color: '#475569', delay: 1.65 },
                  { text: '> Cifrado neural activado exitosamente.',            color: '#00ff88', delay: 1.75 },
                ].map((l, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: l.delay }} style={{ color: l.color }}>
                    {l.bold !== undefined
                      ? <>{l.text}{' '}<span style={{ color: l.boldColor, fontWeight: 700, textShadow: `0 0 6px ${l.boldColor}55` }}>{l.bold}</span></>
                      : l.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Resumen */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="rounded-xl p-3 space-y-2"
              style={{ background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.1)' }}
            >
              <div className="flex items-center gap-2">
                {TipoIcon && <TipoIcon className="w-4 h-4 shrink-0" style={{ color: '#a78bfa' }} />}
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-600">Tipo de protección</p>
                  <p className="text-xs font-bold text-white">{tipoCard?.title || selectedType}</p>
                </div>
              </div>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-600 mb-0.5">Dato protegido</p>
                <p className="text-[11px] text-slate-300 font-mono truncate">{datoProtegido}</p>
              </div>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-600 mb-0.5">Activación</p>
                  <p className="text-[10px] text-slate-400">{fechaActivacion}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-600 mb-0.5">Renovación</p>
                  <p className="text-[10px] text-slate-400">{fechaRenovacion}</p>
                </div>
              </div>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-600 mb-0.5">ID de transacción</p>
                <p className="text-[10px] text-slate-500 font-mono truncate">{paymentIntentId}</p>
              </div>
              {cobertura.length > 0 && (
                <>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-600 mb-1.5">Cobertura activada</p>
                    <div className="flex flex-wrap gap-1">
                      {cobertura.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.18)', color: '#6ee7b7' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Mensaje de seguridad */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
              className="rounded-xl px-4 py-4 text-center"
              style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}
            >
              <p className="text-[11px] leading-relaxed text-slate-300">
                Sus cuentas vinculadas con{' '}
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{email}</span>
                {telPago && (<>, su número{' '}<span style={{ color: '#a78bfa', fontWeight: 700 }}>{codPago} {telPago}</span></>)}
                , sus billeteras digitales y apps bancarias móviles están{' '}
                <span style={{ color: '#00ff88', fontWeight: 700 }}>completamente seguras</span>{' '}
                y protegidas por Encriptas.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              onClick={() => onSubscriptionSuccess(paymentIntentId, registroActivo)}
              className="btn-shimmer w-full font-black py-3.5 rounded-xl text-white transition-all active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg,#059669 0%,#10b981 50%,#059669 100%)', boxShadow: '0 0 22px rgba(16,185,129,0.4),0 8px 28px rgba(16,185,129,0.2),inset 0 1px 0 rgba(255,255,255,0.15)' }}
            >
              Ver mi panel de proteccion →
            </motion.button>
            <p className="text-center text-[10px] text-slate-600 -mt-1">
              Comprobante enviado a {email}
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function StepIndicador({ paso }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      {[1, 2, 3].map(n => (
        <React.Fragment key={n}>
          <motion.div
            animate={paso === n ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
            style={
              paso === n ? { background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 16px rgba(124,58,237,0.7)', color: '#fff' }
              : paso > n  ? { background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }
              :               { background: 'rgba(255,255,255,0.04)', color: '#475569', border: '1px solid rgba(255,255,255,0.06)' }
            }
          >
            {paso > n ? '✓' : n}
          </motion.div>
          {n < 3 && (
            <div className="h-px w-10 rounded-full transition-all duration-500"
              style={{ background: paso > n ? 'linear-gradient(90deg, rgba(124,58,237,0.7), rgba(168,85,247,0.4))' : 'rgba(255,255,255,0.06)', boxShadow: paso > n ? '0 0 6px rgba(124,58,237,0.4)' : 'none' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function TabToggle({ options, selected, onChange, size = 'md' }) {
  return (
    <div className="flex gap-1.5">
      {options.map(opt => {
        const sel = selected === opt.id;
        return (
          <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
            className={`flex-1 rounded-lg font-bold transition-all text-center ${size === 'sm' ? 'py-1.5 text-[10px]' : 'py-2 text-[11px]'}`}
            style={sel ? {
              background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
              color: '#fff',
              boxShadow: '0 0 10px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
            } : {
              background: 'rgba(255,255,255,0.04)', color: '#64748b',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function NvInput({ type = 'text', placeholder, value, onChange, label, required, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 ml-1"
          style={{ color: 'rgba(167,139,250,0.6)' }}>
          {label}
        </label>
      )}
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)} required={required}
        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none transition-all duration-300"
        style={{
          background: 'rgba(8,6,20,0.9)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow: value ? '0 0 0 2px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      />
    </div>
  );
}

function CountrySelect({ value, onChange, compact = false }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="rounded-xl px-3 text-white text-sm focus:outline-none cursor-pointer shrink-0"
      style={{
        background: '#0d0b1e',
        border: '1px solid #3a3a5c',
        minWidth: compact ? '80px' : '88px',
        height: '46px',
      }}
    >
      {COUNTRIES.map(c => (
        <option key={c.code} value={c.dial} style={{ background: '#0d0618' }}>
          {c.code} {c.dial}
        </option>
      ))}
    </select>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <span className="text-[10px] font-black uppercase tracking-[0.2em]"
        style={{ color: 'rgba(167,139,250,0.7)' }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.15)' }} />
    </div>
  );
}

function Divider() {
  return <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />;
}

function BField({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-0.5"
        style={{ color: '#6b6b8a' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function BInput({ type = 'text', placeholder, value, onChange, readOnly = false, className = '' }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={e => onChange && onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`w-full rounded-xl px-4 text-white text-sm placeholder-[#3a3a5c] focus:outline-none transition-all duration-200 ${className} ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
      style={{
        height: '46px',
        background: '#0d0b1e',
        border: `1px solid ${focused ? '#7c3aed' : '#3a3a5c'}`,
        boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.18)' : 'none',
      }}
    />
  );
}

function BSelect({ value, onChange, children }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full rounded-xl px-4 text-white text-sm focus:outline-none cursor-pointer transition-all duration-200"
      style={{
        height: '46px',
        background: '#0d0b1e',
        border: `1px solid ${focused ? '#7c3aed' : '#3a3a5c'}`,
        boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.18)' : 'none',
      }}
    >
      {children}
    </select>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
