import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";

import { AnswerInput } from "../../../../shared/ui/answer-input/answer-input";
import { MenuButton } from "../../../../shared/ui/menu-button/menu-button";
import { Typography } from "../../../../shared/ui/typography/typography";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../../enums/can-modify-answer.enum";
import { TExtendedTask } from "../../types/task.type";
import styles from "./task.module.scss";

type TTaskProps = {
  task: TExtendedTask;
  setSolved: () => void;
  canModify?: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
};

export const Task: FC<TTaskProps> = ({
  task,
  canModify = CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
  setSolved,
}) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // useEffect(() => {
  //   if (answer !== null && task.answer === answer && !task.solved) {
  //     setSolved();
  //   }
  // }, [answer, task.solved, setSolved]);

  useEffect(() => {
    if (!inputRef.current) return;

    if (
      isFocused &&
      !task.solved &&
      (answer === null || (answer !== null && canModify === CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES))
    ) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  const handleAnswer = (value: string) => {
    const val = parseInt(value);
    if (!isNaN(val)) {
      setAnswer(val);
      if (val === task.answer) setSolved();
    }
  };

  return (
    <div
      onClick={() => {
        setIsFocused(true);
      }}
      className={classNames(
        styles.wrapper,
        { [styles.wrapper_incorrect]: answer !== null && !task.solved },
        { [styles.wrapper_correct]: task.solved },
      )}
      style={{
        cursor:
          task.solved || (answer !== null && canModify === CAN_MODIFY_ANSWER_OPTIONS_ENUM.NO)
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
            disabled={
              task.solved || (answer !== null && canModify === CAN_MODIFY_ANSWER_OPTIONS_ENUM.NO)
            }
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
              if (value) handleAnswer(value);
              else setValue(answer?.toString() ?? "");
              setIsConfirmButtonVisible(false);
              setIsFocused(false);
            }}
            isCorrect={(() => {
              if (task.solved) return true;
              if (answer !== null && !task.solved) return false;
              return null;
            })()}
          />

          {isConfirmButtonVisible && (
            <MenuButton
              text={"Ответить"}
              onClick={() => handleAnswer(value)}
              style={{ width: "fit-content", height: "40px", paddingInline: "16px" }}
            />
          )}
          {!isConfirmButtonVisible && answer !== null && (
            <Typography
              view={"p-20"}
              tag={"span"}
              weight={"semibold"}
              className={styles.hint}
              color={task.solved ? "success" : "error"}
            >
              {answer !== null && !task.solved ? "Попробуй ещё" : "Молодец!"}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
