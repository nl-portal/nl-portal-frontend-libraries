const verifyConfig = () => {
  if (!window.OIDC_CLIENT_ID) {
    console.log("OIDC_CLIENT_ID is not set");
    return null;
  }

  if (!window.OIDC_REALM) {
    console.log("OIDC_REALM is not set");
    return null;
  }

  if (!window.OIDC_URL) {
    console.log("OIDC_URL is not set");
    return null;
  }

  if (!window.OIDC_REDIRECT_URI) {
    console.log("OIDC_REDIRECT_URI is not set");
    return null;
  }

  if (!window.GRAPHQL_URI) {
    console.log("GRAPHQL_URI is not set");
    return null;
  }

  if (!window.REST_URI) {
    console.log("REST_URI is not set");
    return null;
  }

  return true;
};

export default verifyConfig;
