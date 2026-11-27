import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { House, Phone } from 'lucide-react'

import { images } from '@/lib/image-data'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <main className="water-surface relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <Link href="/" className="mb-10 inline-flex rounded-2xl bg-background p-3 shadow-sm">
        <Image
          src={images.logo.src}
          width={images.logo.width}
          height={images.logo.height}
          alt={`${site.name} logo`}
          preload
          className="h-16 w-auto"
        />
      </Link>
      <p className="font-heading text-8xl font-semibold tracking-tight text-primary sm:text-9xl">404</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This page has run dry
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        The page you are looking for does not exist or has been moved. Head back home or give us a call for RO service
        in Wakad, Pune.
      </p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="btn-cta inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-lg shadow-primary/25"
        >
          <House className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
        <a
          href={`tel:${site.phoneTel}`}
          className="btn-cta inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/25 bg-background px-7 font-semibold text-primary shadow-sm"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call {site.phoneDisplay}
        </a>
      </div>
    </main>
  )
}
