import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link } from "@gemeente-denhaag/link";
import { ChevronLeftIcon } from "@gemeente-denhaag/icons";
import styles from "./BackLink.module.scss";
import { PortalLink } from "..";
import LayoutContext from "../contexts/LayoutContext";

interface Props {
  href?: string;
  children?: React.ReactNode;
}

const BackLink = ({ href, children }: Props) => {
  const { hrefLang } = useContext(LocaleContext);
  const { history } = useContext(LayoutContext);

  console.log(href, history[1]);

  if (!href && !history[1]) return null;

  return (
    <div className={styles["back-link"]}>
      <Link
        Link={PortalLink}
        href={href || history[1]}
        icon={<ChevronLeftIcon />}
        iconAlign="start"
        hrefLang={hrefLang}
      >
        {children || <FormattedMessage id={`backlink.back`} />}
      </Link>
    </div>
  );
};

export default BackLink;
