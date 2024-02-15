import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link } from "@gemeente-denhaag/link";
import { ChevronLeftIcon } from "@gemeente-denhaag/icons";
import styles from "./BackLink.module.scss";
import { PortalLink } from "..";
import { useMatches } from "react-router-dom";

export interface BackLinkProps {
  routePath?: string;
  text?: string;
}

const BackLink = ({ routePath, text }: BackLinkProps) => {
  const { hrefLang } = useContext(LocaleContext);
  const matches = useMatches();
  const defaultBackLinkPath = matches?.slice(-2, -1)?.pop()?.pathname || "/";

  return (
    <div className={styles["back-link"]}>
      <Link
        Link={PortalLink}
        href={routePath || defaultBackLinkPath}
        icon={<ChevronLeftIcon />}
        iconAlign="start"
        hrefLang={hrefLang}
      >
        {text || <FormattedMessage id={`backlink.back`} />}
      </Link>
    </div>
  );
};

export default BackLink;
