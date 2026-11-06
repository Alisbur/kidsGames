import { CheckBoxButton } from "@shared/ui/checkbox-button/checkbox-button";
import { Typography } from "@shared/ui/typography/typography";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";

// import {
//   MAX_WORD_LEN_OPTIONS,
//   MAX_WORD_LEN_OPTIONS_NAMES,
// } from "@/components/WordPartsEng/constants/settings-options";
// import { SET_SETTINGS_ACTIONS_ENUM } from "@/components/WordPartsEng/enums/set-settings-actions.enum";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
// import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../../../types/settings.type";
import styles from "./settings-step.module.scss";

type TSettingsStepProps = {
  settings: TSettings;
  setSettings: (value: TSettingsActions) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  setGameStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
  speak: ((input: string | string[], pause?: number) => void) | null;
};

export const SettingsStep: FC<TSettingsStepProps> = ({
  // settings,
  // setSettings,
  voices,
  selectedVoice,
  setSelectedVoice,
  setGameStep,
  // speak,
}) => {
  return (
    <PageContentLayout
      headerContent={
        <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
          Настройки
        </Typography>
      }
      mainContent={
        <div className={styles.wrapper}>
          {/* <div className={styles.optionsBlock}>
            <div className={styles.optionsHeader}>
              <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
                Максимальная длина слов
              </Typography>
            </div>

            <div className={styles.options}>
              {MAX_WORD_LEN_OPTIONS.map((l) => (
                <CheckBoxButton
                  key={l}
                  checked={settings.maxLen === l}
                  fullWidth
                  onClick={() => {
                    setSettings({
                      type: SET_SETTINGS_ACTIONS_ENUM.SET_MAX_WORDS_LENGTH,
                      payload: l,
                    });
                  }}
                >
                  {MAX_WORD_LEN_OPTIONS_NAMES[l.toString()]}
                </CheckBoxButton>
              ))}
            </div>
          </div> */}

          <div className={styles.optionsBlock}>
            <div className={styles.optionsHeader}>
              <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
                Вариант голоса
              </Typography>
            </div>
            <div className={classNames(styles.options, styles.options_1col)}>
              {voices.length ? (
                voices.map((v, idx) => (
                  <CheckBoxButton
                    key={idx}
                    checked={
                      v.name === selectedVoice?.name && v.voiceURI === selectedVoice?.voiceURI
                    }
                    fullWidth
                    onClick={() => {
                      setSelectedVoice(v);
                    }}
                  >
                    {v.name}
                  </CheckBoxButton>
                ))
              ) : (
                <Typography view={"p-16"} tag={"p"} color={"error"} weight={"semibold"}>
                  Браузер не поддерживает воспроизведение речи! Попробуйте установить языковые
                  пакеты.
                </Typography>
              )}
            </div>
          </div>
        </div>
      }
      mainContentScroll={true}
      mainDivider
      footerContent={
        <MenuButton
          text={"Назад"}
          onClick={() => {
            setGameStep(GAME_STEPS_ENUM.MENU);
          }}
        />
      }
    />
  );
};
