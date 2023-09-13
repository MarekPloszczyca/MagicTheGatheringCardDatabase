import { ChangeEventHandler, useEffect, useState, useCallback } from "react";
import ClassificationSelect from "./ClassificationSelect";
import styles from "./SelectGrid.module.scss";

class Option {
  name: string;
  options: string[];
  urlValues: string[];
  constructor(name: string, options: string[], urlValues: string[]) {
    this.name = name;
    this.options = options;
    this.urlValues = urlValues;
  }
}

const colors = new Option(
  "colors",
  ["Colors", "White", "Red", "Blue", "Green", "Black"],
  ["colors", "W", "R", "U", "G", "B"]
);
const layout = new Option(
  "layout",
  ["Layout", "Normal", "Split", "Flip", "Scheme", "Leveler", "Aftermath"],
  ["layout", "normal", "split", "flip", "scheme", "leveler", "aftermath"]
);
const rarity = new Option(
  "rarity",
  ["Rarity", "Common", "Uncommon", "Rare", "Mythic", "Special"],
  ["rarity", "common", "uncommon", "rare", "mythic", "special"]
);

const type = [colors, layout, rarity];

interface Props {
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function SelectGrid(props: Props) {
  const [render, setRender] = useState<JSX.Element[]>();

  const renderSelectsHandler = useCallback(() => {
    const searchOptions = type.map((select) => {
      return (
        <ClassificationSelect
          key={select.name}
          name={select.name}
          onChange={props.onChange}
          option={() =>
            select.options.map((option) => {
              return (
                <option
                  key={option}
                  value={select.urlValues[select.options.indexOf(option)]}
                >
                  {option}
                </option>
              );
            })
          }
        />
      );
    });
    setRender(searchOptions);
  }, []);

  const fetchTypes = useCallback(async () => {
    try {
      const typesUrl = "https://api.magicthegathering.io/v1/types";
      const response = await fetch(typesUrl);
      const result = await response.json();

      const types = new Option(
        "types",
        result.types.map((result: string) => {
          return result;
        }),
        result.types.map((result: string) => {
          return result.toLowerCase();
        })
      );
      types.options.unshift("Types");
      types.urlValues.unshift("types");
      type.push(types);
      renderSelectsHandler();
      console.log(types);
    } catch (error) {
      console.log(error);
    }
  }, [renderSelectsHandler]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  return <div className={styles.selectGrid}>{render}</div>;
}
