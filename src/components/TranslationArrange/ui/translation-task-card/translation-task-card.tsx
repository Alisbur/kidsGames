import { FC, ReactNode } from "react";

import { AnswerMark } from "@/shared/ui/answer-mark/answer-mark";
import { Typography } from "@/shared/ui/typography/typography";

import { TRANSLATION_GAME_TYPE_ENUM } from "../../enums/game-type.enum";
import {
  TTranslationArrangeTask,
  TTranslationArrangeTaskExt,
} from "../../types/translation-arrange-task.type";
import styles from "./translation-task-card.module.scss";

type TTranslationTaskCardProps = {
  task: TTranslationArrangeTaskExt;
  children?: ReactNode;
  gameType: TRANSLATION_GAME_TYPE_ENUM;
  resChecked: boolean;
};

const CARD_CONTENT_TYPE: Record<TRANSLATION_GAME_TYPE_ENUM, keyof TTranslationArrangeTask> = {
  [TRANSLATION_GAME_TYPE_ENUM.ICO__WORD_ENG]: "emo",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_RUS__WORD_ENG]: "rus",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__WORD_RUS]: "eng",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__ICO]: "eng",
};

export const TranslationTaskCard: FC<TTranslationTaskCardProps> = ({
  task,
  children,
  gameType,
  resChecked,
}) => {
  const contentView = gameType === TRANSLATION_GAME_TYPE_ENUM.ICO__WORD_ENG ? "p-32" : "p-20";

  return (
    <div className={styles.task}>
      <Typography view={contentView} tag={"span"} color={"primary"}>
        {task[CARD_CONTENT_TYPE[gameType]]}
      </Typography>
      {children}
      {resChecked && <AnswerMark value={task.solved} className={styles.answerMark} />}
    </div>
  );
};
