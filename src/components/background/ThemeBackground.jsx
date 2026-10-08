import { useEffect, useRef } from "react";
import "./ThemeBackground.css";

export default function ThemeBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;

    function handlePointerMove(event) {
      if (event.pointerType === "touch") return;

      const gridSize = Number.parseFloat(
        getComputedStyle(background).getPropertyValue("--grid-size")
      );
      const cellX = Math.floor(event.clientX / gridSize) * gridSize;
      const cellY = Math.floor(event.clientY / gridSize) * gridSize;
      background.style.setProperty("--pointer-x", `${event.clientX}px`);
      background.style.setProperty("--pointer-y", `${event.clientY}px`);
      background.style.setProperty("--hover-cell-x", `${cellX}px`);
      background.style.setProperty("--hover-cell-y", `${cellY}px`);
      background.style.setProperty("--hover-glow-opacity", "1");
    }

    function hideHoverGlow(event) {
      if (!event.relatedTarget) {
        background.style.setProperty("--hover-glow-opacity", "0");
      }
    }

    function handleWindowBlur() {
      background.style.setProperty("--hover-glow-opacity", "0");
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", hideHoverGlow);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", hideHoverGlow);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="theme-background" aria-hidden="true">
      <span className="theme-background__hover-grid" />
      <span className="theme-background__wave theme-background__wave--primary" />
      <span className="theme-background__wave theme-background__wave--secondary" />
    </div>
  );
}
