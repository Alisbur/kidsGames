import { FC, ReactNode } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import styles from "./ErrorBoundary.module.scss";

export const PageErrorBoundaryFallback: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}): ReactNode => {
  return (
    <div className={styles.fallbackWrapper_page}>
      <Typography tag="h3">⚠️ Ой, что-то сломалось</Typography>
      <details style={{ maxWidth: "80%" }}>
        <summary>
          <Typography tag="span">Подробности</Typography>
        </summary>
        <pre style={{ marginTop: "8px" }}>
          <Typography tag="p" color="error">
            {error.message}
          </Typography>
        </pre>
      </details>
      <MenuButton onClick={reset} style={{ color: "white" }} text="Повторить действие" />
    </div>
  );
};
