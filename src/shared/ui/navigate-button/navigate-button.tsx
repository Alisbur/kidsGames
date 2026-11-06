import { ChevronLeft, ChevronRight } from "lucide-react";

import { MenuButton } from "../menu-button/menu-button";

type NavigateButtonProps = {
  onClick: () => void;
  type: "forward" | "back";
  disabled?: boolean;
  fullWidth?: boolean;
};

export function NavigateButton({
  onClick,
  type,
  disabled = false,
  fullWidth = false,
}: NavigateButtonProps) {
  return (
    <MenuButton
      onClick={onClick}
      disabled={disabled}
      aria-label={type === "forward" ? "Вперёд" : "Назад"}
      fullWidth={fullWidth}
    >
      {type === "forward" ? (
        <ChevronRight size={20} color={"white"} />
      ) : (
        <ChevronLeft size={20} color={"white"} />
      )}
    </MenuButton>
  );
}
