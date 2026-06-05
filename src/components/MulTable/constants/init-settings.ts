import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SHOULD_SHUFFLE_EXAMPLES_ENUM } from "../enums/should-shuffle-examples.enum";
import { TSettings } from "../types/settings.type";

export const INIT_SETTINGS: TSettings = {
  type: [EXAMPLE_TYPES_ENUM.SUM],
  quantity: 10, // Не используется
  limit: 2,
  canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
  baseValues: [1, 2],
  shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
};
