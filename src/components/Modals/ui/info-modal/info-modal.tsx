import { FC } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";

import { TModalProps } from "../../types/modals.type";
import styles from "./info-modal.module.scss";

export const InfoModal: FC<TModalProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h3>{props?.title || "Сообщение"}</h3>
        {props?.content && <p>{props.content}</p>}
      </div>
      {
        <div className={styles.actions}>
          {props?.actions?.length ? (
            props?.actions?.map((a) => (
              <MenuButton
                key={a.id}
                onClick={() => a.action?.()}
                textClassName={styles.actions__buttonLabel}
                text={a.name}
              />
            ))
          ) : (
            <MenuButton
              key={"close"}
              onClick={() => props.onClose?.()}
              textClassName={styles.actions__buttonLabel}
              text="Понятно"
            />
          )}
        </div>
      }
    </div>
  );
};
