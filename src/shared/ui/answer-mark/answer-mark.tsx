import classNames from "classnames";
import { Check, X } from "lucide-react";
import type { FC } from "react";

import styles from "./answer-mark.module.scss";

type TAnswerMarkProps = {
  value: boolean;
  size?: number;
  className?: string;
};

export const AnswerMark: FC<TAnswerMarkProps> = ({ value, size = 16, className }) => {
  const Icon = value ? Check : X;

  const iconSize = Math.round(size * 0.65);

  return (
    <span
      className={classNames(styles.mark, value ? styles.yes : styles.no, className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={value ? "Yes" : "No"}
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
