import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "./client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
