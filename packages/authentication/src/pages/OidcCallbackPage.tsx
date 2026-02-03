import { Navigate, useSearchParams } from "react-router";

const OidcCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");
  let to = "/";

  if (redirectUrl) {
    try {
      const url = new URL(redirectUrl, window.location.origin);
      if (url.origin === window.location.origin) {
        to = url.pathname + url.search + url.hash;
      }
    } catch {
      to = "/";
    }
  }

  return <Navigate to={to} replace />;
};

export default OidcCallbackPage;
