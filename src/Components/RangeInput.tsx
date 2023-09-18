import {
  TouchEventHandler,
  MouseEventHandler,
  ChangeEventHandler,
} from "react";
import styles from "./RangeInput.module.scss";

interface Props {
  onTouchEnd: TouchEventHandler<HTMLInputElement>;
  onMouseOut: MouseEventHandler<HTMLInputElement>;
  inputValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputTouch: boolean;
  onClick: MouseEventHandler<HTMLInputElement>;
  onTouchStart: TouchEventHandler<HTMLInputElement>;
}

export default function RangeInput(props: Props) {
  return (
    <div className={styles.rangeInput}>
      <p>Total cost:</p>
      <input
        name="cmc"
        type="range"
        max="20"
        value={props.inputValue}
        onClick={props.onClick}
        onTouchStart={props.onTouchStart}
        onChange={props.onChange}
        onMouseUp={props.onMouseOut}
        onTouchEnd={props.onTouchEnd}
      ></input>
      {props.inputTouch && <p>{props.inputValue}</p>}
    </div>
  );
}
