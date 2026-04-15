import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { assets } from '@/assets';
import { motion } from 'motion/react';
import { ArrowRight, Pencil, Cog, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';

interface WorkProject {
  name: string;
  location: string;
  image: string;
}

interface SelectionWorkProps {
  workCases: WorkProject[];
  t: any;
}

const SelectionWork = ({ workCases, t }: SelectionWorkProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(workCases.length / itemsPerPage);
  const currentItems = workCases.slice(activeIndex * itemsPerPage, (activeIndex + 1) * itemsPerPage);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative py-40 px-6 min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={currentItems[0]?.image || assets.services.experienceDesign}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* Title overlay */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h2 className="font-serif text-[160px] md:text-[200px] lg:text-[240px] leading-none font-black text-white/5 text-center">
          {t.studio.selectedWork.title}
        </h2>
      </motion.div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] font-bold mb-4">
            {t.studio.selectedWork.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentItems.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative h-[480px] rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Location badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  {project.location}
                </span>
              </div>

              {/* Image */}
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-bold leading-tight">
                  {project.name}
                </h3>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#C5A059]/5" />
            </motion.div>
          ))}
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between">
          {/* Left arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/50 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] transition-all group"
          >
            <ChevronLeft size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          {/* Page indicators */}
          <div className="flex items-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                animate={{
                  width: activeIndex === i ? 32 : 12,
                  backgroundColor: activeIndex === i ? '#C5A059' : 'rgba(197, 160, 89, 0.3)',
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          {/* Right arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/50 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] transition-all group"
          >
            <ChevronRight size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* CTA button */}
      <motion.div
        className="relative z-10 mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 border border-[#C5A059] hover:bg-[#C5A059] text-white hover:text-black transition-all group text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          {t.studio.cta.button || 'Get Started'} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
};

export const StudioPage = () => {
  const { t } = useLanguage();

  const workCases = [
    { name: 'The Cape', location: 'Los Cabos', image: assets.services.experienceDesign },
    { name: 'El Ganzo', location: 'Los Cabos', image: '/once_once/assets/img/DSC_4141.jpeg' },
    { name: 'Festival de Cine', location: 'Los Cabos', image: '/once_once/assets/img/_BP_0583.jpeg' },
    { name: 'Esperanza', location: 'Los Cabos', image: '/once_once/assets/img/_BP_0415.jpeg' },
    { name: 'Chileno Bay', location: 'Los Cabos', image: '/once_once/assets/img/_DSC5490.jpeg' },
    { name: 'Grupo Presidente', location: 'Mexico', image: '/once_once/assets/img/DSC_7914-38.jpeg' },
  ];

  const process = t.studio.howWeWork.steps.map((step, i) => ({
    icon: [Pencil, Cog, TrendingUp][i],
    name: step.name,
    desc: step.desc,
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-96 mt-20 flex items-center justify-center overflow-hidden">
        <img
          src={assets.services.experienceDesign}
          alt="Studio hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="relative z-10 text-left px-6 max-w-7xl w-full">
          <h1 className="font-serif text-5xl md:text-7xl mb-4">{t.studio.hero.title}</h1>
          <p className="text-gray-300 text-lg">{t.studio.hero.subtitle}</p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#0f0f0f]">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">{t.studio.whatWeDo.title}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{t.studio.whatWeDo.journeys.title}</h3>
            <p className="text-gray-400">{t.studio.whatWeDo.journeys.desc}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{t.studio.whatWeDo.experiences.title}</h3>
            <p className="text-gray-400">{t.studio.whatWeDo.experiences.desc}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">{t.studio.whatWeDo.hubs.title}</h3>
            <p className="text-gray-400">{t.studio.whatWeDo.hubs.desc}</p>
          </div>
        </div>
      </section>

      {/* Selected Work — Editorial Showcase */}
      <SelectionWork workCases={workCases} t={t} />

      {/* How We Work */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#0f0f0f]">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">{t.studio.howWeWork.title}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {process.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="w-16 h-16 border-2 border-[#C5A059] rounded-full flex items-center justify-center">
                  <Icon className="text-[#C5A059]" size={32} />
                </div>
                <h3 className="font-serif text-3xl">{step.name}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-4xl">{t.studio.cta.title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t.studio.cta.description}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 border border-[#C5A059] hover:bg-[#C5A059] text-white hover:text-black transition-all group text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          {t.studio.cta.button} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
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
