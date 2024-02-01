import { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronDownIcon, Heading5 } from "@gemeente-denhaag/components-react";
import LayoutContext from "../contexts/LayoutContext";
import styles from "./CurrentPageIndicator.module.scss";

const CurrentPageIndicator = () => {
  const { currentPage, showMenu, hideMobileMenu } = useContext(LayoutContext);
  const intl = useIntl();

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
