import { PropsWithChildren, ReactNode, useContext, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import KeycloakContext from "../contexts/KeycloakContext";
import { decodeToken } from "../utils/decode-token";
import IdleTimer from "./IdleTimer";

export type ProtectedAppProps = {
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
};

export const ProtectedApp = ({
  autoIdleSessionLogout = true,
  idleTimeoutMinutes = 5,
  children,
}: PropsWithChildren<ProtectedAppProps>) => {
  const auth = useAuth();
  const { keycloakToken, setKeycloakToken, setDecodedToken } =
    useContext(KeycloakContext);

  useEffect(() => {
    // Redirect to keycloak when not loading and user isn't authenticated or if there is no keycloak token in the state (after hard refresh for example)
    if (!auth.isLoading && (!auth.isAuthenticated || !keycloakToken)) {
      auth.signinRedirect();
    }
  }, [keycloakToken, auth.isLoading, auth.isAuthenticated]);

  useEffect(() => {
    console.log("auth.events effect");
    return auth.events.addUserLoaded(() => {
      console.log("User Session Changed!");
      const newToken = auth.user?.access_token;
      if (newToken) {
        setKeycloakToken(newToken);
        setDecodedToken(decodeToken(newToken));
      }
    });
  }, [auth.events]);

  // Placeholder for a spinner or something
  if (auth.isLoading) {
    return <div></div>;
  }

  // If authenticated, render the children
  if (auth.isAuthenticated) {
    return (
      <>
        {autoIdleSessionLogout && (
          <IdleTimer
            idleTimeoutMinutes={idleTimeoutMinutes}
            onTimeOut={auth.signoutRedirect}
          />
        )}
        {children}
      </>
    );
  }

  // If not authenticated, the redirect has already started
  return null;
};

export default ProtectedApp;
