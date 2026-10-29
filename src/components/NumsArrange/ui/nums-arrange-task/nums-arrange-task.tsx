import {
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
import classNames from "classnames";
import { FC, useEffect, useMemo, useState } from "react";

import { shuffleArray } from "@/shared/helpers/shuffle-array";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { OPERATION_SIGNS } from "../../constants/operation-signs";
import { EXAMPLE_TYPES_ENUM } from "../../enums/example-types.enum";
import { TNumsArrangeTaskExt } from "../../types/nums-arrange-task.type";
import { TSlotValue, TSource, TTile } from "../../types/types";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import { FixedTile } from "../fixed-tile/fixed-tile";
import { Pool } from "../pool/pool";
import { Slot } from "../slot/slot";
import styles from "./nums-arrange-task.module.scss";

const SLOT_COUNT = 6;

const createInitialPool = ({
  task,
  extraTilesQuantity,
}: {
  task: TNumsArrangeTaskExt;
  extraTilesQuantity: number;
}): TTile[] => {
  const taskValues = [task.firstItem, task.secondItem, task.result];

  for (let i = 0; i < extraTilesQuantity; i++) {
    taskValues.push(Math.round(Math.random() * Math.max(...taskValues) * 1.5));
  }

  const tilesArray: number[] = shuffleArray<number>(taskValues);
  return tilesArray.map((v, i) => ({ id: `p${i}`, value: v }));
};

function isSlotId(id: string): id is `slot-${number}` {
  return /^slot-\d+$/.test(id);
}

type TNumsArrangeTaskProps = {
  task: TNumsArrangeTaskExt;
  setSolved: () => void;
  parentWidth?: number;
  extraTilesQuantity?: number;
};

type TTaskState = {
  pool: TTile[];
  slots: TSlotValue[];
};

export const NumsArrangeTask: FC<TNumsArrangeTaskProps> = ({
  task,
  setSolved,
  parentWidth = 320,
  extraTilesQuantity = 0,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [state, setState] = useState<TTaskState>({
    pool: createInitialPool({ task, extraTilesQuantity }),
    slots: Array<TSlotValue>(3).fill(null),
  });

  useEffect(() => {
    if (!isDirty) setIsDirty(true);
  }, [state]);

  const handleCheckAnswer = () => {
    if (state.slots.length === 3 && state.slots.every((s) => s && s.value !== undefined)) {
      setIsDirty(false);
      switch (task.type) {
        case EXAMPLE_TYPES_ENUM.SUM: {
          if (state.slots[0]!.value + state.slots[1]!.value === state.slots[2]!.value) setSolved();
          break;
        }
        case EXAMPLE_TYPES_ENUM.SUB: {
          if (state.slots[0]!.value - state.slots[1]!.value === state.slots[2]!.value) setSolved();
          break;
        }
        case EXAMPLE_TYPES_ENUM.MUL: {
          if (state.slots[0]!.value * state.slots[1]!.value === state.slots[2]!.value) setSolved();
          break;
        }
        case EXAMPLE_TYPES_ENUM.DIV: {
          if (state.slots[0]!.value / state.slots[1]!.value === state.slots[2]!.value) setSolved();
          break;
        }
        default: {
          const _exhaustiveCheck: never = task.type;
          if (_exhaustiveCheck) throw new Error("Exhaustive check");
        }
      }
    }
  };

  const tileSize = useMemo(() => {
    const newTileSize = parentWidth! / (SLOT_COUNT + 2);
    return newTileSize;
  }, [parentWidth]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent): void => {
    setActiveId(String(active.id));
    // setMessage(null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    setActiveId(null);
    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    setState((prev: TTaskState) => {
      const pool = [...prev.pool];
      const slots = [...prev.slots];

      // 1. Находим букву-источник и откуда она взялась.
      let tile: TTile | null = null;
      let from: TSource | null = null;
      let fromSlotIndex = -1;

      const poolIndex = pool.findIndex((el) => el.id === activeIdStr);
      if (poolIndex !== -1) {
        tile = pool[poolIndex];
        from = "pool";
      } else {
        fromSlotIndex = slots.findIndex((el) => el?.id === activeIdStr);
        if (fromSlotIndex === -1) return prev;
        tile = slots[fromSlotIndex];
        from = "slot";
      }

      if (!tile || !from) return prev;

      // 2. Нормализуем цель: слот, слот-через-тайл или пул
      let targetSlot: number | null = null;
      if (isSlotId(overIdStr)) {
        targetSlot = Number(overIdStr.slice("slot-".length));
      } else {
        // Возможно, кинули на тайл внутри слота
        const idx = slots.findIndex((t) => t?.id === overIdStr);
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
        slots[fromSlotIndex] = null;
      }

      // 5. Кладём в цель. Если слот занят — свопаем.
      if (targetSlot === null) {
        pool.push(tile);
      } else {
        const occupant = slots[targetSlot] as TTile | null;
        slots[targetSlot] = tile;
        if (occupant) {
          if (from === "pool") {
            pool.push(occupant);
          } else {
            slots[fromSlotIndex] = occupant;
          }
        }
      }
      return { pool, slots };
    });
  };

  const handleDragCancel = (_event: DragCancelEvent): void => {
    setActiveId(null);
  };

  const activeTile: TTile | null =
    state.pool.find((item: TTile) => item.id === activeId) ??
    state.slots.find((item: TSlotValue) => item?.id === activeId) ??
    null;

  const returnToPool = (index: number): void => {
    setState((prev: TTaskState) => {
      const tile = prev.slots[index];
      if (!tile) return prev;

      const slots = [...prev.slots];
      slots[index] = null;

      return {
        pool: [...prev.pool, tile],
        slots,
      };
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={classNames(styles.task, { [styles.task_solved]: task.solved })}>
        <div className={styles.slots}>
          {/* {state.slots.map((el, idx) => ( */}
          <Slot index={0} slot={state.slots[0]} onReturn={returnToPool} tileSize={tileSize} />
          <FixedTile content={OPERATION_SIGNS[task.type]} tileSize={tileSize} />
          <Slot index={1} slot={state.slots[1]} onReturn={returnToPool} tileSize={tileSize} />
          <FixedTile content={"="} tileSize={tileSize} />
          <Slot index={2} slot={state.slots[2]} onReturn={returnToPool} tileSize={tileSize} />
          {/* ))} */}
        </div>
        <DragOverlay dropAnimation={null}>
          {activeTile ? <DraggableTile content={activeTile} isOverlay tileSize={tileSize} /> : null}
        </DragOverlay>
        {!task.solved ? (
          <Pool items={state.pool} tileSize={tileSize}>
            {state.slots.every((s) => s !== null) ? (
              isDirty ? (
                <MenuButton text="Проверить" onClick={handleCheckAnswer} />
              ) : (
                <Typography view={"p-20"} tag={"span"} color={"error"} weight={"semibold"}>
                  Пока неверно
                </Typography>
              )
            ) : (
              <></>
            )}
          </Pool>
        ) : (
          <Typography view={"p-20"} tag={"div"} color={"secondary"} weight={"semibold"}>
            Молодец!
          </Typography>
        )}
      </div>
    </DndContext>
  );
};
