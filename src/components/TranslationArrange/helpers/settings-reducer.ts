import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingsActions): TSettings => {
  switch (action.type) {
    case ACTIONS.SET_WORDS_QUANTITY: {
      return { ...state, wordsQuantity: action.payload };
    }
    case ACTIONS.SET_GAME_TYPE: {
      return { ...state, gameType: action.payload };
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
