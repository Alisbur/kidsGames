import { CheckBoxButton } from "@shared/ui/checkbox-button/checkbox-button";
import { Typography } from "@shared/ui/typography/typography";
import classNames from "classnames";
import { FC } from "react";

import { GAME_TYPES_NAMES } from "../../constants/game-types-names";
import { WORDS_QUANTITY } from "../../constants/settings-options";
import { TRANSLATION_GAME_TYPE_ENUM } from "../../enums/game-type.enum";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../../types/settings.type";
import styles from "./translation-arrange-settings.module.scss";

type TTranslationArrangeSettingsProps = {
  settings: TSettings;
  setSettings: (value: TSettingsActions) => void;
};

export const TranslationArrangeSettings: FC<TTranslationArrangeSettingsProps> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Тип заданий
          </Typography>
        </div>
        <div className={classNames(styles.options, styles.options_2cols)}>
          {Object.keys(TRANSLATION_GAME_TYPE_ENUM).map((t) => (
            <CheckBoxButton
              key={t}
              checked={settings.gameType === t}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_GAME_TYPE,
                  payload: t as TRANSLATION_GAME_TYPE_ENUM,
                });
              }}
            >
              {GAME_TYPES_NAMES[t as TRANSLATION_GAME_TYPE_ENUM]
                ? GAME_TYPES_NAMES[t as TRANSLATION_GAME_TYPE_ENUM]
                : "Неизвестно"}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Количество слов
          </Typography>
        </div>

        <div className={styles.options}>
          {WORDS_QUANTITY.map((q) => (
            <CheckBoxButton
              key={q}
              checked={settings.wordsQuantity === q}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_WORDS_QUANTITY,
                  payload: q,
                });
              }}
            >
              {q}
            </CheckBoxButton>
          ))}
        </div>
      </div>
    </div>
  );
};
