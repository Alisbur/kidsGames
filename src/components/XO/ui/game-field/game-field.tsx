import classNames from "classnames";

import { FIGURE_TYPE_ENUM } from "../../enums/figure-types.enum";
import { PLAYERS_ENUM } from "../../enums/players.enum";
import { TFieldState } from "../../types/field-state.type";
import { Figure } from "../figure/figure";
import styles from "./game-field.module.scss";

const cn = classNames.bind(styles);

type XOFieldProps = {
  fieldState: TFieldState;
  onMove: (idx: number) => void;
  playerData: { playerName: string; player: PLAYERS_ENUM };
  isGameStarted: boolean;
};

export function XOField({ fieldState, onMove, isGameStarted = false, playerData }: XOFieldProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        {fieldState.field.map((el, i) => (
          <div
            key={i}
            className={cn(
              styles.field_item,
              fieldState.winLine && fieldState.winLine.includes(i) && styles.field_item__win,
            )}
            onClick={() => {
              if (!el) onMove(i);
            }}
          >
            {el < 0 && <Figure type={FIGURE_TYPE_ENUM.O} />}
            {el > 0 && <Figure type={FIGURE_TYPE_ENUM.X} />}
          </div>
        ))}
      </div>
      {isGameStarted && (
        <div
          className={classNames(
            styles.turnData,
            // playerData.player === PLAYERS_ENUM.PLAYER_1
            //   ? styles.turnData_first
            //   : styles.turnData_second,
            fieldState.turn === FIGURE_TYPE_ENUM.X ? styles.turnData_first : styles.turnData_second,
          )}
        >
          {`Ходит ${playerData.playerName}:  `}
          <Figure
            type={fieldState.turn === FIGURE_TYPE_ENUM.X ? FIGURE_TYPE_ENUM.X : FIGURE_TYPE_ENUM.O}
            size={30}
          />
        </div>
      )}
      {fieldState.winner && (
        <div
          className={classNames(
            styles.turnData,
            fieldState.turn === FIGURE_TYPE_ENUM.X ? styles.turnData_second : styles.turnData_first,
          )}
        >
          {fieldState.winner === "no" ? (
            <span>Ничья!</span>
          ) : (
            <>
              <span>{`Победил ${playerData.playerName}:`}</span>
              <Figure
                type={
                  fieldState.turn === FIGURE_TYPE_ENUM.X ? FIGURE_TYPE_ENUM.O : FIGURE_TYPE_ENUM.X
                }
                size={30}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
