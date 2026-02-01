import { FC, ReactNode, useEffect, useState } from "react";
import {
  TBallsFieldState,
  TBallsLayer,
  TBallsRotateDirection,
} from "../../types/ball.type";
import styles from "./game-field.module.scss";
import { BallsLayer } from "../balls-layer/balls-layer";
import {
  getLayersFromFieldState,
  getRotateRandomLayersCommand,
} from "../../helpers/helpers";
import { TBallsSettings } from "../../types/settings.type";
import { SHUFFLE_OPTIONS } from "../../config/shuffle-options";
import classNames from "classnames";
import { allArrayItemsEqual } from "../../../../shared/helpers/all-array-items-equal";
import { FIELD_OPTIONS_SIZES } from "../../config/field-options";

type TGameFieldProps = {
  field: TBallsFieldState;
  emptySlot: ReactNode;
  settings: TBallsSettings;
  handleShuffleStep: (step: number) => void;
  handleRotateLayer: ({
    layerIdx,
    direction,
  }: {
    layerIdx: number;
    direction: TBallsRotateDirection;
  }) => void;
  onBallClick: ({
    layerIdx,
    ballIdx,
  }: {
    layerIdx: number;
    ballIdx: number;
  }) => void;
};

export const GameField: FC<TGameFieldProps> = ({
  field,
  emptySlot,
  settings,
  handleShuffleStep,
  handleRotateLayer,
  onBallClick,
}) => {
  // const layers: TBallsLayer[] = useMemo(()=>getLayersFromFieldState(field), [settings]);
  const layers: TBallsLayer[] = getLayersFromFieldState(field)

  const [isShuffleDone, setIsShuffleDone] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [shuffleCommands, setShuffleCommands] = useState<
    Array<{ side: TBallsRotateDirection | null }>
  >(
    new Array(FIELD_OPTIONS_SIZES[settings.fieldSizeType].ballsInStack)
      .fill(null)
      .map(() => ({ side: null }))
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isShuffleDone) {
      timer = setTimeout(() => {
        if (shuffleCount % 2) {
          handleShuffleStep(1);
          setShuffleCommands(getRotateRandomLayersCommand(settings, false));
        } else {
          handleShuffleStep(2);
          setShuffleCommands(getRotateRandomLayersCommand(settings, false));
        }
        if (shuffleCount < SHUFFLE_OPTIONS[settings.shuffleType]) {
          setShuffleCount((prev) => prev + 1);
        } else {
          handleShuffleStep(2);
          setIsShuffleDone(true);
        }
      }, 310);
    }
    return () => clearTimeout(timer);
  }, [shuffleCount, isShuffleDone]);

  useEffect(() => {
    if (isGameActive && isShuffleDone && field.fieldState?.length) {
      for (let i = 0; i < field.fieldState.length; i++) {
        if (!allArrayItemsEqual(field.fieldState[i].map((b) => b?.color))) {
          return;
        }
      }
      setIsGameActive(false);
    }
  }, [field]);

  if (!field) return null;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper_win]: !isGameActive,
      })}
      style={{ pointerEvents: isShuffleDone && isGameActive ? "auto" : "none" }}
    >
      {emptySlot}
      {layers.map((layer, idx) => (
        <BallsLayer
          key={idx}
          balls={layer}
          command={shuffleCommands[idx]}
          onBallClick={(ballIdx: number) =>
            onBallClick({ layerIdx: idx, ballIdx: ballIdx })
          }
          handleRotateLeft={() => {
            handleRotateLayer({ layerIdx: idx, direction: "Left" });
          }}
          handleRotateRight={() => {
            handleRotateLayer({ layerIdx: idx, direction: "Right" });
          }}
        />
      ))}
    </div>
  );
};
