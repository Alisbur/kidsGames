"use client";

import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TBall,
  TBallsLayer,
  TBallsRotateDirection,
} from "../../types/ball.type";
import { Ball } from "../ball/ball";
import styles from "./balls-layer.module.scss";
import classNames from "classnames";
import { ArrowButton } from "../arrow-button/arrow-button";
import { useSwipeDrag } from "../../../../shared/hooks/useSwipe";

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
  const layerWrapperRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<TBallsRotateDirection | null>(
    null
  );

  const { deltaX } = useSwipeDrag(layerRef, {
    thresholdX: (layerWrapperRef.current?.clientWidth || 300) / 20,
    maxDeltaX: (layerWrapperRef.current?.clientWidth || 300) / balls.length,
    onSwipeX,
  });

  function onSwipeX(deltaX: number) {
    if (deltaX > 0) setDirection("Right");
    else if (deltaX < 0) setDirection("Left");
  }

  useEffect(() => {
    console.log("DELTA X", deltaX);
  }, [deltaX]);

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


  const layerPosition = useMemo(() => {
    let res = `translateX(calc(-50% + ${deltaX}px`;
    if (direction === "Left") {
      res = `translateX(calc(-50% - (100% / (${ballsExtended.length / 1.05})) + ${deltaX}px`;
    }
    if (direction === "Right") {
      res = `translateX(calc(-50% + (100% / (${ballsExtended.length / 1.05})) + ${deltaX}px`;
    }
    console.log("RES", res)
    return res;
  }, [direction, balls, deltaX]);


  if (!ballsExtended) {
    return null;
  }  

  return (
    <div className={styles.wrapper}>
      <ArrowButton
        side="Left"
        onClick={() => setDirection("Left")}
        disabled={!!direction}
        className={styles.button}
      />
      <div className={styles.layerWrapper} ref={layerWrapperRef}>
        <div
          className={classNames(styles.layer, {
            [styles.layer_withTransition]: direction,
            // [styles.layer_left]: direction === "Left",
            // [styles.layer_right]: direction === "Right",
          })}
          ref={layerRef}
          style={{
            width: `${(100 / balls.length) * (balls.length + 2)}%`,
            transform: layerPosition,
            // transform: `translateX(calc(-50% + ${layerPosition} + ${deltaX}px))`,
              // deltaX !== 0
              //   ? `translateX(calc(-50% ${layerPosition} + ${deltaX}px))`
              //   : undefined,
            gridTemplateColumns: `repeat(${balls?.length + 2}, 1fr)`,
          }}
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
        className={styles.button}
      />
    </div>
  );
};
