import { toggleValue } from "@/shared/helpers/toggle-value";

import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingsActions): TSettings => {
  switch (action.type) {
    case ACTIONS.SET_LETTERS_QUANTITY: {
      const q = action.payload;

      return { ...state, lettersQuantity: toggleValue(state.lettersQuantity, q) };
    }
    case ACTIONS.SET_WORDS_QUANTITY: {
      return { ...state, wordsQuantity: action.payload };
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
