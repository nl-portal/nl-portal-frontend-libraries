import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./constants/routes";
import verifyConfig from "./util/verify-config";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    element: <App />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  verifyConfig() ? (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  ) : null,
);
