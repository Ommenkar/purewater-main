import { Droplet } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn('flex max-w-2xl flex-col gap-4', align === 'center' && 'mx-auto items-center text-center', className)}
    >
      <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-foreground">
        <Droplet className="size-3.5 fill-primary/20 text-primary" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  )
}
