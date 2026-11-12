import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingsActions): TSettings => {
  const type = action.type;

  switch (type) {
    case ACTIONS.SET_VOICE: {
      return { ...state, voice: action.payload };
    }
    case ACTIONS.SET_MAX_WORDS_LENGTH: {
      if (action.payload < state.minLen) return { ...state, maxLen: state.minLen };
      return { ...state, maxLen: action.payload };
    }
    case ACTIONS.SET_MIN_WORDS_LENGTH: {
      if (action.payload > state.maxLen) return { ...state, minLen: state.maxLen };
      return { ...state, minLen: action.payload };
    }
    default: {
      const _exhaustiveCheck: never = type;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
