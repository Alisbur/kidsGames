import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";

export type TSettingAction =
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_CAN_MODIFY_ANSWER;
      payload: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_LIMIT;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_QUANTITY;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_TYPES;
      payload: EXAMPLE_TYPES_ENUM;
    };
