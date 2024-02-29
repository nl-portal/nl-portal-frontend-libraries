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
  title?: string;
  headers?: Cell[];
  rows?: CellObject[][];
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

const TableList = ({
  loading,
  error,
  headers: hdrs,
  rows: rws,
  total,
  index,
  indexLimit,
  onChange,
  showTitle = true,
  titleTranslationId = "tableList.title",
  subTitleTranslationId = "tableList.viewAll",
  errorTranslationId = "tableList.fetchError",
  emptyTranslationId = "tableList.empty",
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
      {/* TODO: link to? */}
      <SectionHeader title={title} subTitle={subTitle} href="#meh" />
      <Table headers={headers} rows={rows} />
      {indexLimit && (
        <Pagination
          className={`denhaag-pagination--center ${styles["table-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      )}
    </section>
  );
};

export default TableList;
