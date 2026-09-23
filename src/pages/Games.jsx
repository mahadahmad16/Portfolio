import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import SnakeGame from "../components/games/snake/SnakeGame";
import TicTacToe from "../components/games/tic-tac-toe/TicTacToe";
import RockPaperScissors from "../components/games/rock-paper-scissors/RockPaperScissors";
import { useLanguage } from "../context/LanguageContext";
import "./Games.css";

const TABS = [
  { id: "snake", labelKey: "nav.snake" },
  { id: "tic-tac-toe", labelKey: "nav.ticTacToe" },
  { id: "rock-paper-scissors", labelKey: "nav.rockPaperScissors" },
];

/**
 * Games hub — a tab switcher between the three mini games. All three
 * are wired up now.
 */
export default function Games() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("snake");

  return (
    <div className="games">
      <SectionHeading
        eyebrow={t("games.eyebrow")}
        title={t("games.title")}
        description={t("games.description")}
      />

      <div className="games__tabs" role="tablist" aria-label={t("games.choose")}>
        {TABS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            className={`games__tab ${activeTab === id ? "games__tab--active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            {t(labelKey)}
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
