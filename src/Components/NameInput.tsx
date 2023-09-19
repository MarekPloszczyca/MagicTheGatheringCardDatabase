import { MouseEventHandler, ChangeEventHandler } from "react";
import styles from "./NameInput.module.scss";


interface Props{
stateChange :ChangeEventHandler<HTMLInputElement>
value:string
resetValue: () => void
onReset:MouseEventHandler
available:boolean;
}

export default function NameInput(props:Props) {
  return (

      <div className={props.available ? styles.nameContainer : styles.nameContainerNotAvailable}><input
        className={props.available ? styles.nameInput : styles.notAvailable}
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
      ></input></div>
  );
}
