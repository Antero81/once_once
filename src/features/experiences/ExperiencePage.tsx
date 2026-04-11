import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { translations } from '@/translations';
import { assets } from '@/assets';
import { getExperienceBySlug } from './data';
import { getWhatsAppLink } from '@/config/contact';
import { ContactFormSchema } from '@/config/validation';
import { useRateLimit } from '@/hooks/useRateLimit';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface FormState {
  status: 'idle' | 'sending' | 'success' | 'error';
  message?: string;
}

export const ExperiencePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { checkRateLimit, recordSubmission, rateLimitError, setRateLimitError } = useRateLimit();

  const experience = getExperienceBySlug(slug || '');

  // Scroll al inicio cuando cambia la experiencia
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  if (!experience) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center flex-col gap-4">
        <p className="text-xl">Experiencia no encontrada</p>
        <button
          onClick={() => navigate('/')}
          className="text-[#C5A059] hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver a inicio
        </button>
      </div>
    );
  }

  const pageData = t.servicePages[slug as keyof typeof t.servicePages];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev: any) => ({ ...prev, [name]: '' }));
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

    setFormState({ status: 'sending' });

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
          experience: pageData.title,
          to_email: 'contacto@onceonce.com',
        },
        publicKey
      );

      setFormState({
        status: 'success',
        message: lang === 'es' ? '¡Consulta enviada!' : 'Inquiry sent!',
      });
      setFormData({ name: '', email: '', message: '' });
      recordSubmission(); // Record successful submission for rate limiting
      setTimeout(() => setFormState({ status: 'idle' }), 3000);
    } catch (error) {
      console.error('[FORM_SUBMISSION_ERROR]', error instanceof Error ? error.message : 'Unknown error');
      setFormState({
        status: 'error',
        message: lang === 'es' ? 'Error al enviar. Intenta con WhatsApp.' : 'Error sending. Try WhatsApp.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F2ED]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20">
        <motion.img
          src={experience.image}
          alt={pageData.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Luxury Glow Effect */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-b from-[#C5A059]/10 to-transparent blur-3xl rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4 space-y-6"
        >
          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
              <h2 className="text-[#C5A059] text-xs uppercase tracking-[0.6em] font-bold">{pageData.subtitle}</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
            </div>
          </motion.div>

          {/* Main Title with Luxury Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 tracking-tighter drop-shadow-2xl">
              {pageData.title}
            </h1>
          </motion.div>

          {/* Description with Fade */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {pageData.heroDescription}
          </motion.p>

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
        </motion.div>
      </section>

      {/* Full Description */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-8">
          <div>
            <h3 className="text-[#C5A059] text-xs uppercase tracking-widest mb-4 font-black">Overview</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{pageData.fullDescription}</p>
          </div>
          <div className="w-24 h-1 bg-[#C5A059]" />
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl mb-16">{pageData.whatIncludesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pageData.whatIncludes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4 p-6 border border-white/5 hover:border-[#C5A059]/30 transition-colors bg-[#0a0a0a]"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-black font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary / Process */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl mb-16">{pageData.itineraryTitle}</h2>
        <div className="space-y-8">
          {pageData.itinerary.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-l-4 border-[#C5A059] pl-8 py-4"
            >
              <h4 className="text-xl font-bold mb-2">{item.day}</h4>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl mb-16">{pageData.packagesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pageData.packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="border border-white/10 p-8 hover:border-[#C5A059]/50 transition-colors bg-[#0a0a0a]"
              >
                <h4 className="font-serif text-2xl mb-2">{pkg.name}</h4>
                <p className="text-[#C5A059] text-sm uppercase tracking-widest mb-4">{pkg.duration}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{pkg.description}</p>
                <p className="font-bold text-white">{pkg.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & CTA */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="font-serif text-5xl mb-8 italic">{t.contact.title}</h2>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Buttons */}
            <div className="space-y-6 flex flex-col justify-between">
              <a
                href={getWhatsAppLink(
                  lang === 'es'
                    ? `Hola, estoy interesado en ${pageData.title}. Me gustaría saber más.`
                    : `Hi, I'm interested in ${pageData.title}. I'd like to know more.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 p-6 border border-[#C5A059]/50 hover:border-[#C5A059] bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-all group"
              >
                <MessageCircle size={24} className="text-[#C5A059]" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold">WhatsApp</p>
                  <p className="text-sm text-gray-400">{lang === 'es' ? 'Chat instantáneo' : 'Instant chat'}</p>
                </div>
              </a>

              <div className="bg-[#0f0f0f] p-6 border border-white/5">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Email</p>
                <p className="text-sm text-gray-400">contacto@onceonce.com</p>
              </div>
            </div>

            {/* Form */}
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
                disabled={formState.status === 'sending'}
                className={`w-full py-6 uppercase tracking-[0.4em] font-black transition-all ${
                  formState.status === 'sending'
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : formState.status === 'success'
                      ? 'bg-green-600 text-white'
                      : formState.status === 'error'
                        ? 'bg-red-600 text-white'
                        : 'bg-[#C5A059] text-black hover:bg-white'
                }`}
              >
                {formState.status === 'sending'
                  ? lang === 'es'
                    ? 'Enviando...'
                    : 'Sending...'
                  : formState.status === 'success'
                    ? formState.message
                    : formState.status === 'error'
                      ? formState.message
                      : t.contact.placeholders.button}
              </button>
            </form>
          </div>
        </div>
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
