import styles from "./Card.module.scss";

type Props = {
  image: string;
  single:boolean;
}

export default function Card(props:Props) {
  return (
    <div className={props.single? styles.singleCard : styles.card}>
      <img src={props.image}/>
    </div>
  );
}
