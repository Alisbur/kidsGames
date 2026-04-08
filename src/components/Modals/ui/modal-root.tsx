import { useEffect } from "react";

import { ModalLayout } from "@/shared/layouts/modal-layout/modal-layout";

import { useModals } from "../model/use-modals";
import { TModalProps, TModalType } from "../types/modals.type";
import { ConfirmModal } from "./confirm-modal/confirm-modal";
import styles from "./modal-root.module.scss";

export const ModalRoot = () => {
  const { isOpen, modalType: type, modalProps: props, closeModal: close } = useModals();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleModalClose = () => {
    props?.onClose?.();
    close();
  };

  const renderContent = (modalType: TModalType, modalProps: TModalProps | null) => {
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
