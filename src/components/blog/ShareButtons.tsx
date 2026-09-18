'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Linkedin, Facebook, Link2, Check } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-600',
      bgColor: 'bg-blue-600/10',
      textColor: 'text-blue-600'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-500'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={`${className}`}>
      <h3 className="mb-3 text-sm font-bold text-pad-red">שתפו את המאמר</h3>
      <div className="flex gap-2">
        {shareLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center border-2 border-pad-ink text-pad-ink transition-colors hover:bg-pad-ink hover:text-pad-yellow"
            aria-label={`שתף ב-${link.label}`}
          >
            <link.icon aria-hidden="true" size={18} />
          </a>
        ))}

        <button
          type="button"
          onClick={copyToClipboard}
          className={`flex h-12 w-12 items-center justify-center border-2 transition-colors ${
            copied ? 'border-pad-whatsapp bg-pad-whatsapp text-white' : 'border-pad-ink text-pad-ink hover:bg-pad-ink hover:text-pad-yellow'
          }`}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Link2 size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

// Mobile version - horizontal bar
export function ShareButtonsMobile({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      bgColor: 'bg-green-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bgColor: 'bg-blue-600'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bgColor: 'bg-blue-500'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center justify-center gap-3 py-4" dir="rtl">
      <span className="text-sm font-bold text-pad-red">שתפו:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center border-2 border-pad-ink text-pad-ink transition-colors hover:bg-pad-ink hover:text-pad-yellow"
          aria-label={`שתף ב-${link.label}`}
        >
          <link.icon size={18} />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        type="button"
        className={`flex h-12 w-12 items-center justify-center border-2 transition-colors ${
          copied ? 'border-pad-whatsapp bg-pad-whatsapp text-white' : 'border-pad-ink text-pad-ink'
        }`}
        aria-label="העתק קישור"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
    </div>
  )
}
