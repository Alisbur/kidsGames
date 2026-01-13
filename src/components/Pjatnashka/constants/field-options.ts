import { FIELD_SIZES_ENUM } from "../enums/field-sizes.enum";

export const FIELD_OPTIONS_NAMES: Record<FIELD_SIZES_ENUM, string> = {
  [FIELD_SIZES_ENUM.SMALL]: "3 x 3",
  [FIELD_SIZES_ENUM.MEDIUM]: "4 x 4",
  [FIELD_SIZES_ENUM.LARGE]: "5 x 5",
};

export const FIELD_OPTIONS_SIZES: Record<
  FIELD_SIZES_ENUM,
  { fieldW: number, fieldH: number }
> = {
  [FIELD_SIZES_ENUM.SMALL]: { fieldW: 3, fieldH: 3 },
  [FIELD_SIZES_ENUM.MEDIUM]: { fieldW: 4, fieldH: 4 },
  [FIELD_SIZES_ENUM.LARGE]: { fieldW: 5, fieldH: 5 },
};
