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
import DashboardLayout from "../Layout/DashboardLayout";
import Settings from "../pages/dashboard/pages/settings/Settings";

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
        element: (
          <PribetRoutes>
            <Profile />
          </PribetRoutes>
        ),
      },
    ],
  },
  {
    path: "/Dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <PribetRoutes>
            <Dashboard />
          </PribetRoutes>
        ),
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
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
