import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeBackground from "../background/ThemeBackground";
import useReducedMotion from "../../hooks/useReducedMotion";
import "./SplashScreen.css";
import profileImage from "../../assets/images/My Photo Theme.png";

const DEFAULT_DURATION_MS = 3000; // 3 seconds
const COMPLETION_MESSAGE_DURATION_MS = 1100;

export default function SplashScreen({ duration = DEFAULT_DURATION_MS, onFinish }) {
  const prefersReducedMotion = useReducedMotion();
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let completionTimer;
    const timer = setTimeout(() => {
      setLoadingCompleted(true);
      completionTimer = setTimeout(() => {
        navigate("/", { replace: true });
        onFinish?.();
      }, COMPLETION_MESSAGE_DURATION_MS);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(completionTimer);
    };
  }, [duration, navigate, onFinish]);

  return (
    <div
      className={`splash${prefersReducedMotion ? " splash--reduced-motion" : ""}`}
      style={{ "--splash-duration": `${duration}ms` }}
    >
      <ThemeBackground />

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
        <div className="splash__loader">
          <span className="splash__loader-track" aria-hidden="true">
            <span className="splash__loader-progress" />
          </span>
          <span
            className={`splash__loader-label${
              loadingCompleted ? " splash__loader-label--completed" : ""
            }`}
            aria-label={loadingCompleted ? "Loading Completed" : "Loading portfolio"}
          >
            {Array.from(
              loadingCompleted ? "Loading Completed" : "Loading portfolio",
              (character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="splash__loader-char"
                  style={{ "--char-index": index }}
                  aria-hidden="true"
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
