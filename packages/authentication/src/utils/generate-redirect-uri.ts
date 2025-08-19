import { formatUrlTrailingSlash } from "./format-url-trailing-slash";

const generateRedirectUri = (
  redirectUri: string,
  includeRedirectPath?: boolean,
) => {
  const oidcPath = new URL(redirectUri).pathname;
  const redirectUrl = new URL(window.location.href);
  const redirectPath = redirectUrl.pathname + redirectUrl.search;
  const redirectParam =
    includeRedirectPath && redirectPath !== "/" && redirectPath !== oidcPath
      ? `?redirect_url=${encodeURIComponent(redirectPath)}`
      : "";

  return formatUrlTrailingSlash(redirectUri + redirectParam, false);
};

export default generateRedirectUri;
