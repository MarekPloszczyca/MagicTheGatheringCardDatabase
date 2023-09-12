import { Fragment, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import SearchTerms from "./Components/SearchTerms";
import CardsContainer from "./Components/CardsContainer";



function App() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  

  const stateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addName = () => {
    setName(value);
    setValue("");
  };

  return (
    <Fragment>
      <Header />
      <SearchTerms
        value={value}
        stateChange={stateChange}
        resetValue={addName}
      />
      <CardsContainer name={name} />
    </Fragment>
  );
}

export default App;
