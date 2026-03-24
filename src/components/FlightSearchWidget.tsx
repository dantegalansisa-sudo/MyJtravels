import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FlightSearchWidget.css';

type TripType = 'roundtrip' | 'oneway' | 'multi';
interface Leg { origin: string; destination: string; date: string }

const popularRoutes = [
  { from: 'Santo Domingo', to: 'New York (JFK)', label: 'SDQ → JFK' },
  { from: 'Santo Domingo', to: 'Miami (MIA)', label: 'SDQ → MIA' },
  { from: 'Santiago', to: 'New York (JFK)', label: 'STI → JFK' },
  { from: 'Punta Cana', to: 'Miami (MIA)', label: 'PUJ → MIA' },
  { from: 'Santo Domingo', to: 'Bogotá (BOG)', label: 'SDQ → BOG' },
];

export default function FlightSearchWidget() {
  const [tripType, setTripType] = useState<TripType>('roundtrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [businessClass, setBusinessClass] = useState(false);
  const [includeBaggage, setIncludeBaggage] = useState(false);
  const [flexDates, setFlexDates] = useState(false);
  const [showPax, setShowPax] = useState(false);
  const [legs, setLegs] = useState<Leg[]>([{ origin: '', destination: '', date: '' }]);
  const [swapped, setSwapped] = useState(false);
  const paxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) setShowPax(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const swap = () => { setOrigin(destination); setDestination(origin); setSwapped(!swapped); };

  const updateLeg = (i: number, field: keyof Leg, val: string) => {
    setLegs(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  };
  const addLeg = () => { if (legs.length < 4) setLegs([...legs, { origin: '', destination: '', date: '' }]); };
  const removeLeg = (i: number) => { if (legs.length > 1) setLegs(legs.filter((_, idx) => idx !== i)); };

  const paxText = () => {
    const parts: string[] = [];
    parts.push(`${adults} Adulto${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Niño${children > 1 ? 's' : ''}`);
    if (babies > 0) parts.push(`${babies} Bebé${babies > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const search = () => {
    let msg = `✈️ *SOLICITUD DE COTIZACIÓN — M&J Travels*\n\n`;
    msg += `📋 *Tipo de viaje:* ${tripType === 'roundtrip' ? 'Ida y Vuelta' : tripType === 'oneway' ? 'Solo Ida' : 'Multi-trayecto'}\n`;

    if (tripType !== 'multi') {
      if (origin) msg += `🛫 *Origen:* ${origin}\n`;
      if (destination) msg += `🛬 *Destino:* ${destination}\n`;
      if (departDate) msg += `📅 *Fecha de ida:* ${departDate}\n`;
      if (tripType === 'roundtrip' && returnDate) msg += `📅 *Fecha de vuelta:* ${returnDate}\n`;
    } else {
      legs.forEach((l, i) => {
        if (l.origin || l.destination) {
          msg += `\n🔹 *Trayecto ${i + 1}:* ${l.origin || '—'} → ${l.destination || '—'} | ${l.date || 'Sin fecha'}\n`;
        }
      });
    }

    msg += `\n👥 *Pasajeros:* ${paxText()}`;
    if (businessClass) msg += `\n💼 *Clase:* Business`;
    if (includeBaggage) msg += `\n🧳 *Incluir maleta:* Sí`;
    if (flexDates) msg += `\n📅 *Fechas flexibles:* Sí`;
    msg += `\n\n_Enviado desde myjtravels.com_`;

    window.open(`https://wa.me/18298740109?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const fillRoute = (from: string, to: string) => {
    setOrigin(from);
    setDestination(to);
    if (tripType === 'multi') setTripType('roundtrip');
  };

  const tabs: { key: TripType; label: string }[] = [
    { key: 'roundtrip', label: '✈ Ida y Vuelta' },
    { key: 'oneway', label: '→ Solo Ida' },
    { key: 'multi', label: '⇄ Multi-trayecto' },
  ];

  return (
    <motion.div
      className="flight-widget"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      {/* Tabs */}
      <div className="trip-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`trip-tab${tripType === t.key ? ' active' : ''}`}
            onClick={() => setTripType(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <AnimatePresence mode="wait">
        {tripType !== 'multi' ? (
          <motion.div key="standard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {/* Main row — single line on desktop */}
            <div className="widget-main-row">
              <div className="widget-field widget-field--grow">
                <label className="widget-input-label">Origen</label>
                <input className="widget-input" placeholder="Ciudad o aeropuerto" value={origin} onChange={e => setOrigin(e.target.value)} />
              </div>
              <button
                className="swap-btn"
                onClick={swap}
                style={{ transform: swapped ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-label="Intercambiar"
              >⇄</button>
              <div className="widget-field widget-field--grow">
                <label className="widget-input-label">Destino</label>
                <input className="widget-input" placeholder="Ciudad o aeropuerto" value={destination} onChange={e => setDestination(e.target.value)} />
              </div>
              <div className="widget-field">
                <label className="widget-input-label">Ida</label>
                <input className="widget-input widget-input--date" type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} />
              </div>
              <AnimatePresence>
                {tripType === 'roundtrip' && (
                  <motion.div
                    className="widget-field"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <label className="widget-input-label">Vuelta</label>
                    <input className="widget-input widget-input--date" type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Passengers inline */}
              <div className="pax-wrapper" ref={paxRef}>
                <label className="widget-input-label">Pasajeros</label>
                <button className="widget-input pax-trigger" onClick={() => setShowPax(!showPax)}>
                  {paxText()}
                  <span className="pax-arrow">▾</span>
                </button>
                <AnimatePresence>
                  {showPax && (
                    <motion.div className="pax-dropdown" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                      <PaxRow label="Adultos" sub="12+ años" value={adults} min={1} max={9} onChange={setAdults} />
                      <PaxRow label="Niños" sub="2-11 años" value={children} min={0} max={6} onChange={setChildren} />
                      <PaxRow label="Bebés" sub="0-1 año" value={babies} min={0} max={4} onChange={setBabies} />
                      <button className="pax-confirm" onClick={() => setShowPax(false)}>Confirmar</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="multi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <AnimatePresence>
              {legs.map((leg, i) => (
                <motion.div className="widget-row widget-row--multi" key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  <div className="widget-field widget-field--grow">
                    <label className="widget-input-label">Origen {i + 1}</label>
                    <input className="widget-input" placeholder="Ciudad" value={leg.origin} onChange={e => updateLeg(i, 'origin', e.target.value)} />
                  </div>
                  <div className="widget-field widget-field--grow">
                    <label className="widget-input-label">Destino {i + 1}</label>
                    <input className="widget-input" placeholder="Ciudad" value={leg.destination} onChange={e => updateLeg(i, 'destination', e.target.value)} />
                  </div>
                  <div className="widget-field">
                    <label className="widget-input-label">Fecha</label>
                    <input className="widget-input widget-input--date" type="date" value={leg.date} onChange={e => updateLeg(i, 'date', e.target.value)} />
                  </div>
                  {legs.length > 1 && (
                    <button className="remove-leg-btn" onClick={() => removeLeg(i)} aria-label="Eliminar trayecto">✕</button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {legs.length < 4 && (
              <button className="add-leg-btn" onClick={addLeg}>+ Agregar trayecto</button>
            )}
            {/* Passengers for multi */}
            <div className="widget-row">
              <div className="pax-wrapper pax-wrapper--multi" ref={paxRef}>
                <label className="widget-input-label">Pasajeros</label>
                <button className="widget-input pax-trigger" onClick={() => setShowPax(!showPax)}>
                  {paxText()} <span className="pax-arrow">▾</span>
                </button>
                <AnimatePresence>
                  {showPax && (
                    <motion.div className="pax-dropdown" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                      <PaxRow label="Adultos" sub="12+ años" value={adults} min={1} max={9} onChange={setAdults} />
                      <PaxRow label="Niños" sub="2-11 años" value={children} min={0} max={6} onChange={setChildren} />
                      <PaxRow label="Bebés" sub="0-1 año" value={babies} min={0} max={4} onChange={setBabies} />
                      <button className="pax-confirm" onClick={() => setShowPax(false)}>Confirmar</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options + CTA row */}
      <div className="widget-bottom">
        <div className="widget-checks">
          <Checkbox checked={businessClass} onChange={setBusinessClass} label="Business Class" />
          <Checkbox checked={includeBaggage} onChange={setIncludeBaggage} label="Incluir Maleta" />
          <Checkbox checked={flexDates} onChange={setFlexDates} label="Fechas Flexibles" />
        </div>
        <button className="search-btn" onClick={search}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Cotizar por WhatsApp
        </button>
      </div>

      {/* Popular routes */}
      <div className="popular-routes">
        <span className="popular-routes__label">Popular:</span>
        {popularRoutes.map(r => (
          <button key={r.label} className="popular-routes__pill" onClick={() => fillRoute(r.from, r.to)}>
            {r.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function PaxRow({ label, sub, value, min, max, onChange }: { label: string; sub: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="pax-row">
      <div>
        <div className="pax-label">{label}</div>
        <div className="pax-sublabel">{sub}</div>
      </div>
      <div className="pax-controls">
        <button className="pax-btn" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <span className="pax-count">{value}</span>
        <button className="pax-btn" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="widget-checkbox">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="checkbox-custom" />
      <span className="checkbox-label">{label}</span>
    </label>
  );
}
