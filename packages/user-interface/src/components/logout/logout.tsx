import { Button } from "@gemeente-denhaag/components-react";
import { FormattedMessage } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import { FC } from "react";
import { MobileMenuButton } from "../mobile-menu-button";

interface LogoutProps {
  mobileMenu?: boolean;
}

const Logout: FC<LogoutProps> = ({ mobileMenu }) => {
  const { keycloak } = useKeycloak();
  const onClick = () => keycloak.logout();
  const message = <FormattedMessage id="header.logout" />;

  return !mobileMenu ? (
    <Button onClick={onClick}>{message}</Button>
  ) : (
    <MobileMenuButton onClick={onClick}>{message}</MobileMenuButton>
  );
};

export { Logout };
