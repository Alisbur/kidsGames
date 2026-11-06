import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";

export type TSettings = {
  voice: SpeechSynthesisVoice | null;
  maxLen: number;
};

export type TSettingsActions =
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_VOICE;
      payload: SpeechSynthesisVoice | null;
    }
  | {
      type: SET_SETTINGS_ACTIONS_ENUM.SET_MAX_WORDS_LENGTH;
      payload: number;
    };
