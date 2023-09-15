import { Fragment } from "react";
import styles from "./Applied.module.scss";

interface Props {
  identifier: string|number;
}

export default function Applied(props: Props) {
  return (
    <Fragment>
      <div className={styles.applied}>{props.identifier}</div>
    </Fragment>
  );
}
