import type { TControlsProps } from "../../types/types";
import styles from "./controls.module.scss";

export function Controls({ onCheck, onClear, onShuffle }: TControlsProps) {
  const btn = `${styles.button} ${styles.primary}`;
  const ghost = `${styles.button} ${styles.ghost}`;

  return (
    <div className={styles.controls}>
      <button className={btn} onClick={onCheck}>
        Проверить
      </button>
      <button className={ghost} onClick={onClear}>
        Очистить
      </button>
      <button className={ghost} onClick={onShuffle}>
        Перемешать
      </button>
    </div>
  );
}
