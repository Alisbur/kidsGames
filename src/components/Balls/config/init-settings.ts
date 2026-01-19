import { FIELD_SIZES_ENUM } from "../enum/field-sizes.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enum/shuffle-options.enum";
import { TBallsSettings } from "../types/settings.type";

export const INIT_SETTINGS: TBallsSettings = {
  fieldSizeType: FIELD_SIZES_ENUM.MEDIUM,
  shuffleType: SHUFFLE_OPTIONS_ENUM.MEDIUM,
};
