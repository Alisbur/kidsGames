
import styles from "./XOField.module.scss";
import xFigure from "../../assets/icons/x-figure.svg";
import oFigure from "../../assets/icons/o-figure.svg";
import classNames from "classnames";

const cn = classNames.bind(styles);

type XOFieldProps = {
  fieldArr: number[];
  onMove: (idx: number) => void;
  win?: number[] | null;
};

export function XOField({ fieldArr, onMove, win }: XOFieldProps) {
  return (
    <div className={styles.field}>
      {fieldArr.map((el, i) => (
        <div
          key={i}
          className={cn(
            styles.field_item,
            win && win.includes(i) && styles.field_item__win
          )}
          onClick={() => onMove(i)}
        >
          {el < 0 && <img src={oFigure} className={styles.field_figure} />}
          {el > 0 && <img src={xFigure} className={styles.field_figure} />}
        </div>
      ))}
    </div>
  );
}
