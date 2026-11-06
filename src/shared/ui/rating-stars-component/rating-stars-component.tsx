import { Star } from "./rating-star";
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

function resolveSize(size: TStarSize | undefined): number {
  if (size === undefined) return SIZE_MAP.m;
  if (typeof size === "number") return size;
  return SIZE_MAP[size];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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
