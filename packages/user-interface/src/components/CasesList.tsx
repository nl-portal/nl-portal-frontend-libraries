import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { Zaak } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/components-react";
import styles from "./CasesList.module.scss";
import SectionHeader from "./SectionHeader";
import Case from "./Case";
import { Pagination } from "@gemeente-denhaag/pagination";
import classnames from "classnames";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  emptyTranslationId?: string;
  titleTranslationId?: string | false;
  readMoreAmount?: number;
  readMoreLink?: string;
  readMoreTranslationId?: string;
  cases?: Zaak[];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const CasesList = ({
  loading,
  error,
  errorTranslationId = "casesList.fetchError",
  emptyTranslationId = "casesList.empty",
  titleTranslationId = "casesList.title",
  readMoreAmount,
  readMoreLink,
  readMoreTranslationId = "casesList.viewAll",
  cases,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const casesPath = readMoreLink || paths.cases;
  const listView = Boolean(readMoreAmount && readMoreAmount > 8);
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;

  //TODO: remove Math.min once cases api offers pagination
  const subTitle = readMoreAmount
    ? intl.formatMessage(
        { id: readMoreTranslationId },
        { total: Math.min(100, readMoreAmount) },
      )
    : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (loading) {
    return (
      <section className={styles["cases-list"]}>
        <SectionHeader title={title} />
        <div className={styles["cases-list__cases"]}>
          <Skeleton height={220} />
          <Skeleton height={220} />
        </div>
      </section>
    );
  }

  if (error)
    return (
      <section className={styles["cases-list"]}>
        <SectionHeader title={title} />
        <Paragraph>{errorMessage}</Paragraph>
      </section>
    );

  if (!cases || cases.length === 0)
    return (
      <section className={styles["cases-list"]}>
        <SectionHeader title={title} />
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );

  return (
    <section className={styles["cases-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href={casesPath} />
      <div
        className={classnames(styles["cases-list__cases"], {
          [styles["cases-list__cases--list"]]: listView,
        })}
      >
        {cases.map((cs) => (
          <Case key={cs.uuid} cs={cs} listView={listView} />
        ))}
      </div>
      {indexLimit ? (
        <Pagination
          className={`denhaag-pagination--center ${styles["cases-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      ) : null}
    </section>
  );
};

export default CasesList;
