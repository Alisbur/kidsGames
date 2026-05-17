import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { TASK_LEVELS_ENUM } from "../enums/tasks-levels.enum";
import { TASKS_TYPES_ENUM } from "../enums/tasks-types.enum";

export const taskTypeGuard = (val: unknown): val is TASKS_TYPES_ENUM => {
  return Object.values(TASKS_TYPES_ENUM).includes(val as TASKS_TYPES_ENUM);
};

export const taskLevelGuard = (val: unknown): val is TASK_LEVELS_ENUM => {
  return Object.values(TASK_LEVELS_ENUM).includes(val as TASK_LEVELS_ENUM);
};

export const canModifyAnswerTypeGuard = (val: unknown): val is CAN_MODIFY_ANSWER_OPTIONS_ENUM => {
  return Object.values(CAN_MODIFY_ANSWER_OPTIONS_ENUM).includes(
    val as CAN_MODIFY_ANSWER_OPTIONS_ENUM,
  );
};
