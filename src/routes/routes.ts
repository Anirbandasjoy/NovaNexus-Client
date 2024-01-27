import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: MainLayout(),
    children: [
      {
        index: true,
        element: Home(),
      },
    ],
  },
]);
