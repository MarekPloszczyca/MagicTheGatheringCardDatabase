import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import Card from "./Card";
import styles from "./CardsContainer.module.scss";

let url =
  "https://api.magicthegathering.io/v1/cards?pageSize=50";

const modifedUrlHandler = (name: string, type: string | number) => {
  url = url + `&${name}=${type}`;
};

interface CardProps {
  id: string;
  imageUrl: string;
}
interface ComponentProps {
  name: string;
  select: { type: string; option: string };
}

export default function CardsContainer(props: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [classification, setClassification] = useState(false);
  const firstLoad = useRef(true);

  const fetchCards = useCallback(async () => {
    if (firstLoad.current === true) {
      firstLoad.current = false;
    }
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
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
      setPage((current) => current + 1);
    }
  }, [classification]);

  useEffect(() => {
    if (classification === false && !firstLoad.current) {
      return;
    } else {
      fetchCards();
      setClassification(false);
    }
  }, [fetchCards, classification]);

  useEffect(() => {
    if (props.name.trim() !== "") {
      setClassification(true);
      modifedUrlHandler("name", props.name);
      return console.log(url);
    }
  }, [props.name, props.select]);

  useEffect(() => {
    if (props.select.option.trim() !== "" && props.select.type.trim() !== "") {
      setPage(1);
      setClassification(true);
      modifedUrlHandler(props.select.type, props.select.option);
      return console.log(url);
    }
  }, [props.select]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 30 ||
      isLoading
    ) {
      return;
    }
    modifedUrlHandler("page", page);
    fetchCards();
  }, [isLoading, page, fetchCards]);

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
