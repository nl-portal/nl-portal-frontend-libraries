import { FormattedMessage, useIntl } from "react-intl";
import styles from "./MessagesList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { Pagination } from "@gemeente-denhaag/pagination";
import Message from "./Message";
import Table from "./Table";
import { Bericht } from "@nl-portal/nl-portal-api";
import { listViewHeight } from "../constants/skeleton";

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
  messages?: Bericht[];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const MessagesList = ({
  loading,
  error,
  errorTranslationId = "messagesList.fetchError",
  showEmpty = true,
  emptyTranslationId = "messagesList.empty",
  messages,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (loading) {
    return (
      <section className={styles["messages-list"]}>
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
      </section>
    );
  }

  if (error)
    return (
      <section className={styles["messages-list"]}>
        <Paragraph>{errorMessage}</Paragraph>
      </section>
    );

  if (!messages || messages.length === 0) {
    if (!showEmpty) return null;
    return (
      <section className={styles["messages-list"]}>
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );
  }

  return (
    <section className={styles["messages-list"]}>
      <Table
        headers={[
          {
            key: "subject",
            head: true,
            children: <FormattedMessage id="messagesList.subject" />,
          },
          {
            key: "date",
            head: true,
            className: "denhaag-table__cell--align-end",
            children: <FormattedMessage id="messagesList.date" />,
          },
        ]}
      />
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {indexLimit ? (
        <Pagination
          className={`denhaag-pagination--center ${styles["messages-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      ) : null}
    </section>
  );
};

export default MessagesList;
