import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { staggerChildren, fadeInUp } from '../utils/easings';
import './FlightOffersSection.css';

const flights = [
  { from: 'SDQ', to: 'JFK', city: 'Nueva York', price: 'RD$28,000', country: 'US' },
  { from: 'SDQ', to: 'MIA', city: 'Miami', price: 'RD$18,000', country: 'US' },
  { from: 'SDQ', to: 'BOS', city: 'Boston', price: 'RD$19,000', country: 'US' },
  { from: 'SDQ', to: 'SJU', city: 'San Juan PR', price: 'RD$13,000', country: 'PR' },
  { from: 'SDQ', to: 'MDE', city: 'Medellín', price: 'RD$19,000', country: 'CO' },
  { from: 'SDQ', to: 'BOG', city: 'Bogotá', price: 'RD$24,000', country: 'CO' },
  { from: 'SDQ', to: 'CUR', city: 'Curazao', price: 'RD$14,000', country: 'CW' },
  { from: 'SDQ', to: 'CTG', city: 'Cartagena', price: 'RD$19,000', country: 'CO' },
  { from: 'SDQ', to: 'LIM', city: 'Lima', price: 'RD$23,000', country: 'PE' },
  { from: 'SDQ', to: 'SJO', city: 'Costa Rica', price: 'RD$20,000', country: 'CR' },
  { from: 'SDQ', to: 'CUN', city: 'Cancún', price: 'RD$25,000', country: 'MX' },
  { from: 'SDQ', to: 'MAD', city: 'Madrid', price: 'Consultar', country: 'ES' },
];

function FlagImg({ country }: { country: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
      alt={country}
      className="flight-row__flag-img"
      width={28}
      height={20}
      loading="lazy"
    />
  );
}

export default function FlightOffersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="flights" id="vuelos" ref={ref}>
      <div className="section-container">
        <span className="section-eyebrow">Vuelos</span>
        <RevealText tag="h2" className="section-title">
          Ofertas de Vuelos Ida y Vuelta
        </RevealText>
        <p className="section-subtitle">Todos los vuelos salen desde Santo Domingo (SDQ)</p>

        <motion.div
          className="flights__list"
          variants={staggerChildren(0.05)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {flights.map((f) => (
            <motion.div className="flight-row" key={f.to} variants={fadeInUp}>
              <span className="flight-row__flag">
                <FlagImg country={f.country} />
              </span>
              <span className="flight-row__codes">
                <span className="flight-row__code">{f.from}</span>
                <span className="flight-row__arrow">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M1 6h17M14 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="flight-row__code">{f.to}</span>
              </span>
              <span className="flight-row__city">{f.city}</span>
              <span className="flight-row__price">{f.price}</span>
              <MagneticButton
                href={`https://wa.me/18298740109?text=${encodeURIComponent(`Hola! Me interesa el vuelo SDQ → ${f.city} por ${f.price}`)}`}
                className="flight-row__cta"
                target="_blank"
              >
                Reservar
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        <p className="section-disclaimer">
          *Precios referenciales sujetos a disponibilidad. Ida y vuelta desde SDQ.
        </p>
      </div>
    </section>
  );
}
