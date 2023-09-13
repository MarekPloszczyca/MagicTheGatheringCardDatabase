import { Fragment, useState, ChangeEvent } from "react";
import "./App.css";
import Header from "./Components/Header";
import SearchTerms from "./Components/SearchTerms";
import CardsContainer from "./Components/CardsContainer";

function App() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [option, setOption] = useState("");

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

  const addClassification = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.name);
    setOption(event.currentTarget.value);
    setTimeout(() => {
      setType("");
      setOption("");
    });
  };

  return (
    <Fragment>
      <Header />
      <SearchTerms
        value={value}
        stateChange={stateChange}
        resetValue={addName}
        onChange={addClassification}
      />
      <CardsContainer name={name} select={{ type: type, option: option }} />
    </Fragment>
  );
}

export default App;
