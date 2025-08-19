import { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { useMatches } from "react-router";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";
import RouterContext from "../contexts/RouterContext";

// TODO: heeft wat aandacht nodig, React heeft nieuwe api waar dit makkelijker kan
const PageMetaData = () => {
  const intl = useIntl();
  const matches = useMatches();
  const { navigationItems } = useContext(RouterContext);
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
