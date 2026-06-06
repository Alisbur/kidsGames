import { AnswerInput } from "@shared/ui/answer-input/answer-input";
import { MenuButton } from "@shared/ui/menu-button/menu-button";
import { Typography } from "@shared/ui/typography/typography";
import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";

import { OPERATION_SIGNS } from "../../constants/operation-signs";
import { TExample } from "../../types/example.type";
import { TSolution } from "../../types/solution.type";
import styles from "./example.module.scss";

type TExampleProps = {
  // type: EXAMPLE_TYPES_ENUM;
  id: number;
  example: TExample;
  setSolved: ({ id, solution }: { id: number; solution: TSolution }) => void;
  canModify?: boolean;
};

export const Example: FC<TExampleProps> = ({ example, canModify = true, setSolved, id }) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(false);

  useEffect(() => {
    if (answer !== null) {
      if (answer === example.result) {
        setSolved({ id, solution: "correct" });
      } else {
        setSolved({ id, solution: "incorrect" });
      }
    }
  }, [answer, example.result, setSolved, id]);

  const handleAnswer = (value: string) => {
    const val = parseInt(value);
    if (!isNaN(val)) {
      setAnswer(val);
    }
  };

  return (
    <div
      onClick={() => {
        if (!example.solved || (example.solved === "incorrect" && canModify)) {
          inputRef.current?.focus();
        }
      }}
      className={classNames(
        styles.wrapper,
        { [styles.wrapper_incorrect]: answer !== null && example.solved === "incorrect" },
        { [styles.wrapper_correct]: example.solved && example.solved === "correct" },
      )}
      style={{
        cursor:
          example.solved === "correct" || (example.solved === "incorrect" && !canModify)
            ? "auto"
            : "pointer",
      }}
    >
      <div className={styles.example}>
        <span className={styles.part}>{example.firstItem}</span>
        <span className={styles.part}>{OPERATION_SIGNS[example.type]}</span>
        <span className={styles.part}>{example.secondItem}</span>
        <span className={styles.part}>=</span>

        <AnswerInput
          ref={inputRef}
          maxLength={example.result.toString().length}
          value={value}
          setValue={setValue}
          disabled={(example.solved && !canModify) || example.solved === "correct"}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAnswer(value);
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
          }}
          isCorrect={(() => {
            if (example.solved === "correct") return true;
            if (example.solved === "incorrect") return false;
            return null;
          })()}
        />
      </div>

      {isConfirmButtonVisible && (
        <MenuButton
          text={"Ввод"}
          onClick={() => handleAnswer(value)}
          style={{ width: "fit-content", height: "40px" }}
        />
      )}
      {!isConfirmButtonVisible && answer !== null && (
        <Typography
          view={"p-20"}
          tag={"span"}
          weight={"semibold"}
          className={styles.hint}
          color={example.solved === "correct" ? "success" : "error"}
        >
          {example.solved === "incorrect" ? (canModify ? "Попробуй ещё" : "Неверно") : "Молодец!"}
        </Typography>
      )}
    </div>
  );
};
