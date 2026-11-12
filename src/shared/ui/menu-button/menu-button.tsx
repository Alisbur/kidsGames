import classNames from "classnames";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

import { Typography } from "../typography/typography";
import styles from "./menu-button.module.scss";

export type TMenuButtonTrigger = "shaking" | "glowing" | "blinking";
export type TMenuButtonColor = "normal" | "accent" | "error" | "muted";

type MenuButtonProps = {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
  fullWidth?: boolean;
  color?: TMenuButtonColor;
  textNoWrap?: boolean;
  trigger?: TMenuButtonTrigger;
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
      trigger,
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
          {
            [styles.button_fullWidth]: fullWidth,
            [styles[`button_${trigger}`]]: trigger || !disabled,
          },
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {trigger === "glowing" && !disabled && (
          <span className={styles.shineContainer} aria-hidden="true" />
        )}

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

MenuButton.displayName = "MenuButton";
