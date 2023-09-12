import { Fragment, useEffect, useState, useCallback } from "react";
import Card from "./Card";
import styles from "./CardsContainer.module.scss";

let url =
  "https://api.magicthegathering.io/v1/cards?pageSize=50&contains=imageUrl";

const modifedUrlHandler = (name: string, type: string | number) => {
  url = url + `&${name}=${type}`;
};

interface CardProps {
  id: string;
  imageUrl: string;
}
interface ComponentProps {
  name: string;
}

export default function CardsContainer(props: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      const transformedCards = result.cards.map((card: CardProps) => {
        return <Card  key={card.id} image={card.imageUrl} />;
      });
      setCards((current) => current.concat(transformedCards));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setPage((current) => current + 1);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (props.name === "") {
      return;
    } else {
      modifedUrlHandler("name", props.name);
    }
  }, [props.name]);

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
  }, [isLoading, page]);

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
