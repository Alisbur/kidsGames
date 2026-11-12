import classNames from "classnames";
import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "react";

import styles from "./answer-input.module.scss";

const MIN_INPUT_WIDTH = 60;

type TAnswerInputProps = {
  initValue?: string;
  maxLength?: number;
  value: string;
  setValue: (val: string) => void;
  isCorrect?: boolean | null;
  className?: string;
  borderColor?: string;
  disabled?: boolean;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
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
      inputMode = "numeric",
      ...rest
    },
    ref,
  ) => {
    const [sizerSize, setSizerSize] = useState(0);

    const sizerRef = useRef<HTMLSpanElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (inputMode === "numeric") {
        if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
          setValue(e.target.value);
        }
      }
      if (inputMode === "text") {
        setValue(e.target.value);
      }
    };

    useEffect(() => {
      const el = sizerRef.current;

      if (!el) return;
      setSizerSize(el.clientWidth);
    }, [value]);

    return (
      <>
        <span aria-hidden={true} className={styles.sizer} ref={sizerRef}>
          {value}
        </span>
        <input
          inputMode={inputMode}
          maxLength={Math.max(maxLength || 0, 2) || undefined}
          type="text"
          value={value}
          ref={ref}
          onChange={handleChange}
          style={{ width: `${Math.max(MIN_INPUT_WIDTH, sizerSize)}px` }}
          disabled={disabled}
          className={classNames(
            styles.input,
            {
              [styles.input_correct]: isCorrect,
              [styles.input_incorrect]: isCorrect !== null && !isCorrect,
            },
            className,
          )}
          {...rest}
        />
      </>
    );
  },
);
