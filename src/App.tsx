/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, ChangeEvent } from "react";
import "./App.css";
import Header from "./Components/Header";
import SearchTerms from "./Components/SearchTerms";
import CardsContainer from "./Components/CardsContainer";


interface Classification {
  type: string;
  option: string | number;
}


function App() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [option, setOption] = useState("");
  const [terms, setTerms] = useState<Classification[]>([]);
 
  

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

  const termsHandler = (terms:Classification[]) => {
    setTerms(terms)
  }
 


  return (
    <Fragment>
      <Header />
      <SearchTerms
        value={value}
        stateChange={stateChange}
        resetValue={addName}
        onChange={addClassification}
        onTouchEnd={addClassification}
        onMouseOut={addClassification}
        appliedTerms="sadasd"
      />
      <CardsContainer name={name} select={{ type: type, option: option }} terms={terms} termsHandler={termsHandler}/>
    </Fragment>
  );
}

export default App;
