import { useState } from 'react'
import Button from './Button'
import Reveal from './Reveal'

/**
 * Theme-able contact/reservation form. UI + local state only — no backend
 * wired up. Pass onSubmit to handle real submission (e.g. POST to a
 * reservation API, mailto, or a form service like Formspree). Falls back
 * to console logging + a visible confirmation state so it's demo-able as-is.
 *
 * fields: which inputs to show — reservation forms want 'date'/'guests',
 * a plain contact form can drop them.
 */
export default function ContactForm({
  title = 'Reserve a Table',
  subtitle = "We'll confirm by email within 24 hours.",
  showReservationFields = true,
  onSubmit,
}) {
  const [submitted, setSubmitted] = useState(false)
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

  function handleSubmit(e) {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(values)
    } else {
      console.log('Reservation/contact submission:', values)
    }
    setSubmitted(true)
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

        {submitted ? (
          <div className="text-center bg-brand-surface rounded-2xl p-10 border border-brand-border">
            <p className="font-heading text-2xl text-brand-primary mb-2">Thank you!</p>
            <p className="font-body text-brand-muted">
              We've received your request and will be in touch shortly.
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

            <Button type="submit" variant="primary" className="w-full">
              {showReservationFields ? 'Request Reservation' : 'Send Message'}
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
