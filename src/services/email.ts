import emailjs from '@emailjs/browser';

export interface SendEmailParams {
  from_name: string;
  from_email: string;
  message: string;
  contact_type: 'travel' | 'business';
}

export const sendContactEmail = async (params: SendEmailParams): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('[EMAIL_CONFIG_ERROR] EmailJS configuration missing');
    throw new Error('EmailJS configuration missing');
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: params.from_name,
      from_email: params.from_email,
      message: params.message,
      contact_type: params.contact_type,
    },
    publicKey
  );
};
