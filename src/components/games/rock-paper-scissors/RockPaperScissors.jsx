import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import Button from "../../common/Button";
import GlowCard from "../../common/GlowCard";
import { CHOICES, CHOICE_META, getRandomChoice, getRoundResult } from "./rpsLogic";
import "./RockPaperScissors.css";

const DECIDE_DELAY_MS = 550; // brief pause before revealing the computer's pick

const RESULT_TEXT = {
  win: "You win this round! 🎉",
  lose: "Computer wins this round",
  draw: "It's a draw",
};

/**
 * Rock Paper Scissors vs. the computer. Every round is independent —
 * click a choice to play it; the running score tracks the session.
 */
export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [isDeciding, setIsDeciding] = useState(false);
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    if (!isDeciding) return;
    const timer = setTimeout(() => {
      const computerPick = getRandomChoice();
      const roundResult = getRoundResult(playerChoice, computerPick);

      setComputerChoice(computerPick);
      setResult(roundResult);
      setIsDeciding(false);
      setScores((prev) => {
        if (roundResult === "win") return { ...prev, wins: prev.wins + 1 };
        if (roundResult === "lose") return { ...prev, losses: prev.losses + 1 };
        return { ...prev, draws: prev.draws + 1 };
      });
    }, DECIDE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isDeciding, playerChoice]);

  function handleChoice(choice) {
    if (isDeciding) return;
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);
    setIsDeciding(true);
  }

  function resetScores() {
    setScores({ wins: 0, losses: 0, draws: 0 });
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  }

  let statusText = "Pick rock, paper, or scissors to start";
  if (isDeciding) statusText = "Computer is choosing…";
  else if (result) statusText = RESULT_TEXT[result];

  return (
    <GlowCard as="section" className="rps">
      <div className="rps__scoreboard">
        <span className="rps__score">
          You <strong>{scores.wins}</strong>
        </span>
        <span className="rps__score rps__score--muted">
          Draws <strong>{scores.draws}</strong>
        </span>
        <span className="rps__score">
          Computer <strong>{scores.losses}</strong>
        </span>
      </div>

      <div className="rps__arena">
        <div className="rps__hand">
          <span className="rps__hand-emoji" aria-hidden="true">
            {playerChoice ? CHOICE_META[playerChoice].emoji : "❔"}
          </span>
          <p className="rps__hand-label">You</p>
        </div>

        <p className="rps__vs">vs</p>

        <div className="rps__hand">
          <span
            className={`rps__hand-emoji ${
              isDeciding ? "rps__hand-emoji--deciding" : ""
            }`}
            aria-hidden="true"
          >
            {isDeciding ? "🤔" : computerChoice ? CHOICE_META[computerChoice].emoji : "❔"}
          </span>
          <p className="rps__hand-label">Computer</p>
        </div>
      </div>

      <p className="rps__status" aria-live="polite">
        {statusText}
      </p>

      <div className="rps__choices">
        {CHOICES.map((choice) => (
          <button
            key={choice}
            type="button"
            className={`rps__choice-btn ${
              playerChoice === choice && !isDeciding ? "rps__choice-btn--selected" : ""
            }`}
            onClick={() => handleChoice(choice)}
            disabled={isDeciding}
            aria-label={CHOICE_META[choice].label}
          >
            <span aria-hidden="true">{CHOICE_META[choice].emoji}</span>
            <span className="rps__choice-label">{CHOICE_META[choice].label}</span>
          </button>
        ))}
      </div>

      <Button variant="secondary" icon={RotateCcw} onClick={resetScores}>
        Reset Score
      </Button>
    </GlowCard>
  );
}
