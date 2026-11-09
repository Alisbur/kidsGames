import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";

import styles from "./app-loader.module.scss";

type AppLoaderProps = {
  subtitle?: string;
  title?: string;
  fullscreen?: boolean;
  className?: string;
};

export const AppLoader: React.FC<AppLoaderProps> = ({
  title = "Загружаем игру…",
  subtitle,
  fullscreen = true,
  className,
}) => {
  return createPortal(
    <div
      className={classNames(styles.overlay, { [styles.overlay_inline]: !fullscreen }, className)}
      role="status"
      aria-live="polite"
      aria-label={title}
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg
            viewBox="0 0 24 24"
            width="80"
            height="80"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
          </svg>
        </div>

        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>,
    document.body,
  );
};
