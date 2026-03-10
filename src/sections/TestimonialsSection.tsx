import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import { staggerChildren, fadeInUp } from '../utils/easings';
import './TestimonialsSection.css';

const testimonials = [
  {
    name: 'Carmen Rodríguez',
    location: 'Villa Mella, SDN',
    destination: 'Voló a Miami',
    text: 'M&J me consiguió el vuelo más barato que encontré. El proceso fue súper fácil por WhatsApp y me ayudaron con todo. ¡Ya reservé mi segundo viaje con ellos!',
    rating: 5,
    avatar: '👩🏽',
  },
  {
    name: 'Ramón García',
    location: 'Santo Domingo',
    destination: 'Viajó a Medellín',
    text: 'Bloquée mi boleto con solo RD$2,000 y pagué el resto después. Excelente servicio, muy profesionales. Mi familia quedó encantada con el viaje.',
    rating: 5,
    avatar: '👨🏽',
  },
  {
    name: 'Yolanda Mercedes',
    location: 'Santo Domingo Norte',
    destination: 'Paquete Punta Cana',
    text: 'Llevé a mis hijos a Punta Cana con el paquete que me recomendaron. Todo perfecto, hotel hermoso y el precio fue increíble. 100% recomendada.',
    rating: 5,
    avatar: '👩🏾',
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="testimonials" ref={ref}>
      <div className="section-container">
        <span className="section-eyebrow">Testimonios</span>
        <RevealText tag="h2" className="section-title">
          Lo Que Dicen Nuestros Viajeros
        </RevealText>
        <p className="section-subtitle">
          La confianza de nuestros clientes es nuestro mayor orgullo.
        </p>

        <motion.div
          className="testimonials__grid"
          variants={staggerChildren(0.12)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((t) => (
            <motion.div className="testimonial-card" key={t.name} variants={fadeInUp}>
              <div className="testimonial-card__stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <span className="testimonial-card__avatar">{t.avatar}</span>
                <div>
                  <strong className="testimonial-card__name">{t.name}</strong>
                  <span className="testimonial-card__location">{t.location}</span>
                </div>
              </div>
              <span className="testimonial-card__dest">{t.destination}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
