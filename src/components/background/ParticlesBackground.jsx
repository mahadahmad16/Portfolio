import { useEffect, useRef } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";
import { debounce } from "../../utils/helpers";
import "./ParticlesBackground.css";

// accent-cyan as an "r, g, b" triplet so it can be dropped into rgba()
const PARTICLE_COLOR = "95, 212, 255";
const LINK_DISTANCE = 130; // px — lines only draw between particles closer than this
const BASE_SPEED = 0.12; // px per frame — kept slow and lightweight on purpose
const RESIZE_DEBOUNCE_MS = 150;

function getParticleCount(width, height) {
  const area = width * height;
  return Math.min(90, Math.max(28, Math.round(area / 22000)));
}

/**
 * Fixed, full-viewport ambient background: slow drifting particles with
 * faint connecting lines when they pass near each other. Freezes to a
 * single static frame under prefers-reduced-motion, and — since
 * useReducedMotion is reactive — starts/stops live if the user toggles
 * that OS setting while the page is open. Resize handling is debounced
 * so dragging the window doesn't rebuild the particle set every pixel.
 */
export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let frameId = null;
    let isVisible = true;

    function createParticles() {
      const count = getParticleCount(width, height);
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * BASE_SPEED,
        vy: (Math.random() - 0.5) * BASE_SPEED,
        r: Math.random() * 1.4 + 0.6,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles();
    }

    const debouncedResize = debounce(resize, RESIZE_DEBOUNCE_MS);

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const glow = 0.4 + Math.sin(p.pulse) * 0.25; // slow soft pulse
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${glow})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (isVisible && !prefersReducedMotion) {
        frameId = requestAnimationFrame(step);
      }
    }

    function handleVisibilityChange() {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        frameId = requestAnimationFrame(step);
      } else if (frameId) {
        cancelAnimationFrame(frameId);
      }
    }

    resize();
    step();

    window.addEventListener("resize", debouncedResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="particles-bg" aria-hidden="true" />;
}
