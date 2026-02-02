import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./answer-input.module.scss";
import classNames from "classnames";

type TAnswerInputProps = {
  initValue?: string;
  maxLength?: number;
  value: string;
  setValue: (val: string) => void;
  isCorrect: boolean | null;
  className?: string;
  borderColor?: string;
  disabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const AnswerInput = forwardRef<HTMLInputElement, TAnswerInputProps>(
  (
    {
      value = "",
      setValue,
      maxLength,
      isCorrect = null,
      className,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
        setValue(e.target.value);
      }
    };

    return (
      <input
        inputMode="numeric"
        maxLength={Math.max(maxLength || 0, 2) || undefined}
        type="text"
        value={value}
        ref={ref}
        onChange={handleChange}
        style={{ width: `${value.length * 20 + 10}px` }}
        disabled={disabled}
        className={classNames(
          styles.input,
          {
            [styles.input_correct]: isCorrect,
            [styles.input_incorrect]: isCorrect !== null && !isCorrect,
          },
          className
        )}
        {...rest}
      />
    );
  }
);
