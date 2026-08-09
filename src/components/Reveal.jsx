import { motion } from 'framer-motion'

/**
 * Fades + rises a section in once it hits the viewport. One per section,
 * not per child - looks orchestrated instead of busy.
 *
 * <Reveal><Gallery ... /></Reveal>
 * For grids of cards, use RevealGroup below instead.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  once = true,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggers children in one at a time - menu grids, gallery thumbnails,
 * testimonial cards. Beats having everything pop in at once.
 */
export function RevealGroup({ children, className = '', stagger = 0.12 }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
