import type { CSSProperties } from 'react'
import { Check, MapPin, Phone } from 'lucide-react'

import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { site, whatsappLink, whatsappMessages } from '@/lib/site'
import { cn } from '@/lib/utils'

const highlights = ['RO Repair & Maintenance', 'Filter Replacement', 'New RO Installation', 'All Major RO Brands']

const bubbles = [
  { left: 4, size: 18, dur: 13, delay: 0, drift: 30 },
  { left: 11, size: 42, dur: 19, delay: 4, drift: -24, wide: true },
  { left: 19, size: 12, dur: 11, delay: 7, drift: 18 },
  { left: 27, size: 26, dur: 16, delay: 2, drift: -30 },
  { left: 36, size: 14, dur: 12, delay: 9, drift: 22, wide: true },
  { left: 45, size: 34, dur: 21, delay: 6, drift: -18 },
  { left: 54, size: 16, dur: 14, delay: 1, drift: 26 },
  { left: 63, size: 22, dur: 17, delay: 10, drift: -22, wide: true },
  { left: 71, size: 48, dur: 22, delay: 3, drift: 20 },
  { left: 79, size: 14, dur: 12, delay: 8, drift: -26 },
  { left: 87, size: 30, dur: 18, delay: 5, drift: 24, wide: true },
  { left: 94, size: 18, dur: 15, delay: 11, drift: -20 },
]

const wavePath =
  'M0 60 C200 10 400 110 600 60 C800 10 1000 110 1200 60 C1400 10 1600 110 1800 60 C2000 10 2200 110 2400 60 V120 H0 Z'

const waves = [
  { dur: 26, className: 'h-20 text-brand-sky/35 sm:h-28', reverse: false },
  { dur: 19, className: 'h-16 text-primary/20 sm:h-24', reverse: true },
  { dur: 14, className: 'h-12 text-background sm:h-16', reverse: false },
]

function Word({ children, delay, className }: { children: string; delay: number; className?: string }) {
  return (
    <span className="word">
      <span className={className} style={{ '--delay': `${delay}s` } as CSSProperties}>
        {children}
      </span>
    </span>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="water-surface relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="animate-blob absolute -left-32 -top-24 size-[30rem] rounded-full bg-brand-sky/30 blur-3xl"
          style={{ '--dur': '18s' } as CSSProperties}
        />
        <div
          className="animate-blob absolute -right-24 top-1/4 size-[26rem] rounded-full bg-primary/15 blur-3xl"
          style={{ '--dur': '22s' } as CSSProperties}
        />
        <div
          className="animate-blob absolute bottom-24 left-1/3 size-56 rounded-full bg-accent blur-3xl"
          style={{ '--dur': '26s' } as CSSProperties}
        />

        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 sm:size-[46rem]">
          {[0, 2.3, 4.6].map((delay) => (
            <span
              key={delay}
              className="ripple absolute inset-0 rounded-full border border-primary/20 opacity-0"
              style={{ '--delay': `${delay}s` } as CSSProperties}
            />
          ))}
        </div>

        {bubbles.map((bubble) => (
          <span
            key={bubble.left}
            className={cn('bubble', bubble.wide && 'max-sm:hidden')}
            style={
              {
                left: `${bubble.left}%`,
                width: bubble.size,
                height: bubble.size,
                '--dur': `${bubble.dur}s`,
                '--delay': `${bubble.delay}s`,
                '--drift': `${bubble.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-40 pt-32 text-center sm:px-6 sm:pb-48 sm:pt-36">
        <p
          className="glass animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-secondary-foreground shadow-sm shadow-primary/10 sm:text-sm"
          style={{ '--delay': '0.05s' } as CSSProperties}
        >
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          RO Repair &amp; Water Purifier Service in Wakad, Pune
        </p>

        <h1
          id="hero-title"
          className="mt-7 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
        >
          <Word delay={0.12}>Pure</Word> <Word delay={0.2}>Water.</Word>
          <br />
          <Word delay={0.3} className="bg-linear-to-r from-brand-deep via-primary to-brand-sky bg-clip-text text-transparent">
            Perfect
          </Word>{' '}
          <Word delay={0.38} className="bg-linear-to-r from-primary to-brand-sky bg-clip-text text-transparent">
            Service.
          </Word>
        </h1>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:flex-nowrap">
          {highlights.map((item, index) => (
            <li
              key={item}
              className="glass animate-fade-up inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium text-foreground shadow-sm shadow-primary/10 transition-transform duration-300 hover:-translate-y-0.5 sm:text-base"
              style={{ '--delay': `${0.55 + index * 0.08}s` } as CSSProperties}
            >
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div
          className="animate-fade-up mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center"
          style={{ '--delay': '0.95s' } as CSSProperties}
        >
          <a
            href={`tel:${site.phoneTel}`}
            className="btn-cta inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-9 text-lg font-semibold text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40"
          >
            <Phone className="animate-ring size-5" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={whatsappLink(whatsappMessages.book)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta inline-flex h-14 items-center justify-center gap-3 rounded-full bg-whatsapp px-9 text-lg font-semibold text-white shadow-xl shadow-whatsapp/30 hover:shadow-2xl hover:shadow-whatsapp/40"
          >
            <WhatsAppIcon className="size-5" />
            Book Now
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 sm:h-36">
        {waves.map((wave) => (
          <svg
            key={wave.dur}
            viewBox="0 0 2400 120"
            preserveAspectRatio="none"
            className={cn(
              'wave absolute bottom-0 left-0 w-[200%] fill-current',
              wave.className,
              wave.reverse && 'wave-reverse',
            )}
            style={{ '--dur': `${wave.dur}s` } as CSSProperties}
          >
            <path d={wavePath} />
          </svg>
        ))}
      </div>
    </section>
  )
}
