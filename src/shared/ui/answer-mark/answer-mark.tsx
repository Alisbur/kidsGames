import classNames from "classnames";
import { Check, CircleAlert, LucideProps, X } from "lucide-react";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react";

import styles from "./answer-mark.module.scss";

type TValueType = "correct" | "incorrect" | "accent";

type TAnswerMarkProps = {
  value: TValueType;
  size?: number;
  className?: string;
  animated?: boolean;
};

const ICONS: Record<
  TValueType,
  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
> = { correct: Check, incorrect: X, accent: CircleAlert };

export const AnswerMark: FC<TAnswerMarkProps> = ({
  value,
  size = 16,
  className,
  animated = false,
}) => {
  const Icon = ICONS[value];

  const iconSize = Math.round(size * 0.65);

  return (
    <span
      className={classNames(
        styles.mark,
        styles[value],
        { [styles.mark_animated]: animated },
        className,
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label={value}
    >
      <Icon
        size={iconSize}
        strokeWidth={3}
        color="#ffffff"
        aria-hidden="true"
        absoluteStrokeWidth
      />
    </span>
  );
};
