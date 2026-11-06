import { useNavigate } from "react-router-dom";

import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";

import { TMenuItem } from "../../shared/types/types";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";

type MenuProps = {
  menuItems: TMenuItem[];
};

export function Menu({ menuItems }: MenuProps) {
  const navigate = useNavigate();

  return (
    <MenuItemListLayout>
      {menuItems.map(
        (item, idx) =>
          !!idx && (
            <MenuButton key={item.id} text={item.name} onClick={() => navigate(item.alias)} />
          ),
      )}
    </MenuItemListLayout>
  );
}
