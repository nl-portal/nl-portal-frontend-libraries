import * as React from "react";
import { FC, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Sidenav, SidenavItem, SidenavList } from "@gemeente-denhaag/sidenav";
import { Heading4, IconButton } from "@gemeente-denhaag/components-react";
import { CloseIcon } from "@gemeente-denhaag/icons";
import classNames from "classnames";
import LayoutContext from "../contexts/LayoutContext";
import { PortalPage } from "../interfaces/portal-page";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

interface MenuProps {
  items: Array<PortalPage>;
  legacy?: boolean;
}

const Menu: FC<MenuProps> = ({ items, legacy }) => {
  const location = useLocation();
  const { hrefLang } = useContext(LocaleContext);
  const { menuOpened, hideMenu } = useContext(LayoutContext);
  const intl = useIntl();

  const getBasePath = (url: string) => {
    const splitUrl = url.split("/");
    if (splitUrl.length > 0) {
      return splitUrl[1];
    }
    return url;
  };

  if (legacy) {
    return (
      <aside
        className={classNames(styles.menu, {
          [styles["menu--hidden"]]: !menuOpened,
        })}
      >
        <div className={styles.menu__inner}>
          <header className={styles.menu__header}>
            <Heading4>
              <FormattedMessage id="app.appName" />
            </Heading4>
            {React.cloneElement(
              <IconButton onClick={hideMenu}>
                <CloseIcon />
              </IconButton>,
              { title: intl.formatMessage({ id: "menu.close" }) },
            )}
          </header>
          <nav className={styles.menu__items}>
            {items
              .filter((item) => item.showInMenu)
              .map((item) => (
                <MenuItem key={item.path} item={item} />
              ))}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <Sidenav>
      <SidenavList>
        {items
          .filter((item) => item.showInMenu)
          .map((item) => {
            const current =
              getBasePath(location.pathname) === getBasePath(item.path);
            const className = `denhaag-sidenav__link ${
              current && "denhaag-sidenav__link--current"
            }`;
            return (
              <SidenavItem key={item.path}>
                <Link className={className} hrefLang={hrefLang} to={item.path}>
                  {item.icon}
                  <FormattedMessage
                    id={`pageTitles.${item.titleTranslationKey}`}
                  />
                </Link>
              </SidenavItem>
            );
          })}
      </SidenavList>
    </Sidenav>
  );
};

export default Menu;
