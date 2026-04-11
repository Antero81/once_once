import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { HomePage } from '@/features/home/HomePage';
import { AboutPage } from '@/features/about/AboutPage';
import { TravelPage } from '@/features/travel/TravelPage';
import { StudioPage } from '@/features/studio/StudioPage';
import { CorporatePage } from '@/features/corporate/CorporatePage';
import { HubsPage } from '@/features/hubs/HubsPage';
import { ContactPage } from '@/features/contact/ContactPage';
import { ExperiencePage } from '@/features/experiences/ExperiencePage';

export default function App() {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
      <BrowserRouter basename="/once_once/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/hubs" element={<HubsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:slug" element={<ExperiencePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}