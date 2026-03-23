import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import FlightSearchWidget from '../components/FlightSearchWidget';
import './HeroSection.css';

const stats = [
  { value: '5,000+', label: 'Clientes Felices' },
  { value: '15+', label: 'Destinos' },
  { value: '10 Años', label: 'Experiencia' },
];

export default function HeroSection() {
  return (
    <section className="hero" id="inicio">
      {/* Video de fondo */}
      <div className="hero__video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/imagenes/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero__video-overlay" />
      </div>

      <div className="hero__content section-container">
        {/* Top row: text left + offer card right */}
        <div className="hero__top">
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
          </div>

          {/* Offer card */}
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
        </div>

        {/* Flight Search Widget */}
        <FlightSearchWidget />

        {/* Stats */}
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
