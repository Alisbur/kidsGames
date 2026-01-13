import { FIELD_OPTIONS_SIZES } from "../constants/field-options";
import { GAME_ACTIONS_ENUM } from "../enums/game-actions.enum";
import { TFieldState } from "../types/field-state.type";
import { TGameActions } from "../types/game-actions.type";
import { generateArr, move } from "./helpers";

export const fieldStateReducer = (
  state: TFieldState,
  action: TGameActions
): TFieldState => {
  switch (action.type) {
    case GAME_ACTIONS_ENUM.MOVE_PIECE: {
      const newState: TFieldState = move(state, action.payload);
      return newState;
    }
    case GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE: {
      const newState: TFieldState = generateArr(
        FIELD_OPTIONS_SIZES[action.payload.fieldSizeType]
      );
      return newState;
    }

    default: return state;
  }
};

