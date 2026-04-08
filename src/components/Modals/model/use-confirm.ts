import { ReactNode } from "react";

import { useModals } from "./use-modals";

export const useConfirm = () => {
  const { openModal: open, closeModal: close } = useModals();

  const openConfirmModal = async ({
    title,
    content,
  }: {
    title?: string;
    content?: string | ReactNode;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const closeAndConfirm = () => {
        resolve(true);
        close();
      };

      const closeAndNotConfirm = () => {
        resolve(false);
        close();
      };

      open({
        modalType: "confirm_modal",
        modalProps: {
          title,
          content,
          actions: [
            {
              id: "1",
              name: "Да",
              action: closeAndConfirm,
            },
            {
              id: "2",
              name: "Нет",
              action: closeAndNotConfirm,
            },
          ],
          onClose: closeAndNotConfirm,
        },
      });
    });
  };
  return { confirm: openConfirmModal };
};
