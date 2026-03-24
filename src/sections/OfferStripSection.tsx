import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './OfferStripSection.css';

const offers = [
  { route: 'Nueva York', code: 'JFK', price: 'RD$28,000', flag: '🇺🇸', tag: 'Más Popular' },
  { route: 'Miami', code: 'MIA', price: 'RD$18,000', flag: '🇺🇸', tag: 'Oferta' },
  { route: 'Medellín', code: 'MDE', price: 'RD$19,000', flag: '🇨🇴', tag: null },
  { route: 'Curazao', code: 'CUR', price: 'RD$14,000', flag: '🇨🇼', tag: '¡Más Barato!' },
  { route: 'Bogotá', code: 'BOG', price: 'RD$24,000', flag: '🇨🇴', tag: null },
];

export default function OfferStripSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="offer-strip" ref={ref}>
      <div className="section-container">
        <div className="offer-strip__header">
          <div className="offer-strip__header-left">
            <span className="offer-strip__icon">✈</span>
            <div>
              <span className="offer-strip__label">Ofertas de la Semana</span>
              <span className="offer-strip__sub">Ida y vuelta desde Santo Domingo</span>
            </div>
          </div>
          <a
            className="offer-strip__view-all"
            href="https://wa.me/18298740109?text=Hola!%20Quiero%20ver%20todas%20las%20ofertas%20de%20vuelos."
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todas →
          </a>
        </div>

        <div className="offer-strip__grid">
          {offers.map((o, i) => (
            <motion.a
              key={o.code}
              className="offer-strip__card"
              href={`https://wa.me/18298740109?text=${encodeURIComponent(`Hola! Me interesa un vuelo a ${o.route} por ${o.price}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {o.tag && <span className="offer-strip__tag">{o.tag}</span>}
              <div className="offer-strip__card-top">
                <span className="offer-strip__flag">{o.flag}</span>
                <div className="offer-strip__route-info">
                  <span className="offer-strip__route">{o.route}</span>
                  <span className="offer-strip__code">SDQ → {o.code}</span>
                </div>
              </div>
              <div className="offer-strip__card-bottom">
                <span className="offer-strip__price">Desde <strong>{o.price}</strong></span>
                <span className="offer-strip__cta">Cotizar →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
