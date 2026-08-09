import Reveal from './Reveal'

/**
 * A split image/text section — used for About/Story blocks across all
 * 6 templates. `reverse` flips image to the right for visual rhythm when
 * used more than once on a page.
 */
export default function About({
  eyebrow = 'Our Story',
  title = 'Rooted in Craft, Built on Hospitality',
  paragraphs = [],
  imageUrl,
  reverse = false,
}) {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div
        className={`grid md:grid-cols-2 gap-12 items-center ${
          reverse ? 'md:[direction:rtl]' : ''
        }`}
      >
        <Reveal y={20}>
          <div className={reverse ? 'md:[direction:ltr]' : ''}>
            <p className="font-body uppercase tracking-[0.2em] text-brand-accent text-sm mb-4">
              {eyebrow}
            </p>
            <h2 className="font-heading text-4xl text-brand-text mb-6 leading-tight">{title}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="font-body text-brand-muted leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal y={20} delay={0.1}>
          <div className={`rounded-2xl overflow-hidden aspect-[4/5] bg-brand-surface ${reverse ? 'md:[direction:ltr]' : ''}`}>
            {imageUrl && <img src={imageUrl} alt="" className="w-full h-full object-cover" />}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
