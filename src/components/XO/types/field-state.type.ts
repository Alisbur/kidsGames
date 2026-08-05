import { FIGURE_TYPE_ENUM } from "../enums/figure-types.enum";

export type TFieldState = {
  field: number[];
  // lines: number[];
  turn: FIGURE_TYPE_ENUM.X | FIGURE_TYPE_ENUM.O;
  winLine: number[] | null;
  winner: FIGURE_TYPE_ENUM.X | FIGURE_TYPE_ENUM.O | "no" | null;
};
