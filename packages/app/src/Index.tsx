import ReactDOM from "react-dom/client";
import "./index.css";
import verifyConfig from "./util/verify-config";
import { StrictMode } from "react";
import { routes } from "./constants/routes";
import { RouterProvider } from "@nl-portal/nl-portal-user-interface";
import App from "./App";
import { navigationItems } from "./constants/navigation-items";
// import { installDivDatagridTemplate } from "../../user-interface/src/components/formio/FormIoDataGridTemplate";
// installDivDatagridTemplate();

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
