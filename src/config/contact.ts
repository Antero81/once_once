// WhatsApp configuration - Load from environment
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "+525540100439";

export const getWhatsAppLink = (message: string = "Hola, estoy interesado en conocer más sobre ONCE ONCE") => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encoded}`;
};
