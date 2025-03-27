import { config } from "../constants/config";

const verifyConfig = () => {
  if (!config.OIDC_CLIENT_ID) {
    console.log("OIDC_CLIENT_ID is not set");
    return null;
  }

  if (!config.OIDC_REALM) {
    console.log("OIDC_REALM is not set");
    return null;
  }

  if (!config.OIDC_URL) {
    console.log("OIDC_URL is not set");
    return null;
  }

  if (!config.OIDC_REDIRECT_URI) {
    console.log("OIDC_REDIRECT_URI is not set");
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
