import { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Pass `href` for an external link, `to` for an internal route, or
 * neither for a click handler — renders an <a>, router <Link>, or
 * <button> accordingly so callers don't have to pick the tag themselves.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    icon: Icon,
    iconPosition = "left",
    href,
    to,
    className = "",
    ...rest
  },
  ref
) {
  const classes = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} type={rest.type || "button"} className={classes} {...rest}>
      {content}
    </button>
  );
});

export default Button;