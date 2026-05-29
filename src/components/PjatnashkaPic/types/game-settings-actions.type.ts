import { FIELD_SIZES_ENUM } from "../enums/field-sizes.enum";
import { GAME_SETTINGS_ACTIONS_ENUM } from "../enums/game-settings-actions.enum";
import { GAME_TYPES_ENUM } from "../enums/game-types.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enums/shuffle-options.enum";

export type TGameSettingsActions =
  | { type: GAME_SETTINGS_ACTIONS_ENUM.SET_GAME_TYPE; payload: GAME_TYPES_ENUM }
  | { type: GAME_SETTINGS_ACTIONS_ENUM.SET_FIELD_SIZE; payload: FIELD_SIZES_ENUM }
  | { type: GAME_SETTINGS_ACTIONS_ENUM.SET_SHUFFLE_TYPE; payload: SHUFFLE_OPTIONS_ENUM };
