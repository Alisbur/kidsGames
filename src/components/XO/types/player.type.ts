import { FIGURE_TYPE_ENUM } from "../enums/figure-types.enum";

export type TPlayer = {
  figure: FIGURE_TYPE_ENUM;
  name: string;
  isComputer: boolean;
};
