import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'

import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { images } from '@/lib/image-data'
import { fullAddress, mapsDirectionsUrl, navLinks, services, site, whatsappLink, whatsappMessages } from '@/lib/site'

const linkClass =
  'text-sm text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:text-primary'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-secondary">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-10 w-full fill-background sm:h-14"
      >
        <path d="M0 0H1440V22C1200 62 960 -8 720 24C480 56 240 4 0 30Z" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.3fr]">
          <div className="flex flex-col items-start gap-5">
            <a href="#home" className="inline-flex rounded-2xl bg-background p-3 shadow-sm">
              <Image
                src={images.logo.src}
                width={images.logo.width}
                height={images.logo.height}
                alt={`${site.name} logo`}
                loading="lazy"
                className="h-16 w-auto"
              />
            </a>
            <p className="font-heading text-lg font-semibold text-foreground">{site.name}</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Professional {site.shortDescription}
            </p>
            <a
              href={whatsappLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-white shadow-md shadow-whatsapp/25"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </a>
          </div>

          <nav aria-label="Quick links" className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Quick Links</h2>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.privacyUrl} className={linkClass}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Our services" className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Our Services</h2>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a href="#services" className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Contact</h2>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href={`tel:${site.phoneTel}`} className={`${linkClass} flex items-center gap-3`}>
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} flex items-center gap-3 break-all`}>
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} flex items-start gap-3 leading-relaxed`}
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <address className="not-italic">{fullAddress}</address>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <a
            href={site.privacyUrl}
            className="font-medium text-secondary-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
