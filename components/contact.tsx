import type { ReactNode } from 'react'
import { Mail, MapPin, Navigation, Phone } from 'lucide-react'

import { EnquiryForm } from '@/components/enquiry-form'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { fullAddress, mapsDirectionsUrl, mapsEmbedUrl, site, whatsappLink, whatsappMessages } from '@/lib/site'

type ContactCardProps = {
  icon: ReactNode
  label: string
  value: string
  href: string
  external?: boolean
  tone?: 'primary' | 'whatsapp'
}

function ContactCard({ icon, label, value, href, external, tone = 'primary' }: ContactCardProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    >
      <span
        className={
          tone === 'whatsapp'
            ? 'inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-whatsapp/10 text-whatsapp transition-colors duration-300 group-hover:bg-whatsapp group-hover:text-white'
            : 'inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground'
        }
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        <span className="break-words font-heading text-base font-semibold text-foreground sm:text-lg">{value}</span>
      </span>
    </a>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-linear-to-b from-background via-secondary/80 to-secondary py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -right-32 top-10 size-[26rem] rounded-full bg-brand-sky/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-24 bottom-10 size-72 rounded-full bg-accent blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Get in Touch"
          subtitle="Call, WhatsApp or send a quick enquiry for RO repair and water purifier service in Wakad, Pimpri-Chinchwad and nearby areas of Pune."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal variant="left" className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard
                icon={<Phone className="size-5" aria-hidden="true" />}
                label="Phone"
                value={site.phoneDisplay}
                href={`tel:${site.phoneTel}`}
              />
              <ContactCard
                icon={<WhatsAppIcon className="size-5" />}
                label="WhatsApp"
                value="Chat with us"
                href={whatsappLink(whatsappMessages.general)}
                external
                tone="whatsapp"
              />
            </div>
            <ContactCard
              icon={<Mail className="size-5" aria-hidden="true" />}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />

            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-md shadow-primary/5">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <address className="not-italic">
                    <span className="block font-heading text-base font-semibold text-foreground sm:text-lg">{site.name}</span>
                    <span className="block text-sm leading-relaxed text-muted-foreground">{fullAddress}</span>
                  </address>
                </div>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20"
                >
                  <Navigation className="size-4" aria-hidden="true" />
                  Get Directions
                </a>
              </div>
              <iframe
                title={`Map showing the location of ${site.name} in Wakad, Pimpri-Chinchwad`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full border-0 sm:h-72"
              />
            </div>
          </Reveal>

          <Reveal variant="right" className="glass rounded-3xl p-6 shadow-xl shadow-primary/10 sm:p-8">
            <h3 id="enquiry-title" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Service Enquiry
            </h3>
            <p className="mb-7 mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Share a few details and continue the conversation on WhatsApp.
            </p>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
