import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import SnakeGame from "../components/games/snake/SnakeGame";
import TicTacToe from "../components/games/tic-tac-toe/TicTacToe";
import RockPaperScissors from "../components/games/rock-paper-scissors/RockPaperScissors";
import "./Games.css";

const TABS = [
  { id: "snake", label: "Snake" },
  { id: "tic-tac-toe", label: "Tic-Tac-Toe" },
  { id: "rock-paper-scissors", label: "Rock-Paper-Scissors" },
];

/**
 * Games hub — a tab switcher between the three mini games. All three
 * are wired up now.
 */
export default function Games() {
  const [activeTab, setActiveTab] = useState("snake");

  return (
    <div className="games">
      <SectionHeading
        eyebrow="Just for fun"
        title="Games"
        description="A few small games I built alongside the portfolio."
      />

      <div className="games__tabs" role="tablist" aria-label="Choose a game">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            className={`games__tab ${activeTab === id ? "games__tab--active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="games__panel">
        {activeTab === "snake" && <SnakeGame />}
        {activeTab === "tic-tac-toe" && <TicTacToe />}
        {activeTab === "rock-paper-scissors" && <RockPaperScissors />}
      </div>
    </div>
  );
}
