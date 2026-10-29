import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

import { HScroller } from "@/shared/ui/h-scroller/h-scroller";

import type { TPoolItem, TTileContentType } from "../../types/types";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import styles from "./pool.module.scss";

type TPoolProps = {
  words: TPoolItem[];
  tileContentType: TTileContentType;
  children?: ReactNode;
};

export function Pool({ words, tileContentType, children }: TPoolProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "pool" });

  return (
    <HScroller className={styles.wrapper}>
      <div ref={setNodeRef} className={`${styles.pool} ${isOver ? styles.over : ""}`}>
        {words.map((w) => (
          <DraggableTile key={w.id} word={w} tileContentType={tileContentType} />
        ))}
        {children}
      </div>
    </HScroller>
  );
}
