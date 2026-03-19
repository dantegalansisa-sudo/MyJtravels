import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
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
  { value: '10', label: 'Años de Experiencia' },
  { value: '24/7', label: 'Atención' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedDest, setSelectedDest] = useState('');

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const whatsappMessage = selectedDest
    ? `Hola M&J Travels! Quiero cotizar un vuelo a ${selectedDest}.`
    : 'Hola M&J Travels! Quiero cotizar un vuelo.';

  const whatsappUrl = `https://wa.me/18298740109?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="hero" ref={heroRef} id="inicio">
      {/* ===== BACKGROUND IMAGE — zoomed out to show full image ===== */}
      <motion.div className="hero__bg-image" style={{ y: imgY }}>
        <img
          src="/newimagenportada/portada-main.jpg"
          alt="Destino de viaje"
          loading="eager"
        />
      </motion.div>

      {/* Cinematic overlay */}
      <div className="hero__overlay" />

      {/* ===== ANIMATED PLANE ===== */}
      <motion.div
        className="hero__plane"
        initial={{ x: '-15vw', y: '18vh', opacity: 0 }}
        animate={{ x: '110vw', y: '-5vh', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 8, delay: 1.5, repeat: Infinity, repeatDelay: 14 }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      </motion.div>

      {/* ===== HERO CONTENT ===== */}
      <div className="hero__content section-container">
        {/* Badge */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img src="/imagenes/logo.png" alt="M&J Travels" className="hero__logo" />
          <span>Agencia Registrada · CESDN</span>
        </motion.div>

        {/* Title — captivating static phrase */}
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <span className="hero__title-top">El Mundo Te Espera</span>
          <span className="hero__title-accent">Nosotros Te Llevamos</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Boletos aéreos, hoteles, tours, cruceros y más.
          Te gestionamos tu viaje desde cualquier parte del mundo.
        </motion.p>

        {/* Search */}
        <motion.div
          className="hero__search"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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

        {/* Actions */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <MagneticButton
            href="https://wa.me/18298740109?text=Hola!%20Quiero%20ver%20las%20ofertas%20de%20vuelos."
            className="btn-primary"
            target="_blank"
          >
            Ver Ofertas de Vuelos
          </MagneticButton>
          <MagneticButton href="#destinos" className="btn-ghost btn-ghost--light">
            Explorar Destinos
          </MagneticButton>
        </motion.div>
      </div>

      {/* ===== FLOATING PRICE CARD ===== */}
      <motion.div
        className="hero__price-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="pcard__label">Oferta de la Semana</div>
        <div className="pcard__route">SDQ → JFK</div>
        <div className="pcard__city">Nueva York</div>
        <div className="pcard__price">Desde RD$28,000</div>
        <div className="pcard__note">Ida y vuelta · Reserva con RD$2,000</div>
        <MagneticButton
          href="https://wa.me/18298740109?text=Hola!%20Me%20interesa%20el%20vuelo%20SDQ%20→%20JFK%20por%20RD%2428%2C000"
          className="pcard__cta"
          target="_blank"
        >
          Reservar →
        </MagneticButton>
      </motion.div>

      {/* ===== TRUST STATS BAR ===== */}
      <motion.div
        className="hero__stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        {stats.map((stat, i) => (
          <div key={i} className="hero__stat">
            <span className="hero__stat-value">{stat.value}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="hero__scroll-arrow"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
