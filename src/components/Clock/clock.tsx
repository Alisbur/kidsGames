import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { Instruction } from "@/shared/ui/instruction/instruction";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";

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
      setTime(() => {
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
    <PageContentLayout
      mainContent={
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
        </div>
      }
      footerContent={
        <FooterControlsLayout type={"vertical"}>
          <Instruction
            hint={"Чтобы изменить время перетащите стрелки за синий или красный кружок"}
            centered
          />
          <FooterControlsLayout>
            <MenuButton
              color={"muted"}
              text={"-1 час"}
              onClick={() => {
                setTime({ ...time, hours: time.hours === 0 ? 23 : time.hours - 1 });
              }}
            />

            <MenuButton
              color={"muted"}
              text={"-1 мин"}
              onClick={() => {
                const totalMinutes = time.hours * 60 + time.minutes - 1;
                let newHours = Math.floor(totalMinutes / 60);
                let newMinutes = totalMinutes % 60;
                if (newHours < 0) newHours = 23;
                if (newMinutes < 0) newMinutes = 59;
                setTime({ hours: newHours, minutes: newMinutes });
              }}
            />
            <MenuButton color={"muted"} onClick={handleResetTime} text={"Сброс"} />
            <MenuButton
              color={"muted"}
              text={"+1 мин"}
              onClick={() => {
                const totalMinutes = time.hours * 60 + time.minutes + 1;
                let newHours = Math.floor(totalMinutes / 60);
                const newMinutes = totalMinutes % 60;
                if (newHours >= 24) newHours = 0;
                setTime({ hours: newHours, minutes: newMinutes });
              }}
            />
            <MenuButton
              color={"muted"}
              text={"+1 час"}
              onClick={() => {
                setTime({ ...time, hours: time.hours === 23 ? 0 : time.hours + 1 });
              }}
            />
          </FooterControlsLayout>
        </FooterControlsLayout>
      }
    />
  );
};
