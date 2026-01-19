import { GAME_ACTIONS_ENUM } from "../enum/game-actions.enum";
import { TBallsRotateDirection } from "./ball.type";
import { TBallsSettings } from "./settings.type";

export type TGameActions =
  | {
      type: GAME_ACTIONS_ENUM.BALL_CLICK;
      payload: {
        stackIdx: number;
        ballIdx: number | null;
      };
    }
  | {
      type: GAME_ACTIONS_ENUM.ROTATE_LAYER;
      payload: {
        direction: TBallsRotateDirection;
        layerIdx: number;
      };
    }
  | {
      type: GAME_ACTIONS_ENUM.ROTATE_EMPTY_SLOT_LAYER;
      payload: TBallsRotateDirection;
    }
  | {
      type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE;
      payload: TBallsSettings;
    }
  | { type: GAME_ACTIONS_ENUM.SHUFFLE_FIELDSTATE; payload: number };
