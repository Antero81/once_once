import { motion, useScroll, useTransform } from 'framer-motion';
import { Bike, Mountain, Building2, Map, Instagram, Mail, Compass, Globe, Users, Heart, Languages, MessageCircle } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Importamos ambos diccionarios
import { translations } from './translations';
import { assets } from './assets';
import { ExperiencePage } from './features/experiences/ExperiencePage';
import { getWhatsAppLink } from './config/contact';
import { experiences } from './features/experiences/data';
import { ContactFormSchema } from './config/validation';
import { useRateLimit } from './hooks/useRateLimit';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useHeroDesign } from './hooks/useHeroDesign';
import { HeroV1 } from './components/HeroV1';
import { HeroV2 } from './components/HeroV2';
import { HeroDesignSelector } from './components/HeroDesignSelector';
import { PhilosophyImage } from './components/PhilosophyImage';

const BusinessCard = ({ title, subtitle, description, target, icon: Icon, image, slug }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Link to={`/${slug}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="group bg-[#0a0a0a] border border-white/5 hover:border-[#C5A059]/50 transition-colors overflow-hidden cursor-pointer h-full"
      >
        <div className="h-72 overflow-hidden relative">
          <motion.img
            style={{ y }}
            src={image}
            className="w-full h-[120%] object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div className="p-8 relative">
          <div className="absolute -top-8 left-8 bg-[#C5A059] p-4 rounded-full shadow-lg">
            <Icon className="text-black" size={24} />
          </div>
          <h3 className="font-serif text-2xl mb-2 mt-4">{title}</h3>
          <p className="text-[#C5A059] text-[10px] uppercase tracking-widest mb-4 font-bold">{subtitle}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20">{description}</p>
          <div className="pt-6 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-widest font-bold italic">
            Focus: {target}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const LandingPage = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { checkRateLimit, recordSubmission, rateLimitError, setRateLimitError } = useRateLimit();
  const { design, changeDesign } = useHeroDesign();

  // Mapeo de iconos para iteración limpia
  const serviceIcons = [Map, Building2, Globe];
  const serviceImages = [assets.services.downToEarth, assets.services.experienceDesign, assets.services.hubs];
  const methodIcons = [Bike, Mountain, Compass, Heart, Users];

  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setRateLimitError('');

    // Check rate limit
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setFormErrors({ form: rateLimitError });
      return;
    }

    // Validate form data
    const validation = ContactFormSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue: any) => {
        const field = String(issue.path[0]);
        errors[field] = issue.message;
      });
      setFormErrors(errors);
      return;
    }

    setFormState('sending');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error('[FORM_ERROR] EmailJS configuration missing');
        throw new Error('EmailJS configuration missing');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'contacto@onceonce.com',
        },
        publicKey
      );

      setFormState('success');
      setFormMessage(lang === 'es' ? '¡Consulta enviada!' : 'Inquiry sent!');
      setFormData({ name: '', email: '', message: '' });
      recordSubmission(); // Record successful submission for rate limiting
      setTimeout(() => setFormState('idle'), 3000);
    } catch (error) {
      console.error('[FORM_SUBMISSION_ERROR]', error instanceof Error ? error.message : 'Unknown error');
      setFormState('error');
      setFormMessage(lang === 'es' ? 'Error al enviar. Intenta con WhatsApp.' : 'Error sending. Try WhatsApp.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#C5A059]/20 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={assets.common.logoHorizontal} alt="ONCE ONCE Logo" className="h-16 object-contain" />
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#philosophy" className="hover:text-[#C5A059] transition-colors">{t.nav.philosophy}</a>
            <a href="#ecosystem" className="hover:text-[#C5A059] transition-colors">{t.nav.ecosystem}</a>
            <a href="#method" className="hover:text-[#C5A059] transition-colors">{t.nav.method}</a>
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 border border-white/20 px-3 py-1 hover:border-[#C5A059] transition-all rounded-full"
            >
              <Languages size={14} /> {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dynamic Design Selection */}
      {design === 'v1' ? (
        <HeroV1
          tagline={t.hero.tagline}
          title={t.hero.title}
          description={t.hero.description}
          locations={t.hero.locations}
          cta={t.hero.cta}
        />
      ) : (
        <HeroV2
          tagline={t.hero.tagline}
          title={t.hero.title}
          description={t.hero.description}
          locations={t.hero.locations}
          cta={t.hero.cta}
        />
      )}

      {/* Hero Design Selector - Dev Tool */}
      <HeroDesignSelector currentDesign={design} onDesignChange={changeDesign} />

      {/* Philosophy */}
      <section id="philosophy" className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div>
            <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-black">{t.philosophy.tagline}</h3>
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">{t.philosophy.title}</h2>
            <div className="w-24 h-1 bg-[#C5A059]"></div>
          </div>
          <div className="space-y-6 text-gray-400 text-xl font-light leading-relaxed">
            <p>{t.philosophy.p1}</p>
            <p>{t.philosophy.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
            <div>
              <h4 className="text-[#C5A059] text-[10px] uppercase font-bold mb-2 italic">{t.philosophy.visionLabel}</h4>
              <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-tighter">{t.philosophy.visionText}</p>
            </div>
            <div>
              <h4 className="text-[#C5A059] text-[10px] uppercase font-bold mb-2 italic">{t.philosophy.leaderLabel}</h4>
              <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-tighter">{t.philosophy.leaderText}</p>
            </div>
          </div>
        </div>
        <PhilosophyImage imageUrl={assets.philosophy.sideImage} quote={t.philosophy.quote} />
      </section>

      {/* Services Section */}
      <section id="ecosystem" className="py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="font-serif text-5xl md:text-7xl mb-6">{t.services.title}</h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-black">{t.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {t.services.items.map((item, i) => (
              <BusinessCard
                key={i}
                {...item}
                icon={serviceIcons[i]}
                image={serviceImages[i]}
                slug={experiences[i].slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="method" className="py-32 px-6 text-center bg-black relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="text-[#C5A059] text-xs uppercase tracking-[0.5em] mb-6 font-bold">{t.method.tagline}</h3>
          <h2 className="font-serif text-4xl md:text-7xl max-w-5xl mx-auto mb-24 italic leading-tight">{t.method.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {t.method.steps.map((step, i) => {
              const Icon = methodIcons[i];
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="group p-10 border border-white/5 hover:border-[#C5A059]/40 transition-all bg-[#0a0a0a]"
                >
                  <div className="w-20 h-20 mx-auto bg-black border border-white/5 group-hover:bg-[#C5A059] transition-colors flex items-center justify-center rounded-full mb-8">
                    <Icon className="text-[#C5A059] group-hover:text-black" size={32} />
                  </div>
                  <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{step.name}</h4>
                  <p className="text-[9px] text-gray-600 mt-2 uppercase">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / Form */}
      <footer id="contact" className="bg-[#050505] pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-32 mb-32">
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] italic">{t.contact.title}</h2>
          <form onSubmit={handleFormSubmit} className="space-y-8 text-[11px] font-bold tracking-[0.2em]">
            {formErrors.form && (
              <div className="p-4 bg-red-500/20 border border-red-500 text-red-400 rounded">
                {formErrors.form}
              </div>
            )}
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                placeholder={t.contact.placeholders.name}
                value={formData.name}
                onChange={handleFormChange}
                required
                className={`w-full bg-transparent border-b py-5 outline-none transition-colors ${
                  formErrors.name ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-[#C5A059]'
                }`}
              />
              {formErrors.name && <p className="text-red-400 text-xs">{formErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder={t.contact.placeholders.email}
                value={formData.email}
                onChange={handleFormChange}
                required
                className={`w-full bg-transparent border-b py-5 outline-none transition-colors ${
                  formErrors.email ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-[#C5A059]'
                }`}
              />
              {formErrors.email && <p className="text-red-400 text-xs">{formErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <textarea
                name="message"
                placeholder={t.contact.placeholders.message}
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={5}
                className={`w-full bg-transparent border-b py-5 outline-none transition-colors ${
                  formErrors.message ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-[#C5A059]'
                }`}
              />
              {formErrors.message && <p className="text-red-400 text-xs">{formErrors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={formState === 'sending'}
              className={`w-full py-6 uppercase tracking-[0.4em] font-black transition-all ${
                formState === 'sending'
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : formState === 'success'
                    ? 'bg-green-600 text-white'
                    : formState === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-[#C5A059] text-black hover:bg-white'
              }`}
            >
              {formState === 'sending'
                ? lang === 'es'
                  ? 'Enviando...'
                  : 'Sending...'
                : formState === 'success'
                  ? formMessage
                  : formState === 'error'
                    ? formMessage
                    : t.contact.placeholders.button}
            </button>
          </form>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <img src={assets.common.logoHorizontal} alt="ONCE ONCE Logo" className="h-12 object-contain mb-2" />
            <div className="flex gap-4 mt-2">
              <Instagram size={16} className="hover:text-white cursor-pointer" />
              <a href="mailto:contacto@onceonce.com">
                <Mail size={16} className="hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>
          <p className="text-center md:text-right max-w-xs">{t.contact.footer}</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
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

export default function App() {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || ''}>
      <BrowserRouter basename="/once_once/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:slug" element={<ExperiencePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}