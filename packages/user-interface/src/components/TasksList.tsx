import { useIntl } from "react-intl";
import styles from "./TasksList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { TaakV2 } from "@nl-portal/nl-portal-api";
import Task from "./Task";
import { Pagination } from "@gemeente-denhaag/pagination";
import SectionHeader from "./SectionHeader";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { listViewHeight } from "../constants/skeleton";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  showEmpty?: boolean;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  openInContext?: boolean;
  readMoreLink?: string;
  readMoreTranslationId?: string | null;
  totalAmount?: number;
  tasks?: TaakV2[];
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
  titleTranslationId = "tasksList.title",
  openInContext,
  readMoreLink,
  readMoreTranslationId = "tasksList.viewAll",
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-expect-error: TS6133
  totalAmount,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  tasks,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const tasksPath = readMoreLink || paths.tasks;
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const subTitle = readMoreTranslationId
    ? intl.formatMessage({ id: readMoreTranslationId })
    : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (loading) {
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
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
        <Task key={task.id} task={task} openInContext={openInContext} />
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
