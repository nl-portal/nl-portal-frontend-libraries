import { Button } from "@gemeente-denhaag/button";
import { FormattedMessage } from "react-intl";
import { useAuth } from "react-oidc-context";
import MobileMenuButton from "./MobileMenuButton";

interface LogoutProps {
  mobileMenu?: boolean;
}

const Logout = ({ mobileMenu }: LogoutProps) => {
  const auth = useAuth();
  const onClick = () => auth.signoutRedirect();
  const message = <FormattedMessage id="header.logout" />;

  return !mobileMenu ? (
    <Button onClick={onClick}>{message}</Button>
  ) : (
    <MobileMenuButton onClick={onClick}>{message}</MobileMenuButton>
  );
};

export default Logout;
