import { useEffect, useState } from "react";
import "./TypingText.css";

const TYPE_SPEED = 70; // ms per character while typing
const DELETE_SPEED = 40; // ms per character while deleting
const HOLD_TIME = 1400; // ms to pause on a fully-typed word

/**
 * Types out each word in `words`, holds, deletes it, and moves to the
 * next — loops forever by default (set `loop={false}` to stop after
 * the last word). Renders the first word statically, with no
 * animation, when the user prefers reduced motion.
 */
export default function TypingText({ words, loop = true, className = "" }) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(prefersReducedMotion ? words[0] : "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return; // static — nothing to animate

    const currentWord = words[wordIndex % words.length];
    const atEndOfWord = !isDeleting && text === currentWord;
    const atStartOfWord = isDeleting && text === "";

    if (atEndOfWord && (loop || wordIndex < words.length - 1)) {
      const holdTimer = setTimeout(() => setIsDeleting(true), HOLD_TIME);
      return () => clearTimeout(holdTimer);
    }

    if (atStartOfWord) {
      setIsDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
      return;
    }

    const delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    const step = setTimeout(() => {
      setText((current) =>
        isDeleting
          ? currentWord.slice(0, current.length - 1)
          : currentWord.slice(0, current.length + 1)
      );
    }, delay);

    return () => clearTimeout(step);
  }, [text, isDeleting, wordIndex, words, loop, prefersReducedMotion]);

  return (
    <span className={`typing-text ${className}`.trim()}>
      <span aria-hidden="true">
        {text}
        <span className="typing-text__cursor" />
      </span>
      {/* Screen readers get the full list at once instead of a live-typing stream */}
      <span className="typing-text__sr-only">{words.join(", ")}</span>
    </span>
  );
}