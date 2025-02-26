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
  formatUrlTrailingSlash,
  OidcContext,
} from "@nl-portal/nl-portal-authentication";
import React from "react";
import { defaultInMemoryCacheOptions } from "../constants/apollo-cache";

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
  inMemoryCacheOptions = defaultInMemoryCacheOptions,
}: Props) => {
  const LOCAL_STORAGE_REST_URI_KEY = "REST_URI";
  const formattedGraphqlUri = formatUrlTrailingSlash(graphqlUri, false);
  const formattedRestUri = formatUrlTrailingSlash(restUri, false);
  const { oidcToken } = useContext(OidcContext);

  const getLink = useCallback(
    (oidcToken: string) =>
      new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${oidcToken}`,
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
        link: getLink(oidcToken),
      }),
  );

  useEffect(() => {
    client.setLink(getLink(oidcToken));
  }, [oidcToken, client, getLink]);

  sessionStorage.setItem(LOCAL_STORAGE_REST_URI_KEY, formattedRestUri);

  if (!oidcToken) null;

  return (
    <ApiContext.Provider value={{ restUri: formattedRestUri }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApiContext.Provider>
  );
};

export default ApiContext;
