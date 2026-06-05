import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

import { Typography } from "../typography/typography";
import styles from "./menu-button.module.scss";

type MenuButtonProps = {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
  fullWidth?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export function MenuButton({
  onClick,
  text,
  disabled = false,
  className,
  textClassName,
  fullWidth = true,
  children,
  ...props
}: MenuButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.button, { [styles.button_fullWidth]: fullWidth }, className)}
      onClick={() => onClick()}
      disabled={disabled}
      {...props}
    >
      {text && (
        <Typography
          view={"button"}
          color={"secondary"}
          className={classNames(styles.buttonText, textClassName)}
        >
          {text}
        </Typography>
      )}
      {children}
    </button>
  );
}
