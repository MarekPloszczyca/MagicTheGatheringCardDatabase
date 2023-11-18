/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData, Link } from "react-router-dom";
import styles from "./CardPage.module.scss";
import Card from "../Components/Card";
import CardDetails from "../Components/CardDetails";
import Header from "../Components/Header";

export default function CardPage() {
  const { cardDetails }: any = useLoaderData();
  const card = cardDetails.card;

  return (
    <div className={styles.cardPage}>
      <Link to={"/"}>
        <Header />
      </Link>
      <div className={styles.cardContainer}>
      <Card image={card.imageUrl} single={true} />
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
      /></div>
    </div>
  );
}
