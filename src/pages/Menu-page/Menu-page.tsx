import styles from "./Menu-page.module.scss";
import { Menu } from "../../components/Menu/Menu";
import { MENU_ITEMS } from "../../shared/constants/menu-items";

export function MenuPage() {
  return (
    <div className={styles.container}>
      <Menu menuItems={MENU_ITEMS} />
    </div>
  );
}
