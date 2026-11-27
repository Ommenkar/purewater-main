import type { CSSProperties } from 'react'

import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { whatsappLink, whatsappMessages } from '@/lib/site'

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(whatsappMessages.book)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pure Water Solutions on WhatsApp"
      className="group fixed bottom-4 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/40 transition-transform duration-300 hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6 sm:size-16"
    >
      <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full bg-whatsapp" />
      <span
        aria-hidden="true"
        className="pulse-ring absolute inset-0 rounded-full bg-whatsapp"
        style={{ '--delay': '1.2s' } as CSSProperties}
      />
      <WhatsAppIcon className="relative size-7 sm:size-8" />
      <span
        aria-hidden="true"
        className="glass pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        Chat on WhatsApp
      </span>
    </a>
  )
}
