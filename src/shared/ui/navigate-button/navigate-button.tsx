import styles from './navigate-button.module.scss'

type NavigateButtonProps = {
  onClick: ()=>void;
  type: "forward" | "back";
  disabled?: boolean;
}

export function NavigateButton({onClick, type, disabled = false}: NavigateButtonProps) {
  return (
      <button type="button" className={styles.button} onClick={()=>onClick()} disabled={disabled}>
        <span className={styles.buttonText}>{type === "forward" ? ">>" : "<<"}</span>
      </button>
  )
}