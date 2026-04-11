import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { journeys } from '@/features/travel/data/journeys';
import { useLanguage } from '@/hooks/useLanguage';

interface FeaturedJourneysProps {
  title: string;
  ctaText: string;
}

export const FeaturedJourneys = ({ title, ctaText }: FeaturedJourneysProps) => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = journeys.slice(0, 6);

  const titles = {
    en: 'Featured Journeys',
    es: 'Viajes Destacados',
  };

  const ctaTexts = {
    en: 'View All Journeys',
    es: 'Ver Todos los Viajes',
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featured.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16 flex justify-between items-end">
        <h2 className="font-serif text-5xl md:text-6xl">{titles[language]}</h2>
        <Link
          to="/travel"
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors"
        >
          {ctaTexts[language]} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid of Journey Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featured.map((journey, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative h-64 md:h-72 overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              src={journey.image}
              alt={journey.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-serif text-lg md:text-xl mb-2 line-clamp-2">{journey.name}</h3>
              <p className="text-gray-300 text-xs mb-2 line-clamp-1">{journey.location}</p>
              <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-widest">{journey.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
