import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  game: "menu" | "game" | "nextLevel" | "secondLevel" | "deathScreen";
  score: number;
  isPaused: boolean;
  leaderboard: number[];
}

const initialState: GameState = {
  game: "menu",
  score: 0,
  isPaused: false,
  leaderboard: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state) {
      state.game = "game";
      state.score = 0;
    },
    pauseGame(state) {
      if (state.game === "game" || state.game === "secondLevel") {
        state.isPaused = !state.isPaused;
      }
    },
    gameOver(state) {
      state.leaderboard = [...state.leaderboard, state.score]
        .sort((a, b) => b - a)
        .slice(0, 5);
      state.game = "deathScreen";
    },
    nextLevel(state) {
      state.game = "secondLevel";
    },
    returnToMenu(state) {
      state.game = "menu";
      state.score = 0;
    },
    incrementScore(state) {
      state.score++;
      if (state.score === 25) {
        state.game = "nextLevel";
      }
    },
  },
});

export const {
  startGame,
  pauseGame,
  gameOver,
  nextLevel,
  returnToMenu,
  incrementScore,
} = gameSlice.actions;

export default gameSlice;
