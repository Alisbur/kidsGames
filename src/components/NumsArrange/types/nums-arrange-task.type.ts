import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export type TNumsArrangeTask = {
  id: number;
  firstItem: number;
  secondItem: number;
  type: EXAMPLE_TYPES_ENUM;
  result: number;
};

export type TNumsArrangeTaskExt = TNumsArrangeTask & { solved: boolean };
