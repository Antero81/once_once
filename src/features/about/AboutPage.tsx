import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { assets } from '@/assets';
import { motion } from 'motion/react';
import { useLanguage } from '@/hooks/useLanguage';

export const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center mt-20 overflow-hidden">
        <motion.div className="absolute inset-0">
          <img
            src={assets.hero.poster}
            alt="About hero"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#0a0a0a]" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-serif text-6xl md:text-8xl mb-8">ONCE ONCE</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            {t.about.hero.subtitle}
          </p>
          <p className="text-gray-400 leading-relaxed">
            {t.about.hero.description}
          </p>
        </div>
      </section>

      {/* Our World */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">{t.about.ourWorld.title}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{t.about.ourWorld.journeys.title}</h3>
            <p className="text-gray-400">{t.about.ourWorld.journeys.desc}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{t.about.ourWorld.experiences.title}</h3>
            <p className="text-gray-400">{t.about.ourWorld.experiences.desc}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{t.about.ourWorld.hubs.title}</h3>
            <p className="text-gray-400">{t.about.ourWorld.hubs.desc}</p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#0f0f0f]">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">{t.about.founder.sectionTitle}</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="/once_once/assets/img/DSC04801.png"
            alt="Lorena Dromundo"
            loading="lazy"
            className="w-full rounded-lg"
          />
          <div className="space-y-8">
            <h3 className="font-serif text-4xl">Lorena Dromundo</h3>
            <p className="text-gray-400 leading-relaxed">
              {t.about.founder.p1}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t.about.founder.p2}
            </p>
            <blockquote className="border-l-2 border-[#C5A059] pl-6 italic text-gray-300">
              "{t.about.founder.quote}"
            </blockquote>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-[#C5A059] font-bold text-sm mb-2">{t.about.founder.badge1}</p>
              </div>
              <div>
                <p className="text-[#C5A059] font-bold text-sm mb-2">{t.about.founder.badge2}</p>
              </div>
              <div>
                <p className="text-[#C5A059] font-bold text-sm mb-2">{t.about.founder.badge3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/525540100439"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.98C18.44 1.9 15.54 0.85 12.54 0.85c-5.38 0-9.76 4.38-9.76 9.76 0 1.72.44 3.4 1.28 4.89L2.06 23.15l5.02-1.62c1.42.77 3.03 1.18 4.67 1.18h.01c5.38 0 9.76-4.38 9.76-9.76 0-2.61-.92-5.12-2.6-7.07zM12.54 20.92h-.01c-1.45 0-2.87-.39-4.1-1.11l-.29-.17-3.04.98.99-3.01-.2-.3c-.81-1.29-1.24-2.78-1.24-4.3 0-4.47 3.64-8.11 8.11-8.11 2.17 0 4.21.85 5.74 2.38 1.53 1.53 2.37 3.57 2.37 5.74 0 4.47-3.64 8.11-8.11 8.11zm4.4-6.07c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.45-.39-.39-.54-.39-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32 1 2.48.14.16 1.98 3.02 4.8 4.24.67.29 1.2.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.63-.67 1.86-1.31.24-.64.24-1.19.16-1.31-.08-.12-.24-.2-.48-.32z"/>
        </svg>
      </a>
    </div>
  );
};
