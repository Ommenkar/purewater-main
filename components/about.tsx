import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ArrowRight, Droplets, Filter, Headset, HeartHandshake, Layers, MapPin, Wrench } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { images } from '@/lib/image-data'
import { whatsappLink, whatsappMessages } from '@/lib/site'

const highlights = [
  { icon: Headset, label: 'Professional service support' },
  { icon: Wrench, label: 'RO repair and maintenance' },
  { icon: Filter, label: 'Filter and membrane replacement' },
  { icon: Droplets, label: 'New purifier installation' },
  { icon: Layers, label: 'Multiple water purifier brands' },
  { icon: HeartHandshake, label: 'Customer-focused service' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal variant="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rotate-3 rounded-[2.5rem] bg-linear-to-br from-brand-sky/40 via-secondary to-accent sm:-inset-5"
          />
          <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/20">
            <Image
              src={images.about.src}
              width={images.about.width}
              height={images.about.height}
              alt="Pure Water Solutions service technician in a branded polo standing beside a wall-mounted RO water purifier"
              placeholder="blur"
              blurDataURL={images.about.blurDataURL}
              sizes="(min-width: 1024px) 560px, 90vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-brand-deep/45 to-transparent"
            />
          </div>

          <div
            className="glass animate-float absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl shadow-primary/15 sm:-left-6 sm:px-5 sm:py-4"
            style={{ '--dur': '7s' } as CSSProperties}
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-tight">
              <span className="block font-heading text-base font-semibold text-foreground">Wakad, Pune</span>
              <span className="text-muted-foreground">Pimpri-Chinchwad &amp; nearby</span>
            </p>
          </div>

          <div
            aria-hidden="true"
            className="glass animate-float absolute -right-3 top-8 inline-flex size-16 items-center justify-center rounded-2xl shadow-xl shadow-primary/15 sm:-right-6 sm:size-20"
            style={{ '--dur': '5.5s', '--delay': '1s' } as CSSProperties}
          >
            <Droplets className="size-8 text-primary sm:size-10" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="About Us"
            title="Your local RO repair & water purifier service in Wakad"
          />

          <Reveal delay={80} className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              <strong className="font-semibold text-foreground">Pure Water Solutions</strong> is a professional RO repair
              and water purifier service business based in Wakad, Pimpri-Chinchwad. We help homes across Wakad and the
              surrounding areas of Pune, Maharashtra keep their drinking water clean and their purifiers running smoothly.
            </p>
            <p>
              From RO repair and regular maintenance to filter and membrane replacement, new purifier installation and
              uninstallation, we work with multiple water purifier brands and keep every visit simple, tidy and focused
              on what your purifier needs.
            </p>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <Reveal
                as="li"
                key={item.label}
                delay={120 + index * 60}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground sm:text-[0.95rem]">{item.label}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <a
              href={whatsappLink(whatsappMessages.book)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
            >
              Book Your Service
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
