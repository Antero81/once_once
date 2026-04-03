import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets';

interface HeroV1Props {
  tagline: string;
  title: string;
  description: string;
  locations: string;
  cta: string;
}

export const HeroV1 = ({ tagline, title, description, locations, cta }: HeroV1Props) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay loop muted playsInline
        poster={assets.hero.poster}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={assets.hero.video} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: assets.hero.overlayOpacity }}
      />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 px-4">
        <h2 className="text-[#C5A059] text-xs uppercase tracking-[0.6em] mb-6 font-bold">{tagline}</h2>
        <h1 className="font-serif text-6xl md:text-9xl font-bold mb-8 tracking-tighter">{title}</h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">{description}</p>
        <div className="mt-12 flex items-center justify-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold">
           <span className="border-r border-white/20 pr-8">{locations}</span>
           <a href="#ecosystem" className="text-[#C5A059] flex items-center gap-3 group">
             {cta} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
           </a>
        </div>
      </motion.div>
    </section>
  );
};
