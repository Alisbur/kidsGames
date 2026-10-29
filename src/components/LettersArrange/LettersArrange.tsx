import { useReducer, useState } from "react";

import { getRandomItemsFromArray } from "@/shared/helpers/get-random-items-from-array";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";
import { Typography } from "@/shared/ui/typography/typography";

import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_SETTINGS } from "./constants/init-settings";
import { LETTERS_ARRANGE_TASKS } from "./constants/tasks";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { settingsReducer } from "./helpers/settings-reducer";
import styles from "./LettersArrange.module.scss";
import { TSettings, TSettingsActions } from "./types/settings.type";
import type { TLettersArrangeTask, TLettersArrangeTaskExt } from "./types/types";
import { Results } from "./ui/results/results";
import { LettersArrangeTask } from "./ui/sort-task/letters-arrange-task";
import { TasksSettings } from "./ui/tasks-settings/tasks-settings";

function createTasks(qty: number = 10, wordLens: number[]): TLettersArrangeTaskExt[] {
  const filteredTasks: TLettersArrangeTask[] = [];

  wordLens.forEach((l) => filteredTasks.push(...LETTERS_ARRANGE_TASKS[l]));

  const tasksList = getRandomItemsFromArray(filteredTasks, qty).map((t) => {
    return { ...t, word: t.word.toUpperCase(), solved: false };
  });
  return tasksList;
}

export default function LettersArrange() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const { confirm } = useConfirm();
  const [step, setStep] = useState<STEP>(STEP.INIT);
  const [tasks, setTasks] = useState<TLettersArrangeTaskExt[]>([]);

  const handleSetTaskSolved = (id: number) => {
    setTasks((prev) => prev.map((t) => (id === t.id ? { ...t, solved: true } : t)));
  };

  const handleStartNewGame = () => {
    setTasks(createTasks(settings.wordsQuantity, settings.lettersQuantity));
    setStep(STEP.GAME);
  };

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Собери слова
            </Typography>
          }
          mainContent={
            <>
              <MenuButton
                className={styles.button}
                text={"Начать игру"}
                onClick={handleStartNewGame}
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
          mainContent={<TasksSettings settings={settings} setSettings={settingsDispatch} />}
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
              title={"Расставь буквы"}
              subtitle={"Передвинь кубики, чтобы получились слова"}
            />
          }
          headerDivider
          mainContent={tasks.map((t) => (
            <LettersArrangeTask
              // tileSize={tileSize}
              task={t}
              setTaskSolved={() => handleSetTaskSolved(t.id)}
              key={t.id}
            />
          ))}
          mainContentScroll
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
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
          }
        />
      );
    }
    case STEP.END: {
      const total = tasks.length;
      const solved = tasks.filter((t) => t.solved).length;

      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Результаты
            </Typography>
          }
          mainContent={<Results total={total} solved={solved} />}
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

              <MenuButton className={styles.button} text={"Ещё раз"} onClick={handleStartNewGame} />
            </div>
          }
        />
      );
    }
    default:
      return null;
  }
}
