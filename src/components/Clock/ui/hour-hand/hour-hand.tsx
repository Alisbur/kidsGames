import { FC, useCallback, useEffect, useState } from "react";

import { getHoursAngleFromTime } from "../../helpers/helpers";
import { TTime } from "../types/time.type";
import styles from "./hour-hand.module.scss";

type THourHandProps = {
  time: TTime;
  setTime: (value: TTime | ((prev: TTime) => TTime)) => void;
  setManualMode: (v: boolean) => void;
  getAngleFromClockFaceCenter: (clientX: number, clientY: number) => number;
};

const getAngleDiff = (a: number, b: number) => {
  return ((a - b + 540) % 360) - 180;
};

export const HourHand: FC<THourHandProps> = ({
  time,
  setTime,
  setManualMode,
  getAngleFromClockFaceCenter,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getClientCoords = (e: any) => {
    if ("touches" in e) {
      return {
        x: e.touches[0]?.clientX,
        y: e.touches[0]?.clientY,
      };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleDrag = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (!isDragging) return;

      e.preventDefault();

      const { x, y } = getClientCoords(e);
      if (x == null || y == null) return;

      const currentAngle = getAngleFromClockFaceCenter(x, y);

      setTime((prev: TTime) => {
        const prevAngle = getHoursAngleFromTime(prev);
        const angleDiff = getAngleDiff(currentAngle, prevAngle);

        if (Math.abs(angleDiff) <= 15) return prev;

        const newHours = angleDiff > 0 ? (prev.hours + 1) % 24 : (prev.hours + 23) % 24; // -1 по модулю 24

        return {
          hours: newHours,
          minutes: prev.minutes,
        };
      });
    },
    [getAngleFromClockFaceCenter, isDragging, setTime],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDrag = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setManualMode(true);
    setIsDragging(true);
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", handleDrag, { passive: false });
    window.addEventListener("touchend", endDrag);
    window.addEventListener("touchcancel", endDrag);

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", endDrag);
      window.removeEventListener("touchcancel", endDrag);
    };
  }, [isDragging, handleDrag, endDrag]);

  return (
    <div
      className={styles.hourHandWrapper}
      style={{
        transform: `translate(-50%, -100%) rotate(${getHoursAngleFromTime(time)}deg)`,
      }}
    >
      <div className={styles.hourHand} />
      <div
        className={styles.dragHandle}
        style={{ transform: `translate(-50%, -50%)` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      />
    </div>
  );
};
