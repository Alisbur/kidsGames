import { FIELD_SIZES_ENUM } from "../enum/field-sizes.enum";
import { GAME_SETTINGS_ACTIONS_ENUM } from "../enum/game-settings-actions.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enum/shuffle-options.enum";

export type TGameSettingsActions =
  | { type: GAME_SETTINGS_ACTIONS_ENUM.SET_FIELD_SIZE, payload: FIELD_SIZES_ENUM }
  | { type: GAME_SETTINGS_ACTIONS_ENUM.SET_SHUFFLE_TYPE, payload: SHUFFLE_OPTIONS_ENUM };
  
  