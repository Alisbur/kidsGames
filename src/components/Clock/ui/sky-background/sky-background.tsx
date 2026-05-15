import { FC, useMemo } from "react";

import { TTime } from "../types/time.type";

type Props = {
  time: TTime;
};

const RADIUS = 240;

const getTimeProgress = ({ hours, minutes }: TTime) => {
  return (hours * 60 + minutes) / (24 * 60);
};

// плавная функция (0 → 1 → 0)
// const dayCurve = (t: number) => Math.max(0, Math.sin(Math.PI * t));

const dayCurve = (t: number) => {
  // сдвигаем так, чтобы 04:00 стало началом
  const shifted = (t - 4 / 24 + 1) % 1;

  // растягиваем день (04 → 23 ≈ 19 часов)
  const dayLength = 19 / 24;

  if (shifted > dayLength) return 0;

  const normalized = shifted / dayLength;

  return Math.sin(Math.PI * normalized);
};

// фон неба
const getSkyGradient = (t: number) => {
  const d = dayCurve(t);

  // const top = `hsl(210, 70%, ${15 + d * 60}%)`;
  // const bottom = `hsl(220, 80%, ${10 + d * 50}%)`;
  const top = `hsl(210, 70%, ${15 + d * 80}%)`;
  const bottom = `hsl(220, 80%, ${10 + d * 20}%)`;

  return `linear-gradient(to bottom, ${top}, ${bottom})`;
};

export const SkyBackground: FC<Props> = ({ time }) => {
  const t = useMemo(() => getTimeProgress(time), [time]);

  const angle = t * 2 * Math.PI;

  const sun = useMemo(() => {
    const x = -Math.cos(angle - Math.PI / 2) * RADIUS * 0.9;
    const y = -Math.sin(angle - Math.PI / 2) * RADIUS;

    return { x, y };
  }, [angle]);

  const moon = useMemo(() => {
    const x = -Math.cos(angle + Math.PI / 2) * RADIUS * 0.9;
    const y = -Math.sin(angle + Math.PI / 2) * RADIUS;

    return { x, y };
  }, [angle]);

  const sunOpacity = dayCurve(t);
  const moonOpacity = dayCurve((t + 0.5) % 1);
  const starsOpacity = 1 - sunOpacity;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: getSkyGradient(t),
        transition: "background 0.3s linear",
        height: "100dvh",
      }}
    >
      {/* ⭐ Звезды */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: starsOpacity,
          transition: "opacity 0.3s linear",
          backgroundImage: `
            radial-gradient(2px 2px at 30% 30%, white, transparent),
            radial-gradient(1.5px 1.5px at 70% 40%, white, transparent),
            radial-gradient(1.5px 1.5px at 40% 50%, white, transparent),
            radial-gradient(1.5px 1.5px at 60% 25%, white, transparent),
            radial-gradient(1.5px 1.5px at 70% 60%, white, transparent),            
            radial-gradient(2px 2px at 65% 20%, white, transparent)
          `,
        }}
      />

      {/* ☀️ Солнце */}
      <div
        style={{
          position: "absolute",
          left: "48%",
          top: "40%",
          transform: `translate(${sun.x}px, ${sun.y}px)`,
          opacity: sunOpacity,
          transition: "opacity 0.3s linear",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fff59d, #fbc02d)",
            boxShadow: "0 0 40px 20px rgba(255, 235, 59, 0.5)",
          }}
        />
      </div>

      {/* 🌙 Луна */}
      <div
        style={{
          position: "absolute",
          left: "48%",
          top: "40%",
          transform: `translate(${moon.x}px, ${moon.y}px)`,
          opacity: moonOpacity,
          transition: "opacity 0.3s linear",
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "radial-gradient(circle, #eee, #bbb)",
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
        />
      </div>
    </div>
  );
};
