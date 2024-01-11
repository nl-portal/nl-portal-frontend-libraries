import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> // TODO: Enable StrictMode, disabled because of Keycloak - React 18
  <App />
  // </React.StrictMode>
);
