import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <section className="relative h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={assets.hero.poster}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="/once_once/assets/temp_video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 max-w-7xl w-full text-left space-y-8"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-tight max-w-3xl">
            {title}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 flex flex-col sm:flex-row gap-6"
        >
          <Link
            to="/travel"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059]/20 border border-[#C5A059] hover:bg-[#C5A059]/30 transition-all group text-[10px] font-bold uppercase tracking-[0.2em] text-white"
          >
            Explore Journeys <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link
            to="/studio"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-white/50 transition-all group text-[10px] font-bold uppercase tracking-[0.2em] text-white"
          >
            Work With Us <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
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
