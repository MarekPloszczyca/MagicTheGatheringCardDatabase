import { MouseEventHandler, ChangeEventHandler } from "react";
import styles from "./NameInput.module.scss";
import Reset from "./Reset";

interface Props{
stateChange :ChangeEventHandler<HTMLInputElement>
value:string
resetValue: () => void
onReset:MouseEventHandler
}

export default function NameInput(props:Props) {
  return (
  <div className={styles.nameContainer}>
      <input
        className={styles.nameInput}
        placeholder="Search Card"
        type="search"
        name="cardName"
        autoComplete="off"
        onChange={props.stateChange}
        value={props.value}
        onKeyDown={(event) => {
       
          if (event.key === "Enter") {
            event.preventDefault()
            props.resetValue();
          }
        }}
      ></input><Reset reset={props.onReset}/></div>
  );
}
