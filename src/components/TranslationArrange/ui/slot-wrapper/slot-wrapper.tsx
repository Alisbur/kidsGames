import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import { FC, ReactNode, useEffect, useRef } from "react";

import { TSlotValue } from "../../types/types";
import styles from "./slot-wrapper.module.scss";

type TSlotWrapperProps = {
  index: number;
  children?: ReactNode;
  className?: string;
  isOverClassName?: string;
  slot: TSlotValue;
};

export const SlotWrapper: FC<TSlotWrapperProps> = ({
  index,
  children,
  className,
  isOverClassName,
  slot,
}) => {
  const id = `slot-${index}`;
  const { setNodeRef, isOver } = useDroppable({ id });

  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!slot) return;

    const el = nodeRef.current;
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [slot]);

  const setRefs = (node: HTMLDivElement | null): void => {
    nodeRef.current = node;
    setNodeRef(node);
  };

  return (
    <div
      ref={setRefs}
      // data-slot-id={id}
      className={classNames(
        styles.slot,
        className,
        isOver && styles.over,
        isOver && isOverClassName,
      )}
    >
      {children}
    </div>
  );
};
