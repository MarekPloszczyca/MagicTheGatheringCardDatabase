import styles from "./Card.module.scss";

type Props = {
  image: string;
}

export default function Card(props:Props) {
  return (
    <div className={styles.card}>
      <img src={props.image}/>
    </div>
  );
}
