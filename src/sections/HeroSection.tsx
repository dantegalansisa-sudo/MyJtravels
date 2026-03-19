import { motion } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from '../components/MagneticButton';
import './HeroSection.css';

const destinations = [
  'Nueva York', 'Miami', 'Boston', 'Medellín', 'Bogotá', 'Madrid',
  'Curazao', 'Punta Cana', 'Cartagena', 'Costa Rica', 'Cancún',
  'San Juan PR', 'Lima / Perú', 'Chile',
];

const stats = [
  { value: '5,000+', label: 'Clientes Felices' },
  { value: '15+', label: 'Destinos' },
  { value: '10 Años', label: 'Experiencia' },
];

export default function HeroSection() {
  const [selectedDest, setSelectedDest] = useState('');

  const whatsappMessage = selectedDest
    ? `Hola M&J Travels! Quiero cotizar un vuelo a ${selectedDest}.`
    : 'Hola M&J Travels! Quiero cotizar un vuelo.';

  const whatsappUrl = `https://wa.me/18298740109?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="hero" id="inicio">
      {/* Decorative bg shapes */}
      <div className="hero__bg-shapes">
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
      </div>

      <div className="hero__grid section-container">
        {/* ===== LEFT — Text ===== */}
        <div className="hero__left">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="/imagenes/logo.png" alt="M&J Travels" className="hero__badge-logo" />
            <span>Agencia Registrada · CESDN</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            El Mundo Te Espera,
            <br />
            <span className="hero__title-accent">Nosotros Te Llevamos</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Vuelos, hoteles, tours y cruceros. Te gestionamos tu viaje
            desde cualquier parte del mundo hacia el destino que sueñas.
          </motion.p>

          <motion.div
            className="hero__search"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <select
              className="hero__select"
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
            >
              <option value="">¿A dónde quieres volar?</option>
              {destinations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
              <option value="Otro destino">Otro destino...</option>
            </select>
            <MagneticButton
              href={whatsappUrl}
              className="hero__search-btn"
              target="_blank"
            >
              Cotizar Gratis →
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <MagneticButton
              href="https://wa.me/18298740109?text=Hola!%20Quiero%20ver%20las%20ofertas%20de%20vuelos."
              className="btn-primary"
              target="_blank"
            >
              Ver Ofertas de Vuelos
            </MagneticButton>
            <MagneticButton href="#destinos" className="btn-ghost">
              Explorar Destinos
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ===== RIGHT — Image ===== */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="hero__image-wrapper">
            <img
              src="/newimagenportada/turismo-new.png"
              alt="Turista lista para viajar por el mundo"
              className="hero__image"
              loading="eager"
            />
          </div>

          {/* Floating offer card */}
          <motion.div
            className="hero__offer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="hero__offer-label">Oferta de la Semana</div>
            <div className="hero__offer-route">Nueva York</div>
            <div className="hero__offer-price">Desde RD$28,000</div>
            <div className="hero__offer-note">Ida y vuelta</div>
            <MagneticButton
              href="https://wa.me/18298740109?text=Hola!%20Me%20interesa%20un%20vuelo%20a%20Nueva%20York%20por%20RD%2428%2C000"
              className="hero__offer-cta"
              target="_blank"
            >
              Reservar →
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
