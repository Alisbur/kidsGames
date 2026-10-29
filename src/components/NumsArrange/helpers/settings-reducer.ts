import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings } from "../types/settings.type";
import { TSettingActions } from "../types/settings.type";

export const settingsReducer = (state: TSettings, action: TSettingActions): TSettings => {
  const actionType = action.type;

  switch (actionType) {
    case ACTIONS.SET_TYPES: {
      if (state.type.includes(action.payload as EXAMPLE_TYPES_ENUM)) {
        if (state.type.length < 2) return state;
        const newTypes = state.type.filter((t) => t !== action.payload);
        return { ...state, type: newTypes };
      }
      return { ...state, type: [...state.type, action.payload] };
    }
    case ACTIONS.SET_TASKS_QUANTITY: {
      return { ...state, tasksQuantity: action.payload };
    }
    case ACTIONS.SET_EXTRA_TILES_QUANTITY: {
      return { ...state, extraTilesQuantity: action.payload };
    }
    case ACTIONS.SET_LIMIT: {
      return { ...state, limit: action.payload };
    }
    // case ACTIONS.SET_CAN_MODIFY_ANSWER: {
    //   return { ...state, canModifyAnswer: action.payload };
    // }
    default: {
      const _exhaustiveCheck: never = actionType;
      throw new Error(`Exhaustive check failed ${_exhaustiveCheck}`);
    }
  }
};
