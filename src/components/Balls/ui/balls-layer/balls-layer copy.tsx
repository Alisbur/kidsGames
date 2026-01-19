"use client";

import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  TBall,
  TBallsLayer,
  TBallsRotateDirection,
} from "../../types/ball.type";
import { Ball } from "../ball/ball";
import styles from "./balls-layer.module.scss";
import classNames from "classnames";
import { ArrowButton } from "../arrow-button/arrow-button";

type TBallsLayerProps = {
  balls: TBallsLayer;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  onBallClick: (ballIdx: number) => void;
};

export const BallsLayer: FC<TBallsLayerProps> = ({
  balls,
  handleRotateLeft,
  handleRotateRight,
  onBallClick,
}) => {
  const [ballsExtended, setBallsExtended] = useState<
    Array<{ key: number; item: TBall | null }>
  >([]);
  const layerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<TBallsRotateDirection | null>(
    null
  );

  useLayoutEffect(() => {
    const current = layerRef.current;
    if (!current) return;

    if (balls) {
      const ballsExtendedArr: Array<{ key: number; item: TBall | null }> = [
        balls[balls.length - 1] as TBall | null,
        ...balls,
        balls[0] as TBall | null,
      ].map((el, i) => ({ key: i, item: el }));
      setBallsExtended(ballsExtendedArr);
      setDirection(null);
    }
  }, [balls]);

  useEffect(() => {
    const current = layerRef.current;
    if (!current) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      if (direction) {
        if (direction === "Left") handleRotateLeft();
        if (direction === "Right") handleRotateRight();
        // setDirection(null);
      }
    };

    if (current && direction) {
      current.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      current?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [direction]);

  if (!ballsExtended) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <ArrowButton
        side="Left"
        onClick={() => setDirection("Left")}
        disabled={!!direction}
      />
      <div className={styles.layerWrapper}>
        <div
          className={classNames(styles.layer, {
            [styles.layer_withTransition]: direction,
            [styles.layer_left]: direction === "Left",
            [styles.layer_right]: direction === "Right",
          })}
          ref={layerRef}
        >
          {ballsExtended.map((b, i) => (
            <Ball
              key={b.key}
              color={b.item?.color || undefined}
              isEmpty={!b.item}
              onClick={() => onBallClick(i - 1)}
            />
          ))}
        </div>
      </div>
      <ArrowButton
        side="Right"
        onClick={() => setDirection("Right")}
        disabled={!!direction}
      />
    </div>
  );
};
