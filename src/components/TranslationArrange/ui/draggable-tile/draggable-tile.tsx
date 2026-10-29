import { useDraggable } from "@dnd-kit/core";

import { Typography } from "@/shared/ui/typography/typography";

import type { TTileContentType, TWord } from "../../types/types";
import styles from "./draggable-tile.module.scss";

export type TDraggableTileProps = {
  word: TWord;
  onClick?: () => void;
  isOverlay?: boolean;
  tileContentType: TTileContentType;
};

export function DraggableTile({ word, onClick, isOverlay, tileContentType }: TDraggableTileProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: word.id,
    disabled: isOverlay,
  });

  const tileView = tileContentType === "pic" ? "p-32" : "p-20";

  if (isOverlay) {
    return (
      <div className={`${styles.tile} ${styles.overlay}`}>
        <Typography view={tileView} weight={"semibold"} color={"primary"}>
          {word.word}
        </Typography>
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
    >
      <Typography view={tileView} weight={"semibold"} color={"primary"}>
        {word.word}
      </Typography>
    </div>
  );
}
