import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";
import "./CursorFollower.css";

const EASE = 0.18; // how quickly the outer ring catches up to the pointer (0–1, higher = snappier)
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [data-cursor='interactive']";

/**
 * Custom cursor: a small dot that tracks the pointer precisely, plus a
 * larger rounded-square ring that trails behind it with easing. Grows
 * and glows on hover over interactive elements.
 *
 * Desktop (fine-pointer) only — renders nothing at all on touch
 * devices, where there's no cursor to replace. The native cursor is
 * hidden via a body class added in JS (not a bare CSS media query),
 * so if this component ever fails to mount, the real cursor stays
 * visible instead of silently disappearing.
 *
 * Known limitation: mousemove doesn't bubble out of <iframe>
 * elements (the Resume page's PDF preview), so the cursor will freeze
 * in place while hovering one — a common, accepted tradeoff for this
 * pattern across the web, not something fixable from the parent page.
 */
export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect a fine (mouse/trackpad) pointer, reactively
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);
    const handleChange = (event) => setIsFinePointer(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Hide the native cursor only while this component is actually
  // active — never via a standalone CSS rule that could outlive a JS
  // failure.
  useEffect(() => {
    if (!isFinePointer) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");
    return () => document.body.classList.remove("has-custom-cursor");
  }, [isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId = null;
    let isPageVisible = true;

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      setIsVisible(true);
    }

    function handleMouseLeaveWindow() {
      setIsVisible(false);
    }

    function handleMouseOver(event) {
      setIsHoveringInteractive(Boolean(event.target.closest(INTERACTIVE_SELECTOR)));
    }

    function tick() {
      if (prefersReducedMotion) {
        ringX = mouseX;
        ringY = mouseY;
      } else {
        ringX += (mouseX - ringX) * EASE;
        ringY += (mouseY - ringY) * EASE;
      }
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      if (isPageVisible) frameId = requestAnimationFrame(tick);
    }

    function handleVisibilityChange() {
      isPageVisible = !document.hidden;
      if (isPageVisible) frameId = requestAnimationFrame(tick);
      else if (frameId) cancelAnimationFrame(frameId);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    frameId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isFinePointer, prefersReducedMotion]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "cursor-dot--visible" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? "cursor-ring--visible" : ""} ${
          isHoveringInteractive ? "cursor-ring--active" : ""
        }`}
        aria-hidden="true"
      />
    </>
  );
}
