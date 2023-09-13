import { ChangeEventHandler } from "react";
import styles from "./SearchTerms.module.scss";
import NameInput from "./NameInput";
import SelectGrid from "./SelectGrid";

interface Props{
  stateChange : ChangeEventHandler<HTMLInputElement>
  value:string
  resetValue: () => void
  onChange: ChangeEventHandler<HTMLSelectElement>
  }

export default function SearchTerms(props: Props) {
  return (
    <form className={styles.searchTerms}>
      <NameInput value={props.value} stateChange={props.stateChange} resetValue={props.resetValue}/>
      <SelectGrid onChange={props.onChange}/>
    </form>
  );
}
