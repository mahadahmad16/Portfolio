import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn, isExternalUrl } from "../../utils/helpers";
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
  const classes = cn("btn", `btn--${variant}`, className);
  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    const external = isExternalUrl(href);
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
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
