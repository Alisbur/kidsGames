import { FC, useRef } from "react";

import { useElementDimensions } from "@/shared/hooks/useElementDimensions";

import { TNumsArrangeTaskExt } from "../../types/nums-arrange-task.type";
import { TSettings } from "../../types/settings.type";
import { NumsArrangeTask } from "../nums-arrange-task/nums-arrange-task";
import styles from "./task-list.module.scss";

type TTaskListProps<T> = {
  tasks: T[];
  setSolved: (id: number) => void;
  settings: TSettings;
};

export const TaskList: FC<TTaskListProps<TNumsArrangeTaskExt>> = ({
  tasks,
  setSolved,
  settings,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const boardSize = useElementDimensions(divRef);

  return (
    <div className={styles.wrapper} ref={divRef}>
      {tasks.map((t) => (
        <NumsArrangeTask
          task={t}
          key={t.id}
          parentWidth={boardSize.elementWidth}
          setSolved={() => {
            setSolved(t.id);
          }}
          extraTilesQuantity={settings.extraTilesQuantity}
        />
      ))}
    </div>
  );
};
