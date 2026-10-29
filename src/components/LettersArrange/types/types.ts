import type { ReactNode } from "react";

export type TLettersArrangeTask = {
  id: number;
  description: string;
  word: string;
};

export type TLettersArrangeTaskExt = TLettersArrangeTask & { solved: boolean };

/** Кубик с буквой. id уникален, потому что буквы могут повторяться. */
export type TLetter = {
  id: string;
  char: string;
};

/** Сообщение под кнопками. */
export type TGameMessage = {
  type: "ok" | "err" | "info";
  text: string;
};

/** Пропсы кубика. */
export type TSortableTileProps = {
  letter: TLetter;
  /** true, когда кубик рисуется в DragOverlay (летящая копия). */
  isOverlay?: boolean;
  size?: number;
};

/** Пропсы ленты. */
export type TBoardProps = {
  letters: TLetter[];
  tileSize?: number;
  hint?: string;
  isSolved: boolean;
};

/** Пропсы панели кнопок. */
export type TControlsProps = {
  onCheck: () => void;
  onShuffle: () => void;
  onReset: () => void;
  children?: ReactNode;
};
