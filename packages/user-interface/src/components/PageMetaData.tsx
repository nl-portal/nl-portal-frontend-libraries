import { useEffect } from "react";
import { useIntl } from "react-intl";
import { NavigationItem } from "../interfaces/navigation-item";
import { useMatches } from "react-router-dom";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";

interface PageMetaDataProps {
  navigationItems: NavigationItem[][];
}

const PageMetaData = ({ navigationItems }: PageMetaDataProps) => {
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

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return null;
};

export default PageMetaData;
