import React from 'react';
import { motion } from 'framer-motion';

// Empresas ficticias internacionales con sus países
const CLIENTES = [
  { nombre: 'TechCorp',         pais: 'USA',           codigo: 'US' },
  { nombre: 'DataShield GmbH',  pais: 'Alemania',      codigo: 'DE' },
  { nombre: 'SecureNet Brasil', pais: 'Brasil',         codigo: 'BR' },
  { nombre: 'NipponCyber',      pais: 'Japón',          codigo: 'JP' },
  { nombre: 'CriptoMX',         pais: 'México',         codigo: 'MX' },
  { nombre: 'PrivaFrance SAS',  pais: 'Francia',        codigo: 'FR' },
  { nombre: 'SafeGrid UK',      pais: 'Reino Unido',    codigo: 'GB' },
  { nombre: 'VaultAU Systems',  pais: 'Australia',      codigo: 'AU' },
  { nombre: 'KoreaSec Corp',    pais: 'Corea del Sur',  codigo: 'KR' },
  { nombre: 'NordVault AB',     pais: 'Suecia',         codigo: 'SE' },
];

// Duplicamos la lista para crear el efecto de bucle infinito sin salto visual
const PISTA = [...CLIENTES, ...CLIENTES];

export default function ClientCarousel() {
  return (
    <section id="clients" className="py-20">

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-6"
      >
        <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500 mb-2">
          Nuestros Clientes
        </h3>
        <p className="text-xs text-slate-600">
          Empresas globales que confían en Encriptas
        </p>
      </motion.div>

      {/* Contenedor del carrusel con fade en los bordes */}
      <div className="relative overflow-hidden">
        {/* Degradado izquierdo */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        {/* Degradado derecho */}
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Pista deslizante — pausa al pasar el ratón */}
        <div className="carousel-track flex gap-6">
          {PISTA.map((cliente, i) => (
            <ClientCard key={i} cliente={cliente} />
          ))}
        </div>
      </div>

      {/* Nota de escala */}
      <p className="text-center mt-10 text-slate-600 text-xs tracking-wide">
        +500 empresas medianas en más de 40 países confían en nuestra plataforma
      </p>
    </section>
  );
}

// Tarjeta individual de cliente
function ClientCard({ cliente }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-purple-500/25 hover:bg-white/[0.07] transition-all w-52 group">
      {/* Código de país como acento superior */}
      <span className="text-[10px] font-bold text-purple-400/50 uppercase tracking-[0.2em] mb-1.5 group-hover:text-purple-400/80 transition-colors">
        {cliente.codigo}
      </span>

      {/* Nombre de la empresa */}
      <span className="text-base font-black text-white/50 tracking-tight text-center leading-tight group-hover:text-white/80 transition-colors">
        {cliente.nombre}
      </span>

      {/* País */}
      <span className="text-[10px] text-slate-600 mt-1 group-hover:text-slate-500 transition-colors">
        {cliente.pais}
      </span>
    </div>
  );
}
