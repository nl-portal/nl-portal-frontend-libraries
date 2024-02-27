import { Paragraph } from "@gemeente-denhaag/typography";
import SectionHeader from "./SectionHeader";
import Skeleton from "./Skeleton";
import Table, { Cell } from "./Table";
import styles from "./TableList.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { Pagination } from "@gemeente-denhaag/pagination";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface Props {
  loading?: boolean;
  error?: boolean;
  title?: string;
  headers?: Cell[];
  rows?: Cell[][];
  total?: number;
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const TableList = ({
  loading,
  error,
  title,
  headers: hdrs,
  rows: rws,
  total,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const headers = hdrs && [...hdrs, undefined];
  const rows = rws && rws.map((row) => [...row, <ArrowRightIcon />]);
  // TODO: translate
  const subTitle = total
    ? intl.formatMessage({ id: "table.viewAll" }, { total })
    : undefined;

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
        <Paragraph>
          {/* TODO */}
          <FormattedMessage id="table.fetchError" />
        </Paragraph>
      </section>
    );

  if (!rows || rows.length === 0)
    return (
      <section className={styles["table-list"]}>
        <SectionHeader title={title} />
        <Paragraph>
          {/* TODO */}
          <FormattedMessage id="table.noClosedCases" />
        </Paragraph>
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
