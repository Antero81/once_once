import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { assets } from '@/assets';
import { motion } from 'motion/react';
import { ArrowRight, Mountain, MapPin, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

export const CorporatePage = () => {
  const { t } = useLanguage();

  const offerings = t.corporate.offerings.items.map((item, idx) => {
    const icons = [Mountain, MapPin, Zap, Users];
    return { icon: icons[idx], ...item };
  });

  const workCases = [
    { name: 'World Meeting Forum', location: 'Leadership Experience', image: '/once_once/assets/img/_BP_0415.jpeg' },
    { name: 'Michelob Ultra', location: 'Incentive Trip', image: '/once_once/assets/img/DSC_7914-38.jpeg' },
    { name: 'Festival de Cine', location: 'Corporate Experience', image: '/once_once/assets/img/DSC_4213.jpeg' },
    { name: 'The Cape', location: 'Off-Site Experience', image: assets.services.experienceDesign },
    { name: 'El Ganzo', location: 'Meetings & Retreats', image: '/once_once/assets/img/_DSC5490.jpeg' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-screen mt-20 flex items-center justify-center overflow-hidden">
        <img
          src={assets.hero.poster}
          alt="Corporate hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="relative z-10 text-left px-6 max-w-7xl w-full">
          <h1 className="font-serif text-5xl md:text-7xl mb-6">{t.corporate.hero.title}</h1>
          <p className="text-gray-300 text-xl max-w-2xl mb-8">{t.corporate.hero.subtitle}</p>
          <p className="text-gray-400 max-w-2xl">
            {t.corporate.hero.description}
          </p>
        </div>
      </section>

      {/* What We Co-Create */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#0f0f0f]">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">{t.corporate.offerings.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {offerings.map((offering, i) => {
            const Icon = offering.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="w-14 h-14 border-2 border-[#C5A059] rounded-full flex items-center justify-center">
                  <Icon className="text-[#C5A059]" size={28} />
                </div>
                <h3 className="font-serif text-xl">{offering.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{offering.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Some of Our Work */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">{t.corporate.work.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {workCases.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative h-64 overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg mb-1">{project.name}</h3>
                <p className="text-gray-300 text-xs uppercase tracking-widest">{project.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expect the Extraordinary */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#0f0f0f]">
        <h2 className="font-serif text-5xl md:text-6xl mb-16">{t.corporate.extra.title}</h2>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h3 className="font-serif text-3xl">{t.corporate.extra.adventure.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t.corporate.extra.adventure.desc}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-3xl">{t.corporate.extra.connection.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t.corporate.extra.connection.desc}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-3xl">{t.corporate.extra.notOrdinary.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t.corporate.extra.notOrdinary.desc}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-4xl">{t.corporate.cta.title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t.corporate.cta.description}
        </p>
        <p className="text-xs text-gray-500 uppercase tracking-widest">{t.corporate.cta.note}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 border border-[#C5A059] hover:bg-[#C5A059] text-white hover:text-black transition-all group text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          {t.corporate.cta.button} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </Link>
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
