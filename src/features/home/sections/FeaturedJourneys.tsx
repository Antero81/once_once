import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { journeys, Journey } from '@/features/travel/data/journeys';
import { useLanguage } from '@/hooks/useLanguage';

interface FeaturedJourneysProps {
  title: string;
  ctaText: string;
}

interface JourneyCardProps {
  journey: Journey;
  index: number;
  typeColors: Record<string, string>;
  featured?: boolean;
}

const typeColors: Record<Journey['type'], string> = {
  journeys:     'bg-[#C5A059] text-black',
  riding:       'bg-white text-black',
  explorations: 'bg-blue-400/80 text-black',
  private:      'bg-purple-400/80 text-white',
  editions:     'bg-orange-400/80 text-black',
};

const JourneyCard = ({ journey, index, typeColors, featured = false }: JourneyCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`group relative overflow-hidden rounded-lg cursor-pointer ${
      featured ? 'md:col-span-2 h-[480px] md:h-[560px]' : 'h-52 md:h-64'
    }`}
  >
    <img
      src={journey.image}
      alt={journey.name}
      loading="lazy"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

    {/* Location badge — top-left */}
    <div className="absolute top-3 left-3">
      <span className="bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
        {journey.location}
      </span>
    </div>

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
      <h3 className={`font-serif text-white leading-tight mb-2 ${featured ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl'}`}>
        {journey.name}
      </h3>

      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${typeColors[journey.type]}`}>
          {journey.type}
        </span>

        {/* Price reveal on hover */}
        <span className="text-[#C5A059] text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          {journey.priceFrom}
        </span>
      </div>
    </div>
  </motion.div>
);

export const FeaturedJourneys = ({ title, ctaText }: FeaturedJourneysProps) => {
  const { language } = useLanguage();
  const featured = journeys.slice(0, 5);

  const titles = {
    en: 'Featured Journeys',
    es: 'Viajes Destacados',
  };

  const ctaTexts = {
    en: 'View All Journeys',
    es: 'Ver Todos los Viajes',
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      {/* ── Header row ── */}
      <div className="mb-16 flex justify-between items-end">
        <div>
          <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
            {language === 'en' ? 'Down to Earth' : 'Down to Earth'}
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-none">
            {titles[language]}
          </h2>
        </div>
        <Link
          to="/travel"
          className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors group"
        >
          {ctaTexts[language]}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── Editorial grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured card — takes 2 columns, taller */}
        <JourneyCard journey={featured[0]} index={0} typeColors={typeColors} featured />

        {/* Right 2×2 grid */}
        <div className="grid grid-cols-2 gap-4">
          {featured.slice(1, 5).map((journey, i) => (
            <JourneyCard key={journey.id} journey={journey} index={i + 1} typeColors={typeColors} />
          ))}
        </div>
      </div>

      {/* ── Mobile CTA ── */}
      <div className="mt-10 flex md:hidden justify-center">
        <Link
          to="/travel"
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors"
        >
          {ctaTexts[language]} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};
