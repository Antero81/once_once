import { motion } from 'framer-motion';
import { Map, Building2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface WhatWeDoProps {
  items: Array<{
    title: string;
    description: string;
    cta: string;
    target: string;
  }>;
}

export const WhatWeDo = ({ items }: WhatWeDoProps) => {
  const { language } = useLanguage();

  const servicesData = {
    en: [
      {
        title: 'JOURNEYS',
        description: 'Curated journeys for travelers seeking a deeper connection to each destination.',
        cta: 'EXPLORE',
        image: '/once_once/assets/img/7X0A1157.jpeg',
        link: '/travel',
        icon: Map,
      },
      {
        title: 'EXPERIENCES',
        description: 'Adventure-driven concepts crafted for hotels and destinations.',
        cta: "LET'S DO IT",
        image: '/once_once/assets/img/_BP_0415.jpeg',
        link: '/studio',
        icon: Building2,
      },
      {
        title: 'HUBS',
        description: 'Signature physical gateways where Once Once comes to life.',
        cta: 'BE PART',
        image: '/once_once/assets/img/_DSC5511.jpeg',
        link: '/hubs',
        icon: Home,
      },
    ],
    es: [
      {
        title: 'VIAJES',
        description: 'Viajes curados para viajeros que buscan una conexión más profunda con cada destino.',
        cta: 'EXPLORAR',
        image: '/once_once/assets/img/7X0A1157.jpeg',
        link: '/travel',
        icon: Map,
      },
      {
        title: 'EXPERIENCIAS',
        description: 'Conceptos impulsados por aventura diseñados para hoteles y destinos.',
        cta: 'HAGÁMOSLO',
        image: '/once_once/assets/img/_BP_0415.jpeg',
        link: '/studio',
        icon: Building2,
      },
      {
        title: 'HUBS',
        description: 'Puertas de entrada físicas donde Once Once cobra vida.',
        cta: 'SÉ PARTE',
        image: '/once_once/assets/img/_DSC5511.jpeg',
        link: '/hubs',
        icon: Home,
      },
    ],
  };

  const services = servicesData[language];

  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-bold">
            {language === 'en' ? 'WHAT WE DO' : 'QUÉ HACEMOS'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 overflow-hidden rounded-lg cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  {/* Icon */}
                  <div className="flex items-center gap-3">
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl mb-3 text-white font-bold">{service.title}</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-[#C5A059] transition-colors"
                    >
                      {service.cta} →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
