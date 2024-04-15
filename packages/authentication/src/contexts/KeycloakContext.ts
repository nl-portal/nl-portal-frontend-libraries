import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { DecodedToken } from "../interfaces/decoded-token";
import { AuthenticationMethods } from "../components/KeycloakWrapper";

interface KeycloakContextInterface {
  keycloakToken: string;
  setKeycloakToken: (token: string) => void;
  decodedToken: DecodedToken | undefined;
  setDecodedToken: Dispatch<SetStateAction<DecodedToken | undefined>>;
  authenticationMethods?: AuthenticationMethods;
}

const KeycloakContext = React.createContext<KeycloakContextInterface>(
  {} as KeycloakContextInterface,
);

export default KeycloakContext;
