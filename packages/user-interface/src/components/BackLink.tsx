import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link } from "@gemeente-denhaag/link";
import { LinkButton } from "@gemeente-denhaag/link-button";
import { ChevronLeftIcon } from "@gemeente-denhaag/icons";
import styles from "./BackLink.module.scss";
import { PortalLink } from "..";
import { useNavigate } from "react-router-dom";

export interface BackLinkProps {
  routePath?: string;
  text?: string;
}

const BackLink = ({ routePath, text }: BackLinkProps) => {
  const { hrefLang } = useContext(LocaleContext);
  const navigate = useNavigate();

  return (
    <div className={styles["back-link"]}>
      {routePath ? (
        <Link
          Link={PortalLink}
          href={routePath}
          icon={<ChevronLeftIcon />}
          iconAlign="start"
          hrefLang={hrefLang}
        >
          {text || <FormattedMessage id={`backlink.back`} />}
        </Link>
      ) : (
        <LinkButton inline onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
          <span>{text || <FormattedMessage id={`backlink.back`} />}</span>
        </LinkButton>
      )}
    </div>
  );
};

export default BackLink;
