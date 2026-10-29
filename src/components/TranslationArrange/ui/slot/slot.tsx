import { useDroppable } from "@dnd-kit/core";

import { TSlotValue, TTileContentType } from "../../types/types";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import styles from "../slot/slot.module.scss";

type TSlotProps = {
  index: number;
  word: TSlotValue;
  onReturn: (index: number) => void;
  tileContentType: TTileContentType;
};

export function Slot({ index, word, onReturn, tileContentType }: TSlotProps) {
  // const id = `slot-${index}` satisfies DropId;
  const id = `slot-${index}`;
  const { setNodeRef, isOver } = useDroppable({ id });

  const className = [styles.slot, word ? styles.filled : "", isOver ? styles.over : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={setNodeRef} className={className}>
      {word && (
        <DraggableTile
          word={word}
          onClick={() => onReturn(index)}
          tileContentType={tileContentType}
        />
      )}
    </div>
  );
}
