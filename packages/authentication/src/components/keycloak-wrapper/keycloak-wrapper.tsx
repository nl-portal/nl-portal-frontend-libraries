import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak, {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakOnLoad,
} from 'keycloak-js';
import {FC, Fragment, useContext, useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import {formatUrlTrailingSlash} from '../../utils';
import {KeycloakContext} from '../../contexts';
import {DecodedToken} from '../../interfaces';

interface KeycloakWrapperProps extends KeycloakConfig {
  redirectUri: string;
  autoRefreshToken?: boolean;
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
  minValiditySeconds?: number;
  onLoad?: KeycloakOnLoad;
}

interface IdleTimerProps {
  idleTimeoutMinutes: number;
  onTimerReset: () => void;
}

const BASIC_ACTIVITY_EVENTS: string[] = [
  'mousedown',
  'keydown',
  'pointerdown',
  'touchstart',
  'scroll',
  'wheel',
  'audiostart',
];

const IdleTimer: FC<IdleTimerProps> = ({idleTimeoutMinutes, onTimerReset}) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const resetTimer = () => {
    onTimerReset(); // Updates the accesstoken if necessary
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      window.location.reload(); // Refresh to check with Keycloak if session is still valid
    }, 1000 * 60 * idleTimeoutMinutes); // Should be 15 minutes to comply with DigiD requirements: SSO session idle + 2 minute (internal Keycloak buffer time).
  };

  useEffect(() => {
    // initiate timeout
    resetTimer();

    // listen for activity events
    BASIC_ACTIVITY_EVENTS.forEach(eventType => {
      window.addEventListener(eventType, resetTimer);
    });

    // cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        BASIC_ACTIVITY_EVENTS.forEach(eventType => {
          window.removeEventListener(eventType, resetTimer);
        });
      }
    };
  }, []);
  return <React.Fragment />;
};

const KeycloakProvider: FC<KeycloakWrapperProps> = ({
  children,
  url,
  clientId,
  realm,
  redirectUri,
  autoRefreshToken = false,
  autoIdleSessionLogout = true,
  idleTimeoutMinutes = 15,
  minValiditySeconds = 30,
  onLoad = 'login-required',
}) => {
  const {setKeycloakToken, setDecodedToken} = useContext(KeycloakContext);
  const [authClient] = useState(
    () =>
      new (Keycloak as any)({
        url: formatUrlTrailingSlash(`${url}`, false),
        clientId,
        realm,
      }) as KeycloakInstance
  );
  const initOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad,
    flow: 'standard',
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
      onTokens={({token}) => {
        setKeycloakToken(token || '');
        if (token) setDecodedToken(decodeToken(token));
      }}
      onEvent={eventType => {
        if (eventType === 'onAuthRefreshError') {
          authClient.logout();
        }
      }}
    >
      {autoIdleSessionLogout && (
        <IdleTimer onTimerReset={updateToken} idleTimeoutMinutes={idleTimeoutMinutes} />
      )}
      {children}
    </ReactKeycloakProvider>
  );
};

const KeycloakWrapper: FC<KeycloakWrapperProps> = props => {
  const [keycloakToken, setKeycloakToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(undefined);
  const ENTRY_URL_KEY = 'entryUrl';
  const entryUrl = sessionStorage.getItem(ENTRY_URL_KEY);

  if (!entryUrl) {
    const {host, href} = window.location;
    const splitHref = href.split(host);
    const entryUrlPart = splitHref[1];
    sessionStorage.setItem(ENTRY_URL_KEY, !entryUrlPart.includes('keycloak') ? entryUrlPart : '/');
  }

  return (
    <KeycloakContext.Provider
      value={{
        keycloakToken,
        setKeycloakToken,
        decodedToken,
        setDecodedToken,
      }}
    >
      <KeycloakProvider {...props} />
    </KeycloakContext.Provider>
  );
};

export {KeycloakWrapper};
