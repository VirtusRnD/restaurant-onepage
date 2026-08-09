import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-body font-medium tracking-wide'
  const variants = {
    primary: 'bg-brand-primary text-brand-bg hover:bg-brand-secondary',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-bg',
    ghost: 'text-brand-text hover:text-brand-primary',
  }
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
