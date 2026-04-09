import { Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminPlaceholder from './admin/AdminPlaceholder';
import WeeklyOffersAdmin from './admin/pages/WeeklyOffersAdmin';
import FlightsAdmin from './admin/pages/FlightsAdmin';
import SeedData from './admin/pages/SeedData';
import ProtectedRoute from './admin/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<App />} />

      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin panel — protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="weekly-offers" element={<WeeklyOffersAdmin />} />
        <Route path="flights" element={<FlightsAdmin />} />
        <Route path="seed" element={<SeedData />} />
        <Route path="hotels-national" element={<AdminPlaceholder icon="🏨" title="Hoteles Nacional" />} />
        <Route path="hotels-intl" element={<AdminPlaceholder icon="🌍" title="Hoteles Internacional" />} />
        <Route path="packages" element={<AdminPlaceholder icon="🏖️" title="Paquetes / Resorts" />} />
        <Route path="destinations" element={<AdminPlaceholder icon="📍" title="Destinos" />} />
        <Route path="gallery" element={<AdminPlaceholder icon="📸" title="Galería" />} />
        <Route path="testimonials" element={<AdminPlaceholder icon="⭐" title="Testimonios" />} />
        <Route path="faqs" element={<AdminPlaceholder icon="❓" title="Preguntas Frecuentes" />} />
        <Route path="team" element={<AdminPlaceholder icon="👥" title="Equipo" />} />
        <Route path="services" element={<AdminPlaceholder icon="🛡️" title="Servicios" />} />
        <Route path="site-config" element={<AdminPlaceholder icon="⚙️" title="Configuración del Sitio" />} />
      </Route>
    </Routes>
  );
}
