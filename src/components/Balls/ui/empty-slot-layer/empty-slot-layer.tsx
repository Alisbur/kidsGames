"use client";

import classNames from "classnames";
import { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useSwipeDrag } from "@/shared/hooks/useSwipe";

import { TBall, TBallsEmptySlot, TBallsLayer, TBallsRotateDirection } from "../../types/ball.type";
import { ArrowButton } from "../arrow-button/arrow-button";
import { Ball } from "../ball/ball";
import styles from "./empty-slot-layer.module.scss";

type TEmptySlotLayerProps = {
  slot: TBallsEmptySlot;
  maxItems: number;
  handleRotateEmptySlotLayer: (direction: TBallsRotateDirection) => void;
  onBallClick: () => void;
};

export const EmtySlotLayer: FC<TEmptySlotLayerProps> = ({
  slot,
  maxItems,
  handleRotateEmptySlotLayer,
  onBallClick,
}) => {
  const [ballsExtended, setBallsExtended] = useState<Array<{ key: number; item: TBall | null }>>(
    [],
  );
  const layerRef = useRef<HTMLDivElement>(null);
  const layerWrapperRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<TBallsRotateDirection | null>(null);
  const { position, ball } = slot;

  const MIN_WRAPPER_WIDTH = 300;
  const THRESHOLD_BALANCING_VALUE = 20;

  const { deltaX } = useSwipeDrag(layerRef, {
    thresholdX:
      (layerWrapperRef.current?.clientWidth || MIN_WRAPPER_WIDTH) / THRESHOLD_BALANCING_VALUE,
    maxDeltaX: (layerWrapperRef.current?.clientWidth || MIN_WRAPPER_WIDTH) / maxItems,
    onSwipeX,
  });

  function onSwipeX(deltaX: number) {
    if (deltaX > 0) setDirection("Right");
    else if (deltaX < 0) setDirection("Left");
  }

  useLayoutEffect(() => {
    const current = layerRef.current;
    if (!current) return;

    if (maxItems) {
      const balls: TBallsLayer = new Array(maxItems).fill(null);
      balls[position] = ball;
      const ballsExtendedArr: Array<{ key: number; item: TBall | null }> = [
        balls[balls.length - 1] as TBall | null,
        ...balls,
        balls[0] as TBall | null,
      ].map((el, i) => ({ key: i, item: el }));
      setBallsExtended(ballsExtendedArr);
      setDirection(null);
    }
  }, [position, ball]);

  useEffect(() => {
    const current = layerRef.current;
    if (!current) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      if (direction) {
        if (direction === "Left") handleRotateEmptySlotLayer("Left");
        if (direction === "Right") handleRotateEmptySlotLayer("Right");
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
    return res;
  }, [direction, position, deltaX]);

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
          })}
          ref={layerRef}
          style={{
            width: `${(100 / maxItems) * (maxItems + 2)}%`,
            transform: layerPosition,
            gridTemplateColumns: `repeat(${maxItems + 2}, 1fr)`,
          }}
        >
          {ballsExtended.map((b, i) => (
            <Ball
              key={b.key}
              color={b.item?.color || undefined}
              isEmpty={!b.item}
              isHidden={
                !(
                  i === position + 1 ||
                  (i === 0 && position === maxItems - 1) ||
                  (i === maxItems + 1 && position === 0)
                )
              }
              onClick={() => {
                if (b.item?.color) onBallClick();
              }}
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
