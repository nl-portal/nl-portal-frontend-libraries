import {
  ApiContext,
  Document as PortalDocument,
} from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/typography";
import { useIntl } from "react-intl";
import styles from "./DocumentsList.module.scss";
import Document from "./Document";
import SectionHeader from "./SectionHeader";
import Skeleton from "./Skeleton";
import classnames from "classnames";
import { useContext } from "react";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  documents?: Array<PortalDocument>;
}

const DocumentsList = ({
  loading,
  error,
  errorTranslationId = "documentsList.fetchError",
  emptyTranslationId = "documentsList.empty",
  titleTranslationId = "documentsList.title",
  documents,
}: Props) => {
  const intl = useIntl();
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });
  const { restUri } = useContext(ApiContext);

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
            document={document}
            downloadLink={`${restUri}/zakenapi/zaakdocument/${document.identificatie}/content`}
          />
        ))}
      </div>
    </section>
  );
};

export default DocumentsList;
