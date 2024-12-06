import styles from './NavBlock.module.scss'
import { NavigateButton } from '../../shared/ui/navigate-button/navigate-button'

type NavBlockProps = {
  onNext: ()=>void;
  onPrev: ()=>void;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
  children?: JSX.Element;
}

export function NavBlock({onNext, onPrev, nextDisabled = false, prevDisabled = false, children}: NavBlockProps) {
  return (
    <div className={styles.container}>
      <NavigateButton type="back" onClick={onPrev} disabled={prevDisabled} />
      {children}
      <NavigateButton type="forward" onClick={onNext} disabled={nextDisabled}/>
    </div>
  )
}