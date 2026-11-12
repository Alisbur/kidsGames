import { PageContentLayout } from "@shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import { useCallback, useReducer, useState } from "react";

import { TASK_ITEM_SOLUTION_ENUM } from "@/shared/enums/task-item-solution.enum";
import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";
import { TTaskSolution } from "@/shared/types/types";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";

import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_SETTINGS } from "./constants/init-settings";
import { MUL_TABLE_MENU_ITEMS } from "./constants/menu-items";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "./enums/can-modify-answer.enum";
import { EXAMPLE_ACTIONS_ENUM } from "./enums/example-actions.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { SHOULD_SHUFFLE_EXAMPLES_ENUM } from "./enums/should-shuffle-examples.enum";
import { examplesReducer } from "./helpers/examples-reducer";
import { settingsReducer } from "./helpers/settings-reducer";
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

  const [currentSettings, setCurrentSettings] = useState<TSettings>(INIT_SETTINGS);

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
          key={"init"}
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Меню игры
            </Typography>
          }
          preserveMainContentScrollPosition={true}
          mainContent={
            <MenuItemListLayout>
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "12px",
                  rowGap: "12px",
                }}
              >
                {MUL_TABLE_MENU_ITEMS.map((el) => (
                  <MenuButton
                    key={el.id}
                    text={el.title}
                    onClick={() => {
                      examplesDispatch({
                        type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                        payload: el.settings,
                      });
                      setCurrentSettings(el.settings);
                      setStep(STEP.THEORY);
                    }}
                  />
                ))}
              </div>
              <MenuButton text={"Настраиваемый режим"} onClick={() => setStep(STEP.SETTINGS)} />
            </MenuItemListLayout>
          }
          mainContentScroll
          mainDivider
        />
      );

    case STEP.SETTINGS:
      return (
        <PageContentLayout
          key={"settings"}
          headerContent={<PageContentLayoutGameHeader title={"Настройки"} />}
          withMainHeader={false}
          headerDivider
          mainContent={<MulTableSettings settings={settings} setSettings={settingsDispatch} />}
          mainContentScroll={true}
          mainDivider
          footerContent={
            <FooterControlsLayout>
              <MenuButton
                text={"Меню игры"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />
              <MenuButton
                text={"Решать примеры"}
                onClick={() => {
                  examplesDispatch({
                    type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                    payload: settings,
                  });
                  setCurrentSettings(settings);
                  setStep(STEP.GAME);
                }}
              />
            </FooterControlsLayout>
          }
        />
      );
    case STEP.GAME: {
      return (
        <PageContentLayout
          key={"game"}
          withMainHeader={false}
          headerContent={
            <PageContentLayoutGameHeader
              title={"Реши примеры"}
              subtitle={`${examples.filter((e) => e.solved).length} / ${examples.length}`}
            />
          }
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
    case STEP.THEORY: {
      return (
        <PageContentLayout
          key={"theory"}
          withMainHeader={false}
          headerContent={<PageContentLayoutGameHeader title={"Запомни"} />}
          headerDivider
          mainContent={
            <MenuItemListLayout>
              {examples.map((ex, i) => (
                <Typography key={i} view={"p-32"} tag={"div"} weight={"semibold"} color={"muted"}>
                  {`${ex.firstItem} × ${ex.secondItem} = ${ex.result}`}
                </Typography>
              ))}
            </MenuItemListLayout>
          }
          mainContentScroll
          mainDivider
          footerContent={
            <FooterControlsLayout>
              <MenuButton
                text={"Меню игры"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />

              <MenuButton
                text={"Решать примеры"}
                onClick={() => {
                  const newSettings = {
                    ...currentSettings,
                    shouldShuffleExamples: SHOULD_SHUFFLE_EXAMPLES_ENUM.YES,
                  };

                  examplesDispatch({
                    type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                    payload: newSettings,
                  });
                  setCurrentSettings(newSettings);
                  setStep(STEP.GAME);
                }}
              />
            </FooterControlsLayout>
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
          key={"end"}
          headerContent={<PageContentLayoutGameHeader title={"Результаты"} />}
          withMainHeader={false}
          headerDivider
          mainContent={<Results total={total} solved={solved} wrong={wrong} />}
          mainDivider
          footerContent={
            <FooterControlsLayout type={"vertical"}>
              <MenuButton
                text={"Меню игры"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />
              <FooterControlsLayout>
                <MenuButton
                  text={"Настройки"}
                  onClick={() => {
                    setStep(STEP.SETTINGS);
                  }}
                />

                <MenuButton
                  text={"Ещё раз"}
                  onClick={() => {
                    examplesDispatch({
                      type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                      payload: currentSettings,
                    });
                    setStep(STEP.GAME);
                  }}
                />
              </FooterControlsLayout>
            </FooterControlsLayout>
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
