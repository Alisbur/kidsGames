import { CheckBoxButton } from "@shared/ui/checkbox-button/checkbox-button";
import { Typography } from "@shared/ui/typography/typography";
import { FC } from "react";

import { LETTERS_QUANTITY, WORDS_QUANTITY } from "../../constants/settings-options";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/set-settings-actions.enum";
import { TSettings, TSettingsActions } from "../../types/settings.type";
import styles from "./tasks-settings.module.scss";

type TTasksSettingsProps = {
  settings: TSettings;
  setSettings: (value: TSettingsActions) => void;
};

export const TasksSettings: FC<TTasksSettingsProps> = ({ settings, setSettings }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Длина слова
        </Typography>
        <div className={styles.options}>
          {LETTERS_QUANTITY.map((q) => (
            <CheckBoxButton
              key={q}
              checked={settings.lettersQuantity.includes(q)}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_LETTERS_QUANTITY,
                  payload: q,
                });
              }}
            >
              {q}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Количество слов
        </Typography>

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
