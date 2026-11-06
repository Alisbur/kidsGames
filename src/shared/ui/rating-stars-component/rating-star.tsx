import { type CSSProperties, useId } from "react";

import styles from "./rating-stars-component.module.scss";

const STAR_PATH =
  "M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z";

type TStarProps = {
  size: number;
  fillRatio: number;
};

export function Star({ size, fillRatio }: TStarProps) {
  const uid = useId().replace(/:/g, "");

  const clipStyle: CSSProperties = {
    width: `${fillRatio * 100}%`,
  };

  const baseId = `star-base-${uid}`;
  const shineId = `star-shine-${uid}`;

  return (
    <span className={styles.starWrapper} style={{ width: size, height: size }}>
      <svg
        className={styles.outline}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d={STAR_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>

      <span className={styles.fillClip} style={clipStyle}>
        <svg
          className={styles.filled}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={baseId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="45%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#ffc400" />
            </linearGradient>

            <radialGradient id={shineId} cx="32%" cy="26%" r="42%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="55%" stopColor="rgba(255, 255, 255, 0.28)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>

          <path d={STAR_PATH} fill={`url(#${baseId})`} />

          <path d={STAR_PATH} fill={`url(#${shineId})`} />

          <path
            d={STAR_PATH}
            fill="none"
            stroke="rgba(120, 53, 15, 0.4)"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
