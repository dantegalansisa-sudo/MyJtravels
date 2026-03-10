import MagneticButton from '../components/MagneticButton';
import './FooterSection.css';

const destLinks = [
  'Nueva York', 'Miami', 'Medellín', 'Bogotá', 'Madrid',
  'Curazao', 'Punta Cana', 'Costa Rica',
];

const serviceLinks = [
  'Boletos Aéreos', 'Hoteles', 'Tours', 'Cruceros',
  'Visa Americana', 'DS-160', 'Seguros',
];

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo-row">
              <img src="/imagenes/logo.png" alt="M&J Travels" className="footer__logo" />
            </div>
            <p className="footer__tagline">
              Tu agencia confiable — Haz de cada viaje una experiencia inolvidable.
            </p>
            <div className="footer__social">
              <MagneticButton
                href="https://instagram.com/myjtravelsrd"
                className="footer__social-link"
                target="_blank"
              >
                Instagram
              </MagneticButton>
              <MagneticButton
                href="https://wa.me/18298740109"
                className="footer__social-link"
                target="_blank"
              >
                WhatsApp
              </MagneticButton>
            </div>
          </div>

          {/* Destinations */}
          <div className="footer__col">
            <h4 className="footer__col-title">Destinos</h4>
            <ul className="footer__links">
              {destLinks.map((d) => (
                <li key={d}>
                  <a href={`https://wa.me/18298740109?text=${encodeURIComponent(`Hola! Me interesa volar a ${d}`)}`} target="_blank" rel="noopener noreferrer">{d}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Servicios</h4>
            <ul className="footer__links">
              {serviceLinks.map((s) => (
                <li key={s}><a href="#servicios">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <ul className="footer__links">
              <li><a href="https://wa.me/18298740109" target="_blank" rel="noopener noreferrer">829-874-0109</a></li>
              <li><a href="https://wa.me/18296697762" target="_blank" rel="noopener noreferrer">829-669-7762</a></li>
              <li><a href="mailto:mjtravel.srl@hotmail.com">mjtravel.srl@hotmail.com</a></li>
              <li><span>Plaza Concordia, Villa Mella, SDN</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__cesdn">
          Agencia registrada. Miembro del Consejo Empresarial de Santo Domingo Norte (CESDN).
        </div>

        <div className="footer__bottom">
          <span>&copy; 2025 M&J Travels SRL. Todos los derechos reservados.</span>
          <span>Diseñado por <a href="https://instagram.com/nexixtech" target="_blank" rel="noopener noreferrer">NEXIX Tech Studio</a></span>
        </div>
      </div>
    </footer>
  );
}
