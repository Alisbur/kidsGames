import { RootState } from "@/redux/store";

export const selectModalIsOpen = (state: RootState) => state.modals.isOpen;
export const modalType = (state: RootState) => state.modals.type;
export const modalTitle = (state: RootState) => state.modals.title ?? null;
export const modalContent = (state: RootState) => state.modals.content ?? null;
export const modalActions = (state: RootState) => state.modals.actions;
export const modalOnClose = (state: RootState) => state.modals.onClose;
