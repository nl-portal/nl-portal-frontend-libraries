import { ReactNode, useContext, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import KeycloakContext from "../contexts/KeycloakContext";

export const ProtectedApp = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const { keycloakToken } = useContext(KeycloakContext);

  useEffect(() => {
    // Redirect to keycloak when not loading and user isn't authenticated or if there is no keycloak token in the state (after hard refresh for example)
    if (!auth.isLoading && (!auth.isAuthenticated || !keycloakToken)) {
      auth.signinRedirect();
    }
  }, [keycloakToken, auth.isLoading, auth.isAuthenticated]);

  // Placeholder for a spinner or something
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the children
  if (auth.isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, the redirect has already started
  return null;
};

export default ProtectedApp;
