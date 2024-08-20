import "@gemeente-denhaag/design-tokens-components";
import "@nl-portal/nl-portal-user-interface/style.css";
import "./styles/nl-portal-design-tokens.css";
import { KeycloakWrapper } from "@nl-portal/nl-portal-authentication";
import { LocalizationProvider } from "@nl-portal/nl-portal-localization";
import { ApiProvider } from "@nl-portal/nl-portal-api";
import { Layout } from "@nl-portal/nl-portal-user-interface";
import { CUSTOM_MESSAGES } from "./i18n/custom-messages/custom-messages";
import HeaderLogo from "./assets/header-logo.svg";
import HeaderLogoSmall from "./assets/header-logo-small.svg";
import Facet from "./assets/facet.png";
import { footerData } from "./constants/footer-data";
import { config } from "./constants/config";
import React from "react";
import { menuItems } from "./constants/menu-items";
import { paths } from "./constants/paths";
import { ScrollRestoration } from "react-router-dom";

const authenticationMethods = {
  person: ["digid", "machtigen"],
  company: ["eherkenning", "bewindvoering"],
  proxy: ["machtigen", "bewindvoering"],
};

const App = () => {
  if (!config.KEYCLOAK_CLIENT_ID) {
    console.log("KEYCLOAK_CLIENT_ID is not set");
    return null;
  }

  if (!config.KEYCLOAK_REALM) {
    console.log("KEYCLOAK_REALM is not set");
    return null;
  }

  if (!config.KEYCLOAK_URL) {
    console.log("KEYCLOAK_URL is not set");
    return null;
  }

  if (!config.KEYCLOAK_REDIRECT_URI) {
    console.log("KEYCLOAK_REDIRECT_URI is not set");
    return null;
  }

  if (!config.GRAPHQL_URI) {
    console.log("GRAPHQL_URI is not set");
    return null;
  }

  if (!config.REST_URI) {
    console.log("REST_URI is not set");
    return null;
  }

  return (
    <div className={config.THEME_CLASS}>
      <KeycloakWrapper
        clientId={config.KEYCLOAK_CLIENT_ID}
        realm={config.KEYCLOAK_REALM}
        url={config.KEYCLOAK_URL}
        redirectUri={config.KEYCLOAK_REDIRECT_URI}
        authenticationMethods={authenticationMethods}
      >
        {/* TODO: Moved StrictMode, because of Keycloak - React 18: https://github.com/react-keycloak/react-keycloak/issues/182 */}
        <React.StrictMode>
          <ApiProvider
            graphqlUri={config.GRAPHQL_URI}
            restUri={config.REST_URI}
          >
            <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
              <Layout
                navigationItems={menuItems}
                paths={paths}
                headerLogo={<img src={HeaderLogo} alt="logo" />}
                headerLogoSmall={<img src={HeaderLogoSmall} alt="logo-small" />}
                facet={<img src={Facet} alt="facet" />}
                footer={footerData}
              />
            </LocalizationProvider>
          </ApiProvider>
        </React.StrictMode>
      </KeycloakWrapper>
      <ScrollRestoration />
    </div>
  );
};

export default App;
