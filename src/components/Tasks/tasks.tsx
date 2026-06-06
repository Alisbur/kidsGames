import { PageContentLayout } from "@shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import { useCallback, useReducer, useState } from "react";

import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_SETTINGS } from "./constants/init-settings";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "./enums/can-modify-answer.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { TASKS_ACTIONS_ENUM } from "./enums/tasks-actions.enum";
import { settingsReducer } from "./helpers/settings-reducer";
import { tasksReducer } from "./helpers/tasks-reducer";
import styles from "./tasks.module.scss";
import { TSettings, TSettingsActions } from "./types/settings.type";
import { TSolution } from "./types/solution.type";
import { TExtendedTask, TTaskActions } from "./types/task.type";
import { Results } from "./ui/results/results";
import { Task } from "./ui/task/task";
import { TasksSettings } from "./ui/tasks-settings/tasks-settings";

export function Tasks() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [tasks, tasksDispatch] = useReducer<
    (state: TExtendedTask[], action: TTaskActions) => TExtendedTask[]
  >(tasksReducer, []);

  const { confirm } = useConfirm();

  const [step, setStep] = useState<STEP>(STEP.INIT);

  const handleSetSolved = useCallback(
    ({ id, solution }: { id: number; solution: TSolution }) =>
      tasksDispatch({
        type: TASKS_ACTIONS_ENUM.SET_SOLVED,
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
              Решаем задачи
            </Typography>
          }
          mainContent={
            <>
              <MenuButton
                className={styles.button}
                text={"Решать задачи"}
                onClick={() => {
                  tasksDispatch({
                    type: TASKS_ACTIONS_ENUM.GENERATE_TASKS,
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
          headerContent={
            <Typography view={"subtitle"} tag={"h3"} weight={"semibold"} color={"primary"}>
              Реши задачи
            </Typography>
          }
          mainContent={tasks.map((t, i) => (
            <Task
              key={i}
              id={i}
              task={t}
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
                  tasks.some(
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
      const total = tasks.length;
      const solved = tasks.filter((e) => e.solved === "correct").length;
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
                  tasksDispatch({
                    type: TASKS_ACTIONS_ENUM.GENERATE_TASKS,
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
