declare global {
  interface Window {
    NONCE?: string;
    THEME_CLASS?: string;
    OIDC_URL: string;
    OIDC_REALM: string;
    OIDC_CLIENT_ID: string;
    OIDC_REDIRECT_URI: string;
    OIDC_POST_LOGOUT_REDIRECT_URI?: string;
    GRAPHQL_URI: string;
    REST_URI: string;
  }
}

export {};
