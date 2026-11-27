import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { images } from '@/lib/image-data'
import { services, whatsappLink, whatsappMessages } from '@/lib/site'

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-linear-to-b from-background via-secondary/70 to-background py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -right-40 top-20 size-[28rem] rounded-full bg-brand-sky/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Our RO Services"
          subtitle="Professional water purifier repair, maintenance and installation services."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8">
          {services.map((service, index) => {
            const image = images[service.image]
            return (
              <Reveal as="li" key={service.slug} delay={(index % 2) * 110} variant="zoom">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-md shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/15">
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <Image
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={service.alt}
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      sizes="(min-width: 640px) 480px, 92vw"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-brand-deep/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="glass absolute left-4 top-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 font-heading text-sm font-semibold text-primary shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
                    <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {service.title}
                    </h3>
                    <a
                      href={whatsappLink(whatsappMessages.service(service.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire on WhatsApp about ${service.title}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-whatsapp/10 px-4 py-2.5 text-sm font-semibold text-whatsapp transition-colors duration-300 hover:bg-whatsapp hover:text-white"
                    >
                      <WhatsAppIcon className="size-4" />
                      Enquire on WhatsApp
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
