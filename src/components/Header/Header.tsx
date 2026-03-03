import { useLocation, useNavigate } from "react-router-dom";

import { MENU_ITEMS } from "../../shared/constants/menu-items";
import { Divider } from "../../shared/ui/divider/divider";
import { NavigateButton } from "../../shared/ui/navigate-button/navigate-button";
import { useConfirm } from "../Modals/model/use-confirm";
import styles from "./Header.module.scss";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { confirm } = useConfirm();

  const handleRedirect = async () => {
    if (location && location.pathname !== "/") {
      const confirmResult = await confirm({
        title: "Подтвердите действие",
        content: "Текущий прогресс и настройки будут потеряны",
      });
      if (confirmResult) {
        navigate("/");
      }
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <NavigateButton type="back" onClick={async () => await handleRedirect()} />
        <h1 className={styles.title}>
          {MENU_ITEMS.find((item) => item.alias === location.pathname)?.name}
        </h1>
      </div>
      <Divider />
    </header>
  );
}
