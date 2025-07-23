import { useContext } from "react";
import { Link, useMatches } from "react-router";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import {
  SideNavigationBase,
  SideNavigationItem,
  SideNavigationLinkLabel,
  SideNavigationList,
} from "@gemeente-denhaag/side-navigation";
import { NavigationItem } from "../interfaces/navigation-item";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";
import { NumberBadge } from "@gemeente-denhaag/number-badge";
import AppContext from "../contexts/AppContext";

interface Props {
  items: NavigationItem[][];
}

const Menu = ({ items }: Props) => {
  const { hrefLang } = useContext(LocaleContext);
  const { messagesCount } = useContext(AppContext);
  const matches = useMatches();
  const currentNavigationItem = getCurrentNavigationPage(matches, items);

  return (
    <SideNavigationBase>
      {items.map((array, index) => (
        <SideNavigationList key={`sidenav-list-${index}`}>
          {array.map((item) => {
            const current = item === currentNavigationItem;
            const className = `denhaag-side-navigation__link ${
              current && "denhaag-side-navigation__link--current"
            }`;

            return (
              <SideNavigationItem key={item.path}>
                <Link className={className} hrefLang={hrefLang} to={item.path}>
                  {item.icon}
                  <SideNavigationLinkLabel>
                    <FormattedMessage
                      id={`pageTitles.${item.titleTranslationKey}`}
                    />
                    {item.hasMessagesCount && messagesCount > 0 && (
                      <NumberBadge>{messagesCount}</NumberBadge>
                    )}
                  </SideNavigationLinkLabel>
                </Link>
              </SideNavigationItem>
            );
          })}
        </SideNavigationList>
      ))}
    </SideNavigationBase>
  );
};

export default Menu;
