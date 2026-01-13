"use client";

import classNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./drawer.module.scss";

type TDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  closeBreakpoint?: number;
  children?: ReactNode;
};

export const Drawer: FC<TDrawerProps> = ({
  isOpen,
  onClose,
  closeBreakpoint,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const onResize = () => {
      if (
        typeof closeBreakpoint === "number" &&
        window.innerWidth >= closeBreakpoint &&
        isOpen
      ) {
        onClose();
      }
    };
    if (closeBreakpoint) {
      window.addEventListener("resize", onResize);
    }

    return () => {
      if (closeBreakpoint) {
        window.removeEventListener("resize", onResize);
      }
    };
  }, [isOpen, onClose, mounted]);

  if (!mounted) return null;

  const portal = document.getElementById("portal");

  if (!portal) return null;

  return createPortal(
    <>
      <div
        className={classNames(styles.backdrop, {
          [styles.backdrop_open]: isOpen,
        })}
        onClick={close}
      />

      <aside
        className={classNames(styles.drawer, {
          [styles.drawer_open]: isOpen,
        })}
      >
        {children}
      </aside>
    </>,
    document.body
  );
};
