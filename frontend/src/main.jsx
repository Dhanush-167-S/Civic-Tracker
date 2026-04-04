import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./app/router.jsx";
import QueryProvider from "./app/Providers";

createRoot(document.getElementById("root")).render(
  <QueryProvider>
    <RouterProvider router={appRouter} />
  </QueryProvider>,
);
