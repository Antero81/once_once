import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { assets } from '@/assets';
import { motion } from 'framer-motion';
import { Bike, Mountain, Compass, Heart } from 'lucide-react';

export const HubsPage = () => {
  const hubs = [
    {
      name: 'Los Cabos',
      subtitle: 'Where it all began',
      description: 'Our first home and creative HQ. A place that shaped our vision and continues our journey well-built.',
      tags: ['HQ', 'Community', 'Adventure'],
      image: assets.services.hubs,
    },
    {
      name: 'Valle de Guadalupe',
      subtitle: 'Land of flavors. Land of stories.',
      description: 'A base for experiences. Hubs where country rhythms, wine country cycles, culture and connection.',
      tags: ['Wine', 'Nature', 'Culture'],
      image: '/once_once/assets/img/_DSC5511.jpeg',
    },
    {
      name: 'MUSA',
      subtitle: 'A new kind of hub',
      description: 'An immersive space being built to spark creativity, movement and meaningful experiences. More to come.',
      tags: ['Creativity', 'Wellness', 'Connection'],
      image: '/once_once/assets/img/DSC05054.jpeg',
    },
  ];

  const partner = {
    name: 'The Ride Co.',
    location: 'Tijuana, Mexico',
    description: 'Our certified partner in Tijuana. The Ride Co. shares our DNA of adventure, quality and community. Together we create more opportunities to explore.',
    tags: ['Bikes', 'Gear', 'Community'],
    image: '/once_once/assets/img/DSC_7914-38.jpeg',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-screen mt-20 flex items-center justify-center overflow-hidden">
        <img
          src={assets.services.hubs}
          alt="Hubs hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="relative z-10 text-left px-6 max-w-7xl w-full">
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Physical gateways. Deeper connections.</h1>
          <p className="text-gray-300 text-xl max-w-2xl">
            Where adventure, community and place come to life. Each hub is a home base for exploration, connection and unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Our Hubs */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">Our Hubs</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {hubs.map((hub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative h-80 overflow-hidden rounded-lg mb-8">
                <img
                  src={hub.image}
                  alt={hub.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-3xl mb-2">{hub.name}</h3>
                  <p className="text-[#C5A059] text-xs uppercase tracking-widest font-bold">{hub.subtitle}</p>
                </div>
                <p className="text-gray-400 leading-relaxed">{hub.description}</p>
                <div className="flex gap-2 flex-wrap pt-4">
                  {hub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-[#C5A059]/50 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#C5A059]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Partner */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-[#0f0f0f]">
        <h2 className="font-serif text-5xl md:text-6xl mb-24">Our Partner</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative h-96 overflow-hidden rounded-lg"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-4xl mb-2">{partner.name}</h3>
              <p className="text-gray-400 text-lg">{partner.location}</p>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">{partner.description}</p>
            <div className="space-y-4">
              <p className="text-[#C5A059] font-bold text-sm uppercase tracking-widest">Stronger together</p>
              <p className="text-gray-400 leading-relaxed">
                We partner with like-minded brands that share our passion for movement, community and pushing boundaries.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap pt-4">
              {partner.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-[#C5A059]/50 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#C5A059]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://theridecompany.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-[#C5A059] hover:bg-[#C5A059] text-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              Learn More About The Ride Co.
            </a>
          </div>
        </div>
      </section>

      {/* Hub Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="font-serif text-4xl md:text-5xl text-[#C5A059] mb-2">3</p>
            <p className="text-gray-500 uppercase text-xs tracking-widest">Hubs & Growing</p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl text-[#C5A059] mb-2">25+</p>
            <p className="text-gray-500 uppercase text-xs tracking-widest">Destinations Explored</p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl text-[#C5A059] mb-2">5K+</p>
            <p className="text-gray-500 uppercase text-xs tracking-widest">Travelers Impacted</p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl text-[#C5A059] mb-2">∞</p>
            <p className="text-gray-500 uppercase text-xs tracking-widest">Connections Made</p>
          </div>
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
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.98C18.44 1.9 15.54 0.85 12.54 0.85c-5.38 0-9.76 4.38-9.76 9.76 0 1.72.44 3.4 1.28 4.89L2.06 23.15l5.02-1.62c1.42.77 3.03 1.18 4.67 1.18h.01c5.38 0 9.76-4.38 9.76-9.76 0-2.61-.92-5.12-2.6-7.07zM12.54 20.92h-.01c-1.45 0-2.87-.39-4.1-1.11l-.29-.17-3.04.98.99-3.01-.2-.3c-.81-1.29-1.24-2.78-1.24-4.3 0-4.47 3.64-8.11 8.11-8.11 2.17 0 4.21.85 5.74 2.38 1.53 1.53 2.37 3.57 2.37 5.74 0 4.47-3.64 8.11-8.11 8.11zm4.4-6.07c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.45-.39-.39-.54-.39-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32 1 2.48.14.16 1.98 3.02 4.8 4.24.67.29 1.2.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.63-.67 1.86-1.31.24-.64.24-1.19.16-1.31-.08-.12-.24-.2-.48-.32z"/>
        </svg>
      </a>
    </div>
  );
};
