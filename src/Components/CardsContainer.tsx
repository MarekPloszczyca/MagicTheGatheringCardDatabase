/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import Card from "./Card";
import styles from "./CardsContainer.module.scss";

interface CardProps {
  id: string;
  imageUrl: string;
}
interface ComponentProps {
  name: string;
  select: { type: string; option: string };
  terms: Classification[];
  termsHandler: any;
  render: () => void;
}

interface Classification {
  type: string;
  option: string | number;
}

export default function CardsContainer(props: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [classification, setClassification] = useState(false);

  const firstLoad = useRef(true);
  const page = useRef(1);
  const url = useRef(
    "https://api.magicthegathering.io/v1/cards?contains=imageUrl"
  );

  const modifedUrlHandler = useCallback(
    (name: string, value: string | number) => {
      url.current =
        "https://api.magicthegathering.io/v1/cards?contains=imageUrl";
      const types: Classification[] = props.terms;
      let number = 0;
      for (const type of types) {
        if (type.type === value) {
          const index = types.indexOf(type);
          types.splice(index, 1);
          number++;
        } else if (type.type === name && type.type !== value) {
          type.option = value;
          number++;
        } else if (type.type === "page") {
          type.option = page.current;
        }
      }
      if (number === 0) {
        types.push({ type: name, option: value });
      }
      props.termsHandler(types);
      props.render();
      props.terms.forEach((term) => {
        return (url.current = url.current + `&${term.type}=${term.option}`);
      });
    },
    [props]
  );

  const fetchCards = useCallback(async () => {
    if (firstLoad.current === true) {
      firstLoad.current = false;
    }
    setIsLoading(true);
    try {
      const response = await fetch(url.current);
      const result = await response.json();
      const transformedCards = result.cards.map((card: CardProps) => {
        return <Card key={card.id} image={card.imageUrl} />;
      });
      !classification
        ? setCards((current) => current.concat(transformedCards))
        : setCards(transformedCards);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      page.current = page.current + 1;
    }
  }, [classification, url]);

  useEffect(() => {
    if (classification === false && !firstLoad.current) {
      return;
    } else {
      page.current = 1;
      fetchCards();
      setClassification(false);
    }
  }, [fetchCards, classification]);

  useEffect(() => {
    if (props.name.trim() !== "") {
      page.current = 1;
      setClassification(true);
      modifedUrlHandler("name", props.name);
    }
  }, [props.name, props.select, url, modifedUrlHandler, page]);

  useEffect(() => {
    if (props.select.option.trim() !== "" && props.select.type.trim() !== "") {
      page.current = 1;
      setClassification(true);
      modifedUrlHandler(props.select.type, props.select.option);
    }
  }, [props.select, url, modifedUrlHandler]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 10 ||
      isLoading
    ) {
      return;
    }
    modifedUrlHandler("page", page.current);
    fetchCards();
  }, [isLoading, fetchCards, modifedUrlHandler]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, handleScroll]);

  return (
    <Fragment>
      <div className={styles.cardsContainer}>{cards}</div>
      {isLoading && <p>Loading...</p>}
    </Fragment>
  );
}
