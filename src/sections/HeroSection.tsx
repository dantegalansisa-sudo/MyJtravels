import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import './HeroSection.css';

const heroSlides = [
  {
    image: '/newimagenportada/new-york.webp',
    label: 'Nueva York',
  },
  {
    image: '/newimagenportada/miami.jpg',
    label: 'Miami',
  },
  {
    image: '/newimagenportada/times-square.webp',
    label: 'Times Square',
  },
  {
    image: '/newimagenportada/orlando.webp',
    label: 'Orlando',
  },
  {
    image: '/newimagenportada/hollywood.webp',
    label: 'Hollywood',
  },
  {
    image: '/newimagenportada/miami-spots.jpg',
    label: 'Miami Beach',
  },
  {
    image: '/newimagenportada/destino-01.jpg',
    label: 'Aventura',
  },
  {
    image: '/newimagenportada/destino-02.jpg',
    label: 'Paraíso',
  },
  {
    image: '/newimagenportada/destino-05.jpg',
    label: 'Explorar',
  },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Preload next image
  useEffect(() => {
    const nextIdx = (currentSlide + 1) % heroSlides.length;
    const img = new Image();
    img.src = heroSlides[nextIdx].image;
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const whatsappMessage = selectedDest
    ? `Hola M&J Travels! Quiero cotizar un vuelo a ${selectedDest}.`
    : 'Hola M&J Travels! Quiero cotizar un vuelo.';

  const whatsappUrl = `https://wa.me/18298740109?text=${encodeURIComponent(whatsappMessage)}`;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '8%' : '-8%',
      scale: 1.1,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: 1.05,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-8%' : '8%',
      scale: 1,
      opacity: 0,
    }),
  };

  return (
    <section className="hero" ref={heroRef} id="inicio">
      {/* ===== FULLSCREEN IMAGE SLIDER ===== */}
      <div className="hero__slider">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            className="hero__slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.8 },
              scale: { duration: 8, ease: 'linear' },
            }}
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].label}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark cinematic overlay */}
        <div className="hero__overlay" />
        <motion.div className="hero__overlay-scroll" style={{ opacity: overlayOpacity }} />
      </div>

      {/* ===== SLIDE INDICATORS ===== */}
      <div className="hero__indicators">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ===== CURRENT DESTINATION LABEL ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="hero__slide-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {heroSlides[currentSlide].label}
        </motion.div>
      </AnimatePresence>

      {/* ===== ANIMATED PLANE ===== */}
      <motion.div
        className="hero__plane"
        initial={{ x: '-15vw', y: '18vh', opacity: 0 }}
        animate={{ x: '110vw', y: '-5vh', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 8, delay: 1.5, repeat: Infinity, repeatDelay: 14 }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      </motion.div>

      {/* ===== HERO CONTENT ===== */}
      <div className="hero__content section-container">
        {/* Badge */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src="/imagenes/logo.png" alt="M&J Travels" className="hero__logo" />
          <span>Agencia Registrada · Miembro CESDN</span>
        </motion.div>

        {/* Title */}
        <RevealText tag="h1" className="hero__title" delay={0.3}>
          Tu Próximo Viaje<br />
          <span>Comienza Aquí</span>
        </RevealText>

        {/* Subtitle — updated messaging */}
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Boletos aéreos, hoteles, tours, cruceros y más.
          Te gestionamos tu viaje desde cualquier parte del mundo hacia el destino que sueñas.
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
          <MagneticButton href="#destinos" className="btn-ghost btn-ghost--light">
            Explorar Destinos
          </MagneticButton>
        </motion.div>
      </div>

      {/* ===== FLOATING PRICE CARD ===== */}
      <motion.div
        className="hero__price-card"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
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

      {/* ===== SCROLL INDICATOR ===== */}
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
