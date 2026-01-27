declare global {
  interface Window {
    OIDC_URL: string;
    OIDC_REALM: string;
    OIDC_CLIENT_ID: string;
    OIDC_REDIRECT_URI: string;
    OIDC_POST_LOGOUT_REDIRECT_URI?: string;
    GRAPHQL_URI: string;
    REST_URI: string;
    SHOW_INHABITANT_AMOUNT: string;
    ADDRESS_RESEARCH_URL: string;
    REPORT_CHANGE_OF_ADDRESS_URL: string;
    CHANGE_IN_USE_OF_SURNAME_URL: string;
    CHANGE_REGISTERED_GENDER_URL: string;
    ADDRESS_RESEARCH_MORE_INFO_URL: string;
    REQUEST_FOR_CHANGE_BRP_INFO_URL: string;
    REQUEST_CONFIDENTIALITY_OF_DATA_URL: string;
    THEME_CLASS: string;
    MESSAGE_COUNT_ENABLE: string;
    MESSAGE_COUNT_POLLING_INTERVAL: number;
    CASES_PARTIAL_SEARCH: string;
    OPEN_PRODUCTEN: string;
    USE_LEGACY_OGONE_PAYMENT: string;
    USE_THEME_API: string;
    SHOW_CASE_RESULT_EXPLANATION: string;
    ENABLE_EMAIL_VALIDATION: string;
    ENABLE_PHONE_VALIDATION: string;
  }
}

export {};
