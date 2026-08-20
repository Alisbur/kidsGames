// components/OrientationBlocker/OrientationBlocker.tsx
import React from "react";

import styles from "./orientation-blocker.module.scss";

interface OrientationBlockerProps {
  orientation: "portrait" | "landscape" | "unknown";
}

export const OrientationBlocker: React.FC<OrientationBlockerProps> = ({ orientation }) => {
  if (orientation === "portrait") return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.phoneIcon}>
          <svg
            viewBox="0 0 24 24"
            width="80"
            height="80"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" />
          </svg>
        </div>
        <p>Пожалуйста, поверните устройство</p>
        <p className={styles.small}>Для лучшего опыта используйте книжную ориентацию</p>
      </div>
    </div>
  );
};
