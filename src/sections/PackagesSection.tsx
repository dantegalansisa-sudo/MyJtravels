import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { fadeInUp } from '../utils/easings';
import './PackagesSection.css';

const packages = [
  {
    name: 'Marien Puerto Plata',
    category: 'Deluxe Garden',
    dates: '02 – 04 Mayo 2026',
    nights: 2,
    pricing: [
      { type: 'SGL', price: 'DOP 8,220' },
      { type: 'DBL', price: 'DOP 6,000' },
      { type: 'TPL', price: 'DOP 5,880' },
    ],
    kids: 'Niños 7-12 años: DOP 2,100',
    note: 'Precios P/P por noche. Disponibilidad sujeta a cambio.',
    image: '/imagenes/Marien Puerto Plata.jpg',
    tag: 'Próximamente',
    whatsapp: 'https://wa.me/18298740109?text=Hola!%20Me%20interesa%20el%20paquete%20Marien%20Puerto%20Plata.',
  },
  {
    name: 'Nickelodeon Punta Cana',
    category: 'Resort Familiar',
    dates: '23 Ago – 31 Oct',
    nights: 2,
    pricing: [
      { type: '2 Adultos + 1 Niño (3-12)', price: 'RD$52,164' },
    ],
    kids: 'Niños 3-12 años incluidos',
    note: 'Por 2 noches. Disponibilidad limitada.',
    image: '/imagenes/Nickelodeon Hotel Punta Cana.jpg',
    tag: '¡Familiar!',
    whatsapp: 'https://wa.me/18298740109?text=Hola!%20Me%20interesa%20el%20paquete%20Nickelodeon%20Punta%20Cana.',
  },
];

export default function PackagesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="packages" id="paquetes" ref={ref}>
      <div className="section-container">
        <span className="section-eyebrow">Paquetes Todo Incluido</span>
        <RevealText tag="h2" className="section-title">
          Escápate A Los Mejores Resorts
        </RevealText>
        <p className="section-subtitle">
          Paquetes nacionales con todo incluido. Reserva tu lugar ahora.
        </p>

        <div className="packages__list">
          {packages.map((pkg) => (
            <motion.div
              className="pkg-card"
              key={pkg.name}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="pkg-card__image">
                <img src={pkg.image} alt={pkg.name} loading="lazy" />
                {pkg.tag && <span className="pkg-card__tag">{pkg.tag}</span>}
              </div>
              <div className="pkg-card__body">
                <span className="pkg-card__category">{pkg.category}</span>
                <h3 className="pkg-card__name">{pkg.name}</h3>
                <div className="pkg-card__meta">
                  <span>📅 {pkg.dates}</span>
                  <span>🌙 {pkg.nights} noches</span>
                </div>
                <div className="pkg-card__pricing">
                  {pkg.pricing.map((p) => (
                    <div className="pkg-card__price-row" key={p.type}>
                      <span className="pkg-card__type">{p.type}</span>
                      <span className="pkg-card__price">{p.price}</span>
                    </div>
                  ))}
                </div>
                <p className="pkg-card__kids">{pkg.kids}</p>
                <p className="pkg-card__note">{pkg.note}</p>
                <MagneticButton
                  href={pkg.whatsapp}
                  className="btn-primary"
                  target="_blank"
                >
                  Reservar por WhatsApp
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
