import { Document as PortalDocument } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { useIntl } from "react-intl";
import styles from "./DocumentsList.module.scss";
import Document from "./Document";
import SectionHeader from "./SectionHeader";
import Skeleton from "./Skeleton";
import classnames from "classnames";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  emptyTranslationId?: string;
  showTitle?: boolean;
  titleTranslationId?: string;
  documents?: Array<PortalDocument>;
}

const DocumentsLists = ({
  loading,
  error,
  errorTranslationId = "documentsList.fetchError",
  emptyTranslationId = "documentsList.empty",
  showTitle = true,
  titleTranslationId = "documentsList.title",
  documents,
}: Props) => {
  const intl = useIntl();
  const title = showTitle
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (loading) {
    return (
      <section className={styles["documents-list"]}>
        <SectionHeader title={title} />
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
    );
  }

  if (error)
    return (
      <section>
        <SectionHeader title={title} />
        <Paragraph>{errorMessage}</Paragraph>
      </section>
    );

  if (!documents || documents.length === 0)
    return (
      <section>
        <SectionHeader title={title} />
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );

  return (
    <section>
      <SectionHeader title={title} />
      <div className={classnames(styles["documents-list__documents"])}>
        {documents.map((document) => (
          <Document
            key={document.uuid}
            uuid={document.uuid}
            name={document?.bestandsnaam || ""}
            size={document.bestandsomvang || 0}
            documentapi={document.documentapi}
          />
        ))}
      </div>
    </section>
  );
};

export default DocumentsLists;
