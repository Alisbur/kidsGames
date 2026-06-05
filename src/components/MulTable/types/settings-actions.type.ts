import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";
import { SHOULD_SHUFFLE_EXAMPLES_ENUM } from "../enums/should-shuffle-examples.enum";

export type TSettingAction =
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_CAN_MODIFY_ANSWER;
      payload: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_SHOULD_SHUFFLE_EXAMPLES;
      payload: SHOULD_SHUFFLE_EXAMPLES_ENUM;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_LIMIT;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_BASE_VALUE;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.RESET_BASE_VALUES;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SELECT_ALL_BASE_VALUES;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_QUANTITY;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_TYPES;
      payload: EXAMPLE_TYPES_ENUM;
    };
