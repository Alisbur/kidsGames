import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { TModalProps, TModalType } from "../types/modals.type";

type TModalsState = {
  type: TModalType | null;
  isOpen: boolean;
  onClose?: () => void;
} & TModalProps;

const initialState: TModalsState = {
  type: null,
  isOpen: false,
  title: null,
  content: null,
  actions: [],
  onClose: undefined,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: TModalType; payload?: TModalProps }>) => {
      state.type = action.payload.type;
      state.isOpen = true;
      state.title = action.payload.payload?.title ?? null;
      state.content = action.payload.payload?.content ?? null;
      state.actions = action.payload.payload?.actions?.length
        ? [...action.payload.payload.actions]
        : [];
      state.onClose = action.payload.payload?.onClose;
    },
    closeModal: () => ({ ...initialState }),
  },
});

export const { actions: modalsActions } = modalsSlice;
export const { reducer: modalsReducer } = modalsSlice;
