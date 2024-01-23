import * as React from "react";

interface ApiContextInterface {
  restUri: string;
}

const ApiContext = React.createContext<ApiContextInterface>(
  {} as ApiContextInterface,
);

export default ApiContext;
