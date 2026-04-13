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
    <section className="py-32 px-6 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <p className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-bold">{subtitle}</p>
            <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">{title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{description}</p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black border border-white/30 hover:border-white/50 transition-all group text-[10px] font-bold uppercase tracking-[0.2em] text-white"
            >
              {ctaText} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {properties.slice(0, 5).map((property, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                  i === 0 ? 'col-span-2 row-span-2 h-56' : 'h-32'
                }`}
              >
                <img
                  src={property.image}
                  alt={property.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{property.name}</p>
                  <p className="text-gray-300 text-xs uppercase tracking-widest">{property.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
