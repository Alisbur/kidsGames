import { PageContentLayout } from "@shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import { useCallback, useReducer, useState } from "react";

import { TASK_ITEM_SOLUTION_ENUM } from "@/shared/enums/task-item-solution.enum";
import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";
import { TTaskSolution } from "@/shared/types/types";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";

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
    ({ id, solution }: { id: number; solution: TTaskSolution }) =>
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
              Меню игры
            </Typography>
          }
          mainContent={
            <MenuItemListLayout>
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
            </MenuItemListLayout>
          }
        />
      );

    case STEP.SETTINGS:
      return (
        <PageContentLayout
          headerContent={<PageContentLayoutGameHeader title={"Настройки"} />}
          withMainHeader={false}
          headerDivider
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
          withMainHeader={false}
          headerContent={<PageContentLayoutGameHeader title={"Реши примеры"} />}
          headerDivider
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
                      (e.solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT &&
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
      const solved = examples.filter((e) => e.solved === TASK_ITEM_SOLUTION_ENUM.CORRECT).length;
      const wrong = total - solved;

      return (
        <PageContentLayout
          headerContent={<PageContentLayoutGameHeader title={"Результаты"} />}
          withMainHeader={false}
          headerDivider
          mainContent={<Results total={total} solved={solved} wrong={wrong} />}
          mainDivider
          footerContent={
            <FooterControlsLayout>
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
            </FooterControlsLayout>
          }
        />
      );
    }
    default:
      return null;
  }
}
