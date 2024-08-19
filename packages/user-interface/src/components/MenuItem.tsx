import { useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { BadgeCounter } from "@gemeente-denhaag/components-react";
import styles from "./MenuItem.module.scss";
import LayoutContext from "../contexts/LayoutContext";
import { NavigationItem } from "../interfaces/navigation-item";
import { useGetUnopenedBerichtenCountQuery } from "@nl-portal/nl-portal-api";

interface MenuItemProps {
  item: NavigationItem;
  current?: boolean;
}

const MenuItem = ({ item, current = false }: MenuItemProps) => {
  const { hrefLang } = useContext(LocaleContext);
  const {
    hideMenu,
    messageCountPollingInterval,
    messagesCount,
    setMessagesCount,
  } = useContext(LayoutContext);

  useGetUnopenedBerichtenCountQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: { getUnopenedBerichtenCount: number }) => {
      setMessagesCount(data?.getUnopenedBerichtenCount || 0);
    },
    pollInterval: messageCountPollingInterval,
    fetchPolicy: "cache-and-network",
    skip: !item.hasMessagesCount,
    skipPollAttempt: () => {
      return !document.hasFocus();
    },
  });

  if (!item) return null;

  return (
    <Link
      to={item.path}
      onClick={hideMenu}
      hrefLang={hrefLang}
      className={classNames(
        "denhaag-menu-button",
        styles["denhaag-menu-button--flex"],
        {
          "denhaag-menu-button--active": current,
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
