import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Inertial smooth scroll for the whole app - momentum eases out instead
 * of stopping dead on every wheel tick. Skips entirely if the user has
 * prefers-reduced-motion on, falls back to native scroll.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out — smooth stop, no bounce
      smoothWheel: true,
    })
    lenisRef.current = lenis
    window.__lenis = lenis // used by route-change scroll resets so they call lenis.scrollTo instead of native scrollTo

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      if (window.__lenis === lenis) window.__lenis = null
    }
  }, [])

  return children
}
