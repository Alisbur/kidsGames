import {
  closestCenter,
  DndContext,
  type DragCancelEvent,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { shuffleArray } from "@/shared/helpers/shuffle-array";
import { useElementDimensions } from "@/shared/hooks/useElementDimensions";

import type { TLetter } from "../../types/types";
import { TLettersArrangeTaskExt } from "../../types/types";
import { Board } from "../board/board";
import { SortableTile } from "../sortable-tile/sortable-tile";
import styles from "./letters-arrange-task.module.scss";

function createLetters(chars: string): TLetter[] {
  return chars.split("").map((char, index) => ({ id: `letter-${index}`, char }));
}

type TLettersArrangeTaskProps = {
  task: TLettersArrangeTaskExt;
  setTaskSolved: () => void;
};

export const LettersArrangeTask: FC<TLettersArrangeTaskProps> = ({ task, setTaskSolved }) => {
  const [letters, setLetters] = useState<TLetter[]>(shuffleArray(createLetters(task.word)));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tileSize, setTileSize] = useState(40);

  const divRef = useRef<HTMLDivElement>(null);

  const boardSize = useElementDimensions(divRef);

  useEffect(() => {
    const newTileSize = boardSize.elementWidth / (task.word.length + 2);
    setTileSize(newTileSize);
  }, [boardSize.elementWidth]);

  const handleCheck = useCallback((): void => {
    const current = letters.map((letter) => letter.char).join("");
    if (current === task.word) {
      setTaskSolved();
    }
  }, [letters, setTaskSolved, task.word]);

  useEffect(() => {
    if (!task.solved) {
      handleCheck();
    }
  }, [task.solved, handleCheck]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent): void => {
    setActiveId(String(active.id));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setLetters((prev) => {
      const oldIndex = prev.findIndex((letter) => letter.id === active.id);
      const newIndex = prev.findIndex((letter) => letter.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleDragCancel = (_event: DragCancelEvent): void => {
    setActiveId(null);
  };

  const activeLetter: TLetter | null = letters.find((letter) => letter.id === activeId) ?? null;

  return (
    <div className={styles.game} ref={divRef}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <Board
          letters={letters}
          tileSize={tileSize}
          hint={task.description}
          isSolved={task.solved}
        />

        <DragOverlay dropAnimation={null}>
          {activeLetter ? <SortableTile letter={activeLetter} isOverlay size={tileSize} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
