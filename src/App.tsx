import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import AboutUs from './pages/AboutUs';
import Workshops from './pages/Workshops';
import Services from './pages/Services';
import BlogDisplay from './pages/BlogDisplay';
import AdminPage from './pages/AdminPage';
import CTASection from './components/CTASection';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './ScrollToTop';
import Webinars from './pages/Webinars';
import Wapt from './pages/Wapt';
import ApiPentest from './pages/ApiPentest'
import NetworkPentest from './pages/NetworkPentest'
import MobileAppVapt from './pages/MobileAppVapt'
import ADVapt from './pages/ADVapt'
import PhyscialSecurity from './pages/PhyscialSecurity'
import Whychooseus from './pages/Whychooseus';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="pt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/corporate/about-us" element={<AboutUs />} />
          <Route path="/training/workshops" element={<Workshops />} />
          <Route path="/corporate/blogs" element={<BlogDisplay />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/training/webinars" element={<Webinars />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/services/web-application-penetration-testing" element={<Wapt />} />
          <Route path="/services/api-penetration-testing" element={<ApiPentest />} />
          <Route path="/services/network-penetration-testing" element={<NetworkPentest />} />
          <Route path="/services/mobile-application-penetration-testing" element={<MobileAppVapt />} />
          <Route path="/services/active-directory-penetration-testing" element={<ADVapt />} />
          <Route path="/services/physical-security-testing" element={<PhyscialSecurity />} />
          <Route path="/corporate/why-cubeesec" element={<Whychooseus />} />
        </Routes>
      </main>
      {location.pathname !== '/contact-us' && <CTASection />}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;