import { PageContentLayout } from "@shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import { useCallback, useReducer, useState } from "react";

import { Example } from "../../components/Count/ui/example/example";
import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_SETTINGS } from "./constants/init-settings";
import styles from "./count.module.scss";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "./enums/can-modify-answer.enum";
import { EXAMPLE_ACTIONS_ENUM } from "./enums/example-actions.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { examplesReducer } from "./helpers/examples-reducer";
import { settingsReducer } from "./helpers/settings-reducer";
import { TExample } from "./types/example.type";
import { TExampleAction } from "./types/example-actions.type";
import { TSettings } from "./types/settings.type";
import { TSettingAction } from "./types/settings-actions.type";
import { TSolution } from "./types/solution.type";
import { CountSettings } from "./ui/count-settings/count-settings";
import { Results } from "./ui/results/results";

export function Count() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingAction) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [examples, examplesDispatch] = useReducer<
    (state: TExample[], action: TExampleAction) => TExample[]
  >(examplesReducer, []);

  const { confirm } = useConfirm();

  const [step, setStep] = useState<STEP>(STEP.INIT);

  const handleSetSolved = useCallback(
    ({ id, solution }: { id: number; solution: TSolution }) =>
      examplesDispatch({
        type: EXAMPLE_ACTIONS_ENUM.SET_SOLVED,
        payload: { idx: id, solution: solution },
      }),
    [],
  );

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
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
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Настройки
            </Typography>
          }
          mainContent={<CountSettings settings={settings} setSettings={settingsDispatch} />}
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
              id={i}
              example={ex}
              setSolved={handleSetSolved}
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
                if (
                  examples.some(
                    (e) =>
                      e.solved === null ||
                      (e.solved === "incorrect" &&
                        settings.canModifyAnswer === CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES),
                  )
                ) {
                  const ans = await confirm({
                    title: "Завершить?",
                    content: "Некоторые примеры ещё не решены, точно выйти?",
                  });
                  if (ans) {
                    setStep(STEP.END);
                  }
                } else {
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
    default:
      return null;
  }
}
