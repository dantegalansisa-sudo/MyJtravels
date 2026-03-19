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
  { value: '5,000+', label: 'Clientes' },
  { value: '15+', label: 'Destinos' },
  { value: '10 Años', label: 'Experiencia' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedDest, setSelectedDest] = useState('');

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const whatsappMessage = selectedDest
    ? `Hola M&J Travels! Quiero cotizar un vuelo a ${selectedDest}.`
    : 'Hola M&J Travels! Quiero cotizar un vuelo.';

  const whatsappUrl = `https://wa.me/18298740109?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="hero" ref={heroRef} id="inicio">
      {/* ===== BACKGROUND IMAGE ===== */}
      <motion.div className="hero__bg-image" style={{ y: imgY }}>
        <img
          src="/newimagenportada/turismo.jpg"
          alt="Turista feliz con pasaporte y monumentos del mundo"
          loading="eager"
        />
      </motion.div>

      {/* Subtle gradient — only at bottom and top edges */}
      <div className="hero__overlay" />

      {/* ===== BOTTOM CONTENT PANEL ===== */}
      <div className="hero__bottom">
        <div className="hero__bottom-inner section-container">
          {/* Left — Text & CTA */}
          <div className="hero__text">
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img src="/imagenes/logo.png" alt="M&J Travels" className="hero__logo" />
              <span>Agencia Registrada · CESDN</span>
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tu viaje perfecto,{' '}
              <span className="hero__title-accent">a un click de distancia</span>
            </motion.h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Vuelos, hoteles, tours y cruceros desde cualquier parte del mundo.
            </motion.p>

            {/* Search inline */}
            <motion.div
              className="hero__search"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
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
          </div>

          {/* Right — Stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== FLOATING OFFER — top right, small ===== */}
      <motion.div
        className="hero__offer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <div className="hero__offer-label">Oferta</div>
        <div className="hero__offer-route">SDQ → JFK</div>
        <div className="hero__offer-price">RD$28,000</div>
        <MagneticButton
          href="https://wa.me/18298740109?text=Hola!%20Me%20interesa%20el%20vuelo%20SDQ%20→%20JFK%20por%20RD%2428%2C000"
          className="hero__offer-cta"
          target="_blank"
        >
          Reservar
        </MagneticButton>
      </motion.div>
    </section>
  );
}
