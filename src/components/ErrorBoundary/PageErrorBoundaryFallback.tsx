import { FC, ReactNode } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import styles from "./ErrorBoundary.module.scss";

export const PageErrorBoundaryFallback: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}): ReactNode => {
  const handleBack = () => {
    window.history.back();
  };

  if (!error) return null;

  return (
    <div className={styles.fallbackWrapper_page}>
      <Typography tag="h3">⚠️ Ой, что-то сломалось</Typography>
      <details>
        <summary>
          <Typography tag="span">Подробности</Typography>
        </summary>
        <pre style={{ marginTop: "8px" }}>
          <Typography tag="p" color="error" className={styles.errorMessage}>
            {error.message}
          </Typography>
        </pre>
      </details>
      <MenuButton onClick={reset} text="Повторить действие" />
      <MenuButton onClick={handleBack} text="Назад" />
    </div>
  );
};
