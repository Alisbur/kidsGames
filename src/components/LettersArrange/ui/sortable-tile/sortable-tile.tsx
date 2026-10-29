import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type CSSProperties } from "react";

import type { TSortableTileProps } from "../../types/types";
import styles from "./sortable-tile.module.scss";

export function SortableTile({ letter, isOverlay, size }: TSortableTileProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: letter.id,
    disabled: isOverlay,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size! * 0.6}px`,
  };

  const styleOverlay: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size! * 0.6}px`,
  };

  // Летящая копия для DragOverlay — без transform и без listeners.
  if (isOverlay) {
    return (
      <div className={`${styles.tile} ${styles.overlay}`} style={styleOverlay}>
        {letter.char}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.tile} ${isDragging ? styles.dragging : ""}`}
      {...attributes}
      {...listeners}
    >
      {letter.char}
    </div>
  );
}
