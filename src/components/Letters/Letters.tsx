// import {
//   DndContext,
//   type DragCancelEvent,
//   type DragEndEvent,
//   DragOverlay,
//   type DragStartEvent,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { useRef, useState } from "react";

// import { useElementDimensions } from "@/shared/hooks/useElementDimensions";

// import styles from "./Letters.module.scss";
// import type {
//   DropId,
//   LetterSource,
//   SlotValue,
//   TGameMessage,
//   TGameState,
//   TLetter,
// } from "./types/types";
// import { Controls } from "./ui/controls/controls";
// import { DraggableTile } from "./ui/draggable-tile/draggable-tile";
// import { Pool } from "./ui/pool/pool";
// import { Slot } from "./ui/slot/slot";

// const SLOT_COUNT = 7;

// const DICTIONARY: ReadonlySet<string> = new Set([
//   "КОТ",
//   "ДОМ",
//   "СОК",
//   "КОМ",
//   "МОТ",
//   "ТОМ",
//   "СОМ",
//   "КОД",
// ]);

// const initialPool: TLetter[] = "КОТДОМС".split("").map((char, i) => ({ id: `p${i}`, char }));

// /** Type guard: "slot-3" → true, "pool" → false. */
// function isSlotId(id: string): id is `slot-${number}` {
//   return /^slot-\d+$/.test(id);
// }

// export default function Letters() {
//   const [state, setState] = useState<TGameState>({
//     pool: initialPool,
//     slots: Array<SlotValue>(SLOT_COUNT).fill(null),
//   });

//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [message, setMessage] = useState<TGameMessage | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(KeyboardSensor),
//   );

//   const word = state.slots.map((slot) => slot?.char ?? "").join("");

//   const handleDragStart = ({ active }: DragStartEvent): void => {
//     setActiveId(String(active.id));
//     setMessage(null);
//   };

//   const handleDragEnd = ({ active, over }: DragEndEvent): void => {
//     setActiveId(null);
//     if (!over) return;

//     const activeIdStr = String(active.id);
//     const overIdStr = String(over.id);

//     setState((prev) => {
//       const pool = [...prev.pool];
//       const slots = [...prev.slots];

//       // 1. Находим букву-источник и откуда она взялась.
//       let letter: TLetter | null = null;
//       let from: LetterSource | null = null;
//       let fromSlotIndex = -1;

//       const poolIndex = pool.findIndex((item) => item.id === activeIdStr);
//       if (poolIndex !== -1) {
//         letter = pool[poolIndex];
//         from = "pool";
//       } else {
//         fromSlotIndex = slots.findIndex((item) => item?.id === activeIdStr);
//         if (fromSlotIndex === -1) return prev;
//         letter = slots[fromSlotIndex];
//         from = "slot";
//       }

//       if (!letter || !from) return prev;

//       // 2. Определяем целевую зону.
//       const targetSlot: number | null = isSlotId(overIdStr)
//         ? Number(overIdStr.slice("slot-".length))
//         : null;

//       // 3. Ничего не делаем, если бросили туда же, откуда взяли.
//       if (from === "pool" && targetSlot === null) return prev;
//       if (from === "slot" && targetSlot === fromSlotIndex) return prev;

//       // 4. Убираем букву из источника.
//       if (from === "pool") {
//         pool.splice(poolIndex, 1);
//       } else {
//         slots[fromSlotIndex] = null;
//       }

//       // 5. Кладём в цель. Если слот занят — свопаем.
//       if (targetSlot === null) {
//         pool.push(letter);
//       } else {
//         const occupant = slots[targetSlot];
//         slots[targetSlot] = letter;
//         if (occupant) {
//           if (from === "pool") {
//             pool.push(occupant);
//           } else {
//             slots[fromSlotIndex] = occupant;
//           }
//         }
//       }

//       return { pool, slots };
//     });
//   };

//   const handleDragCancel = (_event: DragCancelEvent): void => {
//     setActiveId(null);
//   };

//   const activeLetter: TLetter | null =
//     state.pool.find((item) => item.id === activeId) ??
//     state.slots.find((item) => item?.id === activeId) ??
//     null;

//   const returnToPool = (index: number): void => {
//     setState((prev) => {
//       const letter = prev.slots[index];
//       if (!letter) return prev;

//       const slots = [...prev.slots];
//       slots[index] = null;

//       return {
//         pool: [...prev.pool, letter],
//         slots,
//       };
//     });
//     setMessage(null);
//   };

//   const clearSlots = (): void => {
//     setState((prev) => ({
//       pool: [...prev.pool, ...prev.slots.filter((item): item is TLetter => item !== null)],
//       slots: Array<SlotValue>(SLOT_COUNT).fill(null),
//     }));
//     setMessage(null);
//   };

//   const shufflePool = (): void => {
//     setState((prev) => {
//       const pool = [...prev.pool];
//       for (let i = pool.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [pool[i], pool[j]] = [pool[j], pool[i]];
//       }
//       return { ...prev, pool };
//     });
//   };

//   const checkWord = (): void => {
//     if (!word) {
//       setMessage({ type: "info", text: "Собери слово" });
//       return;
//     }

//     if (DICTIONARY.has(word)) {
//       setMessage({ type: "ok", text: `«${word}» — верно! 🎉` });
//     } else {
//       setMessage({ type: "err", text: `«${word}» — такого слова нет` });
//     }
//   };

//   const divRef = useRef<HTMLDivElement>(null);

//   const { elementWidth: divWidth } = useElementDimensions(divRef);

//   return (
//     <div className={styles.game} ref={divRef}>
//       <h1 className={styles.title}>Собери слово</h1>

//       <DndContext
//         sensors={sensors}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         onDragCancel={handleDragCancel}
//       >
//         <div className={styles.slots}>
//           {state.slots.map((letter, index) => (
//             <Slot
//               key={index}
//               index={index}
//               letter={letter}
//               onReturn={returnToPool}
//               size={(divWidth - 100) / SLOT_COUNT}
//             />
//           ))}
//         </div>

//         <Pool letters={state.pool} />

//         <DragOverlay dropAnimation={null}>
//           {activeLetter ? <DraggableTile letter={activeLetter} isOverlay /> : null}
//         </DragOverlay>
//       </DndContext>

//       <Controls onCheck={checkWord} onClear={clearSlots} onShuffle={shufflePool} />

//       {message && <div className={`${styles.message} ${styles[message.type]}`}>{message.text}</div>}
//     </div>
//   );
// }
