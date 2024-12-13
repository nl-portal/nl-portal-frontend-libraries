import { Navigate, useSearchParams } from "react-router-dom";

const KeycloakCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  try {
    if (redirectUrl) new URL(redirectUrl);
    return <Navigate to="/" />;
  } catch {
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }
};

export default KeycloakCallbackPage;
