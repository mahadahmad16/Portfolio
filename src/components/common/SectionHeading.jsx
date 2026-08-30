import "./SectionHeading.css";

/**
 * Consistent heading block used at the top of every page: an optional
 * small mono "eyebrow" label, the title, and an optional short blurb.
 * `as` controls the rendered heading level (h1 by default).
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h1",
  align = "left",
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <Tag className="section-heading__title">{title}</Tag>
      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </div>
  );
}