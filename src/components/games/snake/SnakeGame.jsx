import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Button from "../../common/Button";
import GlowCard from "../../common/GlowCard";
import {
  GRID_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  getNextDirection,
  getRandomFoodPosition,
  getNextHead,
  hasHitWall,
  hasHitSelf,
  getSpeedForScore,
} from "./snakeLogic";
import "./SnakeGame.css";

const CELL_SIZE = 18; // px — canvas is GRID_SIZE * CELL_SIZE square

/**
 * Classic Snake, canvas-rendered. Arrow keys / WASD on desktop, the
 * on-screen D-pad on touch devices. Auto-pauses when the tab loses
 * focus so it doesn't keep running (and scoring) in the background.
 */
export default function SnakeGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null); // mutable game state read by the loop, avoids stale closures
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | paused | gameover

  const resetGame = useCallback(() => {
    const snake = INITIAL_SNAKE.map((segment) => ({ ...segment }));
    stateRef.current = {
      snake,
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      food: getRandomFoodPosition(snake),
    };
    setScore(0);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setStatus("playing");
  }, [resetGame]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const ctx = canvas.getContext("2d");
    const { snake, food } = stateRef.current;
    const size = GRID_SIZE * CELL_SIZE;

    ctx.clearRect(0, 0, size, size);

    // Faint checker backdrop
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let i = 0; i < GRID_SIZE; i += 2) {
      for (let j = 0; j < GRID_SIZE; j += 2) {
        ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Food
    ctx.fillStyle = "#5fd4ff";
    ctx.shadowColor = "#5fd4ff";
    ctx.shadowBlur = 12;
    roundedRect(ctx, food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4, 4);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? "#3e6ff2" : "rgba(62, 111, 242, 0.75)";
      if (isHead) {
        ctx.shadowColor = "#3e6ff2";
        ctx.shadowBlur = 10;
      }
      roundedRect(
        ctx,
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        4
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, []);

  const tick = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;

    state.direction = state.nextDirection;
    const nextHead = getNextHead(state.snake, state.direction);

    if (hasHitWall(nextHead) || hasHitSelf(nextHead, state.snake)) {
      setStatus("gameover");
      setBestScore((best) => Math.max(best, score));
      return;
    }

    const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
    const newSnake = [nextHead, ...state.snake];

    if (ateFood) {
      state.food = getRandomFoodPosition(newSnake);
      setScore((s) => s + 1);
    } else {
      newSnake.pop();
    }

    state.snake = newSnake;
    draw();
  }, [draw, score]);

  // Game loop — re-created whenever score changes so speed keeps up
  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(tick, getSpeedForScore(score));
    return () => clearInterval(interval);
  }, [status, score, tick]);

  // Redraw whenever the game enters a new status (e.g. right after Start)
  useEffect(() => {
    draw();
  }, [status, draw]);

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(event) {
      if (status !== "playing" || !stateRef.current) return;
      const next = getNextDirection(event.key, stateRef.current.direction);
      if (next) {
        event.preventDefault();
        stateRef.current.nextDirection = next;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status]);

  // Auto-pause when the tab isn't visible
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden && status === "playing") setStatus("paused");
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [status]);

  function handleDpadPress(key) {
    if (status !== "playing" || !stateRef.current) return;
    const next = getNextDirection(key, stateRef.current.direction);
    if (next) stateRef.current.nextDirection = next;
  }

  return (
    <GlowCard as="section" className="snake-game">
      <div className="snake-game__header">
        <p className="snake-game__score">
          Score <strong>{score}</strong>
        </p>
        <p className="snake-game__score snake-game__score--muted">
          Best <strong>{bestScore}</strong>
        </p>
      </div>

      <div className="snake-game__board">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          role="img"
          aria-label="Snake game board"
        />

        {status !== "playing" && (
          <div className="snake-game__overlay">
            {status === "gameover" && (
              <p className="snake-game__overlay-text">Game Over — scored {score}</p>
            )}
            {status === "paused" && <p className="snake-game__overlay-text">Paused</p>}
            <Button variant="primary" icon={RotateCcw} onClick={startGame}>
              {status === "idle" ? "Start Game" : "Play Again"}
            </Button>
          </div>
        )}
      </div>

      <div className="snake-game__controls">
        <button
          type="button"
          className="snake-game__dpad-btn snake-game__dpad-btn--up"
          onClick={() => handleDpadPress("ArrowUp")}
          aria-label="Move up"
        >
          <ArrowUp size={18} />
        </button>
        <button
          type="button"
          className="snake-game__dpad-btn snake-game__dpad-btn--left"
          onClick={() => handleDpadPress("ArrowLeft")}
          aria-label="Move left"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          className="snake-game__dpad-btn snake-game__dpad-btn--right"
          onClick={() => handleDpadPress("ArrowRight")}
          aria-label="Move right"
        >
          <ArrowRight size={18} />
        </button>
        <button
          type="button"
          className="snake-game__dpad-btn snake-game__dpad-btn--down"
          onClick={() => handleDpadPress("ArrowDown")}
          aria-label="Move down"
        >
          <ArrowDown size={18} />
        </button>
      </div>

      <p className="snake-game__hint">Arrow keys or WASD to move.</p>
    </GlowCard>
  );
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}