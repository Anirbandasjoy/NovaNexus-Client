import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import NotFound from "../pages/Error/NotFound";
import Home from "../pages/home/Home";
import NewsDetails from "../pages/newsDetails/NewsDetails";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import PribetRoutes from "./PribetRoutes";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "news-details/:id",
        element: (
          <PribetRoutes>
            <NewsDetails />
          </PribetRoutes>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
