import { toggleValue } from "@/shared/helpers/toggle-value";

import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingsActions): TSettings => {
  switch (action.type) {
    case ACTIONS.SET_TYPES: {
      return { ...state, type: toggleValue(state.type, action.payload) };
    }
    case ACTIONS.SET_QUANTITY: {
      return { ...state, quantity: action.payload };
    }
    case ACTIONS.SET_LEVEL: {
      return { ...state, level: toggleValue(state.level, action.payload) };
    }
    case ACTIONS.SET_CAN_MODIFY_ANSWER: {
      return { ...state, canModifyAnswer: action.payload };
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
