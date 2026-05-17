import { FC } from "react";

import { CheckBoxButton } from "../../../../shared/ui/checkbox-button/checkbox-button";
import { Typography } from "../../../../shared/ui/typography/typography";
import {
  CAN_MODIFY_ANSWER_NAMES,
  OPERATION_NAMES,
  TASK_LEVEL_NAMES,
} from "../../constants/option-names";
import { QUANTITY_VARIANTS } from "../../constants/settings-options";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../../enums/can-modify-answer.enum";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/set-settings-actions.enum";
import { TASK_LEVELS_ENUM } from "../../enums/tasks-levels.enum";
import { TASKS_TYPES_ENUM } from "../../enums/tasks-types.enum";
import { TSettings, TSettingsActions } from "../../types/settings.type";
import { canModifyAnswerTypeGuard, taskLevelGuard, taskTypeGuard } from "../../types/typeguards";
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
          Типы действий
        </Typography>
        <div className={styles.options}>
          {Object.keys(TASKS_TYPES_ENUM).map((t) =>
            taskTypeGuard(t) ? (
              <CheckBoxButton
                key={t}
                checked={settings.type.includes(t as TASKS_TYPES_ENUM)}
                fullWidth
                onClick={() => {
                  setSettings({
                    type: ACTIONS.SET_TYPES,
                    payload: t as TASKS_TYPES_ENUM,
                  });
                }}
              >
                {OPERATION_NAMES[t] ? OPERATION_NAMES[t] : "Неизвестно"}
              </CheckBoxButton>
            ) : null,
          )}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Сложность задач
        </Typography>
        <div className={styles.options}>
          {Object.keys(TASK_LEVELS_ENUM).map((t) =>
            taskLevelGuard(t) ? (
              <CheckBoxButton
                key={t}
                checked={settings.level.includes(t as TASK_LEVELS_ENUM)}
                fullWidth
                onClick={() => {
                  setSettings({
                    type: ACTIONS.SET_LEVEL,
                    payload: t as TASK_LEVELS_ENUM,
                  });
                }}
              >
                {TASK_LEVEL_NAMES[t] ? TASK_LEVEL_NAMES[t] : "Неизвестно"}
              </CheckBoxButton>
            ) : null,
          )}
        </div>
      </div>

      {/* <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Сложность задач
        </Typography>

        <div className={styles.options}>
          {TASK_LEVEL_NAMES.map((l) => (
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
      </div> */}

      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Количество задач
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
                {CAN_MODIFY_ANSWER_NAMES[o] ? CAN_MODIFY_ANSWER_NAMES[o] : "Неизвестно"}
              </CheckBoxButton>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};
