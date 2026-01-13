import classNames from "classnames";
import { forwardRef, HTMLAttributes } from "react";
import styles from "./checkbox-button.module.scss";

type TCheckBoxButtonProps = {
  fullWidth?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  onClick: (e: React.MouseEvent) => void;
  checkedStyle?: string;
  unCheckedStyle?: string;
  className?: string;
  disabled?: boolean;
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
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(
          styles.button,
          {
            [styles.button_fullWidth]: fullWidth,
            [styles.button_checked]: checked,
          },
          unCheckedStyle ? unCheckedStyle : null,
          checkedStyle ? checkedStyle : null,
          className
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
