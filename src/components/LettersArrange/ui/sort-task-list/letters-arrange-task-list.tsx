import { FC, useRef } from "react";

import { useElementDimensions } from "@/shared/hooks/useElementDimensions";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";

import type { TLettersArrangeTaskExt } from "../../types/types";
import { LettersArrangeTask } from "../sort-task/letters-arrange-task";
import styles from "./letters-arrange-task-list.module.scss";

type TLettersArrangeTaskListProps = {
  tasks: TLettersArrangeTaskExt[];
  setTaskSolved: (id: number) => void;
};

export const LettersArrangeTaskList: FC<TLettersArrangeTaskListProps> = ({
  tasks,
  setTaskSolved,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const boardSize = useElementDimensions(divRef);

  return (
    <div className={styles.game} ref={divRef}>
      {boardSize.contentWidth ? (
        tasks.map((t) => (
          <LettersArrangeTask
            parentWidth={boardSize.elementWidth}
            task={t}
            setTaskSolved={() => setTaskSolved(t.id)}
            key={t.id}
          />
        ))
      ) : (
        <AppLoader />
      )}
    </div>
  );
};
