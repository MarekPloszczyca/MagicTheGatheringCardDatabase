import styles from "./LoadingIcon.module.scss";
import Red from "../Images/Red.png"
import White from "../Images/White.png";
import Green from "../Images/Green.png";
import Blue from "../Images/Blue.png";
import Black from "../Images/Black.png";

export default function LoadingIcon () {
    return <div><div className={styles.loadingIcon}>
        <div  className={styles.red}><img src={Red}/></div>
        <div className={styles.bottom}><img src={White}/></div>
        <div className={styles.green}><img src={Green}/></div>
        <div className={styles.bottom}><img src={Blue}/></div>
        <div className={styles.black}><img src={Black}/></div>
    </div></div>
}