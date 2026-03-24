import { motion } from 'framer-motion';
import FlightSearchWidget from '../components/FlightSearchWidget';
import './HeroSection.css';

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
        {/* Badge */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img src="/imagenes/logo.png" alt="M&J Travels" className="hero__badge-logo" />
          <span>Agencia Registrada · CESDN</span>
        </motion.div>

        {/* Headline — 1 línea compacta */}
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Cotiza Tu Vuelo <span className="hero__title-accent">Al Mejor Precio</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Vuelos, hoteles, paquetes y cruceros desde República Dominicana al mundo.
        </motion.p>

        {/* Flight Search Widget — protagonista */}
        <FlightSearchWidget />

        {/* Trust micro-copy */}
        <motion.div
          className="hero__trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="hero__trust-item">✓ Respuesta en menos de 5 min</span>
          <span className="hero__trust-sep">·</span>
          <span className="hero__trust-item">✓ Más de 5,000 familias confían en nosotros</span>
          <span className="hero__trust-sep">·</span>
          <span className="hero__trust-item">✓ 10 años de experiencia</span>
        </motion.div>
      </div>
    </section>
  );
}
