import { create } from "zustand";

import { TModalProps, TModalType } from "../types/modals.type";

type TModalsStoreType = {
  modalType: TModalType | null;
  modalProps: TModalProps | null;
  isOpen: boolean;
  openModal: ({
    modalType,
    modalProps,
  }: {
    modalType: TModalType;
    modalProps?: TModalProps;
  }) => void;
  closeModal: () => void;
};

export const useModals = create<TModalsStoreType>((set) => ({
  modalType: null,
  modalProps: null,
  isOpen: false,
  openModal: ({ modalType, modalProps }) =>
    set({ modalType, isOpen: true, modalProps: modalProps ? modalProps : null }),
  closeModal: () => set({ modalType: null, modalProps: null, isOpen: false }),
}));
