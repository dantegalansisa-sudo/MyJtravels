import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import './Navbar.css';

const links = [
  { label: 'Inicio', href: '#' },
  { label: 'Destinos', href: '#destinos' },
  { label: 'Vuelos', href: '#vuelos' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner section-container">
        <a href="#" className="navbar__brand">
          <img src="/imagenes/logo.png" alt="M&J Travels" className="navbar__logo" />
          <span className="navbar__name">M&J Travels</span>
        </a>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="navbar__link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <MagneticButton
            href="https://wa.me/18298740109?text=Hola%20M%26J%20Travels!%20Quiero%20reservar."
            className="navbar__cta"
            target="_blank"
          >
            Reservar Ahora
          </MagneticButton>
        </div>

        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
