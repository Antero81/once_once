import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Bike, Mountain, Users, Check, Mail, Phone, Instagram, ArrowRight, Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';

const BusinessCard = ({ title, subtitle, description, target, icon: Icon, image, video }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#C5A059]/50 transition-colors duration-500 overflow-hidden"
    >
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
        <motion.div style={{ y }} className="w-full h-[130%] -mt-[15%] relative">
             {video ? (
               <video
                 autoPlay
                 loop
                 muted
                 playsInline
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 poster={image}
               >
                 <source src={video} type="video/mp4" />
               </video>
             ) : (
               <img 
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
             )}
        </motion.div>
      </div>
      <div className="p-8 relative">
        <div className="absolute -top-8 left-8 bg-[#C5A059] p-4 rounded-full shadow-lg z-20">
          <Icon className="text-[#0a0a0a]" size={24} />
        </div>
        <h3 className="font-serif text-2xl mb-2 mt-4">{title}</h3>
        <p className="text-[#C5A059] text-xs uppercase tracking-widest mb-4">{subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="pt-6 border-t border-white/10">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{target}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold tracking-widest text-[#C5A059]">ONCE ONCE</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#filosofia" className="text-sm uppercase tracking-widest hover:text-[#C5A059] transition-colors">Filosofía</a>
              <a href="#experiencias" className="text-sm uppercase tracking-widest hover:text-[#C5A059] transition-colors">Experiencias</a>
              <a href="#contacto" className="px-6 py-2 border border-[#C5A059] text-[#C5A059] text-sm uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#0a0a0a] transition-all duration-300">
                Contacto
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#F5F2ED]">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0a0a0a] border-b border-[#C5A059]/20 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-8 space-y-4 flex flex-col items-center">
                <a href="#filosofia" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 hover:text-[#C5A059] transition-colors">Filosofía</a>
                <a href="#experiencias" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 hover:text-[#C5A059] transition-colors">Experiencias</a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 text-[#C5A059] hover:text-white transition-colors">Contacto</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2070&auto=format&fit=crop"
          >
            <source src="https://videos.pexels.com/video-files/2437632/2437632-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-[#C5A059] text-sm md:text-base uppercase tracking-[0.3em] mb-4">Experiencias Premium de Ciclismo y Aventura</h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              ONCE ONCE
            </h1>
            <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light italic">
              "El alto rendimiento no termina en la meta, comienza en la experiencia."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="filosofia" className="py-24 px-4 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            {...fadeIn}
            className="space-y-8"
          >
            <div>
              <h3 className="text-[#C5A059] text-sm uppercase tracking-widest mb-2">Nuestra Esencia</h3>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Filosofía de la Marca</h2>
              <div className="w-16 h-0.5 bg-[#C5A059] mb-8"></div>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-lg">
              Once Once es una marca de experiencias premium enfocada en la combinación de aventura, confort, bienestar y comunidad. Nuestro objetivo es crear momentos inolvidables donde el lujo discreto se encuentra con la naturaleza salvaje.
            </p>

            <ul className="space-y-4">
              {[
                "Experiencias únicas y seguras.",
                "Atención personalizada y lujo discreto.",
                "Momentos de conexión social y con la naturaleza.",
                "Método estandarizado para garantizar consistencia."
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-[#C5A059] mt-1"><Check size={16} /></span>
                  <span className="text-gray-300 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-sm overflow-hidden"
          >
             <img 
              src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop" 
              alt="Camping Lifestyle" 
              className="w-full h-full object-cover filter sepia-[0.2] contrast-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[1px] border-[#C5A059]/30 m-4 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Business Lines */}
      <section id="experiencias" className="py-24 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Líneas de Negocio</h2>
            <p className="text-[#C5A059] uppercase tracking-widest text-sm">Tres caminos, un mismo estilo</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <BusinessCard 
              title="Cycling Experiences"
              subtitle="Rutas Premium"
              description="Experiencias de alto nivel en bicicleta por destinos únicos. Soporte total, guías expertos y rutas curadas."
              target="Cliente: 30-50 años"
              icon={Bike}
              image="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
            />

            <BusinessCard 
              title="Adventure Lifestyle"
              subtitle="Bienestar y Confort"
              description="Viajes outdoor para desconectar y recargar. Glamping, gastronomía local y contacto con la naturaleza."
              target="Cliente: 30-50 años"
              icon={Mountain}
              image="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop"
              video="https://videos.pexels.com/video-files/2394568/2394568-hd_1920_1080_24fps.mp4"
            />

            <BusinessCard 
              title="Corporativos"
              subtitle="Offsites & Team Building"
              description="Experiencias diseñadas para empresas. Fortalece equipos en entornos inspiradores fuera de la oficina."
              target="Cliente: Empresas"
              icon={Users}
              image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
            />
          </motion.div>
        </div>
      </section>

      {/* Value Prop Grid */}
      <section className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#111] skew-x-12 transform translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <h2 className="font-serif text-4xl mb-12">Propuesta de Valor</h2>
              <div className="space-y-8">
                {[
                  { title: "Destinos Exclusivos", desc: "Lugares únicos curados meticulosamente para garantizar privacidad y belleza." },
                  { title: "Aventuras Seguras", desc: "Protocolos estrictos y staff capacitado para que solo te preocupes por disfrutar." },
                  { title: "Hospedaje Boutique", desc: "Selección de alojamientos que combinan el encanto local con el máximo confort." },
                  { title: "Grupos Reducidos", desc: "Atención personalizada y dinámica de grupo íntima y exclusiva." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 border border-[#C5A059]/30 flex items-center justify-center rounded-full">
                      <span className="text-[#C5A059] font-serif">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
               <motion.img 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop" 
                 className="w-full h-64 object-cover rounded-sm mt-12"
                 referrerPolicy="no-referrer"
               />
               <motion.img 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1974&auto=format&fit=crop" 
                 className="w-full h-64 object-cover rounded-sm"
                 referrerPolicy="no-referrer"
               />
               <motion.img 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
                 src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop" 
                 className="w-full h-64 object-cover rounded-sm"
                 referrerPolicy="no-referrer"
               />
               <motion.img 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 src="https://images.unsplash.com/photo-1516739353605-4243ca380255?q=80&w=2070&auto=format&fit=crop" 
                 className="w-full h-64 object-cover rounded-sm mt-12"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Únete a la Experiencia</h2>
          <p className="text-gray-400 mb-12">
            ¿Listo para tu próxima aventura? Contáctanos para más información sobre nuestras próximas salidas o para diseñar una experiencia a medida.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <a href="#" className="flex flex-col items-center p-8 border border-white/10 hover:border-[#C5A059] transition-colors group">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
                <Phone size={20} />
              </div>
              <h3 className="text-lg font-medium mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-400">Hablemos directamente</p>
            </a>

            <a href="#" className="flex flex-col items-center p-8 border border-white/10 hover:border-[#C5A059] transition-colors group">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
                <Mail size={20} />
              </div>
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <p className="text-sm text-gray-400">info@onceonce.com</p>
            </a>

            <a href="#" className="flex flex-col items-center p-8 border border-white/10 hover:border-[#C5A059] transition-colors group">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mb-4 group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
                <Instagram size={20} />
              </div>
              <h3 className="text-lg font-medium mb-2">Instagram</h3>
              <p className="text-sm text-gray-400">@onceonce.exp</p>
            </a>
          </div>

          <form className="max-w-xl mx-auto space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Nombre</label>
              <input type="text" className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <input type="email" className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Mensaje</label>
              <textarea rows={4} className="w-full bg-black/30 border border-white/10 p-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"></textarea>
            </div>
            <button className="w-full bg-[#C5A059] text-black font-medium py-4 uppercase tracking-widest hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2">
              Enviar Mensaje <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="font-serif text-2xl font-bold tracking-widest text-[#C5A059] block mb-6">ONCE ONCE</span>
          <p className="text-gray-600 text-sm">© 2026 Once Once Experiences. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
