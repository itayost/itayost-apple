'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft } from 'lucide-react'

const bouncyEasing = [0.34, 1.56, 0.64, 1]

interface SidebarCTAProps {
  className?: string
}

export function SidebarCTA({ className = '' }: SidebarCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: bouncyEasing }}
      className={`rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-6 text-white ${className}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <MessageCircle size={20} />
        </div>
        <h3 className="font-bold text-lg">צריכים עזרה?</h3>
      </div>

      <p className="text-white/90 text-sm mb-4 leading-relaxed">
        רוצים לדעת איך ליישם את מה שקראתם? נשמח לעזור!
      </p>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: bouncyEasing }}
      >
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 w-full py-3 bg-white text-brand-blue rounded-xl font-semibold text-sm hover:shadow-lg transition-shadow"
        >
          דברו איתנו
          <ArrowLeft size={16} />
        </Link>
      </motion.div>
    </motion.div>
  )
}
