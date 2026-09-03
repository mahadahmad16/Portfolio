import { useEffect } from "react";
import ParticlesBackground from "../background/ParticlesBackground";
import useReducedMotion from "../../hooks/useReducedMotion";
import "./SplashScreen.css";
import profileImage from "../../assets/images/My Photo.png";

const DEFAULT_DURATION_MS = 3000; // 3 seconds

export default function SplashScreen({ duration = DEFAULT_DURATION_MS, onFinish }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => onFinish?.(), duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <div className="splash">
      <ParticlesBackground />

      <div className="splash__content" role="status" aria-live="polite">
        <span
          className={`splash__avatar ${
            prefersReducedMotion ? "" : "splash__avatar--pulse"
          }`}
          aria-hidden="true"
        >
          <img src={profileImage} alt="" />
        </span>
        <h1 className="splash__name">Mahad Ahmad</h1>
        <p className="splash__badge">Welcome to my portfolio</p>
      </div>
    </div>
  );
}
