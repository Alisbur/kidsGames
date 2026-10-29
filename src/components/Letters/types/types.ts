import type { ReactNode } from "react";

export type TLetter = {
  id: string;
  char: string;
};

export type SlotValue = TLetter | null;

export type DraggableTileProps = {
  letter: TLetter;
  onClick?: () => void;
  isOverlay?: boolean;
  size?: number;
};

export type TSlotProps = {
  index: number;
  letter: SlotValue;
  onReturn: (index: number) => void;
  size?: number;
};

export type PoolProps = {
  letters: TLetter[];
};

export type TControlsProps = {
  onCheck: () => void;
  onClear: () => void;
  onShuffle: () => void;
  children?: ReactNode;
};
