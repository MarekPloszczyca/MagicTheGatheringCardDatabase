import { ChangeEventHandler, ReactNode } from "react";
import styles from "./ClassificationSelect.module.scss";

type Props = {
  option: () => ReactNode;
  name:string
  onChange:ChangeEventHandler<HTMLSelectElement>
};

export default function ClassificationSelect(props: Props) {
  return (
    <select className={styles.classificationSelect} name={props.name}
    onChange={props.onChange}>
      {props.option()}
    </select>
  );
}
