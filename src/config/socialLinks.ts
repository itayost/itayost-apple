import { Github, Instagram, Facebook, Phone, Mail, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'

export interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
  color: string
}

export interface ContactMethod {
  icon: LucideIcon
  title: string
  value: string
  href: string
  description: string
  color: string
}

export const socialLinks: SocialLink[] = [
  { icon: Github, href: 'https://github.com/itayost', label: 'GitHub', color: 'hover:bg-brand-blue' },
  { icon: Facebook, href: 'https://www.facebook.com/itayost', label: 'Facebook', color: 'hover:bg-brand-blue' },
  { icon: Instagram, href: 'https://instagram.com/itayost', label: 'Instagram', color: 'hover:bg-brand-orange' },
]

export const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: 'טלפון',
    value: '054-499-4417',
    href: PHONE_TEL_HREF,
    description: 'ניתן להתקשר בימים א׳-ה׳',
    color: 'bg-brand-blue',
  },
  {
    icon: Mail,
    title: 'אימייל',
    value: 'itayost1@gmail.com',
    href: 'mailto:itayost1@gmail.com',
    description: 'מענה תוך 24 שעות',
    color: 'bg-brand-orange',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'שלח הודעה',
    href: buildWhatsAppUrl('היי, אשמח לתאם שיחה על פרויקט'),
    description: 'מענה מהיר ונוח',
    color: 'bg-brand-green',
  },
]
