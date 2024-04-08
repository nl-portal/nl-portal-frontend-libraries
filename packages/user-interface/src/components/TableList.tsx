import { Paragraph } from "@gemeente-denhaag/typography";
import SectionHeader from "./SectionHeader";
import Skeleton from "./Skeleton";
import Table, { Cell, CellObject } from "./Table";
import styles from "./TableList.module.scss";
import { useIntl } from "react-intl";
import { Pagination } from "@gemeente-denhaag/pagination";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  emptyTranslationId?: string;
  showTitle?: boolean;
  titleTranslationId?: string;
  readMoreAmount?: number;
  readMoreLink?: string;
  readMoreTranslationId?: string;
  headers?: Cell[];
  rows?: CellObject[][];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const TableList = ({
  loading,
  error,
  errorTranslationId = "tableList.fetchError",
  emptyTranslationId = "tableList.empty",
  showTitle = true,
  titleTranslationId = "tableList.title",
  readMoreAmount,
  readMoreLink,
  readMoreTranslationId = "tableList.viewAll",
  headers: hdrs,
  rows: rws,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const headers = hdrs && [
    ...hdrs,
    { className: styles["table-list__icon"], children: undefined },
  ];
  const rows =
    rws &&
    rws.map((row) => [
      ...row,
      {
        href: row[0].href,
        className: styles["table-list__icon"],
        children: (
          <div className={styles["table-list__arrow"]}>
            <ArrowRightIcon />
          </div>
        ),
      },
    ]);
  console.log(readMoreAmount, readMoreLink);
  const title = showTitle
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const subTitle =
    readMoreAmount && readMoreLink
      ? intl.formatMessage(
          { id: readMoreTranslationId },
          { total: readMoreAmount },
        )
      : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (loading) {
    return (
      <section className={styles["table-list"]}>
        <SectionHeader title={title} />
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
    );
  }

  if (error)
    return (
      <section className={styles["table-list"]}>
        <SectionHeader title={title} />
        <Paragraph>{errorMessage}</Paragraph>
      </section>
    );

  if (!rows || rows.length === 0)
    return (
      <section className={styles["table-list"]}>
        <SectionHeader title={title} />
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );

  return (
    <section className={styles["table-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href={readMoreLink} />
      <Table headers={headers} rows={rows} />
      {indexLimit ? (
        <Pagination
          className={`denhaag-pagination--center ${styles["table-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      ) : null}
    </section>
  );
};

export default TableList;
