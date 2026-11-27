'use client'

import Image from 'next/image'
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { images } from '@/lib/image-data'
import { brandCategories, whatsappLink, whatsappMessages, type Product } from '@/lib/site'
import { cn } from '@/lib/utils'

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [current, setCurrent] = useState(0)
  const fullName = product.variant ? `${product.name} (${product.variant})` : product.name

  return (
    <li
      className="card-in w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
      style={{ '--delay': `${index * 70}ms` } as CSSProperties}
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-md shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/15">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {product.images.map((item, imageIndex) => {
            const image = images[item.key]
            const isCurrent = imageIndex === current
            return (
              <div
                key={item.key}
                aria-hidden={!isCurrent}
                className={cn('absolute inset-0 transition-opacity duration-500', isCurrent ? 'opacity-100' : 'opacity-0')}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 scale-125 bg-cover bg-center blur-xl"
                  style={{ backgroundImage: `url(${image.blurDataURL})` }}
                />
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={isCurrent ? item.alt : ''}
                  loading="lazy"
                  sizes="(min-width: 1280px) 290px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                  className="relative h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
              </div>
            )
          })}

          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-primary shadow-sm">
            {product.brand}
          </span>

          {product.images.length > 1 ? (
            <div className="glass absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full p-1 shadow-sm">
              {product.images.map((item, imageIndex) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={`Show image ${imageIndex + 1} of ${product.images.length} for ${product.name}`}
                  aria-pressed={imageIndex === current}
                  onClick={() => setCurrent(imageIndex)}
                  className="inline-flex size-6 items-center justify-center rounded-full"
                >
                  <span
                    className={cn(
                      'block h-2 rounded-full transition-all duration-300',
                      imageIndex === current ? 'w-5 bg-primary' : 'w-2 bg-primary/30',
                    )}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-1 flex-col gap-2">
            <h4 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground">
              {product.name}
            </h4>
            {product.variant ? (
              <p className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {product.variant}
              </p>
            ) : null}
          </div>
          <a
            href={whatsappLink(whatsappMessages.product(fullName))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire now about ${fullName} on WhatsApp`}
            className="btn-cta inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
          >
            <WhatsAppIcon className="size-4" />
            Enquire Now
          </a>
        </div>
      </article>
    </li>
  )
}

export function Products() {
  const [active, setActive] = useState(brandCategories[0].id)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = brandCategories.findIndex((category) => category.id === active)
    const last = brandCategories.length - 1
    let next = currentIndex
    if (event.key === 'ArrowRight') next = currentIndex === last ? 0 : currentIndex + 1
    else if (event.key === 'ArrowLeft') next = currentIndex === 0 ? last : currentIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    setActive(brandCategories[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="products" aria-labelledby="products-title" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-40 top-1/3 size-[26rem] rounded-full bg-brand-sky/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="products-title"
          eyebrow="Products"
          title="Explore Our Water Purifiers"
          subtitle="Browse water purifiers by brand and enquire on WhatsApp for availability and pricing."
        />

        <Reveal delay={100} className="mt-10">
          <div
            role="tablist"
            aria-label="Water purifier brands"
            onKeyDown={onKeyDown}
            className="mx-auto flex w-full max-w-full gap-2 overflow-x-auto rounded-full border border-border/70 bg-secondary/60 p-1.5 [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden"
          >
            {brandCategories.map((category, index) => {
              const selected = category.id === active
              return (
                <button
                  key={category.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(category.id)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-6',
                    selected
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                      : 'text-foreground/70 hover:bg-background hover:text-primary',
                  )}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-12">
          {brandCategories.map((category) => (
            <div
              key={category.id}
              role="tabpanel"
              id={`panel-${category.id}`}
              aria-labelledby={`tab-${category.id}`}
              hidden={category.id !== active}
              tabIndex={0}
              className="flex flex-col gap-12 rounded-3xl outline-offset-8"
            >
              {category.groups.map((group, groupIndex) => (
                <div key={group.title ?? groupIndex} className="flex flex-col gap-7">
                  <div className="flex items-center gap-4">
                    <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {group.title ?? category.heading}
                    </h3>
                    <span aria-hidden="true" className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
                  </div>
                  <ul className="flex flex-wrap justify-center gap-6">
                    {group.products.map((product, index) => (
                      <ProductCard key={`${product.name}-${product.variant ?? ''}`} product={product} index={index} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </Reveal>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Brand names and product images belong to their respective owners and are shown for identification only.
        </p>
      </div>
    </section>
  )
}
