import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingsActions): TSettings => {
  const type = action.type;

  switch (type) {
    case ACTIONS.SET_VOICE: {
      return { ...state, voice: action.payload };
    }
    case ACTIONS.SET_MAX_WORDS_LENGTH: {
      return { ...state, maxLen: action.payload };
    }
    default: {
      const _exhaustiveCheck: never = type;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
