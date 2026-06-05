import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export type TExample = {
  firstItem: number;
  secondItem: number;
  type: EXAMPLE_TYPES_ENUM;
  result: number;
  solved: boolean;
};
