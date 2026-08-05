import { FC } from "react";

import { TASK_ITEM_SOLUTION_ENUM } from "@/shared/enums/task-item-solution.enum";
import { TaskItem } from "@/shared/ui/task-item/task-item";

import { TExtendedTask } from "../../types/task.type";
import styles from "./task.module.scss";

type TTaskProps = {
  id: number;
  task: TExtendedTask;
  setSolved: ({ id, solution }: { id: number; solution: TASK_ITEM_SOLUTION_ENUM }) => void;
  canModify?: boolean;
};

export const Task: FC<TTaskProps> = ({ id, task, canModify = true, setSolved }) => {
  return (
    <TaskItem
      setSolved={setSolved}
      canModify={canModify}
      correctAnswer={task.answer}
      id={id}
      solved={task.solved}
      multiline
    >
      <div className={styles.task}>
        <p className={styles.description}>{task.description}</p>
      </div>
    </TaskItem>
  );
};
