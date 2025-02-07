import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { Zaak } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/typography";
import styles from "./CasesList.module.scss";
import SectionHeader from "./SectionHeader";
import Case from "./Case";
import { Pagination } from "@gemeente-denhaag/pagination";
import classnames from "classnames";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  showEmpty?: boolean;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  readMoreLink?: string;
  readMoreTranslationId?: string | null;
  totalAmount?: number;
  cases?: Zaak[];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => void;
  listView?: boolean;
}

const CasesList = ({
  loading,
  error,
  errorTranslationId = "casesList.fetchError",
  showEmpty = true,
  emptyTranslationId = "casesList.empty",
  titleTranslationId = "casesList.title",
  readMoreLink,
  readMoreTranslationId = "casesList.viewAll",
  totalAmount,
  cases,
  index,
  indexLimit,
  onChange,
  listView = Boolean(totalAmount && totalAmount > 8),
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const casesPath = readMoreLink || paths.cases;
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;

  //TODO: remove Math.min once cases api offers pagination, we dont offer pagination for now because of the lack of support in the api
  const subTitle =
    totalAmount && readMoreTranslationId
      ? intl.formatMessage(
          { id: readMoreTranslationId },
          { total: Math.min(100, totalAmount) },
        )
      : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (!loading) {
    if (error)
      return (
        <section className={styles["cases-list"]}>
          <SectionHeader title={title} />
          <Paragraph>{errorMessage}</Paragraph>
        </section>
      );

    if (!cases || cases.length === 0) {
      if (!showEmpty) return null;
      return (
        <section className={styles["cases-list"]}>
          <SectionHeader title={title} />
          <Paragraph>{emptyMessage}</Paragraph>
        </section>
      );
    }
  }

  return (
    <section className={styles["cases-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href={casesPath} />
      {loading ? (
        <div className={styles["cases-list__cases"]}>
          <Skeleton height={220} />
          <Skeleton height={220} />
        </div>
      ) : (
        <div
          className={classnames(styles["cases-list__cases"], {
            [styles["cases-list__cases--list"]]: listView,
          })}
        >
          {cases?.map((cs) => (
            <Case key={cs.uuid} cs={cs} listView={listView} />
          ))}
        </div>
      )}
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
