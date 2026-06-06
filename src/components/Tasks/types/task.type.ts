import { TASKS_ACTIONS_ENUM } from "../enums/tasks-actions.enum";
import { TASK_LEVELS_ENUM } from "../enums/tasks-levels.enum";
import { TASKS_TYPES_ENUM } from "../enums/tasks-types.enum";
import { TSettings } from "./settings.type";
import { TSolution } from "./solution.type";

export type TTask = {
  id: number;
  description: string;
  answer: number;
  type: TASKS_TYPES_ENUM;
  level: TASK_LEVELS_ENUM;
};

export type TExtendedTask = TTask & { solved: TSolution };

export type TTaskActions =
  | { type: TASKS_ACTIONS_ENUM.GENERATE_TASKS; payload: TSettings }
  | { type: TASKS_ACTIONS_ENUM.SET_SOLVED; payload: { idx: number; solution: TSolution } };
