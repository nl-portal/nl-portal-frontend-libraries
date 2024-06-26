import React, { useRef } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakOnLoad,
} from "keycloak-js";
import { FC, Fragment, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { formatUrlTrailingSlash } from "../utils/format-url-trailing-slash";
import KeycloakContext from "../contexts/KeycloakContext";
import { DecodedToken } from "../interfaces/decoded-token";

export type AuthenticationMethods = {
  person?: string[];
  company?: string[];
  proxy?: string[];
};

interface KeycloakWrapperProps extends KeycloakConfig {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

const KeycloakProvider = ({
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
  const { current: authClient } = useRef(
    new Keycloak({
      url: formatUrlTrailingSlash(`${url}`, false),
      clientId,
      realm,
    }),
  );
  const initOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad,
    flow: "standard",
    redirectUri: formatUrlTrailingSlash(redirectUri, false),
  };
  const decodeToken = (jwtToken: string) => jwtDecode<DecodedToken>(jwtToken);

  const updateToken = () => {
    if (authClient.token) {
      authClient.updateToken(minValiditySeconds);
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={authClient}
      initOptions={initOptions}
      LoadingComponent={<Fragment />}
      autoRefreshToken={autoRefreshToken}
      onTokens={({ token }) => {
        if (!token) return;
        setKeycloakToken(token);
        setDecodedToken(decodeToken(token));
      }}
      onEvent={(eventType) => {
        if (eventType === "onAuthRefreshError") {
          authClient.logout();
        }
      }}
    >
      {autoIdleSessionLogout && (
        <IdleTimer
          onTimerReset={updateToken}
          idleTimeoutMinutes={idleTimeoutMinutes}
        />
      )}
      {children}
    </ReactKeycloakProvider>
  );
};

const KeycloakWrapper: FC<KeycloakWrapperProps> = (props) => {
  const [keycloakToken, setKeycloakToken] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | undefined>(
    undefined,
  );
  const ENTRY_URL_KEY = "entryUrl";
  const entryUrl = sessionStorage.getItem(ENTRY_URL_KEY);

  if (!entryUrl) {
    const { host, href } = window.location;
    const splitHref = href.split(host);
    const entryUrlPart = splitHref[1];
    sessionStorage.setItem(
      ENTRY_URL_KEY,
      !entryUrlPart.includes("keycloak") ? entryUrlPart : "/",
    );
  }

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
