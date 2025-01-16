import React, { useRef } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
// Workaround because of export issue in keycloak-js, solved in keycloak-js 24: https://github.com/keycloak/keycloak/pull/24974/files
import Keycloak from "keycloak-js/dist/keycloak.js";
import {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakOnLoad,
} from "keycloak-js";
import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import { InMemoryWebStorage, User, WebStorageStateStore } from "oidc-client-ts";
import { FC, Fragment, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { formatUrlTrailingSlash } from "../utils/format-url-trailing-slash";
import KeycloakContext from "../contexts/KeycloakContext";
import { DecodedToken } from "../interfaces/decoded-token";
import ProtectedApp from "./ProtectedApp";

export type AuthenticationMethods = {
  person?: string[];
  company?: string[];
  proxy?: string[];
};

export type OidcConfig = {
  authority: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
};

interface KeycloakWrapperProps extends KeycloakConfig {
  oidcConfig: OidcConfig;
  children: React.ReactNode;
  redirectUri: string;
  autoRefreshToken?: boolean;
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
  minValiditySeconds?: number;
  onLoad?: KeycloakOnLoad;
  authenticationMethods?: AuthenticationMethods;
}

interface IdleTimerProps {
  idleTimeoutMinutes: number;
  onTimerReset: () => void;
}

const BASIC_ACTIVITY_EVENTS: string[] = [
  "mousedown",
  "keydown",
  "pointerdown",
  "touchstart",
  "scroll",
  "wheel",
  "audiostart",
];

const IdleTimer = ({ idleTimeoutMinutes, onTimerReset }: IdleTimerProps) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const resetTimer = () => {
    onTimerReset(); // Updates the accesstoken if necessary

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(
      () => {
        window.location.reload(); // Refresh to check with Keycloak if session is still valid
      },
      1000 * 60 * idleTimeoutMinutes,
    ); // Should be 15 minutes to comply with DigiD requirements: SSO session idle + 2 minute (internal Keycloak buffer time).
  };

  useEffect(() => {
    // initiate timeout
    resetTimer();

    // listen for activity events
    BASIC_ACTIVITY_EVENTS.forEach((eventType) => {
      window.addEventListener(eventType, resetTimer);
    });

    // cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        BASIC_ACTIVITY_EVENTS.forEach((eventType) => {
          window.removeEventListener(eventType, resetTimer);
        });
      }
    };
  }, []);

  return null;
};

const KeycloakProvider = ({
  oidcConfig,
  children,
  url,
  clientId,
  realm,
  redirectUri,
  autoRefreshToken = false,
  autoIdleSessionLogout = true,
  idleTimeoutMinutes = 15,
  minValiditySeconds = 30,
  onLoad = "login-required",
}: KeycloakWrapperProps) => {
  const { setKeycloakToken, setDecodedToken } = useContext(KeycloakContext);
  // const keycloakPath = new URL(redirectUri).pathname;
  // const redirectUrl = new URL(window.location.href);
  // const redirectPath = redirectUrl.pathname + redirectUrl.search;
  // const redirectParam =
  //   redirectPath !== "/" && redirectPath !== keycloakPath
  //     ? `?redirect_url=${encodeURIComponent(redirectPath)}`
  //     : "";
  // const { current: initOptions } = useRef<KeycloakInitOptions>({
  //   checkLoginIframe: false,
  //   onLoad,
  //   flow: "standard",
  //   redirectUri: formatUrlTrailingSlash(redirectUri + redirectParam, false),
  // });
  // const { current: authClient } = useRef(
  //   new Keycloak({
  //     url: formatUrlTrailingSlash(`${url}`, false),
  //     clientId,
  //     realm,
  //   }),
  // );
  // const updateToken = () => {
  //   if (authClient.token) {
  //     authClient.updateToken(minValiditySeconds);
  //   }
  // };

  const decodeToken = (jwtToken: string) => jwtDecode<DecodedToken>(jwtToken);

  const onSigninCallback = (user: User | undefined) => {
    // e.g. remove query params once logged in
    window.history.replaceState({}, document.title, window.location.pathname);

    if (!user?.access_token) return;
    setKeycloakToken(user?.access_token);
    setDecodedToken(decodeToken(user?.access_token));

  };

  
  return (
    <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
      {/* {autoIdleSessionLogout && (
        <IdleTimer
          onTimerReset={updateToken}
          idleTimeoutMinutes={idleTimeoutMinutes}
        />
      )} */}
      <ProtectedApp>{children}</ProtectedApp>
    </AuthProvider>
    // <ReactKeycloakProvider
    //   authClient={authClient}
    //   initOptions={initOptions}
    //   LoadingComponent={<Fragment />}
    //   autoRefreshToken={autoRefreshToken}
    //   onTokens={({ token }) => {
    //     if (!token) return;
    //     setKeycloakToken(token);
    //     setDecodedToken(decodeToken(token));
    //   }}
    //   onEvent={(eventType) => {
    //     if (eventType === "onAuthRefreshError") {
    //       authClient.logout();
    //     }
    //   }}
    // >
    //   {autoIdleSessionLogout && (
    //     <IdleTimer
    //       onTimerReset={updateToken}
    //       idleTimeoutMinutes={idleTimeoutMinutes}
    //     />
    //   )}
    //   {children}
    // </ReactKeycloakProvider>
  );
};

const KeycloakWrapper: FC<KeycloakWrapperProps> = (props) => {
  const [keycloakToken, setKeycloakToken] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | undefined>(
    undefined,
  );

  return (
    <KeycloakContext.Provider
      value={{
        keycloakToken,
        setKeycloakToken,
        decodedToken,
        setDecodedToken,
        authenticationMethods: props.authenticationMethods,
      }}
    >
      <KeycloakProvider {...props} />
    </KeycloakContext.Provider>
  );
};

export default KeycloakWrapper;
