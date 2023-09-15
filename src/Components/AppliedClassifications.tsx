import styles from "./AppliedClassifications.module.scss";

interface Props {
  appliedTerms: string;
}

export function AplliedClassifications(props: Props) {
  return (
    <div className={styles.appliedClassifications}>
      {props.appliedTerms}
    </div>
  );
}
