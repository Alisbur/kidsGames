"use client";

import classNames from "classnames";
import { FC } from "react";

import { TBallsRotateDirection } from "../../types/ball.type";
import styles from "./arrow-button.module.scss";

type TArrowButtonProps = {
  side: TBallsRotateDirection;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const ArrowButton: FC<TArrowButtonProps> = ({
  side = "Left",
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={classNames(
        styles.arrowButton,
        side === "Left" ? styles.arrowButton_left : styles.arrowButton_right,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
