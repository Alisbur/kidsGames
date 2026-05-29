import { GAME_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/game-settings-actions.enum";
import { TGameSettingsActions } from "../types/game-settings-actions.type";
import { TSettings } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TGameSettingsActions): TSettings => {
  switch (action.type) {
    case ACTIONS.SET_FIELD_SIZE: {
      return { ...state, fieldSizeType: action.payload };
    }

    case ACTIONS.SET_SHUFFLE_TYPE: {
      return { ...state, shuffleType: action.payload };
    }

    case ACTIONS.SET_GAME_TYPE: {
      if (action.payload === state.gameType) return state;
      return { ...state, gameType: action.payload };
    }

    default:
      return state;
  }
};
