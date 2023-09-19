import { useLoaderData } from "react-router-dom";
import styles from "./CardPage.module.scss";
import Card from "../Components/Card";
import CardDetails from "../Components/CardDetails";
import Header from "../Components/Header";

export default function CardPage() {
  const { cardDetails } = useLoaderData();
  const card = cardDetails.card;
  console.log(card);

  return (
    <div className={styles.cardPage}>
      <Header />
      <Card image={card.imageUrl} />
      <CardDetails
        name={card.name}
        cmc={card.cmc}
        type={card.type}
        text={card.text}
        power={card.power}
        toughness={card.toughness}
        setName={card.setName}
        artist={card.artist}
        flavor={card.flavor}
      />
    </div>
  );
}
