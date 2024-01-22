import { Button } from "@gemeente-denhaag/components-react";
import { FormattedMessage } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import MobileMenuButton from "./MobileMenuButton";

interface LogoutProps {
  mobileMenu?: boolean;
}

const Logout = ({ mobileMenu }: LogoutProps) => {
  const { keycloak } = useKeycloak();
  const onClick = () => keycloak.logout();
  const message = <FormattedMessage id="header.logout" />;

  return !mobileMenu ? (
    <Button onClick={onClick}>{message}</Button>
  ) : (
    <MobileMenuButton onClick={onClick}>{message}</MobileMenuButton>
  );
};

export default Logout;
