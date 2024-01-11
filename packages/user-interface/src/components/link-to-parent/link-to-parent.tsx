import { FC, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link } from "@gemeente-denhaag/link";
import { ChevronLeftIcon } from "@gemeente-denhaag/icons";
import Skeleton from "react-loading-skeleton";
import styles from "./link-to-parent.module.scss";
import { PortalPage } from "../../interfaces";

interface LinkToParentProps {
  parentPage?: PortalPage;
  routePath?: string;
  text?: string;
}

const LinkToParent: FC<LinkToParentProps> = ({
  parentPage,
  routePath,
  text,
}) => {
  const { hrefLang } = useContext(LocaleContext);
  const intl = useIntl();

  return (
    <div className={styles["link-to-parent"]}>
      <Link
        component={RouterLink}
        to={routePath || parentPage?.path || "/"}
        icon={<ChevronLeftIcon />}
        iconAlign="start"
        hrefLang={hrefLang}
      >
        {text ||
          (parentPage?.titleTranslationKey ? (
            <FormattedMessage
              id={`pageTitles.${parentPage?.titleTranslationKey}`}
            />
          ) : (
            <span
              aria-busy
              aria-disabled
              aria-label={intl.formatMessage({ id: "element.loading" })}
            >
              <Skeleton width={100} />
            </span>
          ))}
      </Link>
    </div>
  );
};

export { LinkToParent };
