declare global {
  var NONCE: string | undefined;
  var THEME_CLASS: string | undefined;
  var OIDC_URL: string;
  var OIDC_REALM: string;
  var OIDC_CLIENT_ID: string;
  var OIDC_REDIRECT_URI: string;
  var OIDC_POST_LOGOUT_REDIRECT_URI: string | undefined;
  var GRAPHQL_URI: string;
  var REST_URI: string;
}

export {};
