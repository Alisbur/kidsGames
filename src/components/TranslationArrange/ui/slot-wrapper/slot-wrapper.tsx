import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import styles from "./slot-wrapper.module.scss";

type TSlotWrapperProps = {
  index: number;
  children?: ReactNode;
  className?: string;
  isOverClassName?: string;
};

export const SlotWrapper: FC<TSlotWrapperProps> = ({
  index,
  children,
  className,
  isOverClassName,
}) => {
  const id = `slot-${index}`;
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        styles.slot,
        className,
        isOver ? `${styles.over} ${isOverClassName}` : "",
      )}
    >
      {children}
    </div>
  );
};
