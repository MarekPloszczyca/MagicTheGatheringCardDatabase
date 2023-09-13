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
}

export default function CardsContainer(props: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [classification, setClassification] = useState(false);
  const [url, setUrl] = useState(
    "https://api.magicthegathering.io/v1/cards?contains=imageUrl&page=1"
  );
  const firstLoad = useRef(true);

  const modifedUrlHandler = useCallback(
    (name: string, type: string | number) => {
      if (url.includes(name)) {
        const regex = new RegExp(`(?=name)(.*?)(?=&|$)(.)`);
        setUrl((current) => current.replace(regex, ""));
      }
      setUrl((current) => current + `&${name}=${type}`);
    },
    [url]
  );

  const fetchCards = useCallback(async () => {
    if (firstLoad.current === true) {
      firstLoad.current = false;
    }
    setIsLoading(true);
    try {
      console.log(url);
      const response = await fetch(url);
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
      setPage((current) => current + 1);
    }
  }, [classification, url]);

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
    }
  }, [props.name, props.select, url, modifedUrlHandler, page]);

  useEffect(() => {
    if (props.select.option.trim() !== "" && props.select.type.trim() !== "") {
      setPage(1);
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
    modifedUrlHandler("page", page);
    fetchCards();
  }, [isLoading, page, fetchCards, modifedUrlHandler]);

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
