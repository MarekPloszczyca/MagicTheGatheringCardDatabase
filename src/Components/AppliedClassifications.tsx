import styles from "./AppliedClassifications.module.scss";

interface Props {
  appliedTerms: (JSX.Element|undefined)[];
}

export default function AppliedClassifications(props: Props) {
  return (
    <div className={styles.appliedClassifications}>
      {props.appliedTerms}
    </div>
  );
}
