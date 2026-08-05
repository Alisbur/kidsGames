import { FC } from "react";

import { TASK_ITEM_SOLUTION_ENUM } from "@/shared/enums/task-item-solution.enum";
import { TaskItem } from "@/shared/ui/task-item/task-item";

import { OPERATION_SIGNS } from "../../constants/operation-signs";
import { TExample } from "../../types/example.type";
import styles from "./example.module.scss";

type TExampleProps = {
  id: number;
  example: TExample;
  setSolved: ({ id, solution }: { id: number; solution: TASK_ITEM_SOLUTION_ENUM }) => void;
  canModify?: boolean;
};

export const Example: FC<TExampleProps> = ({ example, canModify = true, setSolved, id }) => {
  return (
    <TaskItem
      correctAnswer={example.result}
      solved={example.solved}
      setSolved={setSolved}
      canModify={canModify}
      id={id}
    >
      <div className={styles.example}>
        <span className={styles.part}>{example.firstItem}</span>
        <span className={styles.part}>{OPERATION_SIGNS[example.type]}</span>
        <span className={styles.part}>{example.secondItem}</span>
        <span className={styles.part}>=</span>
      </div>
    </TaskItem>
  );
};
