import "@gemeente-denhaag/design-tokens-components";
import "@nl-portal/nl-portal-user-interface/style.css";
import "./styles/nl-portal-design-tokens.css";
import { OidcProvider } from "@nl-portal/nl-portal-authentication";
import { LocalizationProvider } from "@nl-portal/nl-portal-localization";
import { ApiProvider } from "@nl-portal/nl-portal-api";
import {
  Layout,
  MessagesProvider,
  NotificationProvider,
  useEnableMessagesCount,
} from "@nl-portal/nl-portal-user-interface";
import { CUSTOM_MESSAGES } from "./i18n/custom-messages/custom-messages";
import HeaderLogo from "./assets/header-logo.svg";
import HeaderLogoSmall from "./assets/header-logo-small.svg";
import Facet from "./assets/facet.png";
import { footerData } from "./constants/footer-data";
import { config } from "./constants/config";
import { menuItems } from "./constants/menu-items";
import { paths } from "./constants/paths";
import { ScrollRestoration } from "react-router-dom";

const authenticationMethods = {
  person: ["digid", "machtigen"],
  company: ["eherkenning", "bewindvoering"],
  proxy: ["machtigen", "bewindvoering"],
};

const App = () => {
  const enableMessagesCount = useEnableMessagesCount(menuItems);

  return (
    <div className={config.THEME_CLASS}>
      <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
        <OidcProvider
          clientId={config.OIDC_CLIENT_ID}
          realm={config.OIDC_REALM}
          url={config.OIDC_URL}
          redirectUri={config.OIDC_REDIRECT_URI}
          postLogoutRedirectUri={config.OIDC_POST_LOGOUT_REDIRECT_URI}
          authenticationMethods={authenticationMethods}
        >
          <ApiProvider
            graphqlUri={config.GRAPHQL_URI}
            restUri={config.REST_URI}
          >
            <NotificationProvider>
              <MessagesProvider enableMessagesCount={enableMessagesCount}>
                <Layout
                  navigationItems={menuItems}
                  paths={paths}
                  headerLogo={<img src={HeaderLogo} alt="logo" />}
                  headerLogoSmall={
                    <img src={HeaderLogoSmall} alt="logo-small" />
                  }
                  facet={<img src={Facet} alt="facet" />}
                  footer={footerData}
                />
              </MessagesProvider>
            </NotificationProvider>
          </ApiProvider>
        </OidcProvider>
      </LocalizationProvider>
      <ScrollRestoration />
    </div>
  );
};

export default App;
