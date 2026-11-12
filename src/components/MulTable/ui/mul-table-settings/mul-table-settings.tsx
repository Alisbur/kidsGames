import { ListChecks } from "lucide-react";
import { FC } from "react";

import { Instruction } from "@/shared/ui/instruction/instruction";

import { CheckBoxButton } from "../../../../shared/ui/checkbox-button/checkbox-button";
import { Typography } from "../../../../shared/ui/typography/typography";
import {
  CAN_MODIFY_ANSWER_NAMES,
  SHOULD_SHUFFLE_EXAMPLES_OPTIONS_NAMES,
} from "../../constants/option-names";
import { BASE_VALUES, LIMIT_VARIANTS, QUANTITY_VARIANTS } from "../../constants/settings-options";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../../enums/can-modify-answer.enum";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "../../enums/set-settings-actions.enum";
import { SHOULD_SHUFFLE_EXAMPLES_ENUM } from "../../enums/should-shuffle-examples.enum";
import { TSettings } from "../../types/settings.type";
import { TSettingAction } from "../../types/settings-actions.type";
import { canModifyAnswerTypeGuard } from "../../types/typeguards";
import styles from "./mul-table-settings.module.scss";

type TMulTableSettingsProps = {
  settings: TSettings;
  setSettings: (value: TSettingAction) => void;
};

export const MulTableSettings: FC<TMulTableSettingsProps> = ({ settings, setSettings }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography
            view={"subtitle"}
            tag={"h4"}
            color={"primary"}
            className={styles.optionsHeader__text}
          >
            Количество примеров
          </Typography>
        </div>
        <div className={styles.options}>
          {QUANTITY_VARIANTS.map((qv) => (
            <CheckBoxButton
              key={qv}
              checked={settings.quantity === qv}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_QUANTITY,
                  payload: qv,
                });
              }}
            >
              {qv}
            </CheckBoxButton>
          ))}
        </div>
        <Instruction
          hint={
            "Если количество примеров меньше количества их возможных вариантов, то рекомендуется ПЕРЕМЕШАТЬ ПРИМЕРЫ"
          }
        />
      </div>

      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography
            view={"subtitle"}
            tag={"h4"}
            color={"primary"}
            className={styles.optionsHeader__text}
          >
            Первый множитель
          </Typography>

          <CheckBoxButton
            checked={BASE_VALUES.every((v) => settings.baseValues.includes(v))}
            title="Выбрать все"
            className={styles.optionsHeader__button}
            onClick={() =>
              setSettings({
                type: BASE_VALUES.every((v) => settings.baseValues.includes(v))
                  ? ACTIONS.RESET_BASE_VALUES
                  : ACTIONS.SELECT_ALL_BASE_VALUES,
              })
            }
          >
            <ListChecks color="white" size={20} />
          </CheckBoxButton>
        </div>
        <div className={styles.options}>
          {BASE_VALUES.map((bv) => (
            <CheckBoxButton
              key={bv}
              checked={settings.baseValues.includes(bv)}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_BASE_VALUE,
                  payload: bv,
                });
              }}
            >
              {bv}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Максимальное значение второго множителя
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
            Перемешать примеры?
          </Typography>
        </div>
        <div className={styles.options}>
          {Object.keys(SHOULD_SHUFFLE_EXAMPLES_ENUM).map((o) => (
            <CheckBoxButton
              key={o}
              checked={settings.shouldShuffleExamples === o}
              fullWidth
              onClick={() => {
                setSettings({
                  type: ACTIONS.SET_SHOULD_SHUFFLE_EXAMPLES,
                  payload: o as SHOULD_SHUFFLE_EXAMPLES_ENUM,
                });
              }}
            >
              {SHOULD_SHUFFLE_EXAMPLES_OPTIONS_NAMES[o as SHOULD_SHUFFLE_EXAMPLES_ENUM]}
            </CheckBoxButton>
          ))}
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <div className={styles.optionsHeader}>
          <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
            Можно исправлять ответы
          </Typography>
        </div>
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
