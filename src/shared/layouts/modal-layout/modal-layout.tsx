import classNames from "classnames";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./modal-layout.module.scss";

type TModalLayoutProps = {
  children?: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
};

export const ModalLayout = ({ isOpen, children, className, onClose }: TModalLayoutProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  return isOpen
    ? createPortal(
        <div
          className={classNames(styles.backdrop, { [styles.backdrop_open]: isOpen }, className)}
          onClick={handleClick}
        >
          <aside
            className={classNames(styles.modal, {
              [styles.modal_open]: isOpen,
            })}
          >
            {children}
            <button className={styles.close} onClick={handleClick}>
              <X />
            </button>
          </aside>
        </div>,
        document.getElementById("modal-root")!,
      )
    : null;
};
