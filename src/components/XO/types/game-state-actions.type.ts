import { GAME_STATE_ACTIONS_ENUM } from "../enums/game-state-actions.enum";
import { GAME_STEPS } from "../enums/game-steps.enum";
import { PLAYERS_ENUM } from "../enums/players.enum";

export type TGameStateActions =
  | {
      type: GAME_STATE_ACTIONS_ENUM.SET_STEP;
      payload: GAME_STEPS;
    }
  | {
      type: GAME_STATE_ACTIONS_ENUM.START;
    }
  | {
      type: GAME_STATE_ACTIONS_ENUM.STOP;
    }
  | {
      type: GAME_STATE_ACTIONS_ENUM.NEXT_TURN;
    }
  | {
      type: GAME_STATE_ACTIONS_ENUM.RESET_STATS;
    }
  | {
      type: GAME_STATE_ACTIONS_ENUM.SET_WINNER;
      payload: PLAYERS_ENUM | null;
    };
