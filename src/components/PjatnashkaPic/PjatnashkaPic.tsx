import pics from "@assets/images";
import { getRandomFromArray } from "@shared/helpers/get-random-from-array";
import { useCroppedImage } from "@shared/hooks/use-cropped-image";
import { useCallback, useEffect, useReducer, useState } from "react";

import { INIT_SETTINGS } from "./constants/init-settings";
import { GAME_ACTIONS_ENUM } from "./enums/game-actions.enum";
import { GAME_STEPS_ENUM as STEP } from "./enums/game-steps.enum";
import { GAME_TYPES_ENUM } from "./enums/game-types.enum";
import { fieldStateReducer } from "./helpers/field-state-reducer";
import { settingsReducer } from "./helpers/settings-reducer";
import { TFieldState } from "./types/field-state.type";
import { TGameActions } from "./types/game-actions.type";
import { TGameSettingsActions } from "./types/game-settings-actions.type";
import { TSettings } from "./types/settings.type";
import { GameStep } from "./ui/steps-interfaces/game-step/game-step";
import { MenuStep } from "./ui/steps-interfaces/menu-step/menu-step";
import { ResultsStep } from "./ui/steps-interfaces/results-step/results";
import { SettingsStep } from "./ui/steps-interfaces/settings-step/settings-step";

const BG_IMAGES = [
  pics.story_ezhik,
  pics.story_kengurenok,
  pics.story_kotenok,
  pics.story_lisenok,
  pics.story_medvegenok,
  pics.story_slonenok,
  pics.story_utenok,
  pics.story_zaichenok,
  pics.story_ziplenok,
];

const IMG_MAX_CROP_SIZE = 600;

export function PjatnashkaPic() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TGameSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [fieldState, fieldStateDispatch] = useReducer<
    (state: TFieldState, action: TGameActions) => TFieldState
  >(fieldStateReducer, []);

  const [step, setStep] = useState<STEP>(STEP.MENU);
  const [isShuffleDone, setIsShuffleDone] = useState(false);
  const [isShuffleRunning, setShuffleIsRunning] = useState(false);
  const [imgUrl, setImageUrl] = useState<string | null>(null);
  const { croppedUrl, cropImage, isLoading, resetCrop } = useCroppedImage();
  const [currentSettings, setCurrentSettings] = useState<TSettings>(INIT_SETTINGS);

  useEffect(() => {
    if (isShuffleDone) setShuffleIsRunning(false);
  }, [isShuffleDone]);

  useEffect(() => {
    if (imgUrl) cropImage({ img: imgUrl, maxW: IMG_MAX_CROP_SIZE, maxH: IMG_MAX_CROP_SIZE });
  }, [imgUrl, cropImage]);

  const initNewGame = useCallback(
    (newSettings: TSettings) => {
      setIsShuffleDone(false);
      resetCrop();

      switch (newSettings.gameType) {
        case GAME_TYPES_ENUM.NUMBERS: {
          setImageUrl(null);
          break;
        }
        case GAME_TYPES_ENUM.PICTURE: {
          setImageUrl(getRandomFromArray(BG_IMAGES));
          setIsShuffleDone(false);
          break;
        }
        default: {
          const _exhaustiveCheck: never = newSettings.gameType;
          if (_exhaustiveCheck) throw new Error("Exhaustive check failed");
        }
      }
      setCurrentSettings({ ...newSettings });
      fieldStateDispatch({
        type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
        payload: newSettings,
      });
      setStep(STEP.GAME);
    },
    [resetCrop],
  );

  switch (step) {
    case STEP.MENU:
      return <MenuStep initNewGame={initNewGame} setStep={setStep} />;

    case STEP.SETTINGS: {
      return (
        <SettingsStep
          settings={settings}
          settingsDispatch={settingsDispatch}
          setStep={setStep}
          initNewGame={initNewGame}
        />
      );
    }

    case STEP.GAME:
      return (
        <GameStep
          settings={currentSettings}
          isLoading={isLoading}
          isShuffleRunning={isShuffleRunning}
          croppedUrl={croppedUrl}
          fieldState={fieldState}
          fieldStateDispatch={fieldStateDispatch}
          isShuffleDone={isShuffleDone}
          setIsShuffleDone={setIsShuffleDone}
          setShuffleIsRunning={setShuffleIsRunning}
          setStep={setStep}
        />
      );
    case STEP.RESULTS: {
      return <ResultsStep initNewGame={() => initNewGame(currentSettings)} setStep={setStep} />;
    }
    default: {
      const _exhaustiveCheck: never = step;
      if (_exhaustiveCheck) throw new Error(`Unhandled step: ${_exhaustiveCheck}`);
    }
  }
}
