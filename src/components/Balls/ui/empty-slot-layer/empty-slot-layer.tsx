"use client";

import { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  TBall,
  TBallsEmptySlot,
  TBallsLayer,
  TBallsRotateDirection,
} from "../../types/ball.type";
import { Ball } from "../ball/ball";
import styles from "./empty-slot-layer.module.scss";
import classNames from "classnames";
import { ArrowButton } from "../arrow-button/arrow-button";
import { useSwipeDrag } from "../../../../shared/hooks/useSwipe";

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
  const [ballsExtended, setBallsExtended] = useState<
    Array<{ key: number; item: TBall | null }>
  >([]);
  const layerRef = useRef<HTMLDivElement>(null);
  const layerWrapperRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<TBallsRotateDirection | null>(
    null
  );
  const { position, ball } = slot;

  const { deltaX } = useSwipeDrag(layerRef, {
    thresholdX: (layerWrapperRef.current?.clientWidth || 300) / 20,
    maxDeltaX: (layerWrapperRef.current?.clientWidth || 300) / maxItems,
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

      console.log("EMPTY BALLS", balls);

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
              }
            }
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

// "use client";

// import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
// import {
//   TBall,
//   TBallsEmptySlot,
//   TBallsLayer,
//   TBallsRotateDirection,
// } from "../../types/ball.type";
// import { Ball } from "../ball/ball";
// import styles from "./empty-slot-layer.module.scss";
// import classNames from "classnames";
// import { ArrowButton } from "../arrow-button/arrow-button";

// type TEmptySlotLayerProps = {
//   slot: TBallsEmptySlot;
//   maxItems: number;
//   handleRotateEmptySlotLayer: (direction: TBallsRotateDirection) => void;
//   onBallClick: () => void;
// };

// export const EmtySlotLayer: FC<TEmptySlotLayerProps> = ({
//   slot,
//   maxItems,
//   handleRotateEmptySlotLayer,
//   onBallClick,
// }) => {
//   const [ballsExtended, setBallsExtended] = useState<
//     Array<{ key: number; item: TBall | null }>
//   >([]);
//   const layerRef = useRef<HTMLDivElement>(null);
//   const [direction, setDirection] = useState<TBallsRotateDirection | null>(
//     null
//   );
//   const [isMounted, setIsMounted] = useState(false);
//   const { position, ball } = slot;

//   useLayoutEffect(() => {
//     const current = layerRef.current;
//     if (!current) return;

//     if (maxItems) {
//       const balls: TBallsLayer = new Array(maxItems).fill(null);
//       balls[position] = ball;

//       console.log("EMPTY BALLS", balls);

//       const ballsExtendedArr: Array<{ key: number; item: TBall | null }> = [
//         balls[balls.length - 1] as TBall | null,
//         ...balls,
//         balls[0] as TBall | null,
//       ].map((el, i) => ({ key: i, item: el }));
//       setBallsExtended(ballsExtendedArr);
//       setDirection(null);
//       setIsMounted(true);
//     }
//   }, [position, ball]);

//   useEffect(() => {
//     const current = layerRef.current;
//     if (!current) return;

//     const handleTransitionEnd = (e: TransitionEvent) => {
//       if (e.propertyName !== "transform") return;
//       if (isMounted && direction) {
//         if (direction === "Left") handleRotateEmptySlotLayer("Left");
//         if (direction === "Right") handleRotateEmptySlotLayer("Right");
//         setDirection(null);
//         setIsMounted(false);
//       }
//     };

//     if (current && direction && isMounted) {
//       current.addEventListener("transitionend", handleTransitionEnd);
//     }

//     return () => {
//       current?.removeEventListener("transitionend", handleTransitionEnd);
//     };
//   }, [direction, isMounted]);

//   if (!ballsExtended) {
//     return null;
//   }

//   return (
//     <div className={styles.wrapper}>
//       <ArrowButton
//         side="Left"
//         onClick={() => setDirection("Left")}
//         disabled={!!direction}
//       />
//       <div className={styles.layerWrapper}>
//         <div
//           className={classNames(styles.layer, {
//             [styles.layer_withTransition]: isMounted,
//             [styles.layer_left]: direction === "Left",
//             [styles.layer_right]: direction === "Right",
//           })}
//           ref={layerRef}
//         >
//           {ballsExtended.map((b, i) => (
//             <Ball
//               key={b.key}
//               color={b.item?.color || undefined}
//               isEmpty={!b.item}
//               isHidden={
//                 i !== position + 1 && (i !== 0 || position !== maxItems - 1)
//               }
//               onClick={() => {
//                 if (b.item?.color) onBallClick();
//               }}
//             />
//           ))}
//         </div>
//       </div>
//       <ArrowButton
//         side="Right"
//         onClick={() => setDirection("Right")}
//         disabled={!!direction}
//       />
//     </div>
//   );
// };
