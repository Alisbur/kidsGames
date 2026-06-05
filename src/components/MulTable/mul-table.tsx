import { PageContentLayout } from "@shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import { useReducer, useState } from "react";

import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_SETTINGS } from "./constants/init-settings";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "./enums/can-modify-answer.enum";
import { EXAMPLE_ACTIONS_ENUM } from "./enums/example-actions.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { examplesReducer } from "./helpers/examples-reducer";
import { settingsReducer } from "./helpers/settings-reducer";
import styles from "./mul-table.module.scss";
import { TExample } from "./types/example.type";
import { TExampleAction } from "./types/example-actions.type";
import { TSettings } from "./types/settings.type";
import { TSettingAction } from "./types/settings-actions.type";
import { Example } from "./ui/example/example";
import { MulTableSettings } from "./ui/mul-table-settings/mul-table-settings";
import { Results } from "./ui/results/results";

export function MulTable() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingAction) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [examples, examplesDispatch] = useReducer<
    (state: TExample[], action: TExampleAction) => TExample[]
  >(examplesReducer, []);

  const { confirm } = useConfirm();

  const [step, setStep] = useState<STEP>(STEP.INIT);

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Таблица умножения
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
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Настройки
            </Typography>
          }
          mainContent={<MulTableSettings settings={settings} setSettings={settingsDispatch} />}
          mainContentScroll={true}
          mainDivider
          footerContent={
            <MenuButton
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
            <Typography view={"subtitle"} tag={"h3"} weight={"semibold"} color={"primary"}>
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
              canModify={settings.canModifyAnswer === CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES}
            />
          ))}
          mainContentScroll
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
              text={"Завершить"}
              onClick={async () => {
                const ans = await confirm({
                  title: "Завершить?",
                  content: "Некоторые примеры ещё не решены, точно выйти?",
                });
                if (ans) {
                  setStep(STEP.END);
                }
              }}
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
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Результаты
            </Typography>
          }
          mainContent={<Results total={total} solved={solved} wrong={wrong} />}
          mainDivider
          footerContent={
            <div style={{ width: "100%", display: "flex", gap: "8px" }}>
              <MenuButton
                className={styles.button}
                text={"Меню игры"}
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
    default: {
      const exhaustiveCheck: never = step;
      throw new Error(`Exhaustive check failed ${exhaustiveCheck}`);
    }
  }
}
