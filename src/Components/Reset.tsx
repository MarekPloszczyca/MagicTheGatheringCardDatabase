import { MouseEventHandler } from "react";
import styles from "./Reset.module.scss";

interface Props {
  reset: MouseEventHandler;
}

export default function Reset(props: Props) {
  return (
    <button className={styles.resetButton} onClick={props.reset}>
      Reset
    </button>
  );
}
