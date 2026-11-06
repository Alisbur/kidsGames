import classNames from "classnames";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

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
  color?: "normal" | "accent" | "error" | "muted";
  textNoWrap?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      onClick,
      text,
      disabled = false,
      className,
      textClassName,
      fullWidth = true,
      color = "normal",
      children,
      textNoWrap = true,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        className={classNames(
          styles.button,
          styles[`button_${color}`],
          { [styles.button_fullWidth]: fullWidth },
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {text && (
          <Typography
            view={"button"}
            color={color === "muted" ? "muted" : "secondary"}
            className={classNames(styles.text, { [styles.text_nowrap]: textNoWrap }, textClassName)}
          >
            {text}
          </Typography>
        )}
        {children}
      </button>
    );
  },
);
