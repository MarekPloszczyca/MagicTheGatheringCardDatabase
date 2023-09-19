import { MouseEventHandler } from "react";
import styles from "./Reset.module.scss";

interface Props {
  reset: MouseEventHandler;
  available: boolean;
}

export default function Reset(props: Props) {
  return (
    <div
      className={
        props.available ? undefined : styles.resetContainerNotAvailable
      }
    >
      <button
        type="reset"
        className={props.available ? styles.resetButton : styles.notAvailable}
        onClick={props.reset}
      >
        Reset
      </button>
    </div>
  );
}
