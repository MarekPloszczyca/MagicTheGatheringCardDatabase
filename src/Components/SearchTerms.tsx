import styles from "./SearchTerms.module.scss";
import NameInput from "./NameInput";
import SelectGrid from "./SelectGrid";

interface Props{
  stateChange : React.ChangeEventHandler<HTMLInputElement>
  value:string
  resetValue: () => void
  }

export default function SearchTerms(props: Props) {
  return (
    <form className={styles.searchTerms}>
      <NameInput value={props.value} stateChange={props.stateChange} resetValue={props.resetValue}/>
      <SelectGrid />
    </form>
  );
}
