import styles from "./AppliedClassifications.module.scss";

interface Props {
  term: string;
}

export function AplliedClassifications(props: Props) {
  return (
    <div className={styles.appliedClassifications}>
      {props.term}
    </div>
  );
}
