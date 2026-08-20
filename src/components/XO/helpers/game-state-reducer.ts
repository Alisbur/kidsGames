import { INIT_GAME_STATS } from "../constants/init-game-stats";
import { GAME_STATE_ACTIONS_ENUM } from "../enums/game-state-actions.enum";
import { GAME_STEPS } from "../enums/game-steps.enum";
import { PLAYERS_ENUM } from "../enums/players.enum";
import { TGameState } from "../types/game-state.type";
import { TGameStateActions } from "../types/game-state-actions.type";
import { TStats } from "../types/stats.type";

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
    case GAME_STATE_ACTIONS_ENUM.RESET_STATS: {
      const newGameState: TGameState = {
        ...state,
        stats: INIT_GAME_STATS,
      };
      return newGameState;
    }
    case GAME_STATE_ACTIONS_ENUM.SET_WINNER: {
      const newStats: TStats = { ...state.stats };
      newStats.games += 1;
      if (action.payload) {
        if (action.payload === PLAYERS_ENUM.PLAYER_1) newStats.playerOneWins += 1;
        else newStats.playerTwoWins += 1;
      }
      const newGameState: TGameState = {
        ...state,
        stats: newStats,
      };
      return newGameState;
    }

    default: {
      const exhaustiveCheck: never = actionType;
      return exhaustiveCheck;
    }
  }
};
