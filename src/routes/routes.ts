import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/home/Home";
import NotFound from "../pages/Error/NotFound";
import NewsDetails from "../pages/newsDetails/NewsDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: MainLayout(),
    errorElement: NotFound(),
    children: [
      {
        index: true,
        element: Home(),
      },
      {
        path: "news-details/:id",
        element: NewsDetails(),
      },
    ],
  },
]);
