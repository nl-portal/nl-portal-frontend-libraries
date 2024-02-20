import * as React from "react";
import { FC, useContext } from "react";
import { Link, useMatch } from "react-router-dom";
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

interface MenuProps {
  items: NavigationItem[];
  legacy?: boolean;
}

const Menu: FC<MenuProps> = ({ items, legacy }) => {
  const { hrefLang } = useContext(LocaleContext);
  const { menuOpened, hideMenu } = useContext(LayoutContext);
  const intl = useIntl();

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
            {items.map((item) => (
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
        {items.map((item) => {
          const current = useMatch(item.path);
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
