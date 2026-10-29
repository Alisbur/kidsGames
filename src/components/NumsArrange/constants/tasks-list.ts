import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TNumsArrangeTask } from "../types/nums-arrange-task.type";

export const NUMS_ARRANGE_TASK_LIST: TNumsArrangeTask[] = [
  { id: 1, firstItem: 1, secondItem: 2, type: EXAMPLE_TYPES_ENUM.SUM, result: 3 },
  { id: 2, firstItem: 2, secondItem: 3, type: EXAMPLE_TYPES_ENUM.SUM, result: 5 },
  { id: 3, firstItem: 12, secondItem: 4, type: EXAMPLE_TYPES_ENUM.SUB, result: 8 },
  { id: 4, firstItem: 4, secondItem: 6, type: EXAMPLE_TYPES_ENUM.SUM, result: 10 },
  { id: 5, firstItem: 9, secondItem: 3, type: EXAMPLE_TYPES_ENUM.SUB, result: 6 },
  { id: 6, firstItem: 10, secondItem: 4, type: EXAMPLE_TYPES_ENUM.SUB, result: 6 },
  { id: 7, firstItem: 5, secondItem: 2, type: EXAMPLE_TYPES_ENUM.SUB, result: 3 },
  { id: 8, firstItem: 7, secondItem: 8, type: EXAMPLE_TYPES_ENUM.SUM, result: 15 },
  { id: 9, firstItem: 6, secondItem: 7, type: EXAMPLE_TYPES_ENUM.SUM, result: 13 },
  { id: 10, firstItem: 11, secondItem: 2, type: EXAMPLE_TYPES_ENUM.SUB, result: 9 },
  { id: 11, firstItem: 7, secondItem: 2, type: EXAMPLE_TYPES_ENUM.SUB, result: 5 },
  { id: 12, firstItem: 5, secondItem: 2, type: EXAMPLE_TYPES_ENUM.SUM, result: 7 },
];
