import { getRandomItemsFromArray } from "@/shared/helpers/get-random-items-from-array";

import { TASK_LIST } from "../constants/tasks-list";
import { TASKS_ACTIONS_ENUM } from "../enums/tasks-actions.enum";
import { TExtendedTask, TTask, TTaskActions as ACTIONS } from "../types/task.type";

export const tasksReducer = (state: TExtendedTask[], action: ACTIONS) => {
  switch (action.type) {
    case TASKS_ACTIONS_ENUM.GENERATE_TASKS: {
      const { type, level, quantity } = action.payload;
      const filteredTasks = TASK_LIST.filter(
        (t) => type.includes(t.type) && level.includes(t.level),
      );
      const taskList: TTask[] | null = getRandomItemsFromArray(filteredTasks, quantity);
      if (!taskList) return [];

      const extendedTaskList = taskList.map((t) => ({ ...t, solved: false, result: null }));
      return extendedTaskList;
    }
    case TASKS_ACTIONS_ENUM.SET_SOLVED: {
      if (action.payload < 0 || action.payload >= state.length) return state;
      const newState = [...state];
      newState[action.payload] = { ...newState[action.payload], solved: true };
      return newState;
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
