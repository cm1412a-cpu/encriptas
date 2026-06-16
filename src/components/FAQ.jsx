import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ─── Datos ────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    q: '¿Qué es Encriptas y cómo funciona?',
    a: `Encriptas es una plataforma de cifrado digital de nueva generación que protege tus cuentas, dispositivos y redes sociales usando algoritmos AES-256-GCM y protocolos de seguridad militar.

Cuando te suscribes, nuestro sistema analiza los vectores de vulnerabilidad de tu cuenta o dispositivo y aplica capas de cifrado que hacen tu información indescifrable para terceros. Por ejemplo: si proteges tu WhatsApp con Encriptas, aunque alguien intercepte tu conexión WiFi en un café, no podrá leer tus mensajes ni ver tus archivos compartidos.`,
  },
  {
    q: '¿Realmente pueden cifrar mi WhatsApp o Instagram?',
    a: `Encriptas aplica una capa adicional de protección sobre los protocolos existentes de estas plataformas. WhatsApp ya tiene cifrado de extremo a extremo, pero existen vulnerabilidades en el dispositivo mismo: apps espía, acceso físico al teléfono, backups sin cifrar en Google Drive o iCloud, y sesiones activas en otros dispositivos.

Encriptas protege específicamente esas vulnerabilidades. Ejemplo real: si alguien instala un keylogger en tu teléfono para capturar tus contraseñas, nuestro sistema detecta la actividad anómala y blinda el acceso a tus cuentas vinculadas.`,
  },
  {
    q: '¿Es seguro ingresar mi número o URL en Encriptas?',
    a: `Completamente. Encriptas no almacena tu número de teléfono ni tus URLs en texto plano. Toda la información que ingresas es procesada con hash SHA-512, lo que significa que ni siquiera nosotros podemos ver tu dato original una vez procesado.

Es similar a cómo funcionan los bancos: ellos no guardan tu contraseña, guardan una versión cifrada irreversible de ella. Si alguien hackea nuestra base de datos, solo encontraría cadenas de caracteres sin sentido.`,
  },
  {
    q: '¿Qué diferencia hay entre el plan Básico, Pro y Elite?',
    a: `La diferencia principal está en la cantidad de cuentas y tipos de protección:

Plan Básico ($10/mes): Ideal si quieres proteger solo una cuenta o un dispositivo. Por ejemplo, un trabajador independiente que quiere proteger su WhatsApp de negocios.

Plan Pro ($45/6 meses): Para personas con vida digital activa. Por ejemplo, un influencer que maneja Instagram, TikTok, Gmail y tiene Yape y BCP en su teléfono, todo protegido simultáneamente.

Plan Elite ($90/año): Para empresas o profesionales con cuentas publicitarias activas. Por ejemplo, una agencia de marketing que maneja Meta Ads con $5,000 de presupuesto activo y no puede permitirse que un hacker tome control de la cuenta.`,
  },
  {
    q: '¿Qué pasa si me hackean mientras tengo Encriptas activo?',
    a: `Si tienes una suscripción activa y detectamos actividad sospechosa, nuestro sistema envía una alerta inmediata a tu correo y activa protocolos de bloqueo adicionales.

Ejemplo: un cliente con plan Pro notó que alguien intentó acceder a su Facebook desde una IP en Rusia. Nuestro sistema bloqueó el intento y le notificó en menos de 2 minutos. Sin Encriptas, ese acceso hubiera pasado desapercibido hasta que ya fuera demasiado tarde.

Importante: Encriptas es una capa de protección adicional, no reemplaza buenas prácticas como usar contraseñas fuertes y activar la verificación en dos pasos.`,
  },
  {
    q: '¿Cómo cancelo mi suscripción?',
    a: `Puedes cancelar en cualquier momento escribiéndonos a soporte@encriptas.com con tu correo de registro. Procesamos la cancelación en menos de 24 horas y no te cobramos el siguiente ciclo.

No hay penalidades ni cargos ocultos. Si cancelas a mitad de un período ya pagado, tu protección continúa activa hasta que venza ese período.`,
  },
  {
    q: '¿Funciona para personas fuera de Perú?',
    a: `Sí, Encriptas funciona en cualquier país del mundo. Aceptamos tarjetas de débito y crédito internacionales (Visa, Mastercard, Amex) de cualquier país.

Tenemos usuarios activos en Colombia, México, Argentina, España, Estados Unidos y más de 20 países. El servicio es exactamente igual sin importar desde dónde accedas.`,
  },
  {
    q: '¿Cada cuánto tiempo se renueva el cifrado?',
    a: `El cifrado se renueva automáticamente cada 30 días para el plan mensual, y cada 6 o 12 meses para los planes Pro y Elite respectivamente.

Recibirás un correo de recordatorio 3 días antes de tu fecha de renovación. Si tu suscripción vence, la protección se mantiene activa 48 horas adicionales como período de gracia para que puedas renovar sin perder continuidad.`,
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(prev => (prev === i ? null : i));

  return (
    <section id="faq" className="py-20">

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
          Preguntas frecuentes
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          ¿Tienes dudas?
        </h2>
        <p className="text-slate-400 text-lg">
          Resolvemos todo sobre tu protección digital
        </p>
      </motion.div>

      {/* Acordeón */}
      <div className="max-w-3xl mx-auto space-y-3">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: '#1a1a2e',
                  border: isOpen
                    ? '1px solid rgba(124,58,237,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  borderLeft: isOpen
                    ? '3px solid #7c3aed'
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isOpen ? '0 0 24px rgba(124,58,237,0.1)' : 'none',
                }}
              >
                {/* Cabecera clickeable */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group"
                >
                  <span
                    className="text-base font-medium leading-snug pr-4 transition-colors duration-200"
                    style={{ color: isOpen ? '#fff' : '#cbd5e1' }}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className="w-5 h-5 transition-colors duration-200"
                      style={{ color: isOpen ? '#a78bfa' : '#475569' }}
                    />
                  </motion.span>
                </button>

                {/* Respuesta animada */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="px-6 pb-6"
                        style={{
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                          paddingTop: '16px',
                        }}
                      >
                        {item.a.split('\n\n').map((para, pi) => (
                          <p key={pi} className="text-sm text-slate-400 leading-relaxed mb-3 last:mb-0">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
