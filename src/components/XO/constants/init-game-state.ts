import { GAME_STEPS } from "../enums/game-steps.enum";
import { PLAYERS_ENUM } from "../enums/players.enum";
import { TGameState } from "../types/game-state.type";
import { INIT_GAME_STATS } from "./init-game-stats";

export const INIT_GAME_STATE: TGameState = {
  step: GAME_STEPS.INIT,
  isGameStarted: false,
  turn: PLAYERS_ENUM.PLAYER_1,
  stats: INIT_GAME_STATS,
};
