import ClassificationSelect from "./ClassificationSelect";
import styles from "./SelectGrid.module.scss";

class Option {
  name: string;
  options: string[];
  constructor(name: string, options: string[]) {
    this.name = name;
    this.options = options;
  }
}

const type = [
  new Option("Type", ["Select Type", "Character", "Location", "Summon"]),
  new Option("Colors", [
    "White",
    "Red",
    "Blue",
    "Green",
    "Black",
  ]),
  new Option("Cards", ["All Cards", "Released", "Unreleased"]),
  new Option("Ability", ["Ability", "Has Ability", "No Ability"]),
];

export default function SelectGrid() {
  const searchOptions = type.map((select) => {
    return (
      <ClassificationSelect
        key={select.name}
        option={() =>
          select.options.map((option) => {
            return <option key={option}>{option}</option>;
          })
        }
      />
    );
    
  });

  return <div className={styles.selectGrid}>{searchOptions}</div>;
}
