import { Droplet } from 'lucide-react'

import { servicedBrands } from '@/lib/site'

function BrandList({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {servicedBrands.map((brand) => (
        <li key={brand} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground/70 sm:text-2xl">{brand}</span>
          <Droplet className="size-4 fill-brand-sky/40 text-brand-sky" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
}

export function BrandMarquee() {
  return (
    <section aria-label="Water purifier brands we service" className="border-b border-border/60 bg-background py-8">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Service for all major RO brands
      </p>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max">
          <BrandList />
          <BrandList hidden />
        </div>
      </div>
    </section>
  )
}
