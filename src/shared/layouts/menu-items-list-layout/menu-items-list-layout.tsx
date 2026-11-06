import { FC, ReactNode } from "react";

import styles from "./menu-items-list-layout.module.scss";

type TMenuItemListLayoutProps = {
  children: ReactNode;
};

export const MenuItemListLayout: FC<TMenuItemListLayoutProps> = ({ children }) => {
  return <nav className={styles.wrapper}>{children}</nav>;
};
