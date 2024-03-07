import { ReactElement, useEffect } from "react";
import { useIntl } from "react-intl";
import { NavigationItem } from "../interfaces/navigation-item";
import { useMatches } from "react-router-dom";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";

interface PageMetaDataProps {
  children: ReactElement;
  navigationItems: NavigationItem[][];
}

const PageMetaData = ({ children, navigationItems }: PageMetaDataProps) => {
  const intl = useIntl();
  const matches = useMatches();
  const currentPage =
    getCurrentNavigationPage(matches, navigationItems) || navigationItems[0][0];

  const pageTitle = intl.formatMessage({
    id: `pageTitles.${currentPage?.titleTranslationKey}`,
  });
  const appName = intl.formatMessage({ id: "app.appName" });
  const documentTitle = currentPage?.titleTranslationKey
    ? `${pageTitle} - ${appName}`
    : appName;
  const ENTRY_URL_KEY = "entryUrl";
  const entryUrl = sessionStorage.getItem(ENTRY_URL_KEY);

  if (entryUrl) {
    sessionStorage.removeItem(ENTRY_URL_KEY);
  }

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return children;
};

export default PageMetaData;
