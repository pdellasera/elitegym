import { useEffect, useRef, useState } from 'preact/hooks'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Hook that detects when an element enters the viewport.
 * Returns a ref to attach and a boolean `visible`.
 * Once visible, stays visible (no re-hide on scroll out).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}

/**
 * CSS class helper for staggered reveal animations.
 * @param visible - whether the element is in viewport
 * @param delay - delay index (0, 1, 2...) — each step = 150ms
 */
export function revealClass(visible: boolean, delay: number = 0): string {
  const delayMs = delay * 150
  return `transition-all duration-700 ${
    visible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8'
  }`
    + (delayMs ? ` delay-[${delayMs}ms]` : '')
}
