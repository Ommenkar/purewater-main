'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'left' | 'right' | 'zoom'
  as?: ElementType
}

export function Reveal({ children, className, delay = 0, variant = 'up', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!('IntersectionObserver' in window)) {
      element.dataset.visible = 'true'
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
