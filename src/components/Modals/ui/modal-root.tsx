import { useEffect } from "react";

import { ModalLayout } from "@/shared/layouts/modal-layout/modal-layout";

import { useModal } from "../model/use-modal";
import { TModalProps, TModalType } from "../types/modals.type";
import { ConfirmModal } from "./confirm-modal/confirm-modal";
import styles from "./modal-root.module.scss";

export const ModalRoot = () => {
  const { isOpen, type, props, close } = useModal();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleModalClose = () => {
    props.onClose?.();
    close();
  };

  const renderContent = (modalType: TModalType, modalProps?: TModalProps) => {
    switch (modalType) {
      case "confirm_modal":
        return <ConfirmModal {...modalProps} />;
      default:
        return null;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={handleModalClose}>
      <aside className={styles.modal}>{type && renderContent(type, props)}</aside>
    </ModalLayout>
  );
};
