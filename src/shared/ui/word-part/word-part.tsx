import classNames from "classnames";
import styles from "./word-part.module.scss";

const cx = classNames.bind(styles);

type WordPartProps = {
  text: string;
  type?: "small" | "big";
  active?: boolean;
  onClick?: () => void;
};

export function WordPart({
  text,
  type = "small",
  active = false,
  onClick,
}: WordPartProps) {
  return (
    <div
      className={cx(
        styles.container,
        type === "big" && styles.container_big,
        active && styles.container_active
      )}
      onClick={onClick}
    >
      {text.split("").join(" ")}
    </div>
  );
}
