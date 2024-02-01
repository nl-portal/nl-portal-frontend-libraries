import { FC, useContext } from "react";
import { DocumentIcon, Paragraph } from "@gemeente-denhaag/components-react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import { useIntl } from "react-intl";
import prettyBytes from "pretty-bytes";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { PortalDocument } from "../interfaces/portal-document";
import styles from "./Document.module.scss";
import useMediaQuery from "../hooks/useMediaQuery";
import { BREAKPOINTS } from "../constants/breakpoints";
import DocumentDownload from "./DocumentDownload";

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({
  uuid,
  extension,
  name,
  size,
  documentapi,
}) => {
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const { hrefLang } = useContext(LocaleContext);
  const intl = useIntl();

  return (
    <div className={styles.document}>
      <div className={styles["document__icon-container"]}>
        <DocumentIcon className={styles.document__icon} />
      </div>
      <div
        className={classNames(styles.document__content, {
          [styles["document__content--desktop"]]: isDesktop,
        })}
      >
        <Paragraph className={styles["document__file-name"]}>
          {name ? (
            `${name} (${extension}, ${prettyBytes(size || 0, {
              locale: hrefLang,
            })})`
          ) : (
            <span
              aria-busy
              aria-disabled
              aria-label={intl.formatMessage({ id: "element.loading" })}
            >
              <Skeleton width={250} />
            </span>
          )}
        </Paragraph>
        <DocumentDownload uuid={uuid!} name={name} documentapi={documentapi!} />
      </div>
    </div>
  );
};

export default Document;
