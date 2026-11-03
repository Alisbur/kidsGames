import { useEffect, useReducer, useState } from "react";

import { useSpeechSynthesis } from "@/shared/hooks/use-speech-synthesis";

import { INIT_SETTINGS } from "./constants/init-settings";
import { GAME_STEPS_ENUM } from "./enums/game-steps.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "./enums/set-settings-actions.enum";
import { settingsReducer } from "./helpers/settings-reducer";
import { TSettings, TSettingsActions } from "./types/settings.type";
import { AlphabetStep } from "./ui/steps-interfaces/alphabet-step/alphabet-step";
import { LettersStep } from "./ui/steps-interfaces/letters-step/letters-step";
import { MenuStep } from "./ui/steps-interfaces/menu-step/menu-step";
import { SettingsStep } from "./ui/steps-interfaces/settings-step/settings-step";

export function LettersLearning() {
  const [gameStep, setGameStep] = useState<GAME_STEPS_ENUM>(GAME_STEPS_ENUM.MENU);
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const { speak, voices, selectedVoice, setSelectedVoice } = useSpeechSynthesis("en");

  useEffect(() => {
    if (
      selectedVoice?.name !== settings.voice?.name &&
      selectedVoice?.voiceURI !== settings.voice?.voiceURI
    ) {
      settingsDispatch({ type: SET_SETTINGS_ACTIONS_ENUM.SET_VOICE, payload: selectedVoice });
      if (gameStep === GAME_STEPS_ENUM.SETTINGS) speak?.("Hello");
    }
  }, [selectedVoice]);

  switch (gameStep) {
    case GAME_STEPS_ENUM.ALPHABET: {
      return <AlphabetStep speak={speak} settings={settings} setGameStep={setGameStep} />;
    }
    case GAME_STEPS_ENUM.LETTERS: {
      return <LettersStep speak={speak} settings={settings} setGameStep={setGameStep} />;
    }
    case GAME_STEPS_ENUM.MENU: {
      return <MenuStep setGameStep={setGameStep} />;
    }
    case GAME_STEPS_ENUM.SETTINGS: {
      return (
        <SettingsStep
          voices={voices}
          setSelectedVoice={setSelectedVoice}
          selectedVoice={selectedVoice}
          settings={settings}
          setSettings={settingsDispatch}
          setGameStep={setGameStep}
          speak={speak}
        />
      );
    }
    default: {
      const _exhaustiveCheck: never = gameStep;
      if (_exhaustiveCheck) throw new Error(`Exhaustive check failed ${_exhaustiveCheck}`);
    }
  }
}
