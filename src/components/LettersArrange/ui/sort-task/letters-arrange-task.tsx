import {
  closestCenter,
  DndContext,
  type DragCancelEvent,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FC, useCallback, useEffect, useState } from "react";

import { shuffleArray } from "@/shared/helpers/shuffle-array";

import type { TLetter } from "../../types/types";
import { TLettersArrangeTaskExt } from "../../types/types";
import { Board } from "../board/board";
import { SortableTile } from "../sortable-tile/sortable-tile";

function createLetters(chars: string): TLetter[] {
  return chars.split("").map((char, index) => ({ id: `letter-${index}`, char }));
}

type TLettersArrangeTaskProps = {
  task: TLettersArrangeTaskExt;
  setTaskSolved: () => void;
  parentWidth?: number;
};

export const LettersArrangeTask: FC<TLettersArrangeTaskProps> = ({
  task,
  setTaskSolved,
  parentWidth = 0,
}) => {
  const [letters, setLetters] = useState<TLetter[]>(shuffleArray(createLetters(task.word)));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tileSize, setTileSize] = useState(40);

  useEffect(() => {
    const newTileSize = parentWidth / (task.word.length + 2);
    setTileSize(newTileSize);
  }, [parentWidth, task.word.length]);

  const handleCheck = useCallback((): void => {
    const current = letters.map((letter) => letter.char).join("");
    if (current.toLowerCase().trim() === task.word.toLowerCase().trim()) {
      setTaskSolved();
    }
  }, [letters, setTaskSolved, task.word]);

  useEffect(() => {
    if (!task.solved) {
      handleCheck();
    }
  }, [task.solved, handleCheck]);

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

  if (!parentWidth) return <></>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      autoScroll={false}
    >
      <Board
        letters={letters}
        tileSize={tileSize}
        hint={task.description}
        isSolved={task.solved}
        isActive={!!activeId}
      />

      <DragOverlay dropAnimation={null}>
        {activeLetter ? <SortableTile letter={activeLetter} isOverlay size={tileSize} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
