import { useIntl } from "react-intl";
import styles from "./TasksList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import Task from "./Task";
import { Pagination } from "@gemeente-denhaag/pagination";
import SectionHeader from "./SectionHeader";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  showEmpty?: boolean;
  emptyTranslationId?: string;
  showTitle?: boolean;
  titleTranslationId?: string;
  readMoreAmount?: number;
  readMoreLink?: string;
  readMoreTranslationId?: string;
  tasks?: GetTakenQuery["getTaken"]["content"];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const TasksList = ({
  loading,
  error,
  errorTranslationId = "tasksList.fetchError",
  showEmpty = true,
  emptyTranslationId = "tasksList.empty",
  showTitle = true,
  titleTranslationId = "tasksList.title",
  readMoreAmount,
  readMoreLink,
  readMoreTranslationId = "tasksList.viewAll",
  tasks,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const tasksPath = readMoreLink || paths.tasks;
  const title = showTitle
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const subTitle = readMoreAmount
    ? intl.formatMessage({ id: readMoreTranslationId }, { readMoreAmount })
    : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (loading) {
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
    );
  }

  if (error)
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Paragraph>{errorMessage}</Paragraph>
      </section>
    );

  if (!tasks || tasks.length === 0) {
    if (!showEmpty) return null;
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );
  }

  return (
    <section className={styles["tasks-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href={tasksPath} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      {indexLimit ? (
        <Pagination
          className={`denhaag-pagination--center ${styles["tasks-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      ) : null}
    </section>
  );
};

export default TasksList;
