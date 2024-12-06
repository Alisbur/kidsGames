import styles from './Header.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { NavigateButton } from '../../shared/ui/navigate-button/navigate-button';
import { MENU_ITEMS } from '../../shared/constants/menu-items';

export function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className={styles.container}>
      <NavigateButton type="back" onClick={()=>{navigate("/")}} />
      <h1 className={styles.title}>{MENU_ITEMS.find((item) => item.alias === location.pathname)?.name}</h1>
    </div>
  )
}