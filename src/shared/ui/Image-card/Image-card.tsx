import styles from "./Image-card.module.scss";
import pics from "../../../assets/images";
import { TImageItem } from "../../types/types";

type ImageCardProps = {
  name: TImageItem;
  onClick: ()=>void;
};

export function ImageCard({ name, onClick }: ImageCardProps) {
  const imageItem = pics[name];

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageItem} onClick={onClick}/>
    </div>
  );
}
