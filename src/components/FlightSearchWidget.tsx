import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FlightSearchWidget.css';

type TripType = 'roundtrip' | 'oneway' | 'multi';
interface Leg { origin: string; destination: string; date: string }

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
      transition={{ delay: 0.8, duration: 0.7 }}
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
            {/* Row 1: Origin / Destination */}
            <div className="widget-row">
              <div className="widget-field widget-field--grow">
                <label className="widget-input-label">Origen</label>
                <input
                  className="widget-input"
                  placeholder="Ciudad o aeropuerto"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                />
              </div>
              <button
                className="swap-btn"
                onClick={swap}
                style={{ transform: swapped ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-label="Intercambiar"
              >
                ⇄
              </button>
              <div className="widget-field widget-field--grow">
                <label className="widget-input-label">Destino</label>
                <input
                  className="widget-input"
                  placeholder="Ciudad o aeropuerto"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Dates */}
            <div className="widget-row">
              <div className="widget-field widget-field--grow">
                <label className="widget-input-label">Fecha de ida</label>
                <input
                  className="widget-input"
                  type="date"
                  value={departDate}
                  onChange={e => setDepartDate(e.target.value)}
                />
              </div>
              <AnimatePresence>
                {tripType === 'roundtrip' && (
                  <motion.div
                    className="widget-field widget-field--grow"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <label className="widget-input-label">Fecha de vuelta</label>
                    <input
                      className="widget-input"
                      type="date"
                      value={returnDate}
                      onChange={e => setReturnDate(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div key="multi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <AnimatePresence>
              {legs.map((leg, i) => (
                <motion.div
                  className="widget-row widget-row--multi"
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
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
                    <input className="widget-input" type="date" value={leg.date} onChange={e => updateLeg(i, 'date', e.target.value)} />
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options row */}
      <div className="widget-options">
        {/* Passengers */}
        <div className="pax-wrapper" ref={paxRef}>
          <div className="widget-field">
            <label className="widget-input-label">Pasajeros</label>
            <button className="widget-input pax-trigger" onClick={() => setShowPax(!showPax)}>
              👥 {paxText()}
              <span className="pax-arrow">▾</span>
            </button>
          </div>
          <AnimatePresence>
            {showPax && (
              <motion.div
                className="pax-dropdown"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <PaxRow label="Adultos" sub="12+ años" value={adults} min={1} max={9} onChange={setAdults} />
                <PaxRow label="Niños" sub="2-11 años" value={children} min={0} max={6} onChange={setChildren} />
                <PaxRow label="Bebés" sub="0-1 año" value={babies} min={0} max={4} onChange={setBabies} />
                <button className="pax-confirm" onClick={() => setShowPax(false)}>Confirmar</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Checkboxes */}
        <div className="widget-checks">
          <Checkbox checked={businessClass} onChange={setBusinessClass} label="Business Class" />
          <Checkbox checked={includeBaggage} onChange={setIncludeBaggage} label="Incluir Maleta" />
          <Checkbox checked={flexDates} onChange={setFlexDates} label="Fechas Flexibles" />
        </div>
      </div>

      {/* Search button */}
      <button className="search-btn" onClick={search}>
        🔍 Buscar Vuelos
      </button>
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
