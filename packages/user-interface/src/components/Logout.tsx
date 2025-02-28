import { Button } from "@gemeente-denhaag/button";
import { FormattedMessage } from "react-intl";
import MobileMenuButton from "./MobileMenuButton";
import { useLogout } from "@nl-portal/nl-portal-authentication";

interface LogoutProps {
  mobileMenu?: boolean;
}

const Logout = ({ mobileMenu }: LogoutProps) => {
  const { logout } = useLogout();
  const onClick = () => logout();
  const message = <FormattedMessage id="header.logout" />;

  return !mobileMenu ? (
    <Button onClick={onClick}>{message}</Button>
  ) : (
    <MobileMenuButton onClick={onClick}>{message}</MobileMenuButton>
  );
};

export default Logout;
