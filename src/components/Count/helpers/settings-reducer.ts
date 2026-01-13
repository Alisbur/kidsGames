import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../enums/set-settings-actions.enum";
import {
  canModifyAnswerTypeGuard,
  exampleTypeGuard,
} from "../types/typeguards";
import { TSettings } from "../types/settings.type";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export const settingsReducer = (
  state: TSettings,
  action: {
    type: ACTIONS;
    payload: number | EXAMPLE_TYPES_ENUM | CAN_MODIFY_ANSWER_OPTIONS_ENUM;
  }
): TSettings => {
  if (action.type === ACTIONS.SET_LIMIT && typeof action.payload === "number") {
    return { ...state, limit: action.payload };
  }

  if (action.type === ACTIONS.SET_TYPES && exampleTypeGuard(action.payload)) {
    if (state.type.includes(action.payload as EXAMPLE_TYPES_ENUM)) {
      const newTypes = state.type.filter((t) => t !== action.payload);
      return { ...state, type: newTypes };
    }
    return { ...state, type: [...state.type, action.payload] };
  }

  if (
    action.type === ACTIONS.SET_QUANTITY &&
    typeof action.payload === "number"
  ) {
    return { ...state, quantity: action.payload };
  }

  if (
    action.type === ACTIONS.SET_CAN_MODIFY_ANSWER &&
    canModifyAnswerTypeGuard(action.payload)
  ) {
    return { ...state, canModifyAnswer: action.payload };
  }

  return { ...state };
};
