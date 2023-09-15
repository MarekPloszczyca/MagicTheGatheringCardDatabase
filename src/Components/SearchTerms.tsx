import { ChangeEventHandler, TouchEventHandler, MouseEventHandler } from "react";
import styles from "./SearchTerms.module.scss";
import NameInput from "./NameInput";
import SelectGrid from "./SelectGrid";
import RangeInput from "./RangeInput";
import { AplliedClassifications } from "./AppliedClassifications";

interface Props{
  stateChange : ChangeEventHandler<HTMLInputElement>
  value:string
  resetValue: () => void
  onChange: ChangeEventHandler<HTMLSelectElement>
  onTouchEnd:TouchEventHandler<HTMLInputElement>
  onMouseOut: MouseEventHandler<HTMLInputElement>
  appliedTerms:string
  }

export default function SearchTerms(props: Props) {
  return (
    <form className={styles.searchTerms}>
      <NameInput value={props.value} stateChange={props.stateChange} resetValue={props.resetValue}/>
      <SelectGrid onChange={props.onChange}/>
      <RangeInput onTouchEnd={props.onTouchEnd} onMouseOut={props.onMouseOut}/>
      <AplliedClassifications appliedTerms={props.appliedTerms}/>
    </form>
  );
}
