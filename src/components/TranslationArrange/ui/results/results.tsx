import { AnswerMark } from "@shared/ui/answer-mark/answer-mark";
import { Typography } from "@shared/ui/typography/typography";
import { FC } from "react";

import { TTranslationArrangeTaskExt } from "../../types/translation-arrange-task.type";
import styles from "./results.module.scss";

type TResultsProps = {
  tasks: TTranslationArrangeTaskExt[];
};

export const Results: FC<TResultsProps> = ({ tasks }) => {
  return (
    <div className={styles.wrapper}>
      {tasks.map((t, idx) => (
        <div className={styles.task} key={idx}>
          <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
            {t.eng} - {t.rus}
          </Typography>
          <AnswerMark value={t.solved} />
        </div>
      ))}
    </div>
  );
};
