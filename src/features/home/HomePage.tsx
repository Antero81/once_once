import { assets } from '@/assets';
import { HeroV2 } from '@/components/HeroV2';
import { PhilosophyImage } from '@/components/PhilosophyImage';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { WhatWeDo } from './sections/WhatWeDo';
import { FeaturedJourneys } from './sections/FeaturedJourneys';
import { ForHotels } from './sections/ForHotels';

export const HomePage = () => {
  const { t } = useLanguage();

  const hotelProperties = [
    {
      name: 'MUSA',
      location: 'Valle de Guadalupe',
      image: assets.services.hubs,
    },
    {
      name: 'The Cape',
      location: 'Los Cabos',
      image: assets.services.experienceDesign,
    },
    {
      name: 'Los Cabos',
      location: 'Baja California Sur',
      image: '/once_once/assets/img/_BP_0583.jpeg',
    },
    {
      name: 'Esperanza',
      location: 'Los Cabos',
      image: '/once_once/assets/img/_BP_0415.jpeg',
    },
    {
      name: 'Chileno Bay',
      location: 'Los Cabos',
      image: '/once_once/assets/img/_DSC5490.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero Section */}
      <HeroV2
        tagline={t.hero.tagline}
        title={t.hero.title}
        description={t.hero.description}
        locations={t.hero.locations}
        cta={t.hero.cta}
      />

      {/* What We Do Section */}
      <WhatWeDo items={t.services.items} />

      {/* Featured Journeys */}
      <FeaturedJourneys
        title="Featured Journeys"
        ctaText="View All Journeys"
      />

      {/* For Hotels & Destinations */}
      <ForHotels
        title="For Hotels & Brands"
        subtitle="Experience Design"
        description="Adventure-driven concepts crafted for hotels and destinations, creating more meaningful ways for guests to connect with place."
        ctaText="Explore Services"
        properties={hotelProperties}
      />

      {/* Philosophy */}
      <section id="philosophy" className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div>
            <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-black">{t.philosophy.tagline}</h3>
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">{t.philosophy.title}</h2>
            <div className="w-24 h-1 bg-[#C5A059]"></div>
          </div>
          <div className="space-y-6 text-gray-400 text-xl font-light leading-relaxed">
            <p>{t.philosophy.p1}</p>
            <p>{t.philosophy.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
            <div>
              <h4 className="text-[#C5A059] text-[10px] uppercase font-bold mb-2 italic">{t.philosophy.visionLabel}</h4>
              <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-tighter">{t.philosophy.visionText}</p>
            </div>
            <div>
              <h4 className="text-[#C5A059] text-[10px] uppercase font-bold mb-2 italic">{t.philosophy.leaderLabel}</h4>
              <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-tighter">{t.philosophy.leaderText}</p>
            </div>
          </div>
        </div>
        <PhilosophyImage imageUrl={assets.philosophy.sideImage} quote={t.philosophy.quote} />
      </section>

      <Footer />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/525540100439"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        title="Chat on WhatsApp"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.98C18.44 1.9 15.54 0.85 12.54 0.85c-5.38 0-9.76 4.38-9.76 9.76 0 1.72.44 3.4 1.28 4.89L2.06 23.15l5.02-1.62c1.42.77 3.03 1.18 4.67 1.18h.01c5.38 0 9.76-4.38 9.76-9.76 0-2.61-.92-5.12-2.6-7.07zM12.54 20.92h-.01c-1.45 0-2.87-.39-4.1-1.11l-.29-.17-3.04.98.99-3.01-.2-.3c-.81-1.29-1.24-2.78-1.24-4.3 0-4.47 3.64-8.11 8.11-8.11 2.17 0 4.21.85 5.74 2.38 1.53 1.53 2.37 3.57 2.37 5.74 0 4.47-3.64 8.11-8.11 8.11zm4.4-6.07c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.45-.39-.39-.54-.39-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32 1 2.48.14.16 1.98 3.02 4.8 4.24.67.29 1.2.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.63-.67 1.86-1.31.24-.64.24-1.19.16-1.31-.08-.12-.24-.2-.48-.32z"/>
        </svg>
      </a>
    </div>
  );
};
