import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export const OPERATION_VARIANTS: EXAMPLE_TYPES_ENUM[] = [
  EXAMPLE_TYPES_ENUM.SUM,
  EXAMPLE_TYPES_ENUM.SUB,
  EXAMPLE_TYPES_ENUM.MUL,
  EXAMPLE_TYPES_ENUM.DIV,
];

export const QUANTITY_VARIANTS = [5, 10, 15, 25]; // Не используется

export const LIMIT_VARIANTS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const BASE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CAN_MODIFY_ANSWER: CAN_MODIFY_ANSWER_OPTIONS_ENUM = CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES;
