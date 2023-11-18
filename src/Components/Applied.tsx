
import styles from "./Applied.module.scss";

interface Props {
  identifier: string|number;
}

export default function Applied(props: Props) {
  return (
      <div className={styles.applied}>{props.identifier}</div>
  );
}
