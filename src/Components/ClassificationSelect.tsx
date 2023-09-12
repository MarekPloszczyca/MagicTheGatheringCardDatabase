import { ReactNode } from "react";
import styles from "./ClassificationSelect.module.scss";

type Props = {
  option: () => ReactNode;
};

export default function ClassificationSelect(props: Props) {
  return (
    <select className={styles.classificationSelect} onChange={}>
      {props.option()}
    </select>
  );
}
