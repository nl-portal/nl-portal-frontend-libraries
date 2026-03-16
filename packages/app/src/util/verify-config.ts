const verifyConfig = () => {
  if (!globalThis.OIDC_CLIENT_ID) {
    console.log("OIDC_CLIENT_ID is not set");
    return null;
  }

  if (!globalThis.OIDC_REALM) {
    console.log("OIDC_REALM is not set");
    return null;
  }

  if (!globalThis.OIDC_URL) {
    console.log("OIDC_URL is not set");
    return null;
  }

  if (!globalThis.OIDC_REDIRECT_URI) {
    console.log("OIDC_REDIRECT_URI is not set");
    return null;
  }

  if (!globalThis.GRAPHQL_URI) {
    console.log("GRAPHQL_URI is not set");
    return null;
  }

  if (!globalThis.REST_URI) {
    console.log("REST_URI is not set");
    return null;
  }

  return true;
};

export default verifyConfig;
