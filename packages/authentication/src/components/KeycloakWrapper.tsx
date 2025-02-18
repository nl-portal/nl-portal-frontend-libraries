import React, { useEffect } from "react";
// Workaround because of export issue in keycloak-js, solved in keycloak-js 24: https://github.com/keycloak/keycloak/pull/24974/files
import { AuthProvider } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { useContext, useState } from "react";
import KeycloakContext from "../contexts/KeycloakContext";
import { DecodedToken } from "../interfaces/decoded-token";
import ProtectedApp from "./ProtectedApp";
import { decodeToken } from "../utils/decode-token";
import { formatUrlTrailingSlash } from "../utils/format-url-trailing-slash";

export type AuthenticationMethods = {
  person?: string[];
  company?: string[];
  proxy?: string[];
};

export type OidcConfig = {
  url: string;
  clientId: string;
  realm: string;
  redirectUri: string;
};

export type SessionLengthManagementProps = {
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
};

export type KeycloakWrapperProps = OidcConfig &
  SessionLengthManagementProps & {
    children: React.ReactNode;
    authenticationMethods?: AuthenticationMethods;
  };

const KeycloakProvider = ({
  url,
  clientId,
  realm,
  redirectUri,
  children,
  autoIdleSessionLogout,
  idleTimeoutMinutes,
}: KeycloakWrapperProps) => {
  const { setKeycloakToken } = useContext(KeycloakContext);

  const keycloakPath = new URL(redirectUri).pathname;
  const redirectUrl = new URL(window.location.href);
  const redirectPath = redirectUrl.pathname + redirectUrl.search;
  const redirectParam =
    redirectPath !== "/" && redirectPath !== keycloakPath
      ? `?redirect_url=${encodeURIComponent(redirectPath)}`
      : "";

  const oidcConfig = {
    authority: `${url}/realms/${realm}`,
    client_id: clientId,
    redirect_uri: formatUrlTrailingSlash(redirectUri + redirectParam, false),
    scope: "openid profile email", // configure your scopes
    accessTokenExpiringNotificationTime: 15,
  };

  const onSigninCallback = (user: User | undefined) => {
    // clear authentication params once logged in
    window.history.replaceState({}, document.title, window.location.pathname);

    if (!user?.access_token) return;
    setKeycloakToken(user?.access_token);
  };

  return (
    <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
      <ProtectedApp
        autoIdleSessionLogout={autoIdleSessionLogout}
        idleTimeoutMinutes={idleTimeoutMinutes}
      >
        {children}
      </ProtectedApp>
    </AuthProvider>
  );
};

const KeycloakWrapper = ({
  authenticationMethods,
  ...props
}: KeycloakWrapperProps) => {
  const [keycloakToken, setKeycloakToken] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | undefined>(
    undefined,
  );

  useEffect(() => {
    if (keycloakToken) {
      setDecodedToken(decodeToken(keycloakToken));
    }
  }, [keycloakToken]);

  return (
    <KeycloakContext.Provider
      value={{
        keycloakToken,
        setKeycloakToken,
        decodedToken,
        authenticationMethods,
      }}
    >
      <KeycloakProvider {...props} />
    </KeycloakContext.Provider>
  );
};

export default KeycloakWrapper;
