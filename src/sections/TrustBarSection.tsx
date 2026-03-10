import './TrustBarSection.css';

const items = [
  { icon: '✈️', text: 'Vuelos Baratos Garantizados' },
  { icon: '🏆', text: 'Agencia Registrada' },
  { icon: '🔒', text: 'Reserva con RD$2,000' },
  { icon: '🌍', text: '+15 Destinos Disponibles' },
  { icon: '⭐', text: '2,430 Seguidores Confían en Nosotros' },
];

export default function TrustBarSection() {
  const doubled = [...items, ...items];

  return (
    <section className="trustbar">
      <div className="trustbar__track">
        {doubled.map((item, i) => (
          <div className="trustbar__item" key={i}>
            <span className="trustbar__icon">{item.icon}</span>
            <span className="trustbar__text">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
