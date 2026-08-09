import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button'

export default function Hero({
  eyebrow = 'Est. 2024',
  title = 'A Place Worth Coming Back To',
  subtitle = 'Seasonal menu, warm hospitality, and a room that feels like home.',
  ctaLabel = 'View Menu',
  onCtaClick,
  imageUrl,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Image moves slower than the scroll, text fades/lifts out slightly faster
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[95vh] flex items-center overflow-hidden bg-brand-surface">
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt=""
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[125%] object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body uppercase tracking-[0.2em] text-brand-accent text-sm mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-7xl text-brand-text leading-tight mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-lg text-brand-muted max-w-xl mx-auto mb-8"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Button variant="primary" onClick={onCtaClick}>{ctaLabel}</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
