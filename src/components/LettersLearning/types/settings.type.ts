import { SET_SETTINGS_ACTIONS_ENUM } from "../enums/set-settings-actions.enum";

export type TSettings = {
  voice: SpeechSynthesisVoice | null;
};

export type TSettingsActions = {
  type: SET_SETTINGS_ACTIONS_ENUM.SET_VOICE;
  payload: SpeechSynthesisVoice | null;
};
