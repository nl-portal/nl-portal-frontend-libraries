import * as React from "react";
import { DecodedToken } from "../interfaces/decoded-token";
import { AuthenticationMethods } from "../components/OidcWrapper";

interface OidcContextInterface {
  oidcToken: string;
  setOidcToken: (token: string) => void;
  decodedToken: DecodedToken | undefined;
  authenticationMethods?: AuthenticationMethods;
}

const OidcContext = React.createContext<OidcContextInterface>(
  {} as OidcContextInterface,
);

export default OidcContext;
