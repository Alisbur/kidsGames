import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";

export type TSettings = {
  lettersQuantity: number[];
  wordsQuantity: number;
};

export type TSettingsActions =
  | { type: SET_SETTINGS_ACTIONS_ENUM.SET_LETTERS_QUANTITY; payload: number }
  | { type: SET_SETTINGS_ACTIONS_ENUM.SET_WORDS_QUANTITY; payload: number };
