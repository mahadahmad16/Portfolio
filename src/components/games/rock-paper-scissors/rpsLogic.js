export const CHOICES = ["rock", "paper", "scissors"];

export const CHOICE_META = {
  rock: { label: "Rock", emoji: "🪨" },
  paper: { label: "Paper", emoji: "📄" },
  scissors: { label: "Scissors", emoji: "✂️" },
};

// What each choice beats
const BEATS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export function getRandomChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

/** Result from the player's perspective: "win" | "lose" | "draw". */
export function getRoundResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  return BEATS[playerChoice] === computerChoice ? "win" : "lose";
}
