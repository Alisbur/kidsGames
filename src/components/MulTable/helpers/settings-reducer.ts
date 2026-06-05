import { BASE_VALUES } from "../constants/settings-options";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import { TSettings } from "../types/settings.type";
import { TSettingAction } from "../types/settings-actions.type";

export const settingsReducer = (state: TSettings, action: TSettingAction): TSettings => {
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
    case ACTIONS.SET_QUANTITY: {
      return { ...state, quantity: action.payload };
    }
    case ACTIONS.SET_LIMIT: {
      return { ...state, limit: action.payload };
    }
    case ACTIONS.SET_CAN_MODIFY_ANSWER: {
      return { ...state, canModifyAnswer: action.payload };
    }
    case ACTIONS.SET_SHOULD_SHUFFLE_EXAMPLES: {
      return { ...state, shouldShuffleExamples: action.payload };
    }
    case ACTIONS.SET_BASE_VALUE: {
      if (state.baseValues.includes(action.payload)) {
        if (state.baseValues.length < 2) return state;
        const newBaseValues = state.baseValues.filter((v) => v !== action.payload);
        return { ...state, baseValues: newBaseValues };
      }
      return { ...state, baseValues: [...state.baseValues, action.payload] };
    }
    case ACTIONS.RESET_BASE_VALUES: {
      return { ...state, baseValues: [BASE_VALUES[0]] };
    }
    case ACTIONS.SELECT_ALL_BASE_VALUES: {
      return { ...state, baseValues: [...BASE_VALUES] };
    }
    default: {
      const exhaustiveCheck: never = actionType;
      throw new Error(`Exhaustive check failed ${exhaustiveCheck}`);
    }
  }
};
