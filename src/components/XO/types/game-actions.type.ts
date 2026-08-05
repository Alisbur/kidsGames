import { GAME_ACTIONS_ENUM } from "../enums/game-actions.enum";

export type TGameActions =
  | {
      type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE;
    }
  | {
      type: GAME_ACTIONS_ENUM.MAKE_MOVE;
      payload: number;
    }
  | {
      type: GAME_ACTIONS_ENUM.MAKE_COMPUTER_MOVE;
    };
