import { TRANSLATION_GAME_TYPE_ENUM } from "../enums/game-type.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";

export type TSettings = {
  wordsQuantity: number;
  gameType: TRANSLATION_GAME_TYPE_ENUM;
};

export type TSettingsActions =
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_WORDS_QUANTITY;
      payload: number;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_GAME_TYPE;
      payload: TRANSLATION_GAME_TYPE_ENUM;
    };
