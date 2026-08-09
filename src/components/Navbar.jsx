import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

/**
 * links: [{ label, href }]
 * logo: string (brand name) — swap per repo
 * renderLink: optional (link, props) => ReactNode override. Defaults to a
 * plain <a>, right for one-page anchor nav (#menu, #about). Multi-page
 * repos pass a renderLink returning a React Router <Link>, so this same
 * component works unmodified in both repo types.
 * Has a mobile hamburger drawer built in.
 */
export default function Navbar({
  logo = 'Brand',
  links = [],
  ctaLabel = 'Reserve',
  renderLink = (link, props) => (
    <a href={link.href} {...props}>
      {link.label}
    </a>
  ),
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-sm border-b border-brand-border">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="font-heading text-2xl text-brand-primary tracking-tight">
          {logo}
        </a>

        <ul className="hidden md:flex items-center gap-8 font-body text-brand-text">
          {links.map((link) => (
            <li key={link.href}>
              {renderLink(link, { className: 'hover:text-brand-primary transition-colors' })}
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="primary" className="text-sm px-5 py-2.5">
            {ctaLabel}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            className="w-6 h-[2px] bg-brand-text origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="w-6 h-[2px] bg-brand-text"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            className="w-6 h-[2px] bg-brand-text origin-center"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-brand-border bg-brand-bg"
          >
            <ul className="flex flex-col px-6 py-4 gap-4 font-body text-brand-text">
              {links.map((link) => (
                <li key={link.href}>
                  {renderLink(link, {
                    className: 'block py-1 hover:text-brand-primary transition-colors',
                    onClick: () => setOpen(false),
                  })}
                </li>
              ))}
              <li>
                <Button variant="primary" className="w-full mt-2" onClick={() => setOpen(false)}>
                  {ctaLabel}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
