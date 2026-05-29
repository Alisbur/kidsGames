import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useModals } from "@/components/Modals/model/use-modals";
import { useImageSize } from "@/shared/hooks/useImageSize";

import { useElementDimensions } from "../../../../shared/hooks/useElementDimensions";
import { FIELD_OPTIONS_SIZES } from "../../constants/field-options";
import { SHUFFLE_OPTIONS } from "../../constants/shuffle-options";
import { checkIsGameOver, shuffle } from "../../helpers/helpers";
import { TFieldState } from "../../types/field-state.type";
import { TSettings } from "../../types/settings.type";
import { Piece } from "../Piece/Piece";
import styles from "./game-field.module.scss";

const SPAN = 2;

type TGameFieldProps = {
  settings: TSettings;
  fieldState: TFieldState;
  setNewFieldState: (key: number) => void;
  isShuffleDone: boolean;
  setIsShuffleDone: (val: boolean) => void;
  isShuffleRunning: boolean;
  imgUrl: string | null;
  onGameOver?: () => void;
};

export const GameField: FC<TGameFieldProps> = ({
  settings,
  fieldState,
  setNewFieldState,
  isShuffleDone,
  setIsShuffleDone,
  isShuffleRunning,
  onGameOver,
  imgUrl = null,
}) => {
  const { openModal } = useModals();
  const fieldRef = useRef(null);
  const { elementWidth, elementHeight } = useElementDimensions(fieldRef);
  const [pieceSize, setPieceSize] = useState(80);
  const [isGameActive, setIsGameActive] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);

  const { width: imageWidth, height: imageHeight, loading } = useImageSize(imgUrl!);

  const positions = new Map<number, { x: number; y: number }>();

  useEffect(() => {
    if (!isShuffleDone) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isGameActive) {
      if (checkIsGameOver(fieldState)) setIsGameActive(false);
    } else {
      timer = setTimeout(
        () =>
          openModal({
            modalType: "info_modal",
            modalProps: {
              title: "Молодец!",
              content: "Ты успешно решил головоломку!",
              actions: [
                { id: "seccess", name: "Посмотреть результаты", action: () => onGameOver?.() },
              ],
              onClose: () => onGameOver?.(),
            },
          }),
        500,
      );
    }

    return () => clearTimeout(timer);
  }, [fieldState, isGameActive]);

  useEffect(() => {
    if (elementHeight && elementWidth) {
      setPieceSize(Math.round(Math.min(elementWidth, elementHeight) / fieldState[0].length - SPAN));
    }
  }, [elementWidth, elementHeight, setPieceSize]);

  useLayoutEffect(() => {
    if (!isShuffleRunning) return;
    (async () => {
      if (shuffleCount >= SHUFFLE_OPTIONS[settings.shuffleType]) {
        setIsShuffleDone(true);
        setIsGameActive(true);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 50));

      const shuffleMovePiece = shuffle(fieldState, shuffleCount % 2 ? "HOR" : "VERT");
      if (shuffleMovePiece) {
        setNewFieldState(shuffleMovePiece);
        setShuffleCount((prev) => prev + 1);
      }
    })();
  }, [isShuffleRunning, shuffleCount]);

  let flag = false;

  fieldState.forEach((row, y) =>
    row.forEach((el, x) => {
      if (el) {
        positions.set(el, { x, y });
        if (el !== y * FIELD_OPTIONS_SIZES[settings.fieldSizeType].fieldW + x + 1) flag = true;
      }
    }),
  );

  if (!flag && flag !== isGameActive) {
    setIsGameActive(flag);
  }

  return (
    <div
      className={styles.field}
      ref={fieldRef}
      style={{
        transform: `translateX(-${(fieldState[0].length * (pieceSize + SPAN) - SPAN - pieceSize) / 2}px)`,
      }}
    >
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
              imageUrl={imgUrl ?? ""}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              fieldCols={FIELD_OPTIONS_SIZES[settings.fieldSizeType].fieldW}
              fieldRows={FIELD_OPTIONS_SIZES[settings.fieldSizeType].fieldH}
              disabled={isShuffleDone && !isGameActive}
              gameType={settings.gameType}
              isLoading={loading}
              onClick={() => {
                if (isGameActive) setNewFieldState(id);
              }}
              onTouchEnd={() => {
                if (isGameActive) setNewFieldState(id);
              }}
              winColor={isShuffleDone && !isGameActive}
            />
          );
        })}
    </div>
  );
};
