import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { TASK_LEVELS_ENUM } from "../enums/tasks-levels.enum";
import { TASKS_TYPES_ENUM } from "../enums/tasks-types.enum";
import { TSettings } from "../types/settings.type";

export const INIT_SETTINGS: TSettings = {
  type: [TASKS_TYPES_ENUM.SUM],
  quantity: 10,
  level: [TASK_LEVELS_ENUM.EASY],
  canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
};
