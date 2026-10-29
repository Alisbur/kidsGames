import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";

import { Typography } from "@/shared/ui/typography/typography";

import type { TTile } from "../../types/types";
import styles from "./draggable-tile.module.scss";

export type TDraggableTileProps = {
  content: TTile;
  onClick?: () => void;
  isOverlay?: boolean;
  tileSize: number;
};

export function DraggableTile({ content, onClick, isOverlay, tileSize }: TDraggableTileProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: content.id,
    disabled: isOverlay,
  });

  const fontSize = tileSize * 0.6;

  const style: CSSProperties = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
  };

  const styleOverlay: CSSProperties = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    fontSize: `${fontSize}px`,
    transform: "scale(1.2)",
    transition: "scale 0.3s",
  };

  if (isOverlay) {
    return (
      <div className={`${styles.tile} ${styles.overlay}`} style={styleOverlay}>
        {content.value}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`${styles.tile} ${isDragging ? styles.dragging : ""}`}
      onClick={onClick}
      {...listeners}
      {...attributes}
      style={style}
    >
      <Typography weight={"semibold"} color={"primary"} size={fontSize}>
        {content.value}
      </Typography>
    </div>
  );
}
