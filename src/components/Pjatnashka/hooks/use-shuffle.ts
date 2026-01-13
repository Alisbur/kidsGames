import { useEffect, useState } from "react";
import { move, shuffle } from "../helpers/helpers";
import { TFieldState } from "../types/field-state.type";

export const useShuffle = ({
  initFieldState,
  times,
}: {
  initFieldState: TFieldState;
  times: number;
}) => {
  const [isShuffleDone, setIsShuffleDone] = useState(true);
  const [shuffleCount, setShuffleCount] = useState(times);
  const [currentFieldState, setCurrentFieldState] =
    useState<TFieldState>(initFieldState);

  const startShuffle = () => {
    setIsShuffleDone(false);
  };

  useEffect(() => {
    const runShuffleOnce = async () => {
      if (!isShuffleDone) {
        if (shuffleCount < 0) {
          setIsShuffleDone(true);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 50));

        const shuffleMovePiece = shuffle(
          currentFieldState,
          shuffleCount % 2 ? "HOR" : "VERT"
        );
        if (shuffleMovePiece) {
          const newFieldState = move(currentFieldState, shuffleMovePiece);
          setCurrentFieldState(newFieldState);
          setShuffleCount((prev) => prev - 1);
        }
      }
    };

    runShuffleOnce();
  }, [shuffleCount, isShuffleDone]);

  return { startShuffle, currentFieldState, isShuffleDone };
};
