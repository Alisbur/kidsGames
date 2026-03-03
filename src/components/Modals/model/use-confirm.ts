import { ReactNode } from "react";

import { useModal } from "./use-modal";

export const useConfirm = () => {
  const { open, close } = useModal();

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
        type: "confirm_modal",
        payload: {
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
