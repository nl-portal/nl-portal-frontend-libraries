import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import IdleTimer from "./IdleTimer";
import Modal from "@gemeente-denhaag/modal";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage, useIntl } from "react-intl";
import { OidcContext } from "../providers/OidcProvider";

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
  const { oidcToken, setOidcToken } = useContext(OidcContext);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    // Redirect to oidc provider when not loading and user isn't authenticated or if there is no oidc token in the state (after hard refresh for example)
    if (!auth.isLoading && (!auth.isAuthenticated || !oidcToken)) {
      auth.signinRedirect();
    }
  }, [oidcToken, auth.isLoading, auth.isAuthenticated]);

  useEffect(() => {
    return auth.events.addUserLoaded((user) => setOidcToken(user.access_token));
  }, [auth.events]);

  // Placeholder for a spinner or something
  if (auth.isLoading || !auth.isAuthenticated) {
    return null;
  }

  // If authenticated, render the children
  return (
    <>
      {autoIdleSessionLogout && (
        <>
          <IdleTimer
            idleTimeoutMinutes={idleTimeoutMinutes}
            onTimeOut={auth.signoutRedirect}
          />
          {showAutomaticLogoutWarning && (
            <IdleTimer
              idleTimeoutMinutes={idleTimeoutMinutes - 5}
              onTimeOut={() => setShowLogoutWarning(true)}
            />
          )}
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
};

export default ProtectedApp;
