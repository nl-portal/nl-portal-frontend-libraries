import { FormattedMessage, useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
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
  title?: string;
  cases?: GetZakenQuery["getZaken"];
  total?: number;
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const CasesList = ({
  loading,
  error,
  title,
  cases,
  total,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const listView = Boolean(total && total > 8);
  const subTitle = total
    ? intl.formatMessage({ id: "cases.viewAll" }, { total })
    : undefined;

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
        <Paragraph>
          <FormattedMessage id="cases.fetchError" />
        </Paragraph>
      </section>
    );

  if (!cases || cases.length === 0)
    return (
      <section className={styles["cases-list"]}>
        <SectionHeader title={title} />
        <Paragraph>
          <FormattedMessage id="cases.noClosedCases" />
        </Paragraph>
      </section>
    );

  return (
    <section className={styles["cases-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href="/zaken" />
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
