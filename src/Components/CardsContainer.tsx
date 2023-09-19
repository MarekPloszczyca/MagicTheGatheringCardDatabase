/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import {Link} from "react-router-dom";
import Card from "./Card";
import styles from "./CardsContainer.module.scss";
import LoadingIcon from "./LoadingIcon";

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
  reset: boolean;
}

interface Classification {
  type: string;
  option: string | number;
}

export default function CardsContainer(props: ComponentProps) {
  const [cardsLoading, setCardsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [classification, setClassification] = useState(false);
  const [newSearch, setNewSearch] = useState(false);
  const [noResults, setNoResults] = useState(false);
  

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
        } else if (type.type === "name" && type.option === "") {
          const index = types.indexOf(type);
          types.splice(index, 1);
          number++;
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
    setCardsLoading(true);
    try {
      const response = await fetch(url.current);
      const result = await response.json();
      console.group(result)
      const transformedCards = result.cards.map((card: CardProps) => {
        return <Link
        key={card.id} to={`card/${card.id}`}><Card  image={card.imageUrl} /></Link>;
      });
      !classification
        ? setCards((current) => current.concat(transformedCards))
        : setCards(transformedCards);
      if (transformedCards.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCardsLoading(false);
      setNewSearch(false);
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
      setNewSearch(true);
      setNoResults(false);
      modifedUrlHandler("name", props.name);
    }
  }, [props.name, props.select, url, modifedUrlHandler, page]);

  useEffect(() => {
    if (props.reset !== false) {
      page.current = 1;
      url.current =
        "https://api.magicthegathering.io/v1/cards?contains=imageUrl";
      setNewSearch(true);
      setClassification(true);
      setNoResults(false);
    }
  }, [props.reset, modifedUrlHandler]);

  useEffect(() => {
    if (props.select.option.trim() !== "" && props.select.type.trim() !== "") {
      page.current = 1;
      setClassification(true);
      setNewSearch(true);
      setNoResults(false);
      modifedUrlHandler(props.select.type, props.select.option);
    }
  }, [props.select, url, modifedUrlHandler]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 10 ||
      cardsLoading ||
      noResults === true
    ) {
      return;
    }
    modifedUrlHandler("page", page.current);
    fetchCards();
  }, [cardsLoading, fetchCards, modifedUrlHandler, noResults]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardsLoading, handleScroll]);

  return (
    <Fragment>
      {!newSearch && <div className={styles.cardsContainer}>{cards}</div>}
      {cardsLoading && <LoadingIcon />}
      {noResults && <div className={styles.noResults}><p>There are no more results.</p></div>}
    </Fragment>
  );
}
