import { FIELD_OPTIONS_SIZES } from "../config/field-options";
import { GAME_ACTIONS_ENUM } from "../enum/game-actions.enum";
import { TBallsFieldState } from "../types/ball.type";
import { TGameActions } from "../types/game-actions.type";
import { generateInitFieldState, onBallClick, rotateEmptySlotLayer, rotateLayer, shuffleStep } from "./helpers";

export const fieldStateReducer = (
  state: TBallsFieldState,
  action: TGameActions
): TBallsFieldState => {
  switch (action.type) {
    case GAME_ACTIONS_ENUM.BALL_CLICK: {
      const newState: TBallsFieldState = onBallClick(state, action.payload);
      return newState;
    }
    case GAME_ACTIONS_ENUM.ROTATE_LAYER: {
      const newState: TBallsFieldState = rotateLayer(state, action.payload);
      return newState;
    }
    case GAME_ACTIONS_ENUM.ROTATE_EMPTY_SLOT_LAYER: {
      const newState: TBallsFieldState = rotateEmptySlotLayer(state, action.payload);
      return newState;
    }
    // case GAME_ACTIONS_ENUM.SHUFFLE_FIELDSTATE_ONCE: {
    //   const newState: TBallsFieldState = shuffleOnce(state);
    //   return newState;
    // }
    // case GAME_ACTIONS_ENUM.SHUFFLE_FIELDSTATE_ONCE: {
    //   const newState: TBallsFieldState = shuffleOnce(state);
    //   return newState;
    // }
    case GAME_ACTIONS_ENUM.SHUFFLE_STEP: {
      const newState: TBallsFieldState = shuffleStep(state, action.payload);
      return newState;
    }    
    case GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE: {
      const newState: TBallsFieldState = generateInitFieldState(
        FIELD_OPTIONS_SIZES[action.payload.fieldSizeType]
      );
      return newState;
    }

    default: return state;
  }
};

