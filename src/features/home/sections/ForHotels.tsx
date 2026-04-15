import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface ForHotelsProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  properties: Array<{
    name: string;
    location: string;
    image: string;
  }>;
}

export const ForHotels = ({
  title,
  subtitle,
  description,
  ctaText,
  properties,
}: ForHotelsProps) => {
  const { language } = useLanguage();
  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Column — Editorial Text */}
          <div className="flex flex-col justify-center">
            <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              {subtitle}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8">
              {title}
            </h2>
            <div className="w-12 h-px bg-[#C5A059] mb-8" />
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
              {description}
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#C5A059]/50 hover:border-[#C5A059] hover:bg-[#C5A059]/5 transition-all group text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] self-start"
            >
              {ctaText}
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Right Column — Dramatic Mosaic Grid */}
          <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: 'auto' }}>
            {/* First card: tall, spans 2 rows */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="row-span-2 relative overflow-hidden rounded-lg group cursor-pointer"
              style={{ minHeight: '420px' }}
            >
              <img
                src={properties[0].image}
                alt={properties[0].name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-serif text-xl font-bold leading-tight">{properties[0].name}</p>
                <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.2em] mt-1">{properties[0].location}</p>
              </div>
            </motion.div>

            {/* Cards 1–4: two columns on the right, each h-48 */}
            {properties.slice(1, 5).map((property, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-lg group cursor-pointer h-48"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-serif text-sm font-bold leading-tight">{property.name}</p>
                  <p className="text-[#C5A059] text-[8px] uppercase tracking-[0.15em] mt-0.5">{property.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
