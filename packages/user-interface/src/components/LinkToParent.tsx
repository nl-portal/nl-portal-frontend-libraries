import { FC, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { ChevronLeftIcon, Link } from "@gemeente-denhaag/components-react";
import Skeleton from "react-loading-skeleton";
import styles from "./LinkToParent.module.scss";
import { PortalPage } from "../interfaces/portal-page";
import { PortalLink } from "..";

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
        Link={PortalLink}
        href={routePath || parentPage?.path || "/"}
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

export default LinkToParent;
