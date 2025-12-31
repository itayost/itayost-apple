'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Linkedin, Facebook, Link2, Check } from 'lucide-react'

const bouncyEasing = [0.34, 1.56, 0.64, 1]

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
      <h3 className="text-sm font-semibold text-brand-gray-600 mb-3">שתפו את המאמר</h3>
      <div className="flex gap-2">
        {shareLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-xl ${link.bgColor} ${link.textColor} flex items-center justify-center ${link.color} hover:text-white transition-colors`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3, ease: bouncyEasing }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            aria-label={`שתף ב-${link.label}`}
          >
            <link.icon size={18} />
          </motion.a>
        ))}

        <motion.button
          onClick={copyToClipboard}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-brand-gray-100 text-brand-gray-600 hover:bg-brand-blue hover:text-white'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3, ease: bouncyEasing }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          aria-label="העתק קישור"
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
        </motion.button>
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
    <div className="flex items-center justify-center gap-3 py-4">
      <span className="text-sm text-brand-gray-600">שתפו:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full ${link.bgColor} text-white flex items-center justify-center`}
          aria-label={`שתף ב-${link.label}`}
        >
          <link.icon size={18} />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          copied ? 'bg-green-500 text-white' : 'bg-brand-gray-200 text-brand-gray-700'
        }`}
        aria-label="העתק קישור"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
    </div>
  )
}
