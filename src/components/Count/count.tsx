import { useReducer, useState } from "react";
import { Example } from "../../components/Count/ui/example/example";
import styles from "./Count.module.scss";
import { CountSettings } from "./ui/count-settings/count-settings";
import { TSettings } from "./types/settings.type";
import { SET_SETTINGS_ACTIONS_ENUM as ACTIONS } from "./enums/set-settings-actions.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { EXAMPLE_TYPES_ENUM } from "./enums/example-types.enum";
import { INIT_SETTINGS } from "./constants/init-settings";
import { settingsReducer } from "./helpers/settings-reducer";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "./enums/can-modify-answer.enum";
import { PageContentLayout } from "../../shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";
import { TExample } from "./types/example.type";
import { EXAMPLE_ACTIONS_ENUM } from "./enums/example-actions.enum";
import { examplesReducer } from "./helpers/examples-reducer";
import { Results } from "./ui/results/results";
import { Typography } from "../../shared/ui/typography/typography";

export function Count() {
  const [settings, settingsDispatch] = useReducer<
    (
      state: TSettings,
      action: {
        type: ACTIONS;
        payload: number | EXAMPLE_TYPES_ENUM | CAN_MODIFY_ANSWER_OPTIONS_ENUM;
      }
    ) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [examples, examplesDispatch] = useReducer<
    (
      state: TExample[],
      action: {
        type: EXAMPLE_ACTIONS_ENUM;
        payload?: TSettings | number;
      }
    ) => TExample[]
  >(examplesReducer, []);

  const [step, setStep] = useState<STEP>(STEP.INIT);

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Решаем примеры
            </Typography>
          }
          mainContent={
            <>
              <MenuButton
                className={styles.button}
                text={"Решать примеры"}
                onClick={() => {
                  examplesDispatch({
                    type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                    payload: settings,
                  });
                  setStep(STEP.GAME);
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Настройки"}
                onClick={() => setStep(STEP.SETTINGS)}
              />
            </>
          }
        />
      );

    case STEP.SETTINGS:
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Настройки
            </Typography>
          }
          mainContent={
            <CountSettings settings={settings} setSettings={settingsDispatch} />
          }
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
              text={"Назад"}
              onClick={() => {
                setStep(STEP.INIT);
              }}
            />
          }
        />
      );
    case STEP.GAME: {
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"subtitle"}
              tag={"h3"}
              weight={"semibold"}
              color={"primary"}
            >
              Реши примеры
            </Typography>
          }
          mainContent={examples.map((ex, i) => (
            <Example
              key={i}
              example={ex}
              setSolved={() =>
                examplesDispatch({
                  type: EXAMPLE_ACTIONS_ENUM.SET_SOLVED,
                  payload: i,
                })
              }
              canModify={settings.canModifyAnswer}
            />
          ))}
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
              text={"Завершить"}
              onClick={() => setStep(STEP.END)}
            />
          }
        />
      );
    }
    case STEP.END: {
      const total = examples.length;
      const solved = examples.filter((e) => e.solved).length;
      const wrong = total - solved;

      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Результаты
            </Typography>
          }
          mainContent={<Results total={total} solved={solved} wrong={wrong} />}
          mainDivider
          footerContent={
            <div style={{ width: "100%", display: "flex", gap: "8px" }}>
              <MenuButton
                className={styles.button}
                text={"Главное меню"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Ещё раз"}
                onClick={() => {
                  examplesDispatch({
                    type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                    payload: settings,
                  });
                  setStep(STEP.GAME);
                }}
              />
            </div>
          }
        />
      );
    }
    default:
      return null;
  }
}
