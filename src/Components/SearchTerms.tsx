import {
  ChangeEventHandler,
  TouchEventHandler,
  MouseEventHandler,
  useState,
  SetStateAction,
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
  reset: boolean;
}

export default function SearchTerms(props: Props) {
  const [inputValue, setInputValue] = useState("0");
  const [inputTouch, setInputTouch] = useState(false);

  const resetValue = () => {
    const value = "0";
    setInputValue(value);
    setInputTouch(false);
  };
  return (
    <form
      className={styles.searchTerms}
      onSubmit={() => {
        return false;
      }}
      onReset={resetValue}
    >
      <div className={styles.nameContainer}>
        <NameInput
          value={props.value}
          stateChange={props.stateChange}
          resetValue={props.resetValue}
          onReset={props.onReset}
        />
        <Reset reset={props.onReset} />
      </div>

      <SelectGrid
        onChange={props.onChange}
        reset={props.reset}
      />

      <RangeInput
        onTouchEnd={props.onTouchEnd}
        onMouseOut={props.onMouseOut}
        inputValue={inputValue}
        onChange={(event: {
          currentTarget: { value: SetStateAction<string> };
        }) => setInputValue(event.currentTarget.value)}
        inputTouch={inputTouch}
        onClick={() => {
          setInputTouch(true);
        }}
        onTouchStart={() => {
          setInputTouch(true);
        }}
      />

      <AppliedClassifications appliedTerms={props.appliedTerms} />
    </form>
  );
}
