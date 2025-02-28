import { useAuth } from "react-oidc-context";

const useLogout = () => {
  const auth = useAuth();

  return { logout: auth.signoutRedirect };
};

export default useLogout;
