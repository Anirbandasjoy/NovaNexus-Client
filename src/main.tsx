import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/routes";
import "./index.css";
import AuthProvider from "./contex/AuthProvider";
const queryClient = new QueryClient();
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
