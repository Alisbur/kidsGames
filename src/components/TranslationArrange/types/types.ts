import type { ReactNode } from "react";

import { TTranslationArrangeTaskExt } from "./translation-arrange-task.type";

export type TTileContentType = "pic" | "word";

export type TWord = {
  id: string;
  word: string;
};

export type TSlotValue = TWord | null;

export type TControlsProps = {
  onCheck: () => void;
  onClear: () => void;
  onShuffle: () => void;
  children?: ReactNode;
};

export type TSource = "pool" | "slot";

export type TPoolItem = TWord;

export type TGameState = {
  pool: TPoolItem[];
  tasks: TTranslationArrangeTaskExt[];
};
