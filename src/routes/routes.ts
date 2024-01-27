import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/home/Home";
import NotFound from "../pages/Error/NotFound";

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
    ],
  },
]);
