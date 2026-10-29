import type { CSSProperties } from "react";

import styles from "./rating-stars-component.module.scss";

type TStarSize = "s" | "m" | "l" | number;

type TRatingStarsComponentProps = {
  maxStars?: number;
  rating: number;
  size?: TStarSize;
};

const SIZE_MAP: Record<Exclude<TStarSize, number>, number> = {
  s: 20,
  m: 40,
  l: 60,
};

const STAR_PATH =
  "M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z";

function resolveSize(size: TStarSize | undefined): number {
  if (size === undefined) return SIZE_MAP.m;
  if (typeof size === "number") return size;
  return SIZE_MAP[size];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

type TStarProps = {
  size: number;
  fillRatio: number;
};

function Star({ size, fillRatio }: TStarProps) {
  const clipStyle: CSSProperties = {
    width: `${fillRatio * 100}%`,
  };

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
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

export function RatingStarsComponent({
  maxStars = 3,
  rating,
  size = "m",
}: TRatingStarsComponentProps) {
  const pixelSize = resolveSize(size);
  const safeRating = clamp(Math.round(rating * 2) / 2, 0, maxStars);
  const gap = Math.round(pixelSize * 0.15);

  return (
    <div
      className={styles.stars}
      style={{ gap }}
      role="img"
      aria-label={`Рейтинг: ${safeRating} из ${maxStars}`}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const fillRatio = clamp(safeRating - index, 0, 1);

        return <Star key={index} size={pixelSize} fillRatio={fillRatio} />;
      })}
    </div>
  );
}
