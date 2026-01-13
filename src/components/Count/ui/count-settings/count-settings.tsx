import { TSettings } from "../../types/settings.type";
import styles from "./count-settings.module.scss";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/set-settings-actions.enum";
import { EXAMPLE_TYPES_ENUM } from "../../enums/example-types.enum";
import { FC } from "react";
import {
  CAN_MODIFY_ANSWER_NAMES,
  OPERATION_NAMES,
} from "../../constants/option-names";
import { CheckBoxButton } from "../../../../shared/ui/checkbox-button/checkbox-button";
import {
  LIMIT_VARIANTS,
  QUANTITY_VARIANTS,
} from "../../constants/settings-options";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../../enums/can-modify-answer.enum";
import {
  canModifyAnswerTypeGuard,
  exampleTypeGuard,
} from "../../types/typeguards";
import { Typography } from "../../../../shared/ui/typography/typography";

type TCountSettingsProps = {
  settings: TSettings;
  setSettings: (value: {
    type: ACTIONS;
    payload: number | EXAMPLE_TYPES_ENUM | CAN_MODIFY_ANSWER_OPTIONS_ENUM;
  }) => void;
};

export const CountSettings: FC<TCountSettingsProps> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Типы операций
        </Typography>
        <div className={styles.options}>
          {Object.keys(EXAMPLE_TYPES_ENUM).map((t) =>
            exampleTypeGuard(t) ? (
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
                {OPERATION_NAMES[t] ? OPERATION_NAMES[t] : "Неизвестно"}
              </CheckBoxButton>
            ) : null
          )}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Максимальные значения
        </Typography>

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
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Количество примеров
        </Typography>

        <div className={styles.options}>
          {QUANTITY_VARIANTS.map((q) => (
            <CheckBoxButton
              key={q}
              checked={settings.quantity === q}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_QUANTITY,
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
          Можно исправлять ответы
        </Typography>
        <div className={styles.options}>
          {Object.keys(CAN_MODIFY_ANSWER_OPTIONS_ENUM).map((o) =>
            canModifyAnswerTypeGuard(o) ? (
              <CheckBoxButton
                key={o}
                checked={settings.canModifyAnswer === o}
                fullWidth
                onClick={() => {
                  setSettings({
                    type: ACTIONS.SET_CAN_MODIFY_ANSWER,
                    payload: o as CAN_MODIFY_ANSWER_OPTIONS_ENUM,
                  });
                }}
              >
                {CAN_MODIFY_ANSWER_NAMES[o]
                  ? CAN_MODIFY_ANSWER_NAMES[o]
                  : "Неизвестно"}
              </CheckBoxButton>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
