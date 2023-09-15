/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, ChangeEvent } from "react";
import "./App.css";
import Header from "./Components/Header";
import SearchTerms from "./Components/SearchTerms";
import CardsContainer from "./Components/CardsContainer";
import Applied from "./Components/Applied";

interface Classification {
  type: string;
  option: string | number;
}

const termsNameHandler = (type: string, value: string | number) => {
  if (type == "colors") {
    switch (value) {
      case "U":
        return "Blue";
      case "W":
        return "White";
      case "B":
        return "Black";
      case "G":
        return "Green";
      case "R":
        return "Red";
      default:
        return "Color";
    }
  } else if (type == "cmc") {
    return "Total cost: " + value;
  } else return value;
};

function App() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [option, setOption] = useState("");
  const [terms, setTerms] = useState<Classification[]>([]);
  const [appliedTerms, setAppliedTerms] = useState<(JSX.Element | undefined)[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const loadHandler = () => {
    setLoading(false);
  };

  const stateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addName = () => {
    setName(value);
    setValue("");
    setTimeout(() => {
      setName("");
    });
  };

  const addClassification = (event: any) => {
    setType(event.currentTarget.name);
    setOption(event.currentTarget.value);
    setTimeout(() => {
      setType("");
      setOption("");
    });
  };

  const termsHandler = (terms: Classification[]) => {
    setTerms(terms);
  };

  const appliedTermsRender = () => {
    const applied: (JSX.Element | undefined)[] = terms.map((term) => {
      if (term.type !== "page") {
        return (
          <Applied
            key={term.type}
            identifier={termsNameHandler(term.type, term.option)}
          />
        );
      }
    });
    setAppliedTerms(applied);
  };

  return (
    <Fragment>
      <Header/>

      {!loading && (
        <SearchTerms
          value={value}
          stateChange={stateChange}
          resetValue={addName}
          onChange={addClassification}
          onTouchEnd={addClassification}
          onMouseOut={addClassification}
          appliedTerms={appliedTerms}
        />
      )}

      {!loading &&<CardsContainer
        name={name}
        select={{ type: type, option: option }}
        terms={terms}
        termsHandler={termsHandler}
        render={appliedTermsRender}
      />}
    </Fragment>
  );
}

export default App;
