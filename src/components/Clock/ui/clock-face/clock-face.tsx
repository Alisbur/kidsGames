import classNames from "classnames";
import { forwardRef, ReactNode } from "react";

import { isNight } from "../../helpers/helpers";
import { TDayPart, TTime } from "../types/time.type";
import styles from "./clock-face.module.scss";

type TClockBodyProps = {
  time: TTime;
  children?: ReactNode;
  showMinutes?: boolean;
};

const FACE_RADIUS = 150;

const AM_HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const PM_HOURS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const getDayPart = (time: TTime): TDayPart => {
  if (time.hours >= 0 && time.hours < 12) return "AM";
  return "PM";
};

export const ClockFace = forwardRef<HTMLDivElement, TClockBodyProps>(
  ({ children, time, showMinutes = false }, clockRef) => {
    return (
      <div ref={clockRef} className={styles.clock__face}>
        {[...Array(12)].map((_, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          const radius = 130;
          const x = FACE_RADIUS + radius * Math.cos(angle);
          const y = FACE_RADIUS + radius * Math.sin(angle);

          return (
            <div
              key={i}
              className={styles.clock__hourMark}
              style={{
                left: x - 7,
                top: y - 19,
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: "3px 15px",
              }}
            />
          );
        })}

        {(showMinutes ? MINUTES : PM_HOURS).map((num, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          const radius = FACE_RADIUS * 1.15;
          const x = FACE_RADIUS + radius * Math.cos(angle) - 10;
          const y = FACE_RADIUS + radius * Math.sin(angle) - 10;

          return (
            <div
              key={num}
              className={classNames(styles.clock__number, {
                [styles.clock__number_night]: isNight(time),
                [styles.clock__number_accent]: getDayPart(time) === "PM" || showMinutes,
                [styles.clock__number_accentNum]: time.hours === num && !showMinutes,
              })}
              style={{
                left: x - 6,
                top: y - 3,
              }}
            >
              {num}
            </div>
          );
        })}
        {AM_HOURS.map((num, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          const radius = FACE_RADIUS * 0.65;
          const x = FACE_RADIUS + radius * Math.cos(angle) - 10;
          const y = FACE_RADIUS + radius * Math.sin(angle) - 10;

          return (
            <div
              key={num}
              className={classNames(styles.clock__number, {
                [styles.clock__number_accent]: getDayPart(time) === "AM",
                [styles.clock__number_accentNum]: time.hours === num,
              })}
              style={{
                left: x - 3,
                top: y - 3,
              }}
            >
              {num}
            </div>
          );
        })}

        {children}
      </div>
    );
  },
);
