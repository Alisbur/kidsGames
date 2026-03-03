import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { TModalProps, TModalType } from "../types/modals.type";
import { modalsActions } from "./modals.slice";
import * as selectors from "./selectors";

export const useModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectors.selectModalIsOpen);
  const type: TModalType | null = useAppSelector(selectors.modalType);
  const title = useAppSelector(selectors.modalTitle);
  const content = useAppSelector(selectors.modalContent);
  const actions = useAppSelector(selectors.modalActions);
  const onClose = useAppSelector(selectors.modalOnClose);

  const props: TModalProps = useMemo(
    () => ({ title, content, actions, onClose }),
    [title, content, actions, onClose],
  );

  const open = ({ type, payload }: { type: TModalType; payload?: TModalProps }) =>
    dispatch(modalsActions.openModal({ type, payload }));
  const close = () => dispatch(modalsActions.closeModal());

  return {
    isOpen,
    type,
    props,
    open,
    close,
  };
};
