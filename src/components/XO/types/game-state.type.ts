import { GAME_STEPS } from "../enums/game-steps.enum";
import { PLAYERS_ENUM } from "../enums/players.enum";
import { TStats } from "./stats.type";

export type TGameState = {
  step: GAME_STEPS;
  isGameStarted: boolean;
  turn: PLAYERS_ENUM;
  stats: TStats;
};
