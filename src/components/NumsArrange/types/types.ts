import { TNumsArrangeTaskExt } from "./nums-arrange-task.type";

export type TTile = {
  id: string;
  value: number;
};

export type TSlotValue = TTile | null;

export type TSource = "pool" | "slot";

export type TPoolItem = TTile;

export type TGameState = {
  pool: TPoolItem[];
  tasks: TNumsArrangeTaskExt;
};
