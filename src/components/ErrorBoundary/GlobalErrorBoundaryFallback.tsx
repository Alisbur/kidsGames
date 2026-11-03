import { FC } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import styles from "./ErrorBoundary.module.scss";

export const GlobalErrorBoundaryFallback: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => {
  const handleHardReset = () => {
    window.location.reload();
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!error) return null;

  return (
    <div className={styles.fallbackWrapper_global}>
      <Typography tag="h1">⚠️ Критическая ошибка</Typography>
      <Typography tag="p">Приложение не может продолжить работу.</Typography>
      <details style={{ margin: "1rem 0" }}>
        <summary>
          <Typography tag="span">Подробности</Typography>
        </summary>
        <pre style={{ marginTop: "8px" }}>
          <Typography tag="p" color="error" className={styles.errorMessage}>
            {error.message}
          </Typography>
        </pre>
      </details>
      <div style={{ display: "flex", gap: "16px" }}>
        <MenuButton onClick={reset} text="Повторить действие" />
        <MenuButton onClick={handleHardReset} text="Перезагрузить страницу" />
        <MenuButton onClick={handleBack} text="Назад" />
      </div>
    </div>
  );
};
