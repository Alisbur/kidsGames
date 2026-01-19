import { FC, ReactNode, useEffect } from "react";
import { TBallsLayer, TBallsRotateDirection } from "../../types/ball.type";
import styles from "./game-field.module.scss";
import { BallsLayer } from "../balls-layer/balls-layer";

type TGameFieldProps = {
  layers: TBallsLayer[];
  emptySlot: ReactNode;
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
  layers,
  emptySlot,
  handleRotateLayer,
  onBallClick,
}) => {
  useEffect(()=>{console.log("UPDATE LAYERS")},[layers])

  return (
    <div className={styles.wrapper}>
      {emptySlot}

      {/* <BallsLayer
          key={1}
          balls={layers[0]}
          handleRotateLeft={() => {
            handleRotateLayer({ layerIdx: 0, direction: "Left" });
          }}
          handleRotateRight={() => {
            handleRotateLayer({ layerIdx: 0, direction: "Right" });
          }}
        /> */}

      {layers.map((layer, idx) => (
        <BallsLayer
          key={idx}
          balls={layer}
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
