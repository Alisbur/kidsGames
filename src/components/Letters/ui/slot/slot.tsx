// import { useDroppable } from "@dnd-kit/core";

// import type { DropId, TSlotProps } from "../../types/types";
// import { DraggableTile } from "../draggable-tile/draggable-tile";
// import styles from "../slot/slot.module.scss";

// export function Slot({ index, letter, onReturn, size }: TSlotProps) {
//   const id = `slot-${index}` satisfies DropId;
//   const { setNodeRef, isOver } = useDroppable({ id });

//   const className = [styles.slot, letter ? styles.filled : "", isOver ? styles.over : ""]
//     .filter(Boolean)
//     .join(" ");

//   return (
//     <div
//       ref={setNodeRef}
//       className={className}
//       style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
//     >
//       {letter && <DraggableTile letter={letter} onClick={() => onReturn(index)} />}
//     </div>
//   );
// }
