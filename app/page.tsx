import { About } from '@/components/about'
import { BrandMarquee } from '@/components/brand-marquee'
import { Contact } from '@/components/contact'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import { Hero } from '@/components/hero'
import { Products } from '@/components/products'
import { Services } from '@/components/services'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <BrandMarquee />
        <About />
        <Services />
        <Products />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  )
}
