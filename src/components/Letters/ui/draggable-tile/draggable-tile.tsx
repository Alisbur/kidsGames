import { useDraggable } from "@dnd-kit/core";

import type { DraggableTileProps } from "../../types/types";
import styles from "./draggable-tile.module.scss";

export function DraggableTile({ letter, onClick, isOverlay, size }: DraggableTileProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: letter.id,
    disabled: isOverlay,
  });

  if (isOverlay) {
    return <div className={`${styles.tile} ${styles.overlay}`}>{letter.char}</div>;
  }

  return (
    <div
      ref={setNodeRef}
      className={`${styles.tile} ${isDragging ? styles.dragging : ""}`}
      onClick={onClick}
      {...listeners}
      {...attributes}
      style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
    >
      {letter.char}
    </div>
  );
}
