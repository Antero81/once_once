import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { HomePage } from '@/features/home/HomePage';

const AboutPage = lazy(() => import('@/features/about/AboutPage').then(m => ({ default: m.AboutPage })));
const TravelPage = lazy(() => import('@/features/travel/TravelPage').then(m => ({ default: m.TravelPage })));
const StudioPage = lazy(() => import('@/features/studio/StudioPage').then(m => ({ default: m.StudioPage })));
const CorporatePage = lazy(() => import('@/features/corporate/CorporatePage').then(m => ({ default: m.CorporatePage })));
const HubsPage = lazy(() => import('@/features/hubs/HubsPage').then(m => ({ default: m.HubsPage })));
const ContactPage = lazy(() => import('@/features/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const ExperiencePage = lazy(() => import('@/features/experiences/ExperiencePage').then(m => ({ default: m.ExperiencePage })));

const LoadingFallback = () => <div className="min-h-screen bg-[#0a0a0a]" />;

export default function App() {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
      <BrowserRouter basename="/once_once/">
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}