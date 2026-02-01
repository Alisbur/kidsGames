import { FIELD_SIZES_ENUM } from "../enum/field-sizes.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enum/shuffle-options.enum";

export type TBallsSettings = {
  fieldSizeType: FIELD_SIZES_ENUM;
  shuffleType: SHUFFLE_OPTIONS_ENUM;
};
