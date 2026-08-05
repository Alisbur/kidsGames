import { GAME_STATE_ACTIONS_ENUM } from "../enums/game-state-actions.enum";
import { GAME_STEPS } from "../enums/game-steps.enum";
import { PLAYERS_ENUM } from "../enums/players.enum";
import { TGameState } from "../types/game-state.type";
import { TGameStateActions } from "../types/game-state-actions.type";

export const gameStateReducer = (state: TGameState, action: TGameStateActions): TGameState => {
  const actionType = action.type;

  switch (actionType) {
    case GAME_STATE_ACTIONS_ENUM.SET_STEP: {
      const newGameState: TGameState = { ...state, step: action.payload };
      newGameState.isGameStarted = action.payload === GAME_STEPS.GAME ? true : false;
      return newGameState;
    }
    case GAME_STATE_ACTIONS_ENUM.START: {
      const newGameState: TGameState = { ...state, isGameStarted: true };
      return newGameState;
    }
    case GAME_STATE_ACTIONS_ENUM.STOP: {
      const newGameState: TGameState = { ...state, isGameStarted: false };
      return newGameState;
    }
    case GAME_STATE_ACTIONS_ENUM.NEXT_TURN: {
      if (state.isGameStarted) {
        const newGameState: TGameState = {
          ...state,
          turn:
            state.turn === PLAYERS_ENUM.PLAYER_1 ? PLAYERS_ENUM.PLAYER_2 : PLAYERS_ENUM.PLAYER_1,
        };
        return newGameState;
      }

      return state;
    }

    default: {
      const exhaustiveCheck: never = actionType;
      return exhaustiveCheck;
    }
  }
};
