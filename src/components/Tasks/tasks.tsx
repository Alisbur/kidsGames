import { PageContentLayout } from "@shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import { useReducer, useState } from "react";

import { INIT_SETTINGS } from "./constants/init-settings";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { TASKS_ACTIONS_ENUM } from "./enums/tasks-actions.enum";
import { settingsReducer } from "./helpers/settings-reducer";
import { tasksReducer } from "./helpers/tasks-reducer";
import styles from "./tasks.module.scss";
import { TSettings, TSettingsActions } from "./types/settings.type";
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

  const [step, setStep] = useState<STEP>(STEP.INIT);

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
              task={t}
              setSolved={() =>
                tasksDispatch({
                  type: TASKS_ACTIONS_ENUM.SET_SOLVED,
                  payload: i,
                })
              }
              canModify={settings.canModifyAnswer}
            />
          ))}
          mainContentScroll
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
      const total = tasks.length;
      const solved = tasks.filter((e) => e.solved).length;
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
