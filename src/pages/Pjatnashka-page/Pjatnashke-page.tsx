import styles from "./Pjatnashka-page.module.scss";
import { Pjatnashka } from "../../components/Pjatnashka/Pjatnashka";

export function PjatnashkaPage () {
  return (

    <div className={styles.container}>
      <Pjatnashka />
    </div>
  )
}