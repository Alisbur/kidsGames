import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";

import { TSlotValue } from "../../types/types";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import styles from "../slot/slot.module.scss";

type TSlotProps = {
  index: number;
  slot: TSlotValue;
  onReturn: (index: number) => void;
  tileSize: number;
};

export function Slot({ index, slot, tileSize, onReturn }: TSlotProps) {
  const id = `slot-${index}`;
  const { setNodeRef, isOver } = useDroppable({ id });

  const className = [styles.slot, slot ? styles.filled : "", isOver ? styles.over : ""]
    .filter(Boolean)
    .join(" ");

  const tileSizeCSS: CSSProperties = { width: `${tileSize + 4}px`, height: `${tileSize + 4}px` };

  return (
    <div ref={setNodeRef} className={className} style={tileSize ? tileSizeCSS : undefined}>
      {slot && <DraggableTile content={slot} onClick={() => onReturn(index)} tileSize={tileSize} />}
    </div>
  );
}
