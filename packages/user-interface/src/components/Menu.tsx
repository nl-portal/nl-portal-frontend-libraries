import { useContext } from "react";
import { Link, useMatches } from "react-router";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import {
  Sidenav,
  SidenavItem,
  SidenavLinkLabel,
  SidenavList,
} from "@gemeente-denhaag/sidenav";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";
import BadgeCounter from "@gemeente-denhaag/badge-counter";
import AppContext from "../contexts/AppContext";
import RouterContext from "../contexts/RouterContext";

const Menu = () => {
  const { hrefLang } = useContext(LocaleContext);
  const { messagesCount } = useContext(AppContext);
  const { navigationItems } = useContext(RouterContext);
  const matches = useMatches();
  const currentNavigationItem = getCurrentNavigationPage(
    matches,
    navigationItems,
  );

  return (
    <Sidenav>
      {navigationItems.map((array, index) => (
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
                  <SidenavLinkLabel>
                    <FormattedMessage
                      id={`pageTitles.${item.titleTranslationKey}`}
                    />
                    {item.hasMessagesCount && messagesCount > 0 && (
                      <BadgeCounter>{messagesCount}</BadgeCounter>
                    )}
                  </SidenavLinkLabel>
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
