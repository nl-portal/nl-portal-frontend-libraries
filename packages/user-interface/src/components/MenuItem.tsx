import { FC, useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link, useMatch } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { BadgeCounter } from "@gemeente-denhaag/components-react";
import styles from "./MenuItem.module.scss";
import LayoutContext from "../contexts/LayoutContext";
import { Navigation } from "./Layout";

interface MenuItemProps {
  item: Navigation;
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const { hrefLang } = useContext(LocaleContext);
  const { hideMenu, messagesCount } = useContext(LayoutContext);
  const isActive = Boolean(useMatch(item.path));

  return (
    <Link
      to={item.path}
      onClick={hideMenu}
      hrefLang={hrefLang}
      className={classNames(
        "denhaag-menu-button",
        styles["denhaag-menu-button--flex"],
        {
          "denhaag-menu-button--active": isActive,
        },
      )}
    >
      {item.icon && (
        <div className={styles["denhaag-menu-button__icon"]}>{item.icon}</div>
      )}
      <FormattedMessage id={`pageTitles.${item.titleTranslationKey}`} />
      {item.hasMessagesCount && messagesCount > 0 && (
        <div className={styles["denhaag-menu-button__counter"]}>
          <BadgeCounter>{messagesCount}</BadgeCounter>
        </div>
      )}
    </Link>
  );
};

export default MenuItem;
