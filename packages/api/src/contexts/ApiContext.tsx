import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
} from "@apollo/client";
import {
  KeycloakContext,
  formatUrlTrailingSlash,
} from "@nl-portal/nl-portal-authentication";
import { TOKEN_KEY, TOKEN_OBJECT } from "../constants/token";
import React from "react";

interface ContextProps {
  restUri: string;
}

const ApiContext = createContext({} as ContextProps);

interface Props {
  children: React.ReactNode;
  graphqlUri: string;
  restUri: string;
  inMemoryCacheOptions?: InMemoryCacheConfig;
}

export const ApiProvider = ({
  children,
  graphqlUri,
  restUri,
  inMemoryCacheOptions,
}: Props) => {
  const LOCAL_STORAGE_REST_URI_KEY = "REST_URI";
  const formattedGraphqlUri = formatUrlTrailingSlash(graphqlUri, false);
  const formattedRestUri = formatUrlTrailingSlash(restUri, false);
  const { keycloakToken } = useContext(KeycloakContext);

  const getLink = useCallback(
    (keycloakToken: string) =>
      new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${keycloakToken}`,
          },
        });
        return forward(operation);
      }).concat(new HttpLink({ uri: formattedGraphqlUri })),
    [formattedGraphqlUri],
  );

  const [client] = useState(
    () =>
      new ApolloClient({
        uri: formattedGraphqlUri,
        cache: new InMemoryCache(inMemoryCacheOptions),
        link: getLink(keycloakToken),
      }),
  );

  useEffect(() => {
    client.setLink(getLink(keycloakToken));
    TOKEN_OBJECT[TOKEN_KEY] = keycloakToken;
  }, [keycloakToken, client, getLink]);

  sessionStorage.setItem(LOCAL_STORAGE_REST_URI_KEY, formattedRestUri);

  if (!keycloakToken) null;

  return (
    <ApiContext.Provider value={{ restUri: formattedRestUri }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApiContext.Provider>
  );
};

export default ApiContext;
