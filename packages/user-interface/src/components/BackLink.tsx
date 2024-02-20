import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link } from "@gemeente-denhaag/link";
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

  // TODO: in the future, the Link should be a button that looks like a link if the action is a onClick.
  const backLinkAction = routePath
    ? { href: routePath }
    : { onClick: () => navigate(-1) };

  return (
    <div className={styles["back-link"]}>
      <Link
        Link={PortalLink}
        {...backLinkAction}
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
