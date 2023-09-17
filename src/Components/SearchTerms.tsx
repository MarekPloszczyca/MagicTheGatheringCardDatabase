import {
  ChangeEventHandler,
  TouchEventHandler,
  MouseEventHandler,
} from "react";
import styles from "./SearchTerms.module.scss";
import NameInput from "./NameInput";
import SelectGrid from "./SelectGrid";
import RangeInput from "./RangeInput";
import AppliedClassifications from "./AppliedClassifications";
import Reset from "./Reset";


interface Props {
  stateChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  resetValue: () => void;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  onTouchEnd: TouchEventHandler<HTMLInputElement>;
  onMouseOut: MouseEventHandler<HTMLInputElement>;
  appliedTerms: (JSX.Element | undefined)[];
  onReset: MouseEventHandler;
  reset:boolean;
}

export default function SearchTerms(props: Props) {
  return (
    <form className={styles.searchTerms} onSubmit={(() => {return false})}>
      <div className={styles.nameContainer}>
      <NameInput
        value={props.value}
        stateChange={props.stateChange}
        resetValue={props.resetValue}
        onReset={props.onReset}
      />
      <Reset reset={props.onReset}/></div>
      <SelectGrid onChange={props.onChange} reset={props.reset}/>
      <RangeInput onTouchEnd={props.onTouchEnd} onMouseOut={props.onMouseOut} />
      <AppliedClassifications appliedTerms={props.appliedTerms} />
    </form>
  );
}
