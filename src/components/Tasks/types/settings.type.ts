import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";
import { TASK_LEVELS_ENUM } from "../enums/tasks-levels.enum";
import { TASKS_TYPES_ENUM } from "../enums/tasks-types.enum";

export type TSettings = {
  type: TASKS_TYPES_ENUM[];
  quantity: number;
  level: TASK_LEVELS_ENUM[];
  canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
};

export type TSettingsActions =
  | { type: SET_SETTINGS_ACTIONS_ENUM.SET_TYPES; payload: TASKS_TYPES_ENUM }
  | { type: SET_SETTINGS_ACTIONS_ENUM.SET_QUANTITY; payload: number }
  | { type: SET_SETTINGS_ACTIONS_ENUM.SET_LEVEL; payload: TASK_LEVELS_ENUM }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_CAN_MODIFY_ANSWER;
      payload: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
    };
