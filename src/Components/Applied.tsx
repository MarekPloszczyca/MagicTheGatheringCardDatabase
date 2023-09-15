import { Fragment } from "react";
import styles from "./Applied.module.scss";

interface Props {
  identifier: string;
}

export default function Apllied(props: Props) {
  return (
    <Fragment>
      <div className={styles.applied}>{props.identifier}</div>
    </Fragment>
  );
}
