import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets';

interface HeroV2Props {
  tagline: string;
  title: string;
  description: string;
  locations: string;
  cta: string;
}

export const HeroV2 = ({ tagline, title, description, locations, cta }: HeroV2Props) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={assets.hero.poster}
          alt="Hero background"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#0a0a0a]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 space-y-8 max-w-4xl"
      >
        {/* Tagline with Animated Line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <h2 className="text-[#C5A059] text-xs uppercase tracking-[0.6em] font-bold">{tagline}</h2>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[1.1]">
            {title}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold">
            <span className="border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0 md:pr-8">{locations}</span>
            <a
              href="#ecosystem"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#C5A059]/50 hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all group"
            >
              {cta} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#C5A059] z-20"
      >
        <svg className="w-6 h-6 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};
