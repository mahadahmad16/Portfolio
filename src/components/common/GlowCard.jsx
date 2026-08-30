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
  const classes = `glow-card ${interactive ? "glow-card--interactive" : ""} ${className}`.trim();

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}