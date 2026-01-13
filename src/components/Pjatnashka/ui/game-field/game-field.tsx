import { useRef, useState, useEffect, FC } from "react";
import { useElementDimensions } from "../../../../shared/hooks/useElementDimensions";
import { TFieldState } from "../../types/field-state.type";
import { Piece } from "../Piece/Piece";
import styles from "./game-field.module.scss";
import { TSettings } from "../../types/settings.type";
import { checkIsGameOver, shuffle } from "../../helpers/helpers";
import { SHUFFLE_OPTIONS } from "../../constants/shuffle-options";
import { FIELD_OPTIONS_SIZES } from "../../constants/field-options";

const SPAN = 5;

type TGameFieldsProps = {
  settings: TSettings;
  fieldState: TFieldState;
  setNewFieldState: (key: number) => void;
};

export const GameField: FC<TGameFieldsProps> = ({
  settings,
  fieldState,
  setNewFieldState,
}) => {
  const fieldRef = useRef(null);
  const { elementWidth } = useElementDimensions(fieldRef);
  const [pieceSize, setPieceSize] = useState(80);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    if (isShuffleDone && isGameActive) {
      if (checkIsGameOver(fieldState)) setIsGameActive(false);
    }
  }, [fieldState, isGameActive]);

  // useEffect(() => {
  //   if (isGameActive) {
  //     fieldStateDispatch({
  //       type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
  //       payload: settings,
  //     });
  //   }
  // }, [isGameActive]);

  const [isShuffleDone, setIsShuffleDone] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);

  const positions = new Map<number, { x: number; y: number }>();

  useEffect(() => {
    setPieceSize(Math.round(elementWidth / fieldState[0].length - SPAN));
  }, [elementWidth, setPieceSize]);

  useEffect(() => {
    let cancelled = isGameActive;

    const runShuffleOnce = async () => {
      if (shuffleCount >= SHUFFLE_OPTIONS[settings.shuffleType]) {
        setIsShuffleDone(true);
        setIsGameActive(true);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 50));

      if (cancelled) return;

      const shuffleMovePiece = shuffle(
        fieldState,
        shuffleCount % 2 ? "HOR" : "VERT"
      );
      if (shuffleMovePiece) {
        setNewFieldState(shuffleMovePiece);
        setShuffleCount((prev) => prev + 1);
      }
    };

    runShuffleOnce();

    return () => {
      cancelled = true;
    };
  }, [shuffleCount]);

  
  let flag = false;

  fieldState.forEach((row, y) =>
    row.forEach((el, x) => {
      if (el) {
        positions.set(el, { x, y });
        console.log("EL=", el, "y=", y, "x=", x, y * FIELD_OPTIONS_SIZES[settings.fieldSizeType].fieldW + x + 1)
        if (el !== y * FIELD_OPTIONS_SIZES[settings.fieldSizeType].fieldW + x + 1)
          flag = true;
      }
    })
  );

  if(!flag && flag !== isGameActive) {
    setIsGameActive(flag);
  }

  return (
    <div className={styles.field} ref={fieldRef}>
      {[...positions.keys()]
        .sort((a, b) => a - b)
        .map((id) => {
          const pos = positions.get(id)!;
          return (
            <Piece
              key={id}
              idx={id}
              size={pieceSize}
              x={pos.x}
              y={pos.y}
              span={SPAN}
              disabled={isShuffleDone && !isGameActive}
              onClick={() => {
                if (isGameActive) setNewFieldState(id);
              }}
              winColor={isShuffleDone && !isGameActive}
            />
          );
        })}
    </div>
  );
};
