import { useState, TouchEventHandler, MouseEventHandler } from "react";
import styles from "./RangeInput.module.scss";

interface Props {
  onTouchEnd: TouchEventHandler<HTMLInputElement>;
  onMouseOut: MouseEventHandler<HTMLInputElement>
}

export default function RangeInput(props: Props) {
  const [inputValue, setInputValue] = useState("0");
  const [inputTouch, setInputTouch] = useState(false);

  return (
    <div className={styles.rangeInput}>
      <p>Total cost:</p>
      <input
        name="cmc"
        type="range"
        min="0"
        max="20"
        value={inputValue}
        onClick={() => setInputTouch(true)}
        onTouchStart={() => setInputTouch(true)}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        onMouseUp={props.onMouseOut}
        onTouchEnd={props.onTouchEnd}
      ></input>
      {inputTouch && <p>{inputValue}</p>}
    </div>
  );
}
