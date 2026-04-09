import { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';
import '../components/AdminComponents.css';

const weeklyOffers = [
  { route: 'Nueva York', code: 'JFK', price: 'RD$28,000', tag: 'Más Popular', order: 0, active: true },
  { route: 'Miami', code: 'MIA', price: 'RD$18,000', tag: 'Oferta', order: 1, active: true },
  { route: 'Medellín', code: 'MDE', price: 'RD$19,000', tag: null, order: 2, active: true },
  { route: 'Curazao', code: 'CUR', price: 'RD$14,000', tag: '¡Más Barato!', order: 3, active: true },
  { route: 'Bogotá', code: 'BOG', price: 'RD$24,000', tag: null, order: 4, active: true },
];

const flights = [
  { city: 'Nueva York', to: 'JFK', price: 'RD$28,000', country: 'US', order: 0, active: true },
  { city: 'Miami', to: 'MIA', price: 'RD$18,000', country: 'US', order: 1, active: true },
  { city: 'Orlando', to: 'MCO', price: 'RD$22,000', country: 'US', order: 2, active: true },
  { city: 'Boston', to: 'BOS', price: 'RD$32,000', country: 'US', order: 3, active: true },
  { city: 'Medellín', to: 'MDE', price: 'RD$19,000', country: 'CO', order: 4, active: true },
  { city: 'Bogotá', to: 'BOG', price: 'RD$24,000', country: 'CO', order: 5, active: true },
  { city: 'Madrid', to: 'MAD', price: 'Consultar', country: 'ES', order: 6, active: true },
  { city: 'Curazao', to: 'CUR', price: 'RD$14,000', country: 'CW', order: 7, active: true },
  { city: 'Cartagena', to: 'CTG', price: 'RD$19,000', country: 'CO', order: 8, active: true },
  { city: 'Costa Rica', to: 'SJO', price: 'RD$20,000', country: 'CR', order: 9, active: true },
  { city: 'Cancún', to: 'CUN', price: 'RD$25,000', country: 'MX', order: 10, active: true },
  { city: 'San Juan PR', to: 'SJU', price: 'RD$13,000', country: 'PR', order: 11, active: true },
];

const seedCollections: { name: string; data: Record<string, unknown>[] }[] = [
  { name: 'weeklyOffers', data: weeklyOffers },
  { name: 'flights', data: flights },
];

export default function SeedData() {
  const [seeding, setSeeding] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const seedAll = async () => {
    setSeeding(true);
    setResults([]);
    const log: string[] = [];

    for (const { name, data } of seedCollections) {
      const snap = await getDocs(collection(db, name));
      if (snap.size > 0) {
        log.push(`⏭️ ${name}: ya tiene ${snap.size} docs, saltado`);
        continue;
      }
      for (const item of data) {
        await addDoc(collection(db, name), item);
      }
      log.push(`✅ ${name}: ${data.length} documentos creados`);
    }

    setResults(log);
    setSeeding(false);
    toast.success('Seed completado');
  };

  return (
    <div>
      <div className="admin-page__header">
        <h1 className="admin-page__title">Seed Data</h1>
        <p className="admin-page__sub">Migrar datos hardcoded a Firestore (solo ejecutar una vez)</p>
      </div>

      <button className="adm-btn adm-btn--primary" onClick={seedAll} disabled={seeding}>
        {seeding ? 'Sembrando datos...' : 'Sembrar Datos a Firestore'}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: 24 }}>
          {results.map((r, i) => (
            <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>{r}</p>
          ))}
        </div>
      )}
    </div>
  );
}
