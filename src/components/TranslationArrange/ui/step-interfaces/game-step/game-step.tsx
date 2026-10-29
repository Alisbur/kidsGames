import {
  DndContext,
  type DragCancelEvent,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";

import { useConfirm } from "@/components/Modals/model/use-confirm";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { Instruction } from "@/shared/ui/instruction/instruction";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";
import { Typography } from "@/shared/ui/typography/typography";

import { GAME_STEPS as STEP } from "../../../enums/game-steps.enum";
import { TRANSLATION_GAME_TYPE_ENUM } from "../../../enums/game-type.enum";
import { TSettings } from "../../../types/settings.type";
import { TTranslationArrangeTaskExt } from "../../../types/translation-arrange-task.type";
import { TGameState, TPoolItem, TSource, TTileContentType, TWord } from "../../../types/types";
import { DraggableTile } from "../../draggable-tile/draggable-tile";
import { Pool } from "../../pool/pool";
import { TranslationTaskList } from "../../translation-task-list/translation-task-list";
import styles from "./game-step.module.scss";

const TILE_CONTENT_DICT: Record<TRANSLATION_GAME_TYPE_ENUM, TTileContentType> = {
  [TRANSLATION_GAME_TYPE_ENUM.ICO__WORD_ENG]: "word",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_RUS__WORD_ENG]: "word",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__WORD_RUS]: "word",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__ICO]: "pic",
};

type TGameStepProps = {
  state: TGameState;
  setState: Dispatch<SetStateAction<TGameState>>;
  settings: TSettings;
  setStep: Dispatch<SetStateAction<STEP>>;
  totalSolvedTasks: number;
  setTotalSolvedTasks: Dispatch<SetStateAction<number>>;
  resChecked: boolean;
  setResChecked: Dispatch<SetStateAction<boolean>>;
};

function isSlotId(id: string): id is `slot-${number}` {
  return /^slot-\d+$/.test(id);
}

export const GameStep: FC<TGameStepProps> = ({
  state,
  setState,
  settings,
  setStep,
  totalSolvedTasks,
  setTotalSolvedTasks,
  resChecked,
  setResChecked,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { confirm } = useConfirm();

  const handleCheckAnswers = useCallback(() => {
    let solved = 0;

    const newTasks = [...state.tasks].map((t) => {
      switch (settings.gameType) {
        case TRANSLATION_GAME_TYPE_ENUM.ICO__WORD_ENG: {
          const isCorrect = t.eng === t.slot?.word;
          if (isCorrect) solved++;
          return { ...t, solved: isCorrect };
        }
        case TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__ICO: {
          const isCorrect = t.emo === t.slot?.word;
          if (isCorrect) solved++;
          return { ...t, solved: isCorrect };
        }

        case TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__WORD_RUS: {
          const isCorrect = t.rus === t.slot?.word;
          if (isCorrect) solved++;
          return { ...t, solved: isCorrect };
        }

        case TRANSLATION_GAME_TYPE_ENUM.WORD_RUS__WORD_ENG: {
          const isCorrect = t.eng === t.slot?.word;
          if (isCorrect) solved++;
          return { ...t, solved: isCorrect };
        }

        default: {
          const _exhaustiveCheck: never = settings.gameType;
          if (_exhaustiveCheck) throw new Error("Exhaustive check failed");
          return t;
        }
      }
    });
    setResChecked(true);
    setTotalSolvedTasks(solved);
    setState({ tasks: newTasks, pool: [] });
  }, [setResChecked, setState, setTotalSolvedTasks, settings.gameType, state.tasks]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent): void => {
    setActiveId(String(active.id));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    setActiveId(null);
    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    setState((prev: TGameState) => {
      const pool = [...prev.pool];
      const tasks = prev.tasks.map((t) => ({ ...t }));

      // 1. Находим букву-источник и откуда она взялась.
      let word: TWord | null = null;
      let from: TSource | null = null;
      let fromSlotIndex = -1;

      const poolIndex = pool.findIndex((item) => item.id === activeIdStr);
      if (poolIndex !== -1) {
        word = pool[poolIndex];
        from = "pool";
      } else {
        fromSlotIndex = tasks.findIndex((item) => item?.slot?.id === activeIdStr);
        if (fromSlotIndex === -1) return prev;
        word = tasks[fromSlotIndex].slot;
        from = "slot";
      }

      if (!word || !from) return prev;

      // 2. Нормализуем цель: слот, слот-через-тайл или пул
      let targetSlot: number | null = null;
      if (isSlotId(overIdStr)) {
        targetSlot = Number(overIdStr.slice("slot-".length));
      } else {
        // Возможно, кинули на тайл внутри слота
        const idx = tasks.findIndex((t) => t.slot?.id === overIdStr);
        if (idx !== -1) targetSlot = idx;
        // иначе — это пул (targetSlot остаётся null)
      }
      // 3. Ничего не делаем, если бросили туда же, откуда взяли.
      if (from === "pool" && targetSlot === null) return prev;
      if (from === "slot" && targetSlot === fromSlotIndex) return prev;

      // 4. Убираем букву из источника.
      if (from === "pool") {
        pool.splice(poolIndex, 1);
      } else {
        tasks[fromSlotIndex].slot = null;
      }

      // 5. Кладём в цель. Если слот занят — свопаем.
      if (targetSlot === null) {
        pool.push(word);
      } else {
        const occupant = tasks[targetSlot].slot as TPoolItem | null;
        tasks[targetSlot].slot = word;
        if (occupant) {
          if (from === "pool") {
            pool.push(occupant);
          } else {
            tasks[fromSlotIndex].slot = occupant;
          }
        }
      }
      return { pool, tasks };
    });
  };

  const handleDragCancel = (_event: DragCancelEvent): void => {
    setActiveId(null);
  };

  const activeWord: TWord | null =
    state.pool.find((item: TPoolItem) => item.id === activeId) ??
    state.tasks.find((item: TTranslationArrangeTaskExt) => item?.slot?.id === activeId)?.slot ??
    null;

  const returnToPool = (index: number): void => {
    setState((prev: TGameState) => {
      const word = prev.tasks[index].slot;
      if (!word) return prev;

      const tasks = [...prev.tasks];
      tasks[index].slot = null;

      return {
        pool: [...prev.pool, word],
        tasks,
      };
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      // autoScroll={false}
    >
      <PageContentLayout
        withMainHeader={false}
        headerContent={
          <PageContentLayoutGameHeader
            title={"Английские слова"}
            subtitle={"Подбери правильный перевод"}
          />
        }
        headerDivider
        mainContent={
          <TranslationTaskList
            tasks={state.tasks}
            gameType={settings.gameType}
            returnToPool={returnToPool}
            resChecked={resChecked}
          />
        }
        mainContentScroll
        mainDivider
        footerContent={
          <div style={{ width: "100%", display: "flex", flexDirection: "column", rowGap: "8px" }}>
            <Instruction hint={"Перетащи элементы на подходящие карточки"} />
            <Pool words={state.pool} tileContentType={TILE_CONTENT_DICT[settings.gameType]}>
              {state.pool.length === 0 ? (
                !resChecked ? (
                  <MenuButton text="Проверить" onClick={handleCheckAnswers} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography view={"p-20"} tag={"div"} color={"error"} weight={"semibold"}>
                      Верно {totalSolvedTasks} из {state.tasks.length}
                    </Typography>
                  </div>
                )
              ) : (
                <></>
              )}
            </Pool>
            <MenuButton
              className={styles.button}
              text={"Завершить"}
              onClick={async () => {
                if (state.pool.length !== 0) {
                  const ans = await confirm({
                    title: "Завершить?",
                    content: "Некоторые задания ещё не решены, точно выйти?",
                  });
                  if (ans) {
                    if (!resChecked) {
                      handleCheckAnswers();
                    }

                    setStep(STEP.END);
                  }
                } else {
                  if (!resChecked) handleCheckAnswers();
                  setStep(STEP.END);
                }
              }}
            />
          </div>
        }
      />
      <DragOverlay dropAnimation={null}>
        {activeWord ? (
          <DraggableTile
            word={activeWord}
            isOverlay
            tileContentType={TILE_CONTENT_DICT[settings.gameType]}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
