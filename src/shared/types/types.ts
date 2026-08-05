import pics from "../../assets/images";
import { TASK_ITEM_SOLUTION_ENUM } from "../enums/task-item-solution.enum";

export type TMenuItem = {
  id: number;
  name: string;
  alias: string;
};

export type TImageItem = keyof typeof pics;

export type TWordItem = {
  id: number;
  word: string;
  parts: string[];
  image: TImageItem;
};

export type TTaskSolution = TASK_ITEM_SOLUTION_ENUM | null;
