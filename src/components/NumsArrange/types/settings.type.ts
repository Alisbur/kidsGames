import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";

export type TSettings = {
  type: EXAMPLE_TYPES_ENUM[];
  tasksQuantity: number;
  extraTilesQuantity: number;
  limit: number;
  // canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
};

export type TSettingActions =
  // | {
  //     type: SET_SETTINGS_ACTIONS_ENUM.SET_CAN_MODIFY_ANSWER;
  //     payload: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
  //   }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_LIMIT;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_TASKS_QUANTITY;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_EXTRA_TILES_QUANTITY;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_TYPES;
      payload: EXAMPLE_TYPES_ENUM;
    };
