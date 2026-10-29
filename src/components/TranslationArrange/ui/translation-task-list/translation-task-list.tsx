import { FC } from "react";

import { TRANSLATION_GAME_TYPE_ENUM } from "../../enums/game-type.enum";
import { TTranslationArrangeTaskExt } from "../../types/translation-arrange-task.type";
import { DraggableTile } from "../draggable-tile/draggable-tile";
import { SlotWrapper } from "../slot-wrapper/slot-wrapper";
import { TranslationTaskCard } from "../translation-task-card/translation-task-card";
import styles from "./translation-task-list.module.scss";

type TTranslationTaskListProps = {
  tasks: TTranslationArrangeTaskExt[];
  gameType: TRANSLATION_GAME_TYPE_ENUM;
  returnToPool: (id: number) => void;
  resChecked: boolean;
};

export const TranslationTaskList: FC<TTranslationTaskListProps> = ({
  tasks,
  gameType,
  returnToPool,
  resChecked,
}) => {
  const tileContentType = gameType === TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__ICO ? "pic" : "word";

  return (
    <div className={styles.wrapper} style={{ pointerEvents: resChecked ? "none" : "auto" }}>
      {tasks.map((t, index) => (
        <SlotWrapper
          index={index}
          key={t.id}
          className={styles.task}
          isOverClassName={styles.task_over}
          slot={t.slot}
        >
          <TranslationTaskCard task={t} gameType={gameType} resChecked={resChecked}>
            {t.slot && (
              <DraggableTile
                word={t.slot}
                onClick={() => returnToPool(index)}
                tileContentType={tileContentType}
              />
            )}
          </TranslationTaskCard>
        </SlotWrapper>
      ))}
    </div>
  );
};
