import * as React from "react";
import { useContext } from "react";
import { Link, useMatches } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Sidenav, SidenavItem, SidenavList } from "@gemeente-denhaag/sidenav";
import { IconButton } from "@gemeente-denhaag/components-react";
import { CloseIcon } from "@gemeente-denhaag/icons";
import classNames from "classnames";
import LayoutContext from "../contexts/LayoutContext";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import { NavigationItem } from "../interfaces/navigation-item";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";
import Heading from "./Heading";

interface Props {
  items: NavigationItem[][];
  legacy?: boolean;
}

const Menu = ({ items, legacy }: Props) => {
  const { hrefLang } = useContext(LocaleContext);
  const { menuOpened, hideMenu } = useContext(LayoutContext);
  const intl = useIntl();
  const matches = useMatches();
  const currentNavigationItem = getCurrentNavigationPage(matches, items);

  if (legacy) {
    return (
      <aside
        className={classNames(styles.menu, {
          [styles["menu--hidden"]]: !menuOpened,
        })}
      >
        <div className={styles.menu__inner}>
          <header className={styles.menu__header}>
            <Heading as="h4">
              <FormattedMessage id="app.appName" />
            </Heading>
            {React.cloneElement(
              <IconButton onClick={hideMenu}>
                <CloseIcon />
              </IconButton>,
              { title: intl.formatMessage({ id: "menu.close" }) },
            )}
          </header>
          <nav className={styles.menu__items}>
            {items.map((array) =>
              array.map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  current={item === currentNavigationItem}
                />
              )),
            )}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <Sidenav>
      {items.map((array, index) => (
        <SidenavList key={`sidenav-list-${index}`}>
          {array.map((item) => {
            const current = item === currentNavigationItem;
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
      ))}
    </Sidenav>
  );
};

export default Menu;
