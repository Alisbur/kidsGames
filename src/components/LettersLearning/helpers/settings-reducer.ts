import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingsActions): TSettings => {
  switch (action.type) {
    case ACTIONS.SET_VOICE: {
      return { ...state, voice: action.payload };
    }
    default: {
      const _exhaustiveCheck: never = action.type;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
