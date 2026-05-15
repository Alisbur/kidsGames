import { FC, useCallback, useEffect, useState } from "react";

import { getAngleFromMinutes, getMinutesFromAngle } from "../../helpers/helpers";
import { TTime } from "../types/time.type";
import styles from "./minute-hand.module.scss";

type TMinuteHandProps = {
  time: TTime;
  setTime: (value: TTime | ((prev: TTime) => TTime)) => void;
  setManualMode: (v: boolean) => void;
  setShowMinutes: (v: boolean) => void;
  getAngleFromClockFaceCenter: (clientX: number, clientY: number) => number;
};

const getClientCoords = (e: MouseEvent | TouchEvent) => {
  if ("touches" in e) {
    const touch = e.touches[0];
    if (!touch) return null;

    return { x: touch.clientX, y: touch.clientY };
  }

  return { x: e.clientX, y: e.clientY };
};

export const MinuteHand: FC<TMinuteHandProps> = ({
  time,
  setTime,
  setManualMode,
  setShowMinutes,
  getAngleFromClockFaceCenter,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(getAngleFromMinutes(time.minutes));
  const [skipTransition, setSkipTransition] = useState(false);

  useEffect(() => {
    setCurrentAngle(getAngleFromMinutes(time.minutes));
  }, [time]);

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      e.preventDefault();

      const coords = getClientCoords(e);
      if (!coords) return;

      const { x, y } = coords;
      const newAngle = getAngleFromClockFaceCenter(x, y);

      setTime((prev) => {
        // используем prev → избегаем stale state
        if (currentAngle > 300 && newAngle < 60) {
          const newHours = prev.hours < 23 ? prev.hours + 1 : 0;
          if (newHours === 0) setSkipTransition(true);

          return {
            hours: newHours,
            minutes: Math.floor(getMinutesFromAngle(newAngle)),
          };
        }

        if (newAngle > 300 && currentAngle < 60) {
          const newHours = prev.hours > 0 ? prev.hours - 1 : 23;
          if (newHours === 23) setSkipTransition(true);

          return {
            hours: newHours,
            minutes: Math.floor(getMinutesFromAngle(newAngle)),
          };
        }

        if (skipTransition) setSkipTransition(false);

        return {
          ...prev,
          minutes: Math.floor(getMinutesFromAngle(newAngle)),
        };
      });

      setCurrentAngle(newAngle);
    },
    [isDragging, currentAngle, getAngleFromClockFaceCenter, skipTransition, setTime],
  );

  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setManualMode(true);
    setShowMinutes(true);
    setIsDragging(true);
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setShowMinutes(false);
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const move = handleDrag as EventListener;
    const up = endDrag as EventListener;

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    window.addEventListener("touchcancel", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchcancel", up);
    };
  }, [isDragging, handleDrag, endDrag]);

  return (
    <div
      className={styles.minuteHandWrapper}
      style={{
        transform: `translate(-50%, -100%) rotate(${currentAngle}deg)`,
        transition:
          isDragging || [59, 0].includes(time.minutes) ? "none" : "transform 0.2s ease-out",
      }}
    >
      <div className={styles.minuteHand} />
      <div
        className={styles.dragHandle}
        style={{
          transform: `translate(-50%, -50%)`,
        }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      />
    </div>
  );
};
