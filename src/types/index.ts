// Type definitions for the application

export interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  gradient: string
  technologies: string[]
  link: string | null
  featured: boolean
}

export interface Service {
  icon: string
  title: string
  description: string
  features?: string[]
  price?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface NavigationItem {
  label: string
  href: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  image?: string
  rating?: number
}