import { Menu } from "../../components/Menu/Menu";
import { MENU_ITEMS } from "../../shared/constants/menu-items";
import { PageContentLayout } from "../../shared/layouts/page-content-layout/page-content-layout";

export function MenuPage() {
  return (
    <PageContentLayout
      headerContent={<h2>Меню</h2>}
      headerDivider={false}
      mainContent={<Menu menuItems={MENU_ITEMS} />}
    />
  );
}
