import { FC } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";

import { TModalProps } from "../../types/modals.type";
import styles from "./confirm-modal.module.scss";

export const ConfirmModal: FC<TModalProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h3>{props?.title || "Подтвердите действие"}</h3>
        {props?.content && <p>{props.content}</p>}
      </div>
      {
        <div className={styles.actions}>
          {props?.actions?.map((a) => (
            <MenuButton
              key={a.id}
              onClick={() => a.action?.()}
              textClassName={styles.actions__buttonLabel}
              text={a.name}
            />
          ))}
        </div>
      }
    </div>
  );
};
