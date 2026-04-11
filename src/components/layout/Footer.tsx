import { Instagram, Mail } from 'lucide-react';
import { assets } from '@/assets';
import { translations } from '@/translations';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRateLimit } from '@/hooks/useRateLimit';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ContactFormSchema } from '@/config/validation';

export const Footer = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { checkRateLimit, recordSubmission, rateLimitError, setRateLimitError } = useRateLimit();

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
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setRateLimitError('');

    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setFormErrors({ form: rateLimitError });
      return;
    }

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
      recordSubmission();
      setTimeout(() => setFormState('idle'), 3000);
    } catch (error) {
      console.error('[FORM_SUBMISSION_ERROR]', error instanceof Error ? error.message : 'Unknown error');
      setFormState('error');
      setFormMessage(lang === 'es' ? 'Error al enviar. Intenta con WhatsApp.' : 'Error sending. Try WhatsApp.');
    }
  };

  return (
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
  );
};
