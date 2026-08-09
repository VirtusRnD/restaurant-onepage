import { RevealGroup } from './Reveal'

/**
 * reviews: [{ quote, author, rating }]
 */
export default function Testimonials({ title = 'What Guests Say', reviews = [] }) {
  return (
    <section className="bg-brand-surface py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-4xl text-brand-text mb-12 text-center">{title}</h2>
        <RevealGroup className="grid md:grid-cols-3 gap-8" stagger={0.15}>
          {reviews.map((r, i) => (
            <div key={i} className="text-center">
              <div className="text-brand-accent mb-3">{'★'.repeat(r.rating || 5)}</div>
              <p className="font-body text-brand-text italic mb-4">"{r.quote}"</p>
              <p className="font-body text-sm text-brand-muted">— {r.author}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
