import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/**
 * Attach the returned ref to an element to have `isRevealed` flip to
 * true once it scrolls into view, so you can drive a fade/slide-in
 * transition off it. Reveals immediately, with no observing at all,
 * when the user prefers reduced motion.
 *
 * Usage:
 *   const [ref, isRevealed] = useScrollReveal();
 *   <div ref={ref} className={isRevealed ? "in-view" : ""}>...</div>
 *
 * `once` (default true) stops observing after the first reveal; set it
 * to false if the element should re-hide when it scrolls back out.
 */
export default function useScrollReveal({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, once]);

  return [ref, isRevealed];
}
