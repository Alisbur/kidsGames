import styles from './menu-button.module.scss'

type MenuButtonProps = {
  onClick: ()=>void;
  text: string;
  disabled?: boolean;
}

export function MenuButton({onClick, text, disabled = false}: MenuButtonProps) {
  return (
      <button type="button" className={styles.button} onClick={()=>onClick()} disabled={disabled}>
        <span className={styles.buttonText}>{text}</span>
      </button>
  )
}