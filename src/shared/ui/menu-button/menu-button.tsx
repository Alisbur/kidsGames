import { HTMLAttributes } from 'react';
import styles from './menu-button.module.scss'

type MenuButtonProps = {
  onClick: ()=>void;
  text: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLButtonElement>

export function MenuButton({onClick, text, disabled = false, ...props}: MenuButtonProps) {
  return (
      <button type="button" className={styles.button} onClick={()=>onClick()} disabled={disabled} {...props}>
        <span className={styles.buttonText}>{text}</span>
      </button>
  )
}