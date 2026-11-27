'use client'

import { useState, type FormEvent } from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'

import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { enquiryServiceOptions, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

type Fields = { name: string; phone: string; service: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const emptyFields: Fields = { name: '', phone: '', service: '', message: '' }

function normalisePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (fields.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(normalisePhone(fields.phone))) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (!fields.service) errors.service = 'Please choose the service you need.'
  if (fields.message.length > 600) errors.message = 'Please keep your message under 600 characters.'
  return errors
}

function buildMessage(fields: Fields) {
  const lines = [
    'Hello Pure Water Solutions, I would like to make a service enquiry.',
    '',
    `Name: ${fields.name.trim()}`,
    `Phone: ${normalisePhone(fields.phone)}`,
    `Required Service: ${fields.service}`,
  ]
  if (fields.message.trim()) lines.push(`Message: ${fields.message.trim()}`)
  return lines.join('\n')
}

const inputClass =
  'w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-invalid:border-destructive aria-invalid:ring-destructive/15'

export function EnquiryForm() {
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [errors, setErrors] = useState<Errors>({})
  const [sentHref, setSentHref] = useState<string | null>(null)

  const update = (key: keyof Fields, value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }))
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof Fields>)[0]
    if (firstInvalid) {
      setSentHref(null)
      document.getElementById(`enquiry-${firstInvalid}`)?.focus()
      return
    }
    const href = whatsappLink(buildMessage(fields))
    setSentHref(href)
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const fieldError = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`enquiry-${key}-error`} className="flex items-center gap-1.5 text-sm font-medium text-destructive">
        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
        {errors[key]}
      </p>
    ) : null

  const describedBy = (key: keyof Fields) => (errors[key] ? `enquiry-${key}-error` : undefined)

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-labelledby="enquiry-title">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="enquiry-name" className="text-sm font-semibold text-foreground">
            Customer Name
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            value={fields.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass}
          />
          {fieldError('name')}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="enquiry-phone" className="text-sm font-semibold text-foreground">
            Phone Number
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="10-digit mobile number"
            value={fields.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            className={inputClass}
          />
          {fieldError('phone')}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="enquiry-service" className="text-sm font-semibold text-foreground">
          Required Service
        </label>
        <select
          id="enquiry-service"
          name="service"
          required
          value={fields.service}
          onChange={(event) => update('service', event.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy('service')}
          className={cn(inputClass, !fields.service && 'text-muted-foreground/80')}
        >
          <option value="" disabled>
            Select a service
          </option>
          {enquiryServiceOptions.map((option) => (
            <option key={option} value={option} className="text-foreground">
              {option}
            </option>
          ))}
        </select>
        {fieldError('service')}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="enquiry-message" className="text-sm font-semibold text-foreground">
          Message <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          placeholder="Tell us about your purifier or the issue you are facing"
          value={fields.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={cn(inputClass, 'resize-y')}
        />
        {fieldError('message')}
      </div>

      <button
        type="submit"
        className="btn-cta inline-flex h-13 min-h-13 items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 text-base font-semibold text-white shadow-lg shadow-whatsapp/25 hover:shadow-xl hover:shadow-whatsapp/35"
      >
        <WhatsAppIcon className="size-5" />
        Send Enquiry on WhatsApp
      </button>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Submitting opens WhatsApp with your details filled in. Nothing is stored on this website.
      </p>

      <div aria-live="polite">
        {sentHref ? (
          <p className="card-in flex items-start gap-2.5 rounded-2xl border border-whatsapp/25 bg-whatsapp/10 p-4 text-sm leading-relaxed text-foreground">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-whatsapp" aria-hidden="true" />
            <span>
              WhatsApp has opened with your enquiry. Tap send there to deliver it.{' '}
              <a href={sentHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-whatsapp underline underline-offset-4">
                WhatsApp did not open? Tap here.
              </a>
            </span>
          </p>
        ) : null}
      </div>
    </form>
  )
}
