import { AnswerInput } from "@shared/ui/answer-input/answer-input";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";

import { TSolution } from "../../types/solution.type";
import { TExtendedTask } from "../../types/task.type";
import styles from "./task.module.scss";

type TTaskProps = {
  id: number;
  task: TExtendedTask;
  setSolved: ({ id, solution }: { id: number; solution: TSolution }) => void;
  canModify?: boolean;
};

export const Task: FC<TTaskProps> = ({ id, task, canModify = true, setSolved }) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

    if (isFocused && !task.solved && (answer === null || (answer !== null && canModify))) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  const handleAnswer = () => {
    const val = parseInt(value);
    if (isNaN(val)) return;
    setAnswer(val);
    if (val === task.answer) setSolved({ id, solution: "correct" });
    else setSolved({ id, solution: "incorrect" });
  };

  return (
    <div
      onClick={() => {
        setIsFocused(true);
      }}
      className={classNames(
        styles.wrapper,
        { [styles.wrapper_incorrect]: answer !== null && task.solved === "incorrect" },
        { [styles.wrapper_correct]: task.solved && task.solved === "correct" },
      )}
      style={{
        cursor:
          task.solved === "correct" || (task.solved === "incorrect" && !canModify)
            ? "auto"
            : "pointer",
      }}
    >
      <div className={styles.task}>
        <p className={styles.description}>{task.description}</p>
        <div
          className={styles.answerBlock}
          style={{ display: `${isFocused || answer || task.solved ? "flex" : "none"}` }}
        >
          <AnswerInput
            ref={inputRef}
            maxLength={task.answer.toString().length}
            value={value}
            setValue={setValue}
            disabled={(task.solved && !canModify) || task.solved === "correct"}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                inputRef.current?.blur();
              }
            }}
            onFocus={() => {
              setValue("");
              setIsConfirmButtonVisible(true);
            }}
            onBlur={() => {
              if (value) handleAnswer();
              else setValue(answer?.toString() ?? "");
              setIsConfirmButtonVisible(false);
              setIsFocused(false);
            }}
            isCorrect={(() => {
              if (task.solved === "correct") return true;
              if (task.solved === "incorrect") return false;
              return null;
            })()}
          />

          {isConfirmButtonVisible && (
            <MenuButton
              text={"Ответить"}
              onClick={handleAnswer}
              style={{ width: "fit-content", height: "40px", paddingInline: "16px" }}
            />
          )}
          {!isConfirmButtonVisible && answer !== null && (
            <Typography
              view={"p-20"}
              tag={"span"}
              weight={"semibold"}
              className={styles.hint}
              color={task.solved === "correct" ? "success" : "error"}
            >
              {task.solved === "incorrect" ? (canModify ? "Попробуй ещё" : "Неверно") : "Молодец!"}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
