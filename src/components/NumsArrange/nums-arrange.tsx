import { useReducer, useState } from "react";

import { getRandomFromArray } from "@/shared/helpers/get-random-from-array";
import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";
import { Typography } from "@/shared/ui/typography/typography";

import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_SETTINGS } from "./constants/init-settings";
import { EXAMPLE_TYPES_ENUM } from "./enums/example-types.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { generateNumsArrageTask } from "./helpers/generate-nums-arrange-task";
import { settingsReducer } from "./helpers/settings-reducer";
import { TNumsArrangeTaskExt } from "./types/nums-arrange-task.type";
import { TSettingActions, TSettings } from "./types/settings.type";
import { NumsArrangeSettings } from "./ui/nums-arrange-settings/nums-arrange-settings";
import { Results } from "./ui/results/results";
import { TaskList } from "./ui/task-list/task-list";

const createNewTasks = ({
  quantity = 5,
  maxValues,
  taskTypes = [],
}: {
  quantity: number;
  maxValues: number;
  taskTypes: EXAMPLE_TYPES_ENUM[];
}): TNumsArrangeTaskExt[] => {
  const newTasks: TNumsArrangeTaskExt[] = [];

  for (let i = 0; i < quantity; i++) {
    const type = getRandomFromArray(taskTypes);
    if (!type) break;
    const task = generateNumsArrageTask({ id: i, limit: maxValues, type });
    newTasks.push(task);
  }

  return newTasks;
};

export default function NumsArrange() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const { confirm } = useConfirm();
  const [step, setStep] = useState<STEP>(STEP.INIT);
  const [tasks, setTasks] = useState<TNumsArrangeTaskExt[]>([]);

  const handleStartNewGame = () => {
    setTasks(
      createNewTasks({
        quantity: settings.tasksQuantity,
        maxValues: settings.limit,
        taskTypes: settings.type,
      }),
    );
    setStep(STEP.GAME);
  };

  const handleSetSolved = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, solved: true } : t)));
  };

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
              <MenuButton text={"Начать игру"} onClick={handleStartNewGame} />
              <MenuButton text={"Настройки"} onClick={() => setStep(STEP.SETTINGS)} />
            </MenuItemListLayout>
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
          mainContent={<NumsArrangeSettings settings={settings} setSettings={settingsDispatch} />}
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
          headerContent={
            <PageContentLayoutGameHeader
              title={"Составь примеры"}
              subtitle={"Перемести числа на правильные места"}
            />
          }
          headerDivider
          mainContent={<TaskList tasks={tasks} setSolved={handleSetSolved} settings={settings} />}
          mainContentScroll
          mainDivider
          footerContent={
            <div style={{ width: "100%", display: "flex", flexDirection: "column", rowGap: "8px" }}>
              <MenuButton
                text={"Завершить"}
                onClick={async () => {
                  if (tasks.some((t) => !t.solved)) {
                    const ans = await confirm({
                      title: "Завершить?",
                      content: "Некоторые задания ещё не решены, точно выйти?",
                    });
                    if (ans) {
                      setStep(STEP.END);
                    }
                  } else {
                    setStep(STEP.END);
                  }
                }}
              />
            </div>
          }
        />
      );
    }
    case STEP.END: {
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Результаты
            </Typography>
          }
          mainContent={
            <Results total={tasks.length} solved={tasks.filter((t) => t.solved).length} />
          }
          mainDivider
          footerContent={
            <FooterControlsLayout>
              <MenuButton
                text={"Меню игры"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />

              <MenuButton text={"Ещё раз"} onClick={handleStartNewGame} />
            </FooterControlsLayout>
          }
        />
      );
    }
    default:
      return null;
  }
}
