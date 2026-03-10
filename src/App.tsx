import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import HeroSection from './sections/HeroSection';
import TrustBarSection from './sections/TrustBarSection';
import DestinationsSection from './sections/DestinationsSection';
import FlightOffersSection from './sections/FlightOffersSection';
import ServicesSection from './sections/ServicesSection';
import PackagesSection from './sections/PackagesSection';
import WhyUsSection from './sections/WhyUsSection';
import TeamSection from './sections/TeamSection';
import StatsSection from './sections/StatsSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <TrustBarSection />
      <DestinationsSection />
      <FlightOffersSection />
      <ServicesSection />
      <PackagesSection />
      <WhyUsSection />
      <TeamSection />
      <StatsSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
      <WhatsAppButton />
    </>
  );
}

export default App;
