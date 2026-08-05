import { GAME_ACTIONS_ENUM } from "../enums/game-actions.enum";
import { TFieldState } from "../types/field-state.type";
import { TGameActions } from "../types/game-actions.type";
import { generateInitFieldState, handleComputerMove, handleMove } from "./helpers";

export const fieldStateReducer = (state: TFieldState, action: TGameActions): TFieldState => {
  const actionType = action.type;

  switch (actionType) {
    case GAME_ACTIONS_ENUM.MAKE_MOVE: {
      const newState: TFieldState = handleMove(state, action.payload);
      return newState;
    }
    case GAME_ACTIONS_ENUM.MAKE_COMPUTER_MOVE: {
      const newState: TFieldState = handleComputerMove(state);
      return newState;
    }
    case GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE: {
      const newState: TFieldState = generateInitFieldState();
      return newState;
    }

    default: {
      const exhaustiveCheck: never = actionType;
      return exhaustiveCheck;
    }
  }
};
