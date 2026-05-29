import { FIELD_SIZES_ENUM } from "../enums/field-sizes.enum";
import { GAME_TYPES_ENUM } from "../enums/game-types.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enums/shuffle-options.enum";
import { TSettings } from "../types/settings.type";

export const INIT_SETTINGS: TSettings = {
  fieldSizeType: FIELD_SIZES_ENUM.MEDIUM,
  shuffleType: SHUFFLE_OPTIONS_ENUM.MEDIUM,
  gameType: GAME_TYPES_ENUM.NUMBERS,
};
