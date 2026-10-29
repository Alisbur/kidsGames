import { CheckBoxButton } from "@shared/ui/checkbox-button/checkbox-button";
import { Typography } from "@shared/ui/typography/typography";
import { FC } from "react";

import { OPERATION_NAMES } from "../../constants/option-names";
import {
  EXTRA_TILES_QUANTITY_VARIANTS,
  LIMIT_VARIANTS,
  TASKS_QUANTITY_VARIANTS,
} from "../../constants/settings-options";
import { EXAMPLE_TYPES_ENUM } from "../../enums/example-types.enum";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/set-settings-actions.enum";
import { TSettingActions, TSettings } from "../../types/settings.type";
import styles from "./nums-arrange-settings.module.scss";

type TNumsArrangeSettingsProps = {
  settings: TSettings;
  setSettings: (value: TSettingActions) => void;
};

export const NumsArrangeSettings: FC<TNumsArrangeSettingsProps> = ({ settings, setSettings }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Типы действий
          </Typography>
        </div>
        <div className={styles.options}>
          {Object.keys(EXAMPLE_TYPES_ENUM).map((t) => (
            <CheckBoxButton
              key={t}
              checked={settings.type.includes(t as EXAMPLE_TYPES_ENUM)}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_TYPES,
                  payload: t as EXAMPLE_TYPES_ENUM,
                });
              }}
            >
              {OPERATION_NAMES[t as EXAMPLE_TYPES_ENUM]
                ? OPERATION_NAMES[t as EXAMPLE_TYPES_ENUM]
                : "Неизвестно"}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Максимальные значения
          </Typography>
        </div>

        <div className={styles.options}>
          {LIMIT_VARIANTS.map((l) => (
            <CheckBoxButton
              key={l}
              checked={settings.limit === l}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_LIMIT,
                  payload: l,
                });
              }}
            >
              {l}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Количество заданий
          </Typography>
        </div>

        <div className={styles.options}>
          {TASKS_QUANTITY_VARIANTS.map((q) => (
            <CheckBoxButton
              key={q}
              checked={settings.tasksQuantity === q}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_TASKS_QUANTITY,
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
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Количество дополнительных кубиков
          </Typography>
        </div>

        <div className={styles.options}>
          {EXTRA_TILES_QUANTITY_VARIANTS.map((q) => (
            <CheckBoxButton
              key={q}
              checked={settings.extraTilesQuantity === q}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_EXTRA_TILES_QUANTITY,
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
