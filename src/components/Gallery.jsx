import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * images: [{ src, alt }]
 * First image spans 2x2 to anchor the grid; rest fill in around it.
 * Images cascade in individually (staggered) as the section enters view.
 */
export default function Gallery({ title = 'The Space', images = [] }) {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-heading text-4xl text-brand-text mb-10 text-center">{title}</h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={item}
            className={`overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={img.src}
              alt={img.alt || ''}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
