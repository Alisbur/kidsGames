import { FC } from "react";

import { MenuButton } from "../ui/menu-button/menu-button";
import { Typography } from "../ui/typography/typography";

export const DefaultFallback: FC<{ error: Error; reset: () => void }> = ({ error, reset }) => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <Typography tag="h2">Что‑то пошло не так</Typography>
    <details style={{ whiteSpace: "pre-wrap", margin: "1rem 0" }}>
      <summary>
        <Typography tag="p">Технические детали</Typography>
      </summary>
      {error.message}
    </details>
    <MenuButton onClick={reset} text="Попробовать снова" />
  </div>
);
