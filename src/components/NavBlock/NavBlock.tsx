import styles from './NavBlock.module.scss'
import { NavigateButton } from '../../shared/ui/navigate-button/navigate-button'

type NavBlockProps = {
  onNext: ()=>void;
  onPrev: ()=>void;
}

export function NavBlock({onNext, onPrev}: NavBlockProps) {
  return (
    <div className={styles.container}>
      <NavigateButton type="back" onClick={onPrev} />
      <NavigateButton type="forward" onClick={onNext} />
    </div>
  )
}