import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import classNames from "classnames";

import { Typography } from "@/shared/ui/typography/typography";

import { TLetter } from "../../types/types";
import { SortableTile } from "../sortable-tile/sortable-tile";
import styles from "./board.module.scss";

type TBoardProps = {
  letters: TLetter[];
  tileSize?: number;
  hint?: string;
  isSolved: boolean;
  isActive: boolean;
};

export function Board({ letters, tileSize, hint, isSolved, isActive }: TBoardProps) {
  return (
    <SortableContext
      items={letters.map((letter) => letter.id)}
      strategy={horizontalListSortingStrategy}
      disabled={isSolved}
    >
      <div
        className={classNames(styles.board, {
          [styles.board_success]: isSolved,
          [styles.board_active]: isActive,
        })}
        style={{ pointerEvents: isSolved ? "none" : "auto" }}
      >
        <Typography
          view={"p-16"}
          tag={"p"}
          weight={"semibold"}
          color={isSolved ? "secondary" : "primary"}
        >
          {hint}
        </Typography>
        <div className={styles.board__pool}>
          {letters.map((letter) => (
            <SortableTile key={letter.id} letter={letter} size={tileSize} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
