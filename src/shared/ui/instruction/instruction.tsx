import classNames from "classnames";
import { FC } from "react";

import { Typography } from "../typography/typography";
import styles from "./instruction.module.scss";

type TInstructionProps = {
  hint: string;
  centered?: boolean;
  className?: string;
};

export const Instruction: FC<TInstructionProps> = ({ hint, centered = false, className }) => {
  return (
    <Typography
      tag={"div"}
      size={13}
      className={classNames(
        styles.instruction,
        { [styles.instruction_centered]: centered },
        className ? className : "",
      )}
    >
      {`💡  ${hint}`}
    </Typography>
  );
};
