import "@gemeente-denhaag/design-tokens";
import "@nl-portal/nl-portal-user-interface/index.css";
import "./styles/nl-portal-design-tokens.css";
import { OidcProvider } from "@nl-portal/nl-portal-authentication";
import { LocalizationProvider } from "@nl-portal/nl-portal-localization";
import { ApiProvider } from "@nl-portal/nl-portal-api";
import {
  AppProvider,
  UserProvider,
  NotificationProvider,
} from "@nl-portal/nl-portal-user-interface";
import { CUSTOM_MESSAGES } from "./i18n/custom-messages/custom-messages";
import { ScrollRestoration } from "react-router";
import CustomLayout from "./components/CustomLayout";

const authenticationMethods = {
  person: ["digid", "machtigen"],
  company: ["eherkenning", "bewindvoering"],
  proxy: ["machtigen", "bewindvoering"],
};

const App = () => {
  return (
    <div className={globalThis.THEME_CLASS}>
      <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
        <OidcProvider
          clientId={globalThis.OIDC_CLIENT_ID}
          realm={globalThis.OIDC_REALM}
          url={globalThis.OIDC_URL}
          redirectUri={globalThis.OIDC_REDIRECT_URI}
          postLogoutRedirectUri={globalThis.OIDC_POST_LOGOUT_REDIRECT_URI}
          authenticationMethods={authenticationMethods}
        >
          <ApiProvider
            graphqlUri={globalThis.GRAPHQL_URI}
            restUri={globalThis.REST_URI}
          >
            <NotificationProvider>
              <UserProvider>
                <AppProvider>
                  <CustomLayout />
                </AppProvider>
              </UserProvider>
            </NotificationProvider>
          </ApiProvider>
        </OidcProvider>
      </LocalizationProvider>
      <ScrollRestoration />
    </div>
  );
};

export default App;
