import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { GetZakenQuery } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/components-react";
import styles from "./CasesList.module.scss";
import SectionHeader from "./SectionHeader";
import Case from "./Case";
import { Pagination } from "@gemeente-denhaag/pagination";
import classnames from "classnames";

interface Props {
  loading?: boolean;
  error?: boolean;
  cases?: GetZakenQuery["getZaken"];
  total?: number;
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
  showTitle?: boolean;
  titleTranslationId?: string;
  subTitleTranslationId?: string;
  errorTranslationId?: string;
  emptyTranslationId?: string;
}

const CasesList = ({
  loading,
  error,
  cases,
  total,
  index,
  indexLimit,
  onChange,
  showTitle = true,
  titleTranslationId = "casesList.title",
  subTitleTranslationId = "casesList.viewAll",
  errorTranslationId = "casesList.fetchError",
  emptyTranslationId = "casesList.empty",
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const listView = Boolean(total && total > 8);
  const title = showTitle
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const subTitle = total
    ? intl.formatMessage({ id: subTitleTranslationId }, { total })
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
      <SectionHeader title={title} subTitle={subTitle} href={paths.cases} />
      <div
        className={classnames(styles["cases-list__cases"], {
          [styles["cases-list__cases--list"]]: listView,
        })}
      >
        {cases.map((cs) => (
          <Case key={cs.uuid} cs={cs} listView={listView} />
        ))}
      </div>
      {indexLimit && (
        <Pagination
          className={`denhaag-pagination--center ${styles["cases-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      )}
    </section>
  );
};

export default CasesList;
