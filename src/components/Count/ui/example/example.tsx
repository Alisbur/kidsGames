import { FC, useEffect, useRef, useState } from "react";
import styles from "./example.module.scss";
import classNames from "classnames";
import { MenuButton } from "../../../../shared/ui/menu-button/menu-button";
import { AnswerInput } from "../../../../shared/ui/answer-input/answer-input";
import { CAN_MODIFY_ANSWER_OPTIONS_ENUM } from "../../enums/can-modify-answer.enum";
import { TExample } from "../../types/example.type";
import { OPERATION_SIGNS } from "../../constants/operation-signs";
import { Typography } from "../../../../shared/ui/typography/typography";

type TExampleProps = {
  // type: EXAMPLE_TYPES_ENUM;
  example: TExample;
  setSolved: () => void;
  canModify?: CAN_MODIFY_ANSWER_OPTIONS_ENUM;
};

export const Example: FC<TExampleProps> = ({
  example,
  canModify = CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES,
  setSolved,
}) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(false);

  useEffect(() => {
    if (answer !== null && answer === example.result && !example.solved) {
      setSolved();
    }
  }, [answer, example.result, example.solved, setSolved]);

  const handleAnswer = (value: string) => {
    const val = parseInt(value);
    if (!isNaN(val)) {
      setAnswer(val);
    }
  };

  return (
    <div
      onClick={() => {
        if (
          answer === null ||
          (answer !== null && canModify === CAN_MODIFY_ANSWER_OPTIONS_ENUM.YES)
        ) {
          inputRef.current?.focus();
        }
      }}
      className={classNames(
        styles.wrapper,
        { [styles.wrapper_incorrect]: answer !== null && !example.solved },
        { [styles.wrapper_correct]: example.solved }
      )}
      style={{ cursor: example.solved ? "auto" : "pointer" }}
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
            if (example.solved) return true;
            if (answer !== null && !example.solved) return false;
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
          color={example.solved ? "success" : "error"}
        >
          {answer !== null && !example.solved ? "Попробуй ещё" : "Молодец!"}
        </Typography>
      )}
    </div>
  );
};
