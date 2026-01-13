import { GAME_ACTIONS_ENUM } from "../enums/game-actions.enum";
import { TSettings } from "./settings.type";

export type TGameActions =
  | { type: GAME_ACTIONS_ENUM.MOVE_PIECE; payload: number }
  | { type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE; payload: TSettings }
  | { type: GAME_ACTIONS_ENUM.SHUFFLE_FIELDSTATE; payload: number };
