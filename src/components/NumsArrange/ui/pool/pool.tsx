import { useDroppable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";

import type { TPoolItem } from "../../types/types";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import styles from "./pool.module.scss";

type TPoolProps = {
  items: TPoolItem[];
  tileSize: number;
  children?: ReactNode;
};

export const Pool: FC<TPoolProps> = ({ items, tileSize, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "pool" });

  return (
    <div ref={setNodeRef} className={`${styles.pool} ${isOver ? styles.over : ""}`}>
      <div className={styles.pool__items}>
        {items.map((item) => (
          <DraggableTile key={item.id} content={item} tileSize={tileSize * 0.9} />
        ))}
      </div>
      {children}
    </div>
  );
};
