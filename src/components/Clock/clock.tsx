import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./clock.module.scss";
import { isNight } from "./helpers/helpers";
import { ClockFace } from "./ui/clock-face/clock-face";
import { HourHand } from "./ui/hour-hand/hour-hand";
import { MinuteHand } from "./ui/minute-hand/minute-hand";
import { SkyBackground } from "./ui/sky-background/sky-background";
import { TTime } from "./ui/types/time.type";

export const AnalogClock = ({ initialTime = new Date() }) => {
  const [time, setTime] = useState<TTime>({
    hours: initialTime.getHours(),
    minutes: initialTime.getMinutes(),
  });

  const handleResetTime = () => {
    setIsManualMode(false);
    setTime({
      hours: initialTime.getHours(),
      minutes: initialTime.getMinutes(),
    });
  };

  const clockRef = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);

  useEffect(() => {
    const el = clockRef.current;
    if (!el) return;
    setRect(el.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (isManualMode) return;

    const id = setInterval(() => {
      setTime((prev) => {
        const now = new Date();

        return {
          hours: now.getHours(),
          minutes: now.getMinutes(),
        };
      });
    }, 30000);

    return () => clearInterval(id);
  }, [isManualMode]);

  const getAngleFromCenter = useCallback(
    (clientX: number, clientY: number) => {
      if (!clockRef.current || !rect) return 0;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let angle = Math.atan2(clientY - centerY, clientX - centerX);
      angle = (angle * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;

      return angle;
    },
    [clockRef, rect],
  );

  return (
    <div className={styles.clock}>
      <SkyBackground time={time} />
      <div
        className={classNames(styles.clock__digital, {
          [styles.clock__digital_night]: isNight(time),
        })}
      >
        {String(time.hours).padStart(2, "0")}:{String(time.minutes).padStart(2, "0")}
      </div>
      <ClockFace ref={clockRef} time={time} showMinutes={showMinutes}>
        <HourHand
          time={time}
          setTime={setTime}
          setManualMode={setIsManualMode}
          getAngleFromClockFaceCenter={(clientX: number, clientY: number) =>
            getAngleFromCenter(clientX, clientY)
          }
        />
        <div className={styles.clock__centerDot} />

        <MinuteHand
          time={time}
          setTime={setTime}
          setManualMode={setIsManualMode}
          setShowMinutes={setShowMinutes}
          getAngleFromClockFaceCenter={(clientX: number, clientY: number) =>
            getAngleFromCenter(clientX, clientY)
          }
        />
      </ClockFace>

      <div className={styles.clock__controls}>
        <button
          onClick={() => {
            setTime({ ...time, hours: time.hours === 0 ? 23 : time.hours - 1 });
          }}
          className={styles.clock__button}
        >
          -1 час
        </button>

        <button
          onClick={() => {
            const totalMinutes = time.hours * 60 + time.minutes - 1;
            let newHours = Math.floor(totalMinutes / 60);
            let newMinutes = totalMinutes % 60;
            if (newHours < 0) newHours = 23;
            if (newMinutes < 0) newMinutes = 59;
            setTime({ hours: newHours, minutes: newMinutes });
          }}
          className={styles.clock__button}
        >
          -1 мин
        </button>
        <button onClick={handleResetTime} className={styles.clock__button}>
          Сброс
        </button>
        <button
          onClick={() => {
            const totalMinutes = time.hours * 60 + time.minutes + 1;
            let newHours = Math.floor(totalMinutes / 60);
            const newMinutes = totalMinutes % 60;
            if (newHours >= 24) newHours = 0;
            setTime({ hours: newHours, minutes: newMinutes });
          }}
          className={styles.clock__button}
        >
          +1 мин
        </button>
        <button
          onClick={() => {
            setTime({ ...time, hours: time.hours === 23 ? 0 : time.hours + 1 });
          }}
          className={styles.clock__button}
        >
          +1 час
        </button>
      </div>

      <div className={styles.clock__instruction}>
        💡 Перетащите красный кружок на конце минутной стрелки или синий на конце часовой, чтобы
        изменить время
      </div>
    </div>
  );
};
