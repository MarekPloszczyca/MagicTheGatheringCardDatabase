import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import ErrorPage from "./error-page.tsx";
import CardPage from "./routes/CardPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



async function cardLoader({params}) {
  const response = await fetch(
    `https://api.magicthegathering.io/v1/cards/${params.id}`
  );
  const cardDetails = await response.json();
  return { cardDetails };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "card/:id",
    element: <CardPage />,
    loader: cardLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
