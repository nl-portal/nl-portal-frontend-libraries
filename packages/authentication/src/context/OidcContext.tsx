import React, { useEffect } from "react";
import { AuthProvider } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { useState } from "react";
import { DecodedToken } from "../interfaces/decoded-token";
import ProtectedApp from "../components/ProtectedApp";
import { decodeToken } from "../utils/decode-token";
import generateRedirectUri from "../utils/generate-redirect-uri";

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
  postLogoutRedirectUri?: string;
};

export type SessionLengthManagementProps = {
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
};

export type OidcProviderProps = OidcConfig &
  SessionLengthManagementProps & {
    children: React.ReactNode;
    authenticationMethods?: AuthenticationMethods;
  };

export interface OidcContextInterface {
  oidcToken: string;
  setOidcToken: (token: string) => void;
  decodedToken: DecodedToken | undefined;
  authenticationMethods?: AuthenticationMethods;
}

const OidcContext = React.createContext<OidcContextInterface>(
  {} as OidcContextInterface,
);

export const OidcProvider = ({
  authenticationMethods,
  url,
  clientId,
  realm,
  redirectUri,
  postLogoutRedirectUri,
  children,
  autoIdleSessionLogout,
  idleTimeoutMinutes,
}: OidcProviderProps) => {
  const [oidcToken, setOidcToken] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | undefined>(
    undefined,
  );

  useEffect(() => {
    if (oidcToken) {
      setDecodedToken(decodeToken(oidcToken));
    }
  }, [oidcToken]);

  const oidcConfig = {
    authority: `${url}/realms/${realm}`,
    client_id: clientId,
    redirect_uri: generateRedirectUri(redirectUri, true),
    accessTokenExpiringNotificationTime: 15,
    post_logout_redirect_uri:
      postLogoutRedirectUri || generateRedirectUri(redirectUri, false),
  };

  const onSigninCallback = (user: User | undefined) => {
    // clear authentication params once logged in
    window.history.replaceState({}, document.title, window.location.pathname);

    if (!user?.access_token) return;
    setOidcToken(user?.access_token);
  };

  return (
    <OidcContext.Provider
      value={{
        oidcToken,
        setOidcToken,
        decodedToken,
        authenticationMethods,
      }}
    >
      <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
        <ProtectedApp
          autoIdleSessionLogout={autoIdleSessionLogout}
          idleTimeoutMinutes={idleTimeoutMinutes}
        >
          {children}
        </ProtectedApp>
      </AuthProvider>
    </OidcContext.Provider>
  );
};

export default OidcContext;
