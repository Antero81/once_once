import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { assets } from '@/assets';
import { motion } from 'motion/react';
import { useState } from 'react';
import { journeys, getUniqueTypes, getUniqueDestinations, Journey } from './data/journeys';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

export const TravelPage = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<Journey['type'] | 'all'>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  const filtered = journeys.filter((j) => {
    const typeMatch = selectedType === 'all' || j.type === selectedType;
    const destMatch = selectedDestination === 'all' || j.destination === selectedDestination;
    return typeMatch && destMatch;
  });

  const types = getUniqueTypes();
  const destinations = getUniqueDestinations();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-96 mt-20 flex items-center justify-center overflow-hidden">
        <img
          src={assets.hero.poster}
          alt="Travel hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="relative z-10 text-left px-6 max-w-7xl w-full">
          <h1 className="font-serif text-5xl md:text-7xl mb-4">{t.travel.hero.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t.travel.hero.subtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-[#0f0f0f] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-8 font-bold">{t.travel.filterTitle}</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedType('all')}
              aria-pressed={selectedType === 'all'}
              className={`px-6 py-2 border rounded-full transition-all text-xs font-bold uppercase tracking-widest ${
                selectedType === 'all'
                  ? 'bg-[#C5A059] text-black border-[#C5A059]'
                  : 'border-white/20 hover:border-[#C5A059] text-white'
              }`}
            >
              All
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                aria-pressed={selectedType === type}
                className={`px-6 py-2 border rounded-full transition-all text-xs font-bold uppercase tracking-widest capitalize ${
                  selectedType === type
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'border-white/20 hover:border-[#C5A059] text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Filter */}
      <section className="py-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-8 font-bold">{t.travel.filterBy}</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedDestination('all')}
              aria-pressed={selectedDestination === 'all'}
              className={`px-6 py-2 border rounded-full transition-all text-xs font-bold uppercase tracking-widest ${
                selectedDestination === 'all'
                  ? 'bg-[#C5A059] text-black border-[#C5A059]'
                  : 'border-white/20 hover:border-[#C5A059] text-white'
              }`}
            >
              {t.travel.allDestinations}
            </button>
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                aria-pressed={selectedDestination === dest}
                className={`px-6 py-2 border rounded-full transition-all text-xs font-bold uppercase tracking-widest ${
                  selectedDestination === dest
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'border-white/20 hover:border-[#C5A059] text-white'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Journeys Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t.travel.noResults}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((journey) => (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={journey.image}
                    alt={journey.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl mb-2">{journey.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{journey.location}</p>
                  <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-4">{journey.type}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{journey.duration}</span>
                    <span className="text-[#C5A059] font-bold">{journey.priceFrom}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Private CTA */}
      <section className="py-16 px-6 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl">{t.travel.cta.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.travel.cta.description}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#C5A059] hover:bg-[#C5A059] text-white hover:text-black transition-all group text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            {t.travel.cta.button} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
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
