import { Button } from "@gemeente-denhaag/button";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import LayoutContext from "../contexts/LayoutContext";

const MenuToggleButton = () => {
  const { showMobileMenu, hideMobileMenu, mobileMenuOpened } =
    useContext(LayoutContext);

  return (
    <Button
      onClick={() => (mobileMenuOpened ? hideMobileMenu() : showMobileMenu())}
    >
      <FormattedMessage id="header.menuButton" />
    </Button>
  );
};
export default MenuToggleButton;
