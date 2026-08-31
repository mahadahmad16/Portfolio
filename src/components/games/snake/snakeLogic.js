export const GRID_SIZE = 20;

export const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];

export const INITIAL_DIRECTION = { x: 1, y: 0 };

export const BASE_SPEED_MS = 140;
export const MIN_SPEED_MS = 70;
export const SPEED_STEP_MS = 4;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function isOpposite(a, b) {
  return a.x === -b.x && a.y === -b.y;
}

/** Returns the new direction for a keypress, or null if the key isn't a
 *  movement key or would reverse the snake straight into itself. */
export function getNextDirection(key, currentDirection) {
  const next = DIRECTIONS[key];
  if (!next) return null;
  if (isOpposite(next, currentDirection)) return null;
  return next;
}

/** Random empty cell, guaranteed not to land on the snake. */
export function getRandomFoodPosition(snake, gridSize = GRID_SIZE) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (
    snake.some((segment) => segment.x === position.x && segment.y === position.y)
  );
  return position;
}

export function getNextHead(snake, direction) {
  const head = snake[0];
  return { x: head.x + direction.x, y: head.y + direction.y };
}

export function hasHitWall(head, gridSize = GRID_SIZE) {
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
}

export function hasHitSelf(head, snake) {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

/** Tick interval in ms — speeds up slightly as the score climbs, floored
 *  at MIN_SPEED_MS so it never becomes unplayable. */
export function getSpeedForScore(score) {
  return Math.max(MIN_SPEED_MS, BASE_SPEED_MS - score * SPEED_STEP_MS);
}