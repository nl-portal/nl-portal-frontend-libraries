import { config } from "../constants/config";

const verifyConfig = () => {
  if (!config.KEYCLOAK_CLIENT_ID) {
    console.log("KEYCLOAK_CLIENT_ID is not set");
    return null;
  }

  if (!config.KEYCLOAK_REALM) {
    console.log("KEYCLOAK_REALM is not set");
    return null;
  }

  if (!config.KEYCLOAK_URL) {
    console.log("KEYCLOAK_URL is not set");
    return null;
  }

  if (!config.KEYCLOAK_REDIRECT_URI) {
    console.log("KEYCLOAK_REDIRECT_URI is not set");
    return null;
  }

  if (!config.GRAPHQL_URI) {
    console.log("GRAPHQL_URI is not set");
    return null;
  }

  if (!config.REST_URI) {
    console.log("REST_URI is not set");
    return null;
  }

  return true;
};

export default verifyConfig;
