import { FIELD_SIZES_ENUM } from "../enum/field-sizes.enum";

export const FIELD_OPTIONS_NAMES: Record<FIELD_SIZES_ENUM, string> = {
  [FIELD_SIZES_ENUM.SMALL]: "3 x 3",
  [FIELD_SIZES_ENUM.MEDIUM]: "4 x 4",
  [FIELD_SIZES_ENUM.LARGE]: "5 x 5",
  [FIELD_SIZES_ENUM.EXTRA_LARGE]: "5 x 8",
};

export const FIELD_OPTIONS_SIZES: Record<
  FIELD_SIZES_ENUM,
  { stacks: number, ballsInStack: number }
> = {
  [FIELD_SIZES_ENUM.SMALL]: { stacks: 3, ballsInStack: 3 },
  [FIELD_SIZES_ENUM.MEDIUM]: { stacks: 4, ballsInStack: 4 },
  [FIELD_SIZES_ENUM.LARGE]: { stacks: 5, ballsInStack: 5 },
  [FIELD_SIZES_ENUM.EXTRA_LARGE]: { stacks: 5, ballsInStack: 8 },
};
