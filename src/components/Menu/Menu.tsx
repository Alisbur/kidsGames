import styles from './Menu.module.scss'
import { MenuButton } from '../../shared/ui/menu-button/menu-button';
import { useNavigate } from 'react-router-dom'
import { TMenuItem } from '../../shared/types/types';

type MenuProps = {
  menuItems: TMenuItem[];
}

export function Menu({menuItems}:MenuProps) {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {menuItems.map((item, idx) => 
        !!idx && <MenuButton key={item.id} text={item.name} onClick={()=>navigate(item.alias)}/>
      )}
    </div>
  )
}