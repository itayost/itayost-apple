export interface Service {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
}

export interface PortfolioProject {
  id: string
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  link?: string
  featured?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image?: string
  rating: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  image?: string
  tags: string[]
  readTime: number
}
