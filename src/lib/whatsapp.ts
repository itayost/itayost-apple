// Centralized WhatsApp / phone contact details.
// Every lead CTA on the site must build its wa.me URL through buildWhatsAppUrl
// so the number lives in one place and every message self-identifies as
// coming from the website (the opener text is how site-sourced leads
// announce themselves in the WhatsApp inbox).

export const WHATSAPP_PHONE_INTL = '972544994417'
export const PHONE_TEL_HREF = 'tel:0544994417'
export const DEFAULT_WHATSAPP_MESSAGE = 'היי, הגעתי מהאתר ואשמח לשמוע פרטים'

export const buildWhatsAppUrl = (
  message: string = DEFAULT_WHATSAPP_MESSAGE
): string => {
  return `https://wa.me/${WHATSAPP_PHONE_INTL}?text=${encodeURIComponent(message)}`
}
