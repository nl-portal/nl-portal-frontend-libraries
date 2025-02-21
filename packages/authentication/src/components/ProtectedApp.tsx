import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import KeycloakContext from "../contexts/KeycloakContext";
import IdleTimer from "./IdleTimer";
import Modal from "@gemeente-denhaag/modal";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage, useIntl } from "react-intl";

export type ProtectedAppProps = {
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
  showAutomaticLogoutWarning?: boolean;
};

export const ProtectedApp = ({
  autoIdleSessionLogout = true,
  idleTimeoutMinutes = 15,
  showAutomaticLogoutWarning = true,
  children,
}: PropsWithChildren<ProtectedAppProps>) => {
  const auth = useAuth();
  const { keycloakToken, setKeycloakToken } = useContext(KeycloakContext);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    // Redirect to keycloak when not loading and user isn't authenticated or if there is no keycloak token in the state (after hard refresh for example)
    if (!auth.isLoading && (!auth.isAuthenticated || !keycloakToken)) {
      auth.signinRedirect();
    }
  }, [keycloakToken, auth.isLoading, auth.isAuthenticated]);

  useEffect(() => {
    return auth.events.addUserLoaded((user) =>
      setKeycloakToken(user.access_token),
    );
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
          <>
            <IdleTimer
              idleTimeoutMinutes={idleTimeoutMinutes}
              onTimeOut={auth.signoutRedirect}
              onWarning={
                showAutomaticLogoutWarning
                  ? () => setShowLogoutWarning(true)
                  : undefined
              }
            />
            {showLogoutWarning && (
              <Modal
                open={showLogoutWarning}
                title={intl.formatMessage({ id: "auth.inactive.title" })}
                closeLabel={intl.formatMessage({ id: "auth.inactive.close" })}
                onToggle={(open) => setShowLogoutWarning(open)}
                actions={(toggle) => [
                  {
                    children: intl.formatMessage({
                      id: "auth.inactive.logout",
                    }),
                    variant: "secondary-action",
                    onClick: () => {
                      auth.signoutRedirect();
                    },
                  },
                  {
                    children: intl.formatMessage({
                      id: "auth.inactive.stayLoggedIn",
                    }),
                    variant: "primary-action",
                    onClick: () => {
                      setShowLogoutWarning(false);
                      toggle();
                    },
                  },
                ]}
              >
                <Paragraph>
                  <FormattedMessage id="auth.inactive.text" />
                </Paragraph>
              </Modal>
            )}
          </>
        )}
        {children}
      </>
    );
  }

  // If not authenticated, the redirect has already started
  return null;
};

export default ProtectedApp;
