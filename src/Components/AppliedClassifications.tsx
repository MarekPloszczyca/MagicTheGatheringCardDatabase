import styles from "./AppliedClassifications.module.scss";

interface Props {
  appliedTerms: (JSX.Element|undefined)[];
}

export function AppliedClassifications(props: Props) {
  return (
    <div className={styles.appliedClassifications}>
      {props.appliedTerms}
    </div>
  );
}
