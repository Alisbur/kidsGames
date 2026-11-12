import classNames from "classnames";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

import { MenuButton, TMenuButtonColor, TMenuButtonTrigger } from "../menu-button/menu-button";
import styles from "./checkbox-button.module.scss";

type TCheckBoxButtonProps = {
  fullWidth?: boolean;
  children?: ReactNode;
  checked?: boolean;
  onClick: () => void;
  checkedStyle?: string;
  unCheckedStyle?: string;
  checkedColor?: TMenuButtonColor;
  unCheckedColor?: TMenuButtonColor;
  className?: string;
  disabled?: boolean;
  trigger?: TMenuButtonTrigger;
  color?: TMenuButtonColor;
} & HTMLAttributes<HTMLButtonElement>;

export const CheckBoxButton = forwardRef<HTMLButtonElement, TCheckBoxButtonProps>(
  (
    {
      fullWidth = false,
      children,
      checked,
      onClick,
      checkedStyle = "",
      unCheckedStyle = "",
      className = "",
      disabled = false,
      checkedColor = "accent",
      unCheckedColor = "normal",
      trigger,
      color,
      ...rest
    },
    ref,
  ) => {
    return (
      <MenuButton
        ref={ref}
        onClick={onClick}
        color={checked ? checkedColor : unCheckedColor}
        role="checkbox"
        aria-checked={checked}
        className={classNames(
          styles.button,
          checked ? checkedStyle : unCheckedStyle,
          { [styles.button_darkText]: color === "muted" },
          className,
        )}
        disabled={disabled}
        fullWidth={fullWidth}
        trigger={trigger}
        {...rest}
      >
        {children}
      </MenuButton>
    );
  },
);
