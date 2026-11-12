import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../enums/can-modify-answer.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SHOULD_SHUFFLE_EXAMPLES_ENUM } from "../enums/should-shuffle-examples.enum";
import { TSettings } from "../types/settings.type";

export type TMulTableMenuItem = {
  id: number;
  settings: TSettings;
  title: string;
};

export const MUL_TABLE_MENU_ITEMS: TMulTableMenuItem[] = [
  {
    id: 1,
    title: "Умножение 1",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [1],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 2,
    title: "Умножение 2",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [2],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 3,
    title: "Умножение 3",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [3],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 4,
    title: "Умножение 4",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [4],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 5,
    title: "Умножение 5",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [5],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 6,
    title: "Умножение 6",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [6],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 7,
    title: "Умножение 7",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [7],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 8,
    title: "Умножение 8",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [8],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },

  {
    id: 9,
    title: "Умножение 9",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [9],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
  {
    id: 10,
    title: "Умножение 10",
    settings: {
      type: [EXAMPLE_TYPES_ENUM.MUL],
      quantity: 10,
      limit: 10,
      canModifyAnswer: CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
      baseValues: [10],
      shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.NO,
    },
  },
];
