import { getRandomItemsFromArray } from "@/shared/helpers/get-random-items-from-array";

import { TASK_LIST } from "../constants/tasks-list";
import { TASKS_ACTIONS_ENUM } from "../enums/tasks-actions.enum";
import { TExtendedTask, TTask, TTaskActions as ACTIONS } from "../types/task.type";

export const tasksReducer = (state: TExtendedTask[], action: ACTIONS) => {
  const actionType = action.type;

  switch (actionType) {
    case TASKS_ACTIONS_ENUM.GENERATE_TASKS: {
      const { type, level, quantity } = action.payload;
      const filteredTasks = TASK_LIST.filter(
        (t) => type.includes(t.type) && level.includes(t.level),
      );
      const taskList: TTask[] | null = getRandomItemsFromArray(filteredTasks, quantity);
      if (!taskList) return [];

      const extendedTaskList: TExtendedTask[] = taskList.map((t) => ({
        ...t,
        solved: null,
        result: null,
      }));
      return extendedTaskList;
    }
    case TASKS_ACTIONS_ENUM.SET_SOLVED: {
      if (action.payload.idx < 0 || action.payload.idx >= state.length) return state;
      const newState = [...state];
      newState[action.payload.idx] = {
        ...newState[action.payload.idx],
        solved: action.payload.solution,
      };
      return newState;
    }
    default: {
      const _exhaustiveCheck: never = actionType;
      throw new Error(`Wrong action type ${_exhaustiveCheck}`);
    }
  }
};
