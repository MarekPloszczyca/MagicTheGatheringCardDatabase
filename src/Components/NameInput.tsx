import styles from "./NameInput.module.scss";

interface Props{
stateChange : React.ChangeEventHandler<HTMLInputElement>
value:string
resetValue: () => void
}

export default function NameInput(props:Props) {
  return (
  
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
      ></input>
  );
}
