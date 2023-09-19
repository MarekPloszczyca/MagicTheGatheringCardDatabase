import styles from "./CardDetails.module.scss";

interface Props{
  name:string;
  cmc:string;
  type:string;
  text:string;
  power:string;
  toughness:string;
  setName:string;
  artist:string;
  flavor:string;
}

export default function CardDetails(props:Props) {
  return (
    <div className={styles.cardDetails}>
      <h2>{props.name}</h2>
      <p>Cost: {props.cmc}</p>
      <p>Type: {props.type}</p>
      <p>{props.text}</p>
      <p>Power / Toughness: {props.power} / {props.toughness}</p>
      <p>Set: {props.setName}</p>
      <p>Artist: {props.artist}</p>
      <p>{props.flavor}</p>
    </div>
  );
}
