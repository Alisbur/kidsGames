import { GAME_SETTINGS_ACTIONS_ENUM } from "../enums/game-settings-actions.enum";
import { PLAYERS_ENUM, PLAYERS_TYPES_ENUM } from "../enums/players.enum";
import { TGameSettingsActions } from "../types/game-settings-actions.type";
import { TXOSettings } from "../types/settings.type";

export const settingsReducer = (state: TXOSettings, action: TGameSettingsActions): TXOSettings => {
  const actionType = action.type;

  switch (actionType) {
    case GAME_SETTINGS_ACTIONS_ENUM.SET_PLAYERS_TYPE: {
      if (state.playersType !== action.payload && action.payload === PLAYERS_TYPES_ENUM.SINGLE) {
        const newState: TXOSettings = { ...state, playersType: action.payload };
        newState.PLAYER_2.isComputer = true;
        return newState;
      }

      if (state.playersType !== action.payload && action.payload === PLAYERS_TYPES_ENUM.MULTI) {
        const newState: TXOSettings = { ...state, playersType: action.payload };
        newState.PLAYER_2.isComputer = false;
        return newState;
      }

      return state;
    }

    case GAME_SETTINGS_ACTIONS_ENUM.SET_FIRST_PLAYER_NAME: {
      if (action.payload !== state.PLAYER_1.name) {
        const newState: TXOSettings = {
          ...state,
          [PLAYERS_ENUM.PLAYER_1]: { ...state[PLAYERS_ENUM.PLAYER_1], name: action.payload },
        };
        return newState;
      }
      return state;
    }

    case GAME_SETTINGS_ACTIONS_ENUM.SET_SECOND_PLAYER_NAME: {
      if (action.payload !== state.PLAYER_2.name) {
        const newState: TXOSettings = {
          ...state,
          [PLAYERS_ENUM.PLAYER_2]: { ...state[PLAYERS_ENUM.PLAYER_2], name: action.payload },
        };
        return newState;
      }
      return state;
    }

    default: {
      const exhaustiveCheck: never = actionType;
      return exhaustiveCheck;
    }
  }
};
