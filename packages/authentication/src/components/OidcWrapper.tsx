import React, { useEffect } from "react";
import { AuthProvider } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { useContext, useState } from "react";
import OidcContext from "../contexts/OidcContext";
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

export type OidcWrapperProps = OidcConfig &
  SessionLengthManagementProps & {
    children: React.ReactNode;
    authenticationMethods?: AuthenticationMethods;
  };

const generateRedirectUri = (redirectUri: string) => {
  const oidcPath = new URL(redirectUri).pathname;
  const redirectUrl = new URL(window.location.href);
  const redirectPath = redirectUrl.pathname + redirectUrl.search;
  const redirectParam =
    redirectPath !== "/" && redirectPath !== oidcPath
      ? `?redirect_url=${encodeURIComponent(redirectPath)}`
      : "";

  return formatUrlTrailingSlash(redirectUri + redirectParam, false);
};

const OidcProvider = ({
  url,
  clientId,
  realm,
  redirectUri,
  children,
  autoIdleSessionLogout,
  idleTimeoutMinutes,
}: OidcWrapperProps) => {
  const { setOidcToken } = useContext(OidcContext);

  const oidcConfig = {
    authority: `${url}/realms/${realm}`,
    client_id: clientId,
    redirect_uri: generateRedirectUri(redirectUri),
    accessTokenExpiringNotificationTime: 15,
  };

  const onSigninCallback = (user: User | undefined) => {
    // clear authentication params once logged in
    window.history.replaceState({}, document.title, window.location.pathname);

    if (!user?.access_token) return;
    setOidcToken(user?.access_token);
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

const OidcWrapper = ({ authenticationMethods, ...props }: OidcWrapperProps) => {
  const [oidcToken, setOidcToken] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | undefined>(
    undefined,
  );

  useEffect(() => {
    if (oidcToken) {
      setDecodedToken(decodeToken(oidcToken));
    }
  }, [oidcToken]);

  return (
    <OidcContext.Provider
      value={{
        oidcToken,
        setOidcToken,
        decodedToken,
        authenticationMethods,
      }}
    >
      <OidcProvider {...props} />
    </OidcContext.Provider>
  );
};

export default OidcWrapper;
