import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { assets } from '@/assets';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/config/contact';

export const ContactPage = () => {
  const [contactType, setContactType] = useState<'travel' | 'business'>('travel');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      <Navigation />

      {/* Hero */}
      <section className="relative h-96 mt-20 flex items-center justify-center overflow-hidden">
        <img
          src={assets.hero.poster}
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="relative z-10 text-left px-6 max-w-7xl w-full">
          <h1 className="font-serif text-5xl md:text-7xl mb-4">Let's Build What's Next</h1>
          <p className="text-gray-300 text-lg">Reach out. We'll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          {/* Type Selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">How can we help?</h2>
            <p className="text-gray-400 mb-12">Choose your path to explore deeper.</p>
            <div className="space-y-4">
              <button
                onClick={() => setContactType('travel')}
                className={`w-full p-8 border-2 rounded-lg transition-all text-left ${
                  contactType === 'travel'
                    ? 'border-[#C5A059] bg-[#C5A059]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <h3 className="font-serif text-2xl mb-2">Travel</h3>
                <p className="text-gray-400 text-sm">Plan your next adventure journey</p>
              </button>
              <button
                onClick={() => setContactType('business')}
                className={`w-full p-8 border-2 rounded-lg transition-all text-left ${
                  contactType === 'business'
                    ? 'border-[#C5A059] bg-[#C5A059]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <h3 className="font-serif text-2xl mb-2">Business & Partnerships</h3>
                <p className="text-gray-400 text-sm">Design experiences for your brand</p>
              </button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-bold">Quick Info</h3>
            <div className="space-y-8">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Email</p>
                <a href="mailto:contacto@onceonce.com" className="text-white hover:text-[#C5A059] transition-colors">
                  contacto@onceonce.com
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">WhatsApp</p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#C5A059] transition-colors"
                >
                  <MessageCircle size={18} />
                  +52 (554) 010-0439
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Response Time</p>
                <p className="text-white">Within 24 hours</p>
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="text-gray-500 text-xs leading-relaxed">
                  We're based in Mexico but serve travelers and brands globally. Let's connect and create something extraordinary together.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full Width Message */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-bold">Send us a message</h3>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                {contactType === 'travel' ? 'Your Name' : 'Company Name'}
              </label>
              <input
                type="text"
                placeholder={contactType === 'travel' ? 'Your Name' : 'Your Company'}
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C5A059] transition-colors placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C5A059] transition-colors placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Message</label>
              <textarea
                placeholder={
                  contactType === 'travel'
                    ? 'Tell us about your dream journey...'
                    : 'Tell us about your vision and goals...'
                }
                rows={6}
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C5A059] transition-colors placeholder-gray-600 resize-none"
              />
            </div>
            <button className="w-full py-6 bg-[#C5A059] text-black font-bold uppercase tracking-[0.4em] hover:bg-white transition-all">
              Send Message
            </button>
          </div>
        </motion.div>
      </section>

      {/* Alternative: WhatsApp CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto bg-[#0f0f0f] rounded-lg text-center space-y-6 mb-32">
        <p className="text-gray-400">Prefer a quick chat?</p>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white hover:bg-[#20ba5e] transition-all font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg"
        >
          <MessageCircle size={20} />
          Message us on WhatsApp
        </a>
      </section>

      <Footer />

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
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
