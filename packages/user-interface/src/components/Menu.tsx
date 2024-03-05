import * as React from "react";
import { useContext } from "react";
import { Link, useMatches } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Sidenav, SidenavItem, SidenavList } from "@gemeente-denhaag/sidenav";
import { Heading4, IconButton } from "@gemeente-denhaag/components-react";
import { CloseIcon } from "@gemeente-denhaag/icons";
import classNames from "classnames";
import LayoutContext from "../contexts/LayoutContext";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import { NavigationItem } from "../interfaces/navigation-item";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";
import SidenavDivider from "./SidenavDivider";

interface Props {
  items: NavigationItem[];
  legacy?: boolean;
}

const Menu = ({ items, legacy }: Props) => {
  const { hrefLang } = useContext(LocaleContext);
  const { menuOpened, hideMenu } = useContext(LayoutContext);
  const intl = useIntl();
  const matches = useMatches();
  const currentNavigationItem =
    getCurrentNavigationPage(matches, items) || items[0];

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
            {items.map((item) => {
              if (!item) return <SidenavDivider key={Math.random()} />;
              return (
                <MenuItem
                  key={item.path}
                  item={item}
                  current={item === currentNavigationItem}
                />
              );
            })}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <Sidenav>
      <SidenavList>
        {items.map((item) => {
          const current = item === currentNavigationItem;
          const className = `denhaag-sidenav__link ${
            current && "denhaag-sidenav__link--current"
          }`;

          if (!item) return <SidenavDivider key={Math.random()} />;

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
