import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TSettings } from "../types/settings.type";

export const INIT_SETTINGS: TSettings = {
  type: [EXAMPLE_TYPES_ENUM.SUM],
  quantity: 10,
  limit: 10,
  canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
};
