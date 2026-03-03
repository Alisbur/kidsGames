import { ReactNode } from "react";

export type TModalType = "confirm_modal" | "info";

export type TModalProps = {
  title?: ReactNode | string | null;
  content?: ReactNode | null;
  actions?: TModalAction[];
  onClose?: () => void;
};

export type TModalAction = {
  id: string;
  name: string;
  action: (params?: unknown) => void;
};
