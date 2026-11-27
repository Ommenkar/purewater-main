'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { images } from '@/lib/image-data'
import { navLinks, site, whatsappLink, whatsappMessages } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const link of navLinks) {
      const section = document.getElementById(link.id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const bookHref = whatsappLink(whatsappMessages.book)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand-sky via-primary to-brand-deep"
      />
      <div className="mx-auto max-w-7xl px-3 pt-2 sm:px-6 sm:pt-3">
        <div
          className={cn(
            'glass rounded-2xl transition-shadow duration-500',
            scrolled || open ? 'shadow-lg shadow-primary/10' : 'shadow-sm shadow-primary/5',
          )}
        >
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
            <a
              href="#home"
              className="flex shrink-0 items-center rounded-lg outline-offset-4 transition-transform duration-300 hover:scale-[1.03]"
              onClick={() => setOpen(false)}
            >
              <Image
                src={images.logo.src}
                width={images.logo.width}
                height={images.logo.height}
                alt={`${site.name} logo`}
                preload
                className="h-11 w-auto sm:h-[3.25rem]"
              />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                        active === link.id
                          ? 'bg-secondary text-primary'
                          : 'text-foreground/75 hover:bg-secondary/70 hover:text-primary',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta hidden h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 sm:inline-flex"
              >
                <WhatsAppIcon className="size-4" />
                Book a Service
              </a>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:hidden"
              >
                <span className="relative size-5">
                  <Menu
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-0 size-5 transition-all duration-300',
                      open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
                    )}
                  />
                  <X
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-0 size-5 transition-all duration-300',
                      open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          <div
            id="mobile-menu"
            inert={!open}
            className={cn(
              'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden',
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            )}
          >
            <div className="overflow-hidden">
              <nav aria-label="Mobile" className="border-t border-border/70 px-4 pb-4 pt-2">
                <ul className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <li
                      key={link.id}
                      className={cn(
                        'transition-all duration-500',
                        open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
                      )}
                      style={{ transitionDelay: open ? `${80 + index * 50}ms` : '0ms' }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={active === link.id ? 'true' : undefined}
                        className={cn(
                          'flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors',
                          active === link.id ? 'bg-secondary text-primary' : 'text-foreground/80 hover:bg-secondary/70',
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={bookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-cta mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-md shadow-primary/25"
                >
                  <WhatsAppIcon className="size-5" />
                  Book a Service
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
