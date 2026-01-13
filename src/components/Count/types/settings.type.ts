import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export type TSettings = {
  type: EXAMPLE_TYPES_ENUM[];
  quantity: number;
  limit: number;
  canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
};
