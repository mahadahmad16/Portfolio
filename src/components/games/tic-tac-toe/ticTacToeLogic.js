
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

/**
 * Checks whether there is a winner.
 *
 * Returns:
 * {
 *   winner: "X" | "O" | null,
 *   line: number[] | null
 * }
 */
export function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return {
        winner: board[a],
        line,
      };
    }
  }

  return {
    winner: null,
    line: null,
  };
}

/**
 * Checks whether all cells on the board are filled.
 */
export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

/**
 * Returns an array containing the indexes
 * of all empty cells.
 */
export function getAvailableMoves(board) {
  return board.reduce((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }

    return moves;
  }, []);
}

/**
 * Finds a move that would allow the specified player
 * to win immediately.
 *
 * Example:
 *
 * X | X | _
 * O | _ | _
 * _ | _ | O
 *
 * For HUMAN, this function returns 2.
 */
function findWinningMove(board, player) {
  const availableMoves = getAvailableMoves(board);

  for (const move of availableMoves) {
    // Temporarily place the player's mark.
    board[move] = player;

    // Check if this move creates a winner.
    const { winner } = getWinner(board);

    // Undo the temporary move.
    board[move] = null;

    if (winner === player) {
      return move;
    }
  }

  return null;
}

/**
 * Determines the computer's move.
 *
 * Priority:
 *
 * 1. If the computer can win immediately,
 *    take the winning move.
 *
 * 2. If the human can win on their next move,
 *    block them.
 *
 * 3. Otherwise, choose a random empty cell.
 */
export function getComputerMove(board) {
  const availableMoves = getAvailableMoves(board);

  // No moves available.
  if (availableMoves.length === 0) {
    return null;
  }

  /*
   * STEP 1:
   * Check whether the computer can win immediately.
   */
  const winningMove = findWinningMove(board, COMPUTER);

  if (winningMove !== null) {
    return winningMove;
  }

  /*
   * STEP 2:
   * Check whether the human can win on their next move.
   *
   * If they can, block that position.
   */
  const blockingMove = findWinningMove(board, HUMAN);

  if (blockingMove !== null) {
    return blockingMove;
  }

  /*
   * STEP 3:
   * No immediate threat and no winning opportunity.
   *
   * Pick a random available position.
   */
  const randomIndex = Math.floor(
    Math.random() * availableMoves.length
  );

  return availableMoves[randomIndex];
}

