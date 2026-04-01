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
    // Deprecated properties: remove window variables below in next major version
    MESSAGE_COUNT_POLLING_INTERVAL: number;
    REPORT_CHANGE_OF_ADDRESS_URL: string;
    ADDRESS_RESEARCH_MORE_INFO_URL: string;
    ADDRESS_RESEARCH_URL: string;
    REQUEST_FOR_CHANGE_BRP_INFO_URL: string;
    REQUEST_CONFIDENTIALITY_OF_DATA_URL: string;
    CHANGE_REGISTERED_GENDER_URL: string;
    CHANGE_IN_USE_OF_SURNAME_URL: string;
    OVERVIEW_MAINTENANCE_ALERT_TEXT_EN: string;
    OVERVIEW_MAINTENANCE_ALERT_TEXT_NL: string;
    OVERVIEW_MAINTENANCE_ALERT_TITLE_EN: string;
    OVERVIEW_MAINTENANCE_ALERT_TITLE_NL: string;
    // Deprecated toggles: remove window variables below in next major version
    CASES_PARTIAL_SEARCH: string;
    SHOW_CASE_RESULT_EXPLANATION: string;
    USE_LEGACY_OGONE_PAYMENT: string;
    MESSAGE_COUNT_ENABLE: string;
    SHOW_INHABITANT_AMOUNT: string;
    OPEN_PRODUCTEN: string;
    OVERVIEW_INTRO_ENABLED: string;
    OVERVIEW_MAINTENANCE_ALERT_ENABLED: string;
    USE_THEME_API: string;
  }
}

export {};
