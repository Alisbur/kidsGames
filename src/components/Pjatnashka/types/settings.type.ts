import { FIELD_SIZES_ENUM } from "../enums/field-sizes.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enums/shuffle-options.enum";

export type TSettings = {
  fieldSizeType: FIELD_SIZES_ENUM;
  // fieldSize: { fieldW: number; fieldH: number };
  shuffleType: SHUFFLE_OPTIONS_ENUM;
};
