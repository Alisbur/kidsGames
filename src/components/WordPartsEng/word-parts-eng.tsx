import { useEffect, useReducer, useState } from "react";

import { shuffleArray } from "@/shared/helpers/shuffle-array";
import { useSpeechSynthesis } from "@/shared/hooks/use-speech-synthesis";

import { INIT_SETTINGS } from "./constants/init-settings";
import { WORDS_DICT } from "./constants/words";
import { GAME_STEPS_ENUM } from "./enums/game-steps.enum";
import { SET_SETTINGS_ACTIONS_ENUM } from "./enums/set-settings-actions.enum";
import { settingsReducer } from "./helpers/settings-reducer";
import { TSettings, TSettingsActions } from "./types/settings.type";
import { TWord } from "./types/word.type";
import { GameStep } from "./ui/step-interfaces/game-step/game-step";
import { MenuStep } from "./ui/step-interfaces/menu-step/menu-step";
import { SettingsStep } from "./ui/step-interfaces/settings-step/settings-step";

const SOUND_TEST_PHRASE = "Hello";

export const WordPartsEng = () => {
  const [words, setWords] = useState<TWord[]>(shuffleArray(WORDS_DICT));
  const [gameStep, setGameStep] = useState<GAME_STEPS_ENUM>(GAME_STEPS_ENUM.MENU);
  const [activeIdx, setActiveIdx] = useState<number>(0);

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
      if (gameStep === GAME_STEPS_ENUM.SETTINGS) speak?.(SOUND_TEST_PHRASE);
    }
  }, [selectedVoice]);

  useEffect(() => {
    setWords(
      shuffleArray(
        WORDS_DICT.filter(
          (w) => w.wordEng.length <= settings.maxLen && w.wordEng.length >= settings.minLen,
        ),
      ),
    );
  }, [settings.maxLen, settings.minLen]);

  const handleNextWord = () => {
    setActiveIdx((prev) => (activeIdx === words.length - 1 ? 0 : prev + 1));
  };

  const handlePrevWord = () => {
    setActiveIdx((prev) => (activeIdx === 0 ? words.length - 1 : prev - 1));
  };

  switch (gameStep) {
    case GAME_STEPS_ENUM.MENU: {
      return <MenuStep setGameStep={setGameStep} setSettings={settingsDispatch} />;
    }
    case GAME_STEPS_ENUM.GAME: {
      return (
        <GameStep
          setGameStep={setGameStep}
          word={words[activeIdx]}
          handleNextWord={handleNextWord}
          handlePrevWord={handlePrevWord}
          speak={speak}
        />
      );
    }
    case GAME_STEPS_ENUM.SETTINGS: {
      return (
        <SettingsStep
          setGameStep={setGameStep}
          settings={settings}
          setSettings={settingsDispatch}
          voices={voices}
          setSelectedVoice={setSelectedVoice}
          selectedVoice={selectedVoice}
          speak={speak}
        />
      );
    }
    default: {
      const _exhaustiveCheck: never = gameStep;
      if (_exhaustiveCheck) throw new Error(`Exhaustive check failed ${_exhaustiveCheck}`);
    }
  }
};
