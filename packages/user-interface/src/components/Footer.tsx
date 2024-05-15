import * as React from "react";
import { FormattedMessage } from "react-intl";
import { FC, ReactElement, useContext } from "react";
import { Link } from "@gemeente-denhaag/components-react";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import classNames from "classnames";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { PortalFooter } from "../interfaces/portal-footer";
import styles from "./Footer.module.scss";
import Heading from "./Heading";

interface FooterProps {
  footer: PortalFooter;
  facet?: ReactElement;
}

const Footer: FC<FooterProps> = ({ footer, facet }) => {
  const { hrefLang } = useContext(LocaleContext);

  return (
    <footer className={styles.footer}>
      {facet && (
        <div className={styles["footer__facet-container"]}>
          {React.cloneElement(facet, {
            className: styles["footer__facet-image"],
          })}
        </div>
      )}
      <ResponsiveContent className={styles.footer__inner}>
        {footer
          .filter((column) =>
            column.links.find((link) => link.hrefLang === hrefLang),
          )
          .map((column, index) => (
            <div
              className={classNames(styles.footer__column, {
                [styles["footer__column--spaced"]]: index > 0,
              })}
              key={column.titleTranslationKey}
            >
              <Heading as="h4">
                <FormattedMessage
                  id={`footerColumns.${column.titleTranslationKey}`}
                />
              </Heading>
              {column.links
                .filter((link) => link.hrefLang === hrefLang)
                .map((link) => (
                  <Link
                    iconAlign="end"
                    icon={<ExternalLinkIcon />}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    hrefLang={link.hrefLang}
                    className={styles.footer__link}
                    key={link.url}
                  >
                    <FormattedMessage
                      id={`footerLinks.${link.linkTranslationKey}`}
                    />
                  </Link>
                ))}
            </div>
          ))}
      </ResponsiveContent>
    </footer>
  );
};

export default Footer;
