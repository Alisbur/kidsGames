import { useDroppable } from "@dnd-kit/core";

import type { PoolProps } from "../../types/types";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import styles from "./pool.module.scss";

export function Pool({ letters }: PoolProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "pool" });

  return (
    <div ref={setNodeRef} className={`${styles.pool} ${isOver ? styles.over : ""}`}>
      {letters.map((l) => (
        <DraggableTile key={l.id} letter={l} />
      ))}
    </div>
  );
}
