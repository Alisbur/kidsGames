import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export const exampleTypeGuard = (
  val: unknown
): val is EXAMPLE_TYPES_ENUM => {
  return Object.values(EXAMPLE_TYPES_ENUM).includes(val as EXAMPLE_TYPES_ENUM);
};

export const canModifyAnswerTypeGuard = (
  val: unknown
): val is CAN_MODIFY_ANSWER_OPTIONS_ENUM => {
  return Object.values(CAN_MODIFY_ANSWER_OPTIONS_ENUM).includes(val as CAN_MODIFY_ANSWER_OPTIONS_ENUM);
};