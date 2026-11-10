import { useState } from 'react'
import Button from './Button'
import Reveal from './Reveal'
import { submitForm } from '../lib/submitForm'
import { SITE } from '../data/site'

/**
 * Theme-able contact/reservation/booking form. Submits through submitForm(): a JSON POST
 * to VITE_FORM_ENDPOINT when it is set, otherwise the visitor's mail app addressed to
 * SITE.email. The thank-you state only shows after the request actually went through.
 * Pass onSubmit to handle submission yourself instead.
 */
export default function ContactForm({
  title = 'Reserve a Table',
  subtitle = "We'll confirm by email within 24 hours.",
  showReservationFields = true,
  onSubmit,
}) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [values, setValues] = useState({
    name: '',
    email: '',
    date: '',
    guests: '2',
    message: '',
  })

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      if (onSubmit) {
        await onSubmit(values)
        setStatus('sent')
      } else {
        setStatus(await submitForm(values, { email: SITE.email, subject: `${title} - ${SITE.name}` }))
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 font-body text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-primary transition-colors'

  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-24">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl text-brand-text mb-3">{title}</h2>
          <p className="font-body text-brand-muted">{subtitle}</p>
        </div>

        {status === 'sent' || status === 'mailto' ? (
          <div className="text-center bg-brand-surface rounded-2xl p-10 border border-brand-border">
            <p className="font-heading text-2xl text-brand-primary mb-2">Thank you!</p>
            <p className="font-body text-brand-muted">
              {status === 'sent'
                ? "We've received your request and will be in touch shortly."
                : 'Your mail app has opened with your message. Press send and we will be in touch.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                required
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Full name"
                className={inputClass}
              />
              <input
                required
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputClass}
              />
            </div>

            {showReservationFields && (
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  required
                  type="datetime-local"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  className={inputClass}
                />
                <select
                  name="guests"
                  value={values.guests}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="Anything we should know? (allergies, special occasion, etc.)"
              rows={4}
              className={inputClass}
            />

            {status === 'error' && (
              <p role="alert" className="font-body text-sm text-red-700 text-center">
                Something went wrong and your message was not sent. Please try again or email {SITE.email}.
              </p>
            )}
            <Button type="submit" variant="primary" className="w-full" disabled={status === 'sending'}>
              {showReservationFields ? 'Request Reservation' : 'Send Message'}
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
