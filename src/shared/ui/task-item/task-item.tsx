import { AnswerInput } from "@shared/ui/answer-input/answer-input";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import classNames from "classnames";
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { TASK_ITEM_SOLUTION_ENUM } from "@/shared/enums/task-item-solution.enum";
import { TTaskSolution } from "@/shared/types/types";

import styles from "./task-item.module.scss";

type TTaskItemProps = {
  id: number;
  correctAnswer: string | number;
  solved: TTaskSolution;
  setSolved: ({ id, solution }: { id: number; solution: TASK_ITEM_SOLUTION_ENUM }) => void;
  canModify?: boolean;
  multiline?: boolean;
  children?: ReactNode;
};

export const TaskItem: FC<TTaskItemProps> = ({
  id,
  canModify = true,
  correctAnswer,
  solved = null,
  setSolved,
  multiline = false,
  children,
}: TTaskItemProps) => {
  const [answer, setAnswer] = useState<number | string | null>(null);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;
    if (isFocused && (!solved || (solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT && canModify))) {
      inputRef.current?.focus();
    }
    if (!isFocused) {
      setValue(answer?.toString() ?? "");
    }
  }, [isFocused]);

  const handleAnswer = useCallback(() => {
    let val;
    if (typeof correctAnswer === "number") {
      val = parseInt(value);
      if (isNaN(val)) return;
    } else {
      val = value;
    }
    setAnswer(val);
    if (val === correctAnswer) setSolved({ id, solution: TASK_ITEM_SOLUTION_ENUM.CORRECT });
    else setSolved({ id, solution: TASK_ITEM_SOLUTION_ENUM.INCORRECT });
    setIsFocused(false);
    inputRef?.current?.blur();
  }, [correctAnswer, id, setSolved, value]);

  const handleSetFocus = useCallback(() => {
    if (!solved || (solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT && canModify)) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [canModify, solved]);

  const handleWrapperClick = useCallback(
    (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;

      if (!wrapper.contains(e.target as Node)) {
        setIsFocused(false);
        return;
      }

      if (buttonRef.current?.contains(e.target as Node)) {
        handleAnswer();
        return;
      }

      if (isFocused) {
        setIsFocused(false);
        return;
      }

      handleSetFocus();
    },
    [handleAnswer, handleSetFocus, isFocused],
  );

  useEffect(() => {
    document.addEventListener("click", handleWrapperClick);

    return () => document.removeEventListener("click", handleWrapperClick);
  }, [handleWrapperClick]);

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        styles.wrapper,
        {
          [styles.wrapper_incorrect]:
            answer !== null && solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT,
        },
        {
          [styles.wrapper_correct]: solved && solved === TASK_ITEM_SOLUTION_ENUM.CORRECT,
        },
      )}
      style={{
        cursor:
          solved === TASK_ITEM_SOLUTION_ENUM.CORRECT ||
          (solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT && !canModify)
            ? "auto"
            : "pointer",
      }}
    >
      <div className={classNames(styles.task, { [styles.task_vertical]: multiline })}>
        <div
          className={classNames(
            multiline ? styles.task__content_task : styles.task__content_example,
          )}
        >
          {children}
        </div>
        <div
          className={styles.answerBlock}
          style={{
            display: `${isFocused || answer !== null || solved ? "flex" : "none"}`,
          }}
        >
          <AnswerInput
            ref={inputRef}
            maxLength={correctAnswer.toString().length + 2}
            value={value}
            setValue={setValue}
            disabled={(solved && !canModify) || solved === TASK_ITEM_SOLUTION_ENUM.CORRECT}
            inputMode={typeof correctAnswer === "number" ? "numeric" : "text"}
            onKeyUp={(e) => {
              if (e.key === "Enter" && value) {
                handleAnswer();
              }
            }}
            onFocus={() => {
              setValue("");
            }}
            isCorrect={(() => {
              if (solved === TASK_ITEM_SOLUTION_ENUM.CORRECT) return true;
              if (solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT) return false;
              return null;
            })()}
          />

          {isFocused && (
            <MenuButton
              text={"Ответ"}
              ref={buttonRef}
              onClick={handleAnswer}
              style={{
                width: "fit-content",
                height: "40px",
                paddingInline: "16px",
              }}
              disabled={!value}
            />
          )}
          {!isFocused && answer !== null && (
            <Typography
              view={"p-20"}
              tag={"span"}
              weight={"semibold"}
              className={styles.hint}
              color={solved === TASK_ITEM_SOLUTION_ENUM.CORRECT ? "success" : "error"}
            >
              {solved === TASK_ITEM_SOLUTION_ENUM.INCORRECT
                ? canModify
                  ? "Попробуй ещё"
                  : "Неверно"
                : "Молодец!"}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
