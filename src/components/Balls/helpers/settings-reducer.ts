import { GAME_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enum/game-settings-actions.enum";
import { TGameSettingsActions } from "../types/game-settings-actions.type";
import { TBallsSettings } from "../types/settings.type";

export const settingsReducer = (
  state: TBallsSettings,
  action: TGameSettingsActions
): TBallsSettings => {
  switch (action.type) {
    case ACTIONS.SET_FIELD_SIZE: {
      return { ...state, fieldSizeType: action.payload };
    }

    case ACTIONS.SET_SHUFFLE_TYPE: {
      return { ...state, shuffleType: action.payload };
    }

    default:
      return state;
  }
};
