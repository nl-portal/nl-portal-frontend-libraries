import ReactDOM from "react-dom/client";
import "./index.css";
import verifyConfig from "./util/verify-config";
import { StrictMode } from "react";
import { routes } from "./constants/routes";
import { RouterProvider } from "@nl-portal/nl-portal-user-interface";
import App from "./App";
import { navigationItems } from "./constants/navigation-items";

ReactDOM.createRoot(document.getElementById("root")!).render(
  verifyConfig() ? (
    <StrictMode>
      <RouterProvider
        element={<App />}
        routes={routes}
        navigationItems={navigationItems}
      />
    </StrictMode>
  ) : null,
);
