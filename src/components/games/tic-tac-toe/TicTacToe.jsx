import { useCallback, useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import Button from "../../common/Button";
import GlowCard from "../../common/GlowCard";
import {
  EMPTY_BOARD,
  HUMAN,
  COMPUTER,
  getWinner,
  isBoardFull,
  getComputerMove,
} from "./ticTacToeLogic";
import "./TicTacToe.css";

const COMPUTER_DELAY_MS = 450;

export default function TicTacToe() {
  const [board, setBoard] = useState(EMPTY_BOARD);

  // true  = human's turn
  // false = computer's turn
  const [isHumanTurn, setIsHumanTurn] = useState(true);

  const [scores, setScores] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const { winner, line: winningLine } = getWinner(board);
  const isDraw = !winner && isBoardFull(board);
  const isGameOver = Boolean(winner) || isDraw;

  /*
   * Start a new round.
   *
   * If the HUMAN won:
   *     Computer starts next round.
   *
   * If the COMPUTER won:
   *     Human starts next round.
   *
   * If it was a draw:
   *     Keep the same starting player.
   */
  const resetBoard = useCallback(() => {
    let nextHumanTurn = true;

    if (winner === HUMAN) {
      nextHumanTurn = false;
    } else if (winner === COMPUTER) {
      nextHumanTurn = true;
    } else {
      // Draw:
      // Keep the same player who started this round.
      nextHumanTurn = isHumanTurn;
    }

    setBoard([...EMPTY_BOARD]);
    setIsHumanTurn(nextHumanTurn);
  }, [winner, isHumanTurn]);

  /*
   * Update the scoreboard when a round ends.
   */
  useEffect(() => {
    const { winner: result } = getWinner(board);

    if (!result && !isBoardFull(board)) {
      return;
    }

    setScores((prev) => {
      if (result === HUMAN) {
        return {
          ...prev,
          wins: prev.wins + 1,
        };
      }

      if (result === COMPUTER) {
        return {
          ...prev,
          losses: prev.losses + 1,
        };
      }

      return {
        ...prev,
        draws: prev.draws + 1,
      };
    });
  }, [board]);

  /*
   * Computer's turn.
   *
   * The computer waits for a short moment and then
   * randomly selects one of the empty cells.
   */
  useEffect(() => {
    if (isHumanTurn || isGameOver) {
      return;
    }

    const timer = setTimeout(() => {
      const move = getComputerMove([...board]);

      if (move === null) {
        return;
      }

      setBoard((current) => {
        const next = [...current];
        next[move] = COMPUTER;
        return next;
      });

      setIsHumanTurn(true);
    }, COMPUTER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isHumanTurn, isGameOver, board]);

  /*
   * Human makes a move.
   */
  function handleCellClick(index) {
    if (!isHumanTurn || isGameOver || board[index]) {
      return;
    }

    const next = [...board];
    next[index] = HUMAN;

    setBoard(next);
    setIsHumanTurn(false);
  }

  let statusText = "Your move";

  if (winner === HUMAN) {
    statusText = "You win! 🎉";
  } else if (winner === COMPUTER) {
    statusText = "Computer wins";
  } else if (isDraw) {
    statusText = "It's a draw";
  } else if (!isHumanTurn) {
    statusText = "Computer is thinking…";
  }

  return (
    <GlowCard as="section" className="ttt">
      <div className="ttt__scoreboard">
        <span className="ttt__score">
          You <strong>{scores.wins}</strong>
        </span>

        <span className="ttt__score ttt__score--muted">
          Draws <strong>{scores.draws}</strong>
        </span>

        <span className="ttt__score">
          Computer <strong>{scores.losses}</strong>
        </span>
      </div>

      <p className="ttt__status" aria-live="polite">
        {statusText}
      </p>

      <div
        className="ttt__board"
        role="group"
        aria-label="Tic-tac-toe board"
      >
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            className={`ttt__cell ${
              cell ? `ttt__cell--${cell.toLowerCase()}` : ""
            } ${
              winningLine?.includes(index)
                ? "ttt__cell--win"
                : ""
            }`}
            onClick={() => handleCellClick(index)}
            disabled={
              Boolean(cell) ||
              !isHumanTurn ||
              isGameOver
            }
            aria-label={
              cell
                ? `Cell ${index + 1}, ${cell}`
                : `Cell ${index + 1}, empty`
            }
          >
            {cell}
          </button>
        ))}
      </div>

      <Button
        variant="secondary"
        icon={RotateCcw}
        onClick={resetBoard}
      >
        New Game
      </Button>
    </GlowCard>
  );
}