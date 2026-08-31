export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const EMPTY_BOARD = Array(9).fill(null);

export const HUMAN = "X";
export const COMPUTER = "O";

/** { winner: "X"|"O"|null, line: number[]|null } for the current board. */
export function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

export function getAvailableMoves(board) {
  return board.reduce((moves, cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
}

/**
 * Minimax with alpha-beta pruning. The tree is tiny (9 cells) so this
 * runs instantly and plays perfectly — the best a human can force
 * against it is a draw.
 */
function minimax(board, isMaximizing, depth, alpha, beta) {
  const { winner } = getWinner(board);
  if (winner === COMPUTER) return 10 - depth;
  if (winner === HUMAN) return depth - 10;
  if (isBoardFull(board)) return 0;

  const moves = getAvailableMoves(board);

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of moves) {
      board[move] = COMPUTER;
      best = Math.max(best, minimax(board, false, depth + 1, alpha, beta));
      board[move] = null;
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    board[move] = HUMAN;
    best = Math.min(best, minimax(board, true, depth + 1, alpha, beta));
    board[move] = null;
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

/**
 * Picks the computer's move. Short-circuits the opening move (center is
 * always optimal on an empty or near-empty board) instead of running a
 * full search that would just confirm the same answer.
 */
export function getComputerMove(board) {
  const moves = getAvailableMoves(board);
  if (moves.length >= 8 && board[4] === null) return 4;

  let bestScore = -Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    board[move] = COMPUTER;
    const score = minimax(board, false, 0, -Infinity, Infinity);
    board[move] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
