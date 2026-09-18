'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronsLeft,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  Search,
  Settings,
  ShoppingBag,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Workflow,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { home, type AppActivity, type AppStat, type AppTone } from '@/config/home'

const { hero } = home
const { app } = hero

// The one software surface in the pad world: a light manager app that the
// scrawled sheet lifts away to reveal. It is laid out at a real desktop size and
// scaled to fit, so it reads as a product shot. Adapted from the 21st.dev
// "Dashboard with Collapsible Sidebar" component.
const LAYOUTS = {
  desktop: { width: 1000, height: 800 },
  compact: { width: 520, height: 900 },
} as const
// Below this frame width the desktop layout would render too small to read.
const COMPACT_BREAKPOINT = 520
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const NAV_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  leads: UserPlus,
  customers: Users,
  calendar: CalendarDays,
  orders: ShoppingBag,
  automations: Workflow,
  reports: BarChart3,
  settings: Settings,
  help: HelpCircle,
}

const STAT_ICONS: Record<AppStat['key'], { icon: LucideIcon; tone: AppTone }> = {
  leads: { icon: UserPlus, tone: 'blue' },
  calendar: { icon: CalendarDays, tone: 'violet' },
  revenue: { icon: Wallet, tone: 'green' },
  customers: { icon: Users, tone: 'orange' },
}

const ACTIVITY_ICONS: Record<AppActivity['icon'], LucideIcon> = {
  lead: UserPlus,
  payment: Wallet,
  whatsapp: MessageCircle,
  quote: FileText,
  calendar: XCircle,
}

const TONE: Record<AppTone, { soft: string; ink: string; bar: string }> = {
  blue: { soft: 'bg-blue-50', ink: 'text-pad-carbon', bar: 'bg-pad-carbon' },
  green: {
    soft: 'bg-emerald-50',
    ink: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
  violet: {
    soft: 'bg-violet-50',
    ink: 'text-violet-600',
    bar: 'bg-violet-500',
  },
  orange: {
    soft: 'bg-orange-50',
    ink: 'text-orange-600',
    bar: 'bg-orange-500',
  },
  red: { soft: 'bg-rose-50', ink: 'text-rose-600', bar: 'bg-rose-500' },
}

/** Picks the layout for the frame width and scales that fixed-size layout to fit. */
function useFitScale() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [frameWidth, setFrameWidth] = useState<number>(LAYOUTS.desktop.width / 2)
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setFrameWidth(entry.contentRect.width)
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])
  const isCompact = frameWidth < COMPACT_BREAKPOINT
  const layout = isCompact ? LAYOUTS.compact : LAYOUTS.desktop
  return { frameRef, isCompact, layout, scale: frameWidth / layout.width }
}

function Sidebar() {
  return (
    <nav className="flex w-[232px] shrink-0 flex-col border-e border-slate-200 bg-white p-2">
      <div className="mb-5 border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between rounded-md p-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-content-center rounded-lg bg-pad-carbon text-sm font-bold text-white shadow-sm">
              IO
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900">{app.business}</span>
              <span className="block text-xs text-slate-500">{app.plan}</span>
            </span>
          </div>
          <ChevronDown aria-hidden="true" className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="space-y-1">
        {app.nav.map((item, index) => {
          const Icon = NAV_ICONS[item.key] ?? LayoutDashboard
          const isSelected = index === 0
          return (
            <div
              key={item.key}
              className={`relative flex h-11 items-center rounded-md ${
                isSelected ? 'border-s-2 border-pad-carbon bg-blue-50 text-pad-carbon shadow-sm' : 'text-slate-600'
              }`}
            >
              <span className="grid h-full w-12 place-content-center">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute end-3 grid h-5 w-5 place-content-center rounded-full bg-pad-carbon text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 space-y-1 border-t border-slate-200 pt-4">
        <p className="px-3 py-2 text-xs font-medium text-slate-500">{app.accountLabel}</p>
        {app.accountNav.map((item) => {
          const Icon = NAV_ICONS[item.key] ?? Settings
          return (
            <div key={item.key} className="flex h-11 items-center rounded-md text-slate-600">
              <span className="grid h-full w-12 place-content-center">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-auto flex items-center border-t border-slate-200 p-3 text-slate-500">
        <span className="grid h-10 w-10 place-content-center">
          <ChevronsLeft aria-hidden="true" className="h-4 w-4 rotate-180" />
        </span>
        <span className="text-sm font-medium">{app.collapseLabel}</span>
      </div>
    </nav>
  )
}

function AppContent({ isRevealed, isCompact }: { isRevealed: boolean; isCompact: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const show = isRevealed || Boolean(prefersReducedMotion)
  const enter = (order: number) => ({
    initial: false as const,
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: {
      delay: prefersReducedMotion ? 0 : 0.08 + order * 0.07,
      duration: 0.55,
      ease: EASE_OUT_EXPO,
    },
  })

  return (
    <div className="flex-1 overflow-hidden bg-slate-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-slate-900">{app.title}</p>
          <p className="mt-1 text-slate-600">{app.greeting}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">
            {hero.exampleLabel}
          </span>
          {!isCompact && (
            <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500">
              <Search aria-hidden="true" className="h-4 w-4" />
              חיפוש לקוח
            </span>
          )}
          <span className="relative grid h-10 w-10 place-content-center rounded-lg border border-slate-200 bg-white text-slate-600">
            <Bell aria-hidden="true" className="h-5 w-5" />
            <span className="absolute -end-1 -top-1 h-3 w-3 rounded-full bg-rose-500" />
          </span>
        </div>
      </div>

      <div className={`mb-6 grid gap-4 ${isCompact ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {app.stats.map((stat, index) => {
          const { icon: Icon, tone } = STAT_ICONS[stat.key]
          return (
            <motion.div
              key={stat.key}
              {...enter(index)}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-lg p-2 ${TONE[tone].soft}`}>
                  <Icon aria-hidden="true" className={`h-5 w-5 ${TONE[tone].ink}`} />
                </span>
                <TrendingUp aria-hidden="true" className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mb-1 font-medium text-slate-600">{stat.label}</p>
              <p className="text-2xl font-bold tabular-nums text-slate-900">
                <span dir="ltr">{stat.value}</span>
              </p>
              <p className="mt-1 text-sm text-emerald-600">{stat.delta}</p>
            </motion.div>
          )
        })}
      </div>

      <div className={`grid gap-5 ${isCompact ? 'grid-cols-1' : 'grid-cols-3'}`}>
        <motion.div {...enter(4)} className={`rounded-xl ${isCompact ? '' : 'col-span-2'}`}>
          <div className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-900">{app.activityTitle}</p>
              <span className="text-sm font-medium text-pad-carbon">{app.activityAll}</span>
            </div>
            <div className="space-y-1.5">
              {app.activity.map((item, index) => {
                const Icon = ACTIVITY_ICONS[item.icon]
                return (
                  <motion.div
                    key={item.title}
                    {...enter(5 + index)}
                    className={`flex items-center gap-4 rounded-lg p-2.5 ${index === 0 ? 'bg-slate-50' : ''}`}
                  >
                    <span className={`rounded-lg p-2 ${TONE[item.tone].soft}`}>
                      <Icon aria-hidden="true" className={`h-4 w-4 ${TONE[item.tone].ink}`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-900">{item.title}</span>
                      <span className="block truncate text-xs text-slate-500">{item.detail}</span>
                    </span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {!isCompact && (
          <div className="space-y-6">
            <motion.div {...enter(6)} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-lg font-semibold text-slate-900">{app.quickTitle}</p>
              <div className="space-y-3">
                {app.quick.map((stat, index) => (
                  <div key={stat.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm text-slate-600">{stat.label}</span>
                      <span className="text-sm font-medium tabular-nums text-slate-900">{stat.value}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={false}
                        animate={{ scaleX: show ? stat.value / 100 : 0 }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : 0.5 + index * 0.1,
                          duration: 0.9,
                          ease: EASE_OUT_EXPO,
                        }}
                        className={`h-2 w-full origin-right rounded-full ${TONE[stat.tone].bar}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...enter(7)} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-lg font-semibold text-slate-900">{app.upcomingTitle}</p>
              <div className="space-y-2">
                {app.upcoming.map((slot) => (
                  <div key={slot.time} className="flex items-center gap-3">
                    <span className="w-12 text-sm font-semibold tabular-nums text-pad-carbon">{slot.time}</span>
                    <span className="truncate text-sm text-slate-600">{slot.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

/** A modern manager app for a small business, shown as the system under the scrawl. */
export function ManagerApp({ isRevealed }: { isRevealed: boolean }) {
  const { frameRef, isCompact, layout, scale } = useFitScale()

  return (
    <div
      ref={frameRef}
      className="relative w-full overflow-hidden rounded-xl bg-white shadow-[0_28px_56px_-24px_rgba(8,14,70,0.65)] ring-1 ring-slate-900/10"
      style={{ height: layout.height * scale }}
    >
      <p className="sr-only">
        {hero.exampleLabel}: {app.title}. {app.stats.map((stat) => `${stat.label} ${stat.value}`).join(', ')}.
      </p>
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 flex origin-top-right font-pad-body text-slate-900"
        style={{
          width: layout.width,
          height: layout.height,
          transform: `scale(${scale})`,
        }}
      >
        {!isCompact && <Sidebar />}
        <AppContent isRevealed={isRevealed} isCompact={isCompact} />
      </div>
    </div>
  )
}
