import { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Heading5 } from "@gemeente-denhaag/components-react";
import { ChevronDownIcon } from "@gemeente-denhaag/icons";
import LayoutContext from "../contexts/LayoutContext";
import styles from "./CurrentPageIndicator.module.scss";
import { Navigation } from "./Layout";
import { useMatches } from "react-router-dom";
import { getCurrentNavigationPage } from "../utils/get-current-navigation-page";

interface CurrentPageIndicatorProps {
  navigationItems: Navigation[];
}

const CurrentPageIndicator = ({
  navigationItems,
}: CurrentPageIndicatorProps) => {
  const { showMenu, hideMobileMenu } = useContext(LayoutContext);
  const intl = useIntl();
  const matches = useMatches();
  const currentPage =
    getCurrentNavigationPage(matches, navigationItems) || navigationItems[0];

  return (
    <button
      onClick={() => {
        showMenu();
        hideMobileMenu();
      }}
      type="button"
      className={styles["current-page-indicator"]}
      title={intl.formatMessage({ id: "menu.open" })}
    >
      <header className={styles["current-page-indicator__header"]}>
        {currentPage?.icon && (
          <div className={styles["current-page-indicator__icon"]}>
            {currentPage.icon}
          </div>
        )}
        <Heading5 className={styles["current-page-indicator__heading"]}>
          <FormattedMessage
            id={`pageTitles.${currentPage?.titleTranslationKey}`}
          />
        </Heading5>
      </header>
      <div className={styles["current-page-indicator__chevron-down"]}>
        <ChevronDownIcon />
      </div>
    </button>
  );
};
export default CurrentPageIndicator;
