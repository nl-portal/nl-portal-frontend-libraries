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
  titleTranslationId?: string | null;
  readMoreLink?: string;
  readMoreTranslationId?: string | null;
  totalAmount?: number;
  headers?: Cell[];
  rows?: CellObject[][];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
  children?: React.ReactNode;
}

const TableList = ({
  loading,
  error,
  errorTranslationId = "tableList.fetchError",
  emptyTranslationId = "tableList.empty",
  titleTranslationId = "tableList.title",
  readMoreLink,
  readMoreTranslationId = "tableList.viewAll",
  totalAmount,
  headers: hdrs,
  rows: rws,
  index,
  indexLimit,
  onChange,
  children,
}: Props) => {
  const intl = useIntl();
  const hasLink = Boolean(rws?.flat().find((r) => r.href));
  const headers =
    hasLink && hdrs
      ? [
          ...hdrs,
          { className: styles["table-list__icon"], children: undefined },
        ]
      : [...(hdrs || [])];
  const rows =
    rws &&
    rws.map((row) =>
      row.find((r) => r.href)
        ? [
            ...row,
            {
              href: row[0].href,
              className: styles["table-list__icon"],
              children: (
                <div className={styles["table-list__arrow"]}>
                  <span className={styles["table-list__link-label"]}>Link</span>
                  <ArrowRightIcon />
                </div>
              ),
            },
          ]
        : row,
    );
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const subTitle =
    totalAmount && readMoreTranslationId
      ? intl.formatMessage(
          { id: readMoreTranslationId },
          { total: totalAmount },
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
      <div className={styles["table-list__children"]}>{children}</div>
    </section>
  );
};

export default TableList;
