import { useCallback, useReducer, useState } from "react";

import { shuffleArray } from "@/shared/helpers/shuffle-array";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { RatingStarsComponent } from "@/shared/ui/rating-stars-component/rating-stars-component";
import { Typography } from "@/shared/ui/typography/typography";

import { INIT_SETTINGS } from "./constants/init-settings";
import { TRANSLATION_ARRANGE_TASK_LIST } from "./constants/tasks-list";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { TRANSLATION_GAME_TYPE_ENUM } from "./enums/game-type.enum";
import { settingsReducer } from "./helpers/settings-reducer";
import styles from "./translation-arrange.module.scss";
import { TSettings, TSettingsActions } from "./types/settings.type";
import { TTranslationArrangeTask } from "./types/translation-arrange-task.type";
import type { TGameState } from "./types/types";
import { Results } from "./ui/results/results";
import { GameStep } from "./ui/step-interfaces/game-step/game-step";
import { TranslationArrangeSettings } from "./ui/translation-arrange-settings/translation-arrange-settings";

const GAME_TYPES_DICT: Record<TRANSLATION_GAME_TYPE_ENUM, keyof TTranslationArrangeTask> = {
  [TRANSLATION_GAME_TYPE_ENUM.ICO__WORD_ENG]: "eng",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_RUS__WORD_ENG]: "eng",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__WORD_RUS]: "rus",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__ICO]: "emo",
};

export default function TranslationArrange() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [step, setStep] = useState<STEP>(STEP.INIT);
  const [state, setState] = useState<TGameState>({
    pool: [],
    tasks: [],
  });
  const [resChecked, setResChecked] = useState(false);
  const [totalSolvedTasks, setTotalSolvedTasks] = useState(0);

  const handleStartNewGame = useCallback(() => {
    const shuffledTaskList = shuffleArray(TRANSLATION_ARRANGE_TASK_LIST).slice(
      0,
      settings.wordsQuantity,
    );
    setState({
      pool: shuffledTaskList.map((w, i) => ({
        id: `p${i}`,
        word: w[GAME_TYPES_DICT[settings.gameType]],
      })),
      tasks: shuffleArray(shuffledTaskList.map((t) => ({ ...t, solved: false, slot: null }))),
    });
    setResChecked(false);
    setTotalSolvedTasks(0);
    setStep(STEP.GAME);
  }, [settings]);

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Английские слова
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
          mainContent={
            <TranslationArrangeSettings settings={settings} setSettings={settingsDispatch} />
          }
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
        <GameStep
          state={state}
          setState={setState}
          settings={settings}
          setStep={setStep}
          totalSolvedTasks={totalSolvedTasks}
          setTotalSolvedTasks={setTotalSolvedTasks}
          resChecked={resChecked}
          setResChecked={setResChecked}
        />
      );
    }

    case STEP.END: {
      return (
        <PageContentLayout
          headerContent={
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
                alignItems: "center",
              }}
            >
              <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
                Результаты
              </Typography>
              <Typography view={"p-20"} tag={"div"} color={"accent"} weight={"semibold"}>
                Верно {totalSolvedTasks} из {state.tasks.length}
              </Typography>
              <RatingStarsComponent
                maxStars={3}
                rating={3 * (totalSolvedTasks / state.tasks.length)}
                size={"s"}
              />
            </div>
          }
          mainContent={<Results tasks={state.tasks} />}
          mainContentScroll
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
