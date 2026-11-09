import { Dispatch, FC, SetStateAction } from "react";

import { PJATNASHKA_MENU_ITEMS } from "@/components/PjatnashkaPic/constants/menu-items";
import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import { TSettings } from "../../../types/settings.type";

type TMenuStepProps = {
  initNewGame: (settings: TSettings) => void;
  setStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
};

export const MenuStep: FC<TMenuStepProps> = ({ initNewGame, setStep }) => {
  return (
    <PageContentLayout
      headerContent={
        <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
          Меню игры
        </Typography>
      }
      mainContentScroll={false}
      mainContent={
        <MenuItemListLayout>
          {PJATNASHKA_MENU_ITEMS.map((item) => (
            <MenuButton
              key={item.id}
              text={item.title}
              onClick={() => initNewGame(item.settings)}
            />
          ))}
          <MenuButton
            key={"custom"}
            text={"Настраиваемый режим"}
            onClick={() => setStep(GAME_STEPS_ENUM.SETTINGS)}
          />
        </MenuItemListLayout>
      }
    />
  );
};
