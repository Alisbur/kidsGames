import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { TASK_LEVELS_ENUM } from "../enums/tasks-levels.enum";
import { TASKS_TYPES_ENUM } from "../enums/tasks-types.enum";

export const OPERATION_NAMES: Record<TASKS_TYPES_ENUM, string> = {
  [TASKS_TYPES_ENUM.SUM]: "Сложение",
  [TASKS_TYPES_ENUM.SUB]: "Вычитание",
  [TASKS_TYPES_ENUM.MUL]: "Умножение",
  [TASKS_TYPES_ENUM.DIV]: "Деление",
};

export const CAN_MODIFY_ANSWER_NAMES: Record<CAN_MODIFY_ANSWER_OPTIONS_ENUM, string> = {
  [CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES]: "Можно",
  [CAN_MODIFY_ANSWER_OPTIONS_ENUM.NO]: "Нельзя",
};

export const TASK_LEVEL_NAMES: Record<TASK_LEVELS_ENUM, string> = {
  [TASK_LEVELS_ENUM.EASY]: "Несложные",
  [TASK_LEVELS_ENUM.MID]: "Надо подумать",
  [TASK_LEVELS_ENUM.HARD]: "Посложнее",
};
