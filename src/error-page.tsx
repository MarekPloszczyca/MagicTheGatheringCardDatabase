import {Fragment} from "react"
import { useRouteError, Link } from "react-router-dom";
import styles from "./error-page.module.scss";
import LoadingIcon from "./Components/LoadingIcon";
import Header from "./Components/Header";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Fragment>
        <Link to={"/"}><Header/></Link>
      <div className={styles.error}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>Page not found.</i>
        </p>
        <LoadingIcon />
      </div>
      </Fragment>
  );
}
