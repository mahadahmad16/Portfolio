import { cn } from "../../utils/helpers";
import "./GlowCard.css";

/**
 * Generic glass-panel card used across Projects, Certificates, Skills,
 * etc. Pass `as="article"` (or any tag) for semantics, and `interactive`
 * to get the hover lift + glow used for clickable cards.
 */
export default function GlowCard({
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  const classes = cn("glow-card", interactive && "glow-card--interactive", className);

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
