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
  onMouseStart: MouseEventHandler<HTMLInputElement>;
  available: boolean;
}

export default function RangeInput(props: Props) {
  return (
    <div
      className={
        props.available ? styles.rangeInput : styles.rangeInputNotAllowed
      }
    >
      <p>Total cost:</p>
      <input
        className={props.available ? undefined : styles.notAllowed}
        name="cmc"
        type="range"
        max="20"
        value={props.inputValue}
        onClick={props.onClick}
        onMouseDown={props.onMouseStart}
        onTouchStart={props.onTouchStart}
        onChange={props.onChange}
        onMouseUp={props.onMouseOut}
        onTouchEnd={props.onTouchEnd}
      ></input>
      {props.inputTouch && <p>{props.inputValue}</p>}
    </div>
  );
}
