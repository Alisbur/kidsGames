import { HTMLAttributes, ReactNode } from "react";
import styles from "./menu-button.module.scss";
import classNames from "classnames";
import { Typography } from "../typography/typography";

type MenuButtonProps = {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export function MenuButton({
  onClick,
  text,
  disabled = false,
  className,
  textClassName,
  children,
  ...props
}: MenuButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.button, className)}
      onClick={() => onClick()}
      disabled={disabled}
      {...props}
    >
      {text && (
        <Typography
          view={"button"}
          color={"secondary"}
          className={textClassName}
        >
          {text}
        </Typography>
      )}
      {children}
    </button>
  );
}
