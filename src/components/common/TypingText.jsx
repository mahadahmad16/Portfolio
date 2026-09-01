import useTypingEffect from "../../hooks/useTypingEffect";
import "./TypingText.css";

/**
 * Renders the word cycling from useTypingEffect with a blinking cursor.
 * Screen readers get the full word list at once instead of a live-typing
 * stream — see the visually-hidden span below.
 */
export default function TypingText({ words, loop = true, className = "" }) {
  const text = useTypingEffect(words, { loop });

  return (
    <span className={`typing-text ${className}`.trim()}>
      <span aria-hidden="true">
        {text}
        <span className="typing-text__cursor" />
      </span>
      <span className="typing-text__sr-only">{words.join(", ")}</span>
    </span>
  );
}
