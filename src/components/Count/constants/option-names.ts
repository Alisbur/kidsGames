import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export const OPERATION_NAMES: Record<EXAMPLE_TYPES_ENUM, string> = {
  [EXAMPLE_TYPES_ENUM.SUM]: "Сложение",
  [EXAMPLE_TYPES_ENUM.SUB]: "Вычитание",
  [EXAMPLE_TYPES_ENUM.MUL]: "Умножение",
  [EXAMPLE_TYPES_ENUM.DIV]: "Деление",
};

export const CAN_MODIFY_ANSWER_NAMES: Record<CAN_MODIFY_ANSWER_OPTIONS_ENUM, string> = {
  [CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES]: "Можно",
  [CAN_MODIFY_ANSWER_OPTIONS_ENUM.NO]: "Нельзя",
};
