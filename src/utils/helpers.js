/**
 * Joins class names, filtering out falsy values (undefined, null,
 * false, ""). Shorter and safer than the repeated
 * `` `${a} ${b}`.trim() `` pattern used throughout the components.
 *
 *   cn("btn", isActive && "btn--active", className)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** True for links that should open in a new tab or hand off to another app. */
export function isExternalUrl(href = "") {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

/**
 * Delays calling `fn` until `delay` ms have passed without another
 * call — useful for resize/scroll handlers that would otherwise fire
 * far more often than the UI actually needs to update.
 */
export function debounce(fn, delay = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
