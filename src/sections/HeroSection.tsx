import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import './HeroSection.css';

const destinations = [
  'Nueva York',
  'Miami',
  'Boston',
  'Medellín',
  'Bogotá',
  'Madrid',
  'Curazao',
  'Punta Cana',
  'Cartagena',
  'Costa Rica',
  'Cancún',
  'San Juan PR',
  'Lima / Perú',
  'Chile',
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedDest, setSelectedDest] = useState('');

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const shapeY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const whatsappMessage = selectedDest
    ? `Hola M&J Travels! Quiero cotizar un vuelo a ${selectedDest}.`
    : 'Hola M&J Travels! Quiero cotizar un vuelo.';

  const whatsappUrl = `https://wa.me/18298740109?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="hero" ref={heroRef}>
      {/* Background — soft gradient shapes */}
      <div className="hero__bg">
        <motion.div className="hero__bg-shape hero__bg-shape--1" style={{ y: shapeY }} />
        <motion.div className="hero__bg-shape hero__bg-shape--2" style={{ y: shapeY }} />
        <motion.div className="hero__bg-shape hero__bg-shape--3" style={{ y: shapeY }} />
      </div>

      {/* Particles — subtle dots */}
      <div className="hero__particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="hero__particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated plane — navy */}
      <motion.div
        className="hero__plane"
        initial={{ x: '-15vw', y: '15vh', opacity: 0 }}
        animate={{ x: '110vw', y: '-5vh', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 8, delay: 1.5, repeat: Infinity, repeatDelay: 12 }}
      >
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      </motion.div>

      {/* Two-column layout */}
      <div className="hero__grid section-container">
        {/* LEFT — Text content */}
        <div className="hero__left">
          {/* Logo + Badge */}
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src="/imagenes/logo.png" alt="M&J Travels" className="hero__logo" />
            <span>Agencia Registrada · Miembro CESDN</span>
          </motion.div>

          <RevealText tag="h1" className="hero__title" delay={0.3}>
            El Mundo Está<br />
            <span>A Tu Alcance</span>
          </RevealText>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Expertos en vuelos baratos. Boletos aéreos, hoteles, tours,
            cruceros y más. Desde Santo Domingo hacia cualquier destino.
          </motion.p>

          {/* Search */}
          <motion.div
            className="hero__search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
            transition={{ duration: 0.6, delay: 1 }}
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
        </div>

        {/* RIGHT — Image + Floating card */}
        <div className="hero__right">
          <motion.div
            className="hero__image"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=85"
              alt="Avión en vuelo"
              loading="eager"
            />
          </motion.div>

          {/* Floating price card */}
          <motion.div
            className="hero__price-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
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
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span>Explora</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
