import styles from "./CardDetails.module.scss";

interface Props {
  name: string;
  cmc: string;
  type: string;
  text: string;
  power: string;
  toughness: string;
  setName: string;
  artist: string;
  flavor: string;
}

export default function CardDetails(props: Props) {
  return (
    <div className={styles.cardDetails}>
      <h2>{props.name}</h2>
      <p>
        <span>Cost: </span> {props.cmc}
      </p>
      <p>
        <span>Type: </span> {props.type}
      </p>
      <p>
        <span>Ability: </span>
        {props.text}
      </p>
      {props.power !== undefined && props.toughness !== undefined && (
        <p>
          <span>Power / Toughness: </span> {props.power} / {props.toughness}
        </p>
      )}
      <p>
        <span>Set: </span>
        {props.setName}
      </p>
      <p>
        <span>Artist: </span>
        {props.artist}
      </p>
      {props.flavor !== undefined && <p className={styles.flavor}>"{props.flavor}"</p>}
    </div>
  );
}
