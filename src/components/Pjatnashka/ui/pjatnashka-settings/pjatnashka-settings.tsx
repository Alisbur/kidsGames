import { TSettings } from "../../types/settings.type";
import styles from "./pjatnashka-settings.module.scss";
import { GAME_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/game-settings-actions.enum";
import { FC } from "react";
import { CheckBoxButton } from "../../../../shared/ui/checkbox-button/checkbox-button";
import { Typography } from "../../../../shared/ui/typography/typography";
import { FIELD_SIZES_ENUM } from "../../enums/field-sizes.enum";
import { FIELD_OPTIONS_NAMES } from "../../constants/field-options";
import { SHUFFLE_OPTIONS_ENUM } from "../../enums/shuffle-options.enum";
import { SHUFFLE_OPTIONS_NAMES } from "../../constants/shuffle-options";
import { TGameSettingsActions } from "../../types/game-settings-actions.type";

type TPjatnashkaSettingsProps = {
  settings: TSettings;
  setSettings: (value: TGameSettingsActions) => void;

  // setSettings: (value: {
  //   type: ACTIONS;
  //   payload: FIELD_SIZES_ENUM | SHUFFLE_OPTIONS_ENUM;
  // }) => void;
};

export const PjatnashkaSettings: FC<TPjatnashkaSettingsProps> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Размер поля
        </Typography>
        <div className={styles.options}>
          {Object.keys(FIELD_SIZES_ENUM).map((t) => (
            <CheckBoxButton
              key={t}
              checked={settings.fieldSizeType === t}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_FIELD_SIZE,
                  payload: t as FIELD_SIZES_ENUM,
                });
              }}
            >
              {FIELD_OPTIONS_NAMES[t as FIELD_SIZES_ENUM] ?? "Неизвестно"}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Сложность перемешивания
        </Typography>

        <div className={styles.options}>
          {Object.keys(SHUFFLE_OPTIONS_ENUM).map((s) => (
            <CheckBoxButton
              key={s}
              checked={settings.shuffleType === s}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_SHUFFLE_TYPE,
                  payload: s as SHUFFLE_OPTIONS_ENUM,
                });
              }}
            >
              {SHUFFLE_OPTIONS_NAMES[s as SHUFFLE_OPTIONS_ENUM] ?? "Неизвестно"}
            </CheckBoxButton>
          ))}
        </div>
      </div>
    </div>
  );
};
